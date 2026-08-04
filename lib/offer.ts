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

// ── Checkout destination ────────────────────────────────────────────
// The order form is moving from the in-page Stripe modal to a GHL funnel.
// Set NEXT_PUBLIC_GHL_CHECKOUT_URL once that funnel is published and every
// BuyButton switches to it automatically, no further code change needed.
// Leave unset and the existing CheckoutModal (name + email -> Stripe) keeps
// running exactly as it does today.
export const GHL_CHECKOUT_URL = process.env.NEXT_PUBLIC_GHL_CHECKOUT_URL || ''

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
// The audit lives in Pro only, one product should not double as both a $97
// freebie and a $297 headline feature, that undersells the upgrade.
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
] as const

export const TOTAL_VALUE = '$3,600'

// ── Pro tier ────────────────────────────────────────────────────────
export const PRO_PRICE = '$297'
export const PRO_PRICE_VALUE = 297

export const PRO_VALUE_STACK = [
  { item: '10 custom ad creatives, statics AND video' },
  { item: 'Rendered native for Meta, TikTok and Google, not one size stretched to fit' },
  { item: 'A hook variant pack, 3 alternate hooks on your 3 strongest creatives' },
  { item: 'A written testing plan: campaign structure, budget split, what to kill and when' },
  {
    item:
      '2 private 1-to-1 AI creative calls with our CEO, your account, your angles, live. Not a group call, not a replay.',
  },
  {
    item:
      'A live ad account audit over Google Meet, where your spend is leaking and what to fix first, alongside a recording you keep',
    bonus: true,
  },
  { item: 'A Loom walkthrough of the batch, why each angle was built, what to test first', bonus: true },
] as const

export const PRO_TOTAL_VALUE = '$5,400'

// ── Order bump ──────────────────────────────────────────────────────
export const BUMP_PRICE = '$77'
export const BUMP_PRICE_VALUE = 77
export const BUMP_LABEL = '12-hour rush delivery'
export const BUMP_COPY =
  'Jump the queue. Your batch lands in 12 hours instead of 24.'

// ── Free ad account audit (Pro only) ───────────────────────────────────
// Customer adds PureScale as a Partner on their Meta Business Manager with
// Analyst (read-only) access, no tokens, no passwords, nothing pasted into
// a form. Analyst can view but never spend, edit, pause or post. Revocable
// by them in one click once the audit is delivered.
export const AUDIT_VALUE = '$500'
