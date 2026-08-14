/**
 * Inbound refund webhook for the GHL-native checkout money layer (order paid
 * inside GHL, not via our Stripe account, /api/stripe-webhook's charge.refunded
 * branch covers that older path).
 *
 * Wire it up in GHL as: Workflow -> trigger "Order Refunded" (or whatever the
 * pipeline/payments refund event is called in this sub-account) on the
 * PureScale order funnel -> action Webhook, POST here, header
 * x-webhook-secret: <GHL_WEBHOOK_SECRET>. Body:
 *
 *   email     required
 *   orderId   GHL transaction/order id, logged only, no CAPI dedup needed here
 *
 * Tags the contact `refunded`, the stop condition W2-W9 read to quit selling
 * to someone who's had their money back.
 */

import { NextRequest, NextResponse } from 'next/server'
import { upsertContact } from '@/lib/ghl'

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
    console.error('[ghl-refund-webhook] Discord notify failed', err)
  }
}

export async function POST(request: NextRequest) {
  const expected = process.env.GHL_WEBHOOK_SECRET
  if (!expected) {
    console.error('[ghl-refund-webhook] GHL_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }
  if (request.headers.get('x-webhook-secret') !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, string | undefined>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = body.email
  const orderId = body.orderId

  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  try {
    await upsertContact({
      email,
      tags: ['refunded'],
      source: 'PureScale offer, refunded (GHL checkout)',
    })
  } catch (err) {
    console.error('[ghl-refund-webhook] GHL sync failed', err)
  }

  await notifyDiscord(
    `🔴 **Refund processed**. ${email}${orderId ? ` (order ${orderId})` : ''}\nAll sequences should stop.`
  )

  return NextResponse.json({ received: true })
}
