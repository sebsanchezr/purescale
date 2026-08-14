/**
 * Inbound webhook from Cal.com, feeds GHL workflow W8 (books CEO call 1, then
 * call 2 once call 1 is done).
 *
 * The two included CEO calls (lib/offer.ts CEO_CALLS_INCLUDED) need to be two
 * SEPARATE Cal.com event types, not one link used twice, that's the only way
 * this route (or GHL) can tell which call state a contact is in. Setup owed
 * on the Cal.com side, not code:
 *
 *   1. Create a second event type next to the existing
 *      "august-marketing-ceo/purescale-creative-strategy-call" (call 1), e.g.
 *      "purescale-creative-strategy-call-2" (call 2).
 *   2. Cal.com dashboard -> both event types -> Webhooks -> add endpoint:
 *        URL:      https://purescale.co/api/cal-webhook
 *        Secret:   set CAL_WEBHOOK_SECRET (any random string) and paste the
 *                  same value into Cal.com's webhook secret field
 *        Events:   Booking Created, Booking Cancelled
 *   3. Set env vars with each event type's numeric id (Cal.com shows it in the
 *      event type's URL/settings): CAL_EVENT_TYPE_ID_CALL_1, CAL_EVENT_TYPE_ID_CALL_2
 *
 * Until those exist this route 200s and no-ops, it can't tag anything it
 * can't identify.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { addTags, removeTags, upsertContact } from '@/lib/ghl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function notifyDiscord(content: string): Promise<void> {
  const url = process.env.DISCORD_ORDER_WEBHOOK_URL
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
  } catch (err) {
    console.error('[cal-webhook] Discord notify failed', err)
  }
}

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex')
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

interface CalAttendee {
  email?: string
  name?: string
}

interface CalWebhookBody {
  triggerEvent?: string
  payload?: {
    eventTypeId?: number | string
    eventType?: { id?: number | string }
    attendees?: CalAttendee[]
    responses?: { email?: { value?: string }; name?: { value?: string } }
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (!secret) {
    console.error('[cal-webhook] CAL_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const rawBody = await request.text()
  const signature = request.headers.get('x-cal-signature-256')
  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: CalWebhookBody
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const triggerEvent = body.triggerEvent
  if (triggerEvent !== 'BOOKING_CREATED' && triggerEvent !== 'BOOKING_CANCELLED') {
    return NextResponse.json({ received: true })
  }

  const eventTypeId = String(body.payload?.eventTypeId ?? body.payload?.eventType?.id ?? '')
  const call1Id = process.env.CAL_EVENT_TYPE_ID_CALL_1
  const call2Id = process.env.CAL_EVENT_TYPE_ID_CALL_2

  const callTag =
    call1Id && eventTypeId === call1Id
      ? 'call_1_booked'
      : call2Id && eventTypeId === call2Id
        ? 'call_2_booked'
        : null

  if (!callTag) {
    console.error('[cal-webhook] unrecognized eventTypeId, check CAL_EVENT_TYPE_ID_CALL_1/2', eventTypeId)
    return NextResponse.json({ received: true })
  }

  const attendee = body.payload?.attendees?.[0]
  const email = attendee?.email ?? body.payload?.responses?.email?.value
  const name = attendee?.name ?? body.payload?.responses?.name?.value

  if (!email) {
    console.error('[cal-webhook] booking payload had no attendee email')
    return NextResponse.json({ received: true })
  }

  try {
    if (triggerEvent === 'BOOKING_CREATED') {
      const contactId = await upsertContact({
        email,
        firstName: name?.split(' ')[0],
        tags: [callTag],
        source: `PureScale CEO ${callTag === 'call_1_booked' ? 'call 1' : 'call 2'} booked`,
      })
      if (contactId) await addTags(contactId, [callTag])
      await notifyDiscord(`📅 **${callTag.replace('_', ' ')}**. ${email}`)
    } else {
      const contactId = await upsertContact({ email, tags: [], source: 'PureScale CEO call cancelled' })
      if (contactId) await removeTags(contactId, [callTag])
      await notifyDiscord(`⚠️ **${callTag.replace('_', ' ')} cancelled**. ${email}`)
    }
  } catch (err) {
    console.error('[cal-webhook] GHL sync failed', err)
  }

  return NextResponse.json({ received: true })
}
