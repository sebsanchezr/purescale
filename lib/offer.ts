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
export const COMMUNITY_URL = '#' // paste your Discord invite here

// Value stack — anchors the $97 against real production value.
export const VALUE_STACK = [
  { item: '10 custom ad creatives (UGC, static & hook angles)', value: '$1,500' },
  { item: 'Built on your brand, your products — never templates', value: '$300' },
  { item: '24-hour delivery, ready to upload', value: '$250' },
  { item: 'Full ownership — run them on any platform, forever', value: '$200' },
  { item: 'A different test angle engineered into each one', value: '$150' },
  {
    item:
      'Weekly live AI-creative calls + private community — learn to brief, hook, test & scale better ads, and ask us anything',
    value: '$1,200',
    bonus: true,
  },
  {
    item:
      'Free ad account audit — a PDF teardown of your Meta account with prioritised fixes, delivered in 24h (optional, read-only access)',
    value: '$500',
    bonus: true,
  },
] as const

export const TOTAL_VALUE = '$4,100'

// ── Free ad account audit (optional bonus) ────────────────────────────
// Customer can grant READ-ONLY Meta access after purchase so we build a
// PDF audit + suggestions doc within 24h. Access is optional — the offer
// stands with or without it. Tokens are encrypted at rest (AUDIT_ENC_KEY)
// and never shown in the order list, Discord, or logs.
export const AUDIT_VALUE = '$500'
