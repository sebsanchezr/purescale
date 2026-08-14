/**
 * Stripe webhook for the legacy $97 Stripe path (still live until
 * NEXT_PUBLIC_GHL_CHECKOUT_URL flips buy buttons to the GHL checkout).
 *
 * On checkout.session.completed:
 *   1. Meta CAPI Purchase (event_id = session id, so a retry can never double-count)
 *   2. GHL: tag purchase_97, drop checkout_started (stops the abandoned sequence),
 *      create the pipeline opportunity.
 *
 * The purchase_97 tag is what fires GHL workflow W1 (receipt + intake request), so
 * this route is the hinge between payment and fulfilment. It must stay idempotent:
 * Stripe retries on any non-2xx, and we always return 200 once the signature is valid.
 *
 * On charge.refunded: tag `refunded`, the stop condition W2-W9 read to quit
 * selling to someone who's been given their money back. Requires "charge.refunded"
 * enabled on this endpoint in the Stripe dashboard webhook config.
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { addTags, createOpportunity, removeTags, upsertContact } from '@/lib/ghl'
import { sendCapiEvent } from '@/lib/meta-capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Ping a Discord channel so a new order is visible within seconds.
 *
 * ⚠️ DISCORD_ORDER_WEBHOOK_URL must point at a PRIVATE staff-only channel. Buyers
 * are members of the same server, and this message contains their email and spend , 
 * posting it to the members' main chat would leak one customer's details to all the
 * others. Never reuse the community webhook here.
 */
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
    console.error('[stripe-webhook] Discord notify failed', err)
  }
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    console.error('[stripe-webhook] missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const stripe = new Stripe(secretKey)

  // Signature verification needs the raw body, not the parsed JSON.
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature ?? '', webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge
    const email = charge.billing_details?.email ?? charge.receipt_email ?? undefined

    if (email) {
      try {
        const contactId = await upsertContact({
          email,
          tags: ['refunded'],
          source: 'PureScale offer, refunded',
        })
        console.log('[stripe-webhook] refunded tag applied', { email, contactId })
      } catch (err) {
        console.error('[stripe-webhook] refunded tag failed', err)
      }
      await notifyDiscord(`🔴 **Refund processed**. ${email}\nAll sequences should stop.`)
    } else {
      console.error('[stripe-webhook] charge.refunded had no email, refunded tag not applied', charge.id)
    }

    return NextResponse.json({ received: true })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const meta = session.metadata ?? {}
  const email = session.customer_details?.email ?? session.customer_email ?? undefined
  const phone = meta.phone || session.customer_details?.phone || undefined
  const firstName = meta.firstName || session.customer_details?.name?.split(' ')[0] || undefined
  const value = (session.amount_total ?? 9700) / 100

  // Beyond this point every failure is logged and swallowed: Stripe already has the
  // money, and a retry storm would re-fire the customer's welcome sequence.
  try {
    await sendCapiEvent({
      eventName: 'Purchase',
      eventId: session.id,
      eventSourceUrl: meta.sourceUrl || undefined,
      userData: {
        email,
        phone,
        firstName,
        fbp: meta.fbp || undefined,
        fbc: meta.fbc || undefined,
      },
      customData: {
        currency: (session.currency ?? 'usd').toUpperCase(),
        value,
        content_name: '$97 10-Creative Pack',
      },
    })
  } catch (err) {
    console.error('[stripe-webhook] CAPI Purchase failed', err)
  }

  try {
    let contactId = meta.ghlContactId || null

    if (!contactId && email) {
      contactId = await upsertContact({
        email,
        phone,
        firstName,
        tags: ['purchase_97'],
        source: 'PureScale $97 offer, purchase',
      })
    } else if (contactId) {
      await addTags(contactId, ['purchase_97'])
      await removeTags(contactId, ['checkout_started'])
    }

    if (contactId) {
      await createOpportunity({
        contactId,
        name: `$97 Creative Pack. ${firstName ?? email ?? 'New buyer'}`,
        monetaryValue: value,
      })
    }
  } catch (err) {
    console.error('[stripe-webhook] GHL sync failed', err)
  }

  await notifyDiscord(
    `🟢 **New $97 order**. ${firstName ?? 'Unknown'} (${email ?? 'no email'})\n` +
      `Waiting on their intake form. SLA starts when it lands.`
  )

  return NextResponse.json({ received: true })
}
