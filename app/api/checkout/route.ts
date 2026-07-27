/**
 * Step 1 of the $97 checkout.
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

const OFFER_PRICE_USD = 97

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email, phone, fbp, fbc, eventId, sourceUrl, attribution } = body ?? {}
    const utm: Record<string, string> = attribution ?? {}

    if (!email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Email and phone are required' },
        { status: 400 }
      )
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin ?? 'https://purescale.co'

    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined
    const userAgent = request.headers.get('user-agent') ?? undefined

    // 1. CRM first — a lead we can follow up on is worth more than a clean redirect.
    let contactId: string | null = null
    try {
      contactId = await upsertContact({
        email,
        phone,
        firstName,
        tags: ['checkout_started'],
        source: 'PureScale $97 offer — checkout started',
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
      customData: { content_name: '$97 10-Creative Pack', currency: 'USD', value: OFFER_PRICE_USD },
    })

    // 3. Stripe Checkout.
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Payments are not configured yet' },
        { status: 503 }
      )
    }

    // No apiVersion pin — the SDK default matches the version the account is on.
    const stripe = new Stripe(secretKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      // Everything the webhook needs to attribute the sale without a second lookup.
      metadata: {
        firstName: firstName ?? '',
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
        process.env.STRIPE_PRICE_ID
          ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: 'usd',
                unit_amount: OFFER_PRICE_USD * 100,
                product_data: {
                  name: 'PureScale — 10 Ad Creatives in 24 Hours',
                  description:
                    '10 custom ad creatives built on your brand and products. Yours to keep, forever.',
                },
              },
            },
      ],
      success_url: `${origin}/ads/success?session_id={CHECKOUT_SESSION_ID}`,
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
