/**
 * Step 1 of the checkout, Starter $97 / Pro $297, plus the optional $77 rush bump.
 *
 * Deliberately captures the lead BEFORE sending anyone to Stripe: the contact is
 * written to GHL tagged `checkout_started`, which is what makes the abandoned-
 * checkout recovery sequence (W7) possible. Roughly 60-80% of people who reach
 * this point never complete payment, so this is the highest-value line in the file.
 *
 * CRM/tracking failures are logged but never block the redirect to Stripe.
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { upsertContact } from '@/lib/ghl'
import { sendCapiEvent } from '@/lib/meta-capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const STARTER_PRICE_USD = 97
const PRO_PRICE_USD = 297
const BUMP_PRICE_USD = 77

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email, phone, fbp, fbc, eventId, sourceUrl, attribution } = body ?? {}
    const utm: Record<string, string> = attribution ?? {}

    // Tier and bump come from the card the buyer clicked. Never trust a price
    // from the client, only the tier name, the amounts live here.
    const tier: 'starter' | 'pro' = body?.tier === 'pro' ? 'pro' : 'starter'
    const bump = body?.bump === true
    const basePrice = tier === 'pro' ? PRO_PRICE_USD : STARTER_PRICE_USD
    const contentName = tier === 'pro' ? '$297 Pro Pack' : '$97 10-Creative Pack'

    // Phone is no longer collected on the modal: the extra field cost more
    // conversions than the SMS channel was worth. It stays in the payload
    // contract so contacts created before the change keep their number.
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin ?? 'https://purescale.co'

    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined
    const userAgent = request.headers.get('user-agent') ?? undefined

    // 1. CRM first, a lead we can follow up on is worth more than a clean redirect.
    let contactId: string | null = null
    try {
      contactId = await upsertContact({
        email,
        phone,
        firstName,
        tags: ['checkout_started'],
        source: `PureScale ${tier === 'pro' ? '$297' : '$97'} offer, checkout started`,
        // Written on the contact so a retainer closed months later can still be
        // traced back to the ad that produced it.
        customFields: {
          utm_source: utm.utm_source ?? '',
          utm_campaign: utm.utm_campaign ?? '',
          utm_content: utm.utm_content ?? '',
        },
      })
    } catch (err) {
      console.error('[checkout] GHL upsert failed', err)
    }

    // 2. Lead event, deduplicated against the browser pixel via eventId.
    void sendCapiEvent({
      eventName: 'Lead',
      eventId: eventId ?? `lead_${Date.now()}`,
      eventSourceUrl: sourceUrl ?? `${origin}/ads`,
      userData: { email, phone, firstName, fbp, fbc, clientIp, userAgent },
      customData: { content_name: contentName, currency: 'USD', value: basePrice },
    })

    // 3. Stripe Checkout.
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Payments are not configured yet' },
        { status: 503 }
      )
    }

    // No apiVersion pin, the SDK default matches the version the account is on.
    const stripe = new Stripe(secretKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      // Everything the webhook needs to attribute the sale without a second lookup.
      metadata: {
        firstName: firstName ?? '',
        tier,
        // The webhook reads these back to decide purchase_97 vs purchase_297 and
        // whether bump_rush applies. Never re-derive them from amount_total, tax
        // is added on top and would make that arithmetic lie.
        bumpAmount: bump ? String(BUMP_PRICE_USD) : '0',
        phone,
        fbp: fbp ?? '',
        fbc: fbc ?? '',
        ghlContactId: contactId ?? '',
        sourceUrl: sourceUrl ?? '',
        utm_source: utm.utm_source ?? '',
        utm_campaign: utm.utm_campaign ?? '',
        utm_content: utm.utm_content ?? '',
      },
      line_items: [
        // STRIPE_PRICE_ID is a Starter-only saved price, so it is only used on the
        // Starter tier. Pro always builds its price inline.
        tier === 'starter' && process.env.STRIPE_PRICE_ID
          ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: 'usd',
                unit_amount: basePrice * 100,
                // Exclusive = VAT is added on top of the price rather than carved
                // out of it. Required whenever automatic_tax is on.
                tax_behavior: 'exclusive',
                product_data: {
                  name:
                    tier === 'pro'
                      ? 'PureScale Pro. 10 Ad Creatives, Statics and Video, in 24 Hours'
                      : 'PureScale. 10 Ad Creatives in 24 Hours',
                  description:
                    tier === 'pro'
                      ? '10 custom creatives rendered native per platform, hook variant pack, written testing plan, ad account audit. Yours to keep, forever.'
                      : '10 custom ad creatives built on your brand and products. Yours to keep, forever.',
                },
              },
            },
        ...(bump
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: 'usd',
                  unit_amount: BUMP_PRICE_USD * 100,
                  tax_behavior: 'exclusive' as const,
                  product_data: {
                    name: 'PureScale. 12-hour rush delivery',
                    description: 'Jump the queue. Your batch lands in 12 hours instead of 24.',
                  },
                },
              },
            ]
          : []),
      ],
      // We are UK VAT registered, so a UK buyer must be charged 20% on top. Stripe Tax
      // works this out from the buyer's address: UK gets VAT, US gets nothing, EU
      // businesses that supply a VAT number reverse-charge themselves.
      automatic_tax: { enabled: true },
      // Stripe needs an address before it can decide the rate.
      billing_address_collection: 'required',
      // Lets business buyers enter a VAT number, which is what makes reverse charge work.
      tax_id_collection: { enabled: true },
      // /ads/thankyou, not /ads/success. thankyou carries the working native
      // intake form (store URL + best ad) that actually starts fulfilment.
      // /ads/success only embeds a GHL form that was never built, so buyers
      // landed on a page telling them to check an email nothing was sending.
      success_url: `${origin}/ads/thankyou?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/ads?checkout=cancelled`,
      allow_promotion_codes: false,
    })

    return NextResponse.json({ success: true, url: session.url })
  } catch (error) {
    console.error('[checkout] failed', error)
    return NextResponse.json(
      { success: false, error: 'Could not start checkout' },
      { status: 500 }
    )
  }
}
