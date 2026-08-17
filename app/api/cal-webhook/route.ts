/**
 * Inbound webhook from Cal.com, feeds GHL workflow W8 (books CEO call 1, then
 * call 2 once call 1 is done).
 *
 * Both included CEO calls (lib/offer.ts CEO_CALLS_INCLUDED) share ONE Cal.com
 * event type ("august-marketing-ceo/purescale-creative-strategy-call"), buyers
 * book the same link twice. So call state is derived from the contact's
 * existing tags, not the event type: no `call_1_booked` yet -> this booking is
 * call 1, `call_1_booked` already present -> this booking is call 2. A second
 * event type is NOT needed.
 *
 * Cal.com setup (dashboard, not code):
 *   Event type -> Webhooks -> add endpoint:
 *     URL:      https://purescale.co/api/cal-webhook
 *     Secret:   set CAL_WEBHOOK_SECRET in Vercel to the same value entered here
 *     Events:   Booking Created, Booking Cancelled
 *
 * On cancellation we can't reliably tell which of the two calls was cancelled
 * from the payload alone (no local booking-state store), so cancellations are
 * only logged to Discord, not auto-untagged. Sort those manually if it comes up.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { addTags, findContactByEmail, upsertContact } from '@/lib/ghl'

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

  const attendee = body.payload?.attendees?.[0]
  const email = attendee?.email ?? body.payload?.responses?.email?.value
  const name = attendee?.name ?? body.payload?.responses?.name?.value

  if (!email) {
    console.error('[cal-webhook] booking payload had no attendee email')
    return NextResponse.json({ received: true })
  }

  if (triggerEvent === 'BOOKING_CANCELLED') {
    await notifyDiscord(`⚠️ **CEO call cancelled**. ${email}\nCheck manually which call (1 or 2) this was.`)
    return NextResponse.json({ received: true })
  }

  try {
    const existing = await findContactByEmail(email)
    const callTag = existing?.tags.includes('call_1_booked') ? 'call_2_booked' : 'call_1_booked'

    const contactId =
      existing?.id ??
      (await upsertContact({
        email,
        firstName: name?.split(' ')[0],
        tags: [callTag],
        source: `PureScale CEO ${callTag === 'call_1_booked' ? 'call 1' : 'call 2'} booked`,
      }))

    if (contactId) await addTags(contactId, [callTag])
    await notifyDiscord(`📅 **${callTag.replace('_', ' ')}**. ${email}`)
  } catch (err) {
    console.error('[cal-webhook] GHL sync failed', err)
  }

  return NextResponse.json({ received: true })
}
