# $97 Offer Funnel, integration notes

What was added, what still needs wiring, and how to test it. Companion to
`plans/purescale_funnel_build_plan.md` in the AM Agency Workspace.

## What this branch adds

| File | Purpose |
|---|---|
| `lib/ghl.ts` | GoHighLevel v2 client, upsert contact, add/remove tags, create opportunity |
| `lib/meta-capi.ts` | Meta Conversions API sender with SHA-256 PII hashing + event dedup |
| `app/api/checkout/route.ts` | Captures the lead into GHL (`checkout_started`), fires CAPI `Lead`, creates the Stripe session |
| `app/api/stripe-webhook/route.ts` | On payment: CAPI `Purchase`, tag `purchase_97`, drop `checkout_started`, create pipeline card |
| `app/api/ghl-webhook/route.ts` | Inbound from GHL: `intake` → queues `offer_orders` row; `qualified_call` → CAPI `QualifiedCall` |
| `components/CheckoutModal.tsx` | Two-step checkout modal (details → Stripe) |
| `components/BuyButton.tsx` | Drop-in CTA that opens the modal |
| `app/ads/success/page.tsx` | Post-purchase page with the intake form embedded |

## ⚠️ Required change on the `/ads` page

**The live `/ads` page is not in this repo**, it was deployed from another machine
and never committed. Once that source is pushed, make this one change:

```tsx
// Add to the top of the /ads page component file
import { BuyButton } from '@/components/BuyButton'

// Then replace every CTA. Before, scrolls the page, cannot take money:
<a href="#buy" className="...">Get My 10 Creatives. $97 →</a>

// After, opens the checkout modal:
<BuyButton className="...">Get My 10 Creatives. $97 →</BuyButton>
```

There are CTAs in the hero, the `#buy` value-stack section and the final call , 
all of them must be swapped. The `#buy` **section** stays exactly where it is; only
the links pointing at it change.

While that file is open, two copy fixes are also outstanding:
1. The value stack sells "Weekly live AI-creative calls + private community" ($1,200).
   That does not exist yet, build it in GHL Communities before launch or remove the row.
2. FAQ/microcopy: change "24 hours" to "one business day **from your intake form**",
   which is what the automation and the success page now promise.

## Deploy safety

Production currently serves a build that is **ahead of `main`**. Do not merge this
branch to `main` and deploy until the `/ads` source is committed, deploying `main`
as it stands would ship a site with no `/ads` page at all.

## Test sequence (do in order)

1. **Env**: set every var in `.env.example` in Vercel (Preview + Production).
2. **Stripe test mode**: use `sk_test_…`, add the webhook endpoint, take `whsec_…`.
   Buy with card `4242 4242 4242 4242`.
3. **Verify after the test purchase**:
   - Stripe: session completed, webhook delivered 200.
   - Meta Events Manager → Test Events: `Lead` (browser + server, deduplicated),
     `InitiateCheckout` (browser), `Purchase` (server only, once).
   - GHL: contact exists, has `purchase_97`, no longer has `checkout_started`,
     opportunity sits in **New Order**.
   - Email/SMS from workflow W1 arrive.
4. **Intake**: submit the form → GHL webhook → row appears in Supabase `offer_orders`
   with `status = 'pending'`.
5. **Abandon test**: open the modal, submit details, close the Stripe page without
   paying. Contact should keep `checkout_started` and enter W7 after 15 minutes.
6. Remove `META_TEST_EVENT_CODE`, switch Stripe to live keys, re-run one real £-value
   test if you want belt and braces.
