// ── $97 SLO offer config ──────────────────────────────────────────────
// PAYMENT: create a Stripe Payment Link for the $97 offer, then paste its
// URL below (or set NEXT_PUBLIC_STRIPE_PAYMENT_LINK in Vercel env).
// In Stripe, set the Payment Link's "after payment" redirect to:
//   https://purescale.vercel.app/ads?purchase=success
// so the Meta Pixel Purchase event fires. Until then the button falls back
// to the checkout placeholder and logs a warning.
export const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  'https://buy.stripe.com/14AbJ200e3Su8th6Le4wM07'

export const PRICE = '$97'
export const PRICE_VALUE = 97

export const SITE_URL = 'https://purescale.vercel.app'

// Post-purchase links
export const CEO_CALL_URL = 'https://cal.com/august-marketing-ceo/purescale-creative-strategy-call'

// Two 1-to-1 calls with the CEO replaced the weekly group call + community.
// A community needs a crowd before it is worth attending, so it is dead on
// arrival at low order volume; two private calls are valuable to the very first
// buyer. They are also the upsell mechanism, the buyer experiences the working
// relationship the retainer sells, so the pitch becomes "keep this" rather than
// "buy something new".
export const CEO_CALLS_INCLUDED = 2

// Value stack, anchors the $97 against real production value.
export const VALUE_STACK = [
  { item: '10 custom ad creatives (UGC, static & hook angles)', value: '$1,500' },
  { item: 'Built on your brand, your products, never templates', value: '$300' },
  { item: '24-hour delivery, ready to upload', value: '$250' },
  { item: 'Full ownership, run them on any platform, forever', value: '$200' },
  { item: 'A different test angle engineered into each one', value: '$150' },
  {
    item:
      '2 private 1-to-1 AI creative calls with our CEO, your account, your angles, live. Not a group call, not a replay.',
    value: '$1,200',
    bonus: true,
  },
  {
    item:
      'Free ad account audit, a PDF teardown of your Meta account with prioritised fixes, delivered in 24h (optional, read-only access)',
    value: '$500',
    bonus: true,
  },
] as const

export const TOTAL_VALUE = '$4,100'

// ── Free ad account audit (optional bonus) ────────────────────────────
// Customer can grant READ-ONLY Meta access after purchase so we build a
// PDF audit + suggestions doc within 24h. Access is optional, the offer
// stands with or without it. Tokens are encrypted at rest (AUDIT_ENC_KEY)
// and never shown in the order list, Discord, or logs.
export const AUDIT_VALUE = '$500'
