/**
 * Inbound webhook from a GHL-native order form (payment processed inside GHL,
 * not Stripe Checkout). This exists for the day the checkout itself moves into
 * a GHL funnel: point the funnel's "Order Form Submission" workflow trigger at
 * this URL and every server-side conversion signal that Stripe used to produce
 * still fires.
 *
 * Wire it up in GHL as: Workflow -> trigger "Order Form Submission" (or
 * "Payment Received") on the PureScale order funnel -> action Webhook, POST
 * here, header x-webhook-secret: <GHL_WEBHOOK_SECRET>. Map these fields into
 * the JSON body (GHL exposes them all as workflow custom values):
 *
 *   email, firstName, phone (optional)
 *   tier            "starter" | "pro"
 *   amount          total charged, in the transaction currency's minor-free
 *                   units, e.g. 97 or 297 (add bumpAmount separately, don't
 *                   fold it in, we want it broken out for reporting)
 *   bumpAmount      0 if no bump, else 77
 *   currency        "USD" unless the funnel is later localised
 *   orderId         GHL's transaction/order id, used as the CAPI event id so a
 *                   workflow retry can never double-count the same sale
 *   fbp, fbc        first-party cookies, forwarded from a hidden field the
 *                   funnel page sets via the same getCookie pattern CheckoutModal
 *                   uses, improves Meta match quality
 *   sourceUrl       the funnel page URL the buyer converted on
 *
 * No dedup against a browser-side Purchase event: same as the Stripe path,
 * Purchase is server-only here, so there's nothing to deduplicate against.
 */

import { NextRequest, NextResponse } from 'next/server'
import { addTags, createOpportunity, upsertContact } from '@/lib/ghl'
import { sendCapiEvent } from '@/lib/meta-capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// No offer_orders write here, on purpose. That row is created by
// /api/ghl-webhook's "intake" branch once the buyer submits the intake form
// (store URL + best ad), which is the real start of the fulfilment SLA and
// the only point the row has enough fields to be useful. This route mirrors
// the Stripe webhook, which doesn't touch offer_orders either, only CAPI,
// GHL tags/pipeline and the Discord ping.

/**
 * Same private-channel constraint as the Stripe webhook's notifyDiscord:
 * this message contains an email address, never post it anywhere buyers
 * can read.
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
    console.error('[ghl-order-webhook] Discord notify failed', err)
  }
}

export async function POST(request: NextRequest) {
  const expected = process.env.GHL_WEBHOOK_SECRET
  if (!expected) {
    console.error('[ghl-order-webhook] GHL_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }
  if (request.headers.get('x-webhook-secret') !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, string | number | undefined>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = body.email as string | undefined
  const firstName = body.firstName as string | undefined
  const phone = body.phone as string | undefined
  const tier = (body.tier as string) === 'pro' ? 'pro' : 'starter'
  const amount = Number(body.amount ?? (tier === 'pro' ? 297 : 97))
  const bumpAmount = Number(body.bumpAmount ?? 0)
  const total = amount + bumpAmount
  const currency = ((body.currency as string) ?? 'USD').toUpperCase()
  const orderId = body.orderId as string | undefined
  const sourceUrl = body.sourceUrl as string | undefined

  if (!email || !orderId) {
    return NextResponse.json({ error: 'email and orderId are required' }, { status: 400 })
  }

  const contentName = tier === 'pro' ? '$297 Pro Pack' : '$97 10-Creative Pack'
  const purchaseTag = tier === 'pro' ? 'purchase_297' : 'purchase_97'

  // Beyond this point every failure is logged and swallowed: GHL already has
  // the money, and a workflow retry storm would re-fire the welcome sequence.
  try {
    await sendCapiEvent({
      eventName: 'Purchase',
      eventId: orderId,
      eventSourceUrl: sourceUrl,
      userData: {
        email,
        phone,
        firstName,
        fbp: (body.fbp as string) || undefined,
        fbc: (body.fbc as string) || undefined,
      },
      customData: {
        currency,
        value: total,
        content_name: contentName,
      },
    })
  } catch (err) {
    console.error('[ghl-order-webhook] CAPI Purchase failed', err)
  }

  try {
    const tags = [purchaseTag]
    if (bumpAmount > 0) tags.push('bump_rush')

    const contactId = await upsertContact({
      email,
      phone,
      firstName,
      tags,
      source: `PureScale ${tier === 'pro' ? '$297' : '$97'} offer, purchase (GHL checkout)`,
    })

    if (contactId) {
      await addTags(contactId, tags)
      await createOpportunity({
        contactId,
        name: `${contentName}${bumpAmount > 0 ? ' + rush' : ''}. ${firstName ?? email}`,
        monetaryValue: total,
      })
    }
  } catch (err) {
    console.error('[ghl-order-webhook] GHL sync failed', err)
  }

  await notifyDiscord(
    `🟢 **New ${contentName} order**${bumpAmount > 0 ? ' + rush delivery' : ''}. ` +
      `${firstName ?? 'Unknown'} (${email})\nWaiting on their intake form. SLA starts when it lands.`
  )

  return NextResponse.json({ received: true })
}
