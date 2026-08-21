'use client'

/**
 * Two-step checkout for the Starter $97 / Pro $297 offer, plus the $77 rush bump.
 *
 * Step 1 captures name/email/phone into GHL before Stripe ever loads. That single
 * decision is what makes abandoned-checkout recovery possible, a one-click jump
 * straight to Stripe would convert marginally better on the day and lose every
 * person who hesitates.
 *
 * Pixel events fire browser-side with an eventID that the server reuses for the
 * CAPI copy, so Meta counts each conversion once.
 */

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  BUMP_COPY,
  BUMP_LABEL,
  BUMP_PRICE_VALUE,
  PRICE_VALUE,
  PRO_PRICE_VALUE,
  PRO_VALUE_STACK,
} from '@/lib/offer'

// What the extra $200 buys, shown only on the Starter modal. The CEO-calls line
// is dropped, both tiers already include it, so it is not part of the delta
// actually being sold in this upsell.
const UPGRADE_DELTA = PRO_VALUE_STACK.filter((row) => !row.item.includes('AI creative calls'))


/** Read a first-party cookie (used for _fbp / _fbc match quality). */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[2]) : undefined
}

function newEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Read UTMs from the URL, remembering them for the session.
 *
 * This is what lets us answer "which ad produced the retainer?", the only number
 * that decides whether the whole $97 experiment worked. Session storage matters
 * because people land from an ad, wander the page, sometimes reload, and the
 * campaign params must survive that.
 */
function getAttribution(): Record<string, string> {
  const KEY = 'ps_attribution'
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const fresh: Record<string, string> = {}
  for (const f of fields) {
    const v = params.get(f)
    if (v) fresh[f] = v
  }

  try {
    if (Object.keys(fresh).length) {
      sessionStorage.setItem(KEY, JSON.stringify(fresh))
      return fresh
    }
    const stored = sessionStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return fresh
  }
}

export function CheckoutModal({
  open,
  onClose,
  tier = 'starter',
}: {
  open: boolean
  onClose: () => void
  /** Which card was clicked. Starter can still upgrade inside the modal; Pro cannot downgrade. */
  tier?: 'starter' | 'pro'
}) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [upgrade, setUpgrade] = useState(false)
  const [bump, setBump] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // A Starter click can still leave as a Pro sale, every $97 CTA on the site
  // (including the plain "Buy now" nav button) reaches this same modal, so this
  // is the one place that can offer the $200 upgrade regardless of entry point.
  const effectiveTier = tier === 'pro' || upgrade ? 'pro' : 'starter'
  const base = effectiveTier === 'pro' ? PRO_PRICE_VALUE : PRICE_VALUE
  const contentName = effectiveTier === 'pro' ? '$297 Pro Pack' : '$97 10-Creative Pack'
  const total = base + (bump ? BUMP_PRICE_VALUE : 0)

  // InitiateCheckout fires here and ONLY here. BuyButton used to fire its own
  // copy on click, which meant Meta counted two InitiateCheckouts for a single
  // action and every downstream cost-per-IC read half what it really was.
  useEffect(() => {
    if (!open) return
    window.fbq?.('track', 'InitiateCheckout', {
      content_name: contentName,
      currency: 'USD',
      value: base,
    })
  }, [open, contentName, base])

  // Each open is a fresh decision, a Starter click should never inherit an
  // upgrade left checked from a previous visit to the modal.
  useEffect(() => {
    if (open) setUpgrade(false)
  }, [open])

  // Close on Escape, a trapped modal on a paid landing page is a refund request.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Rendered into <body> rather than in place. The navbar sets backdrop-blur,
  // which makes it a containing block for fixed-position descendants, so the
  // modal opened *inside the header strip* instead of over the page. A portal is
  // the only reliable fix: any ancestor with a filter, transform or backdrop
  // filter would trap it the same way.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!open || !mounted) return null

  const valid = email.includes('@')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    const eventId = newEventId('lead')
    window.fbq?.('track', 'Lead', { content_name: contentName }, { eventID: eventId })

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          tier: effectiveTier,
          bump,
          eventId,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
          sourceUrl: window.location.href,
          attribution: getAttribution(),
        }),
      })

      const data = await res.json()

      if (data?.url) {
        window.location.href = data.url
        return
      }
      setError(data?.error ?? 'Something went wrong. Please try again.')
    } catch {
      setError('Could not reach the payment page. Please try again.')
    }
    setSubmitting(false)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b0d] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white">
          Where should we send your <span className="font-poppins-italic text-cyan-300">10 creatives</span>?
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Next step is payment. {`$${base}`} once, then a 2-minute form so we know what to build.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:bg-white/15 focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:bg-white/15 focus:outline-none"
          />
          {tier === 'starter' && (
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-dashed border-purple-400/40 bg-purple-400/5 p-4 text-left">
              <input
                type="checkbox"
                checked={upgrade}
                onChange={(e) => setUpgrade(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-purple-400"
              />
              <span className="text-sm text-gray-300">
                <strong className="text-white">
                  Upgrade to Pro for {`+$${PRO_PRICE_VALUE - PRICE_VALUE}`} (${PRO_PRICE_VALUE} total).
                </strong>{' '}
                Get:
                <ul className="mt-2 space-y-1 pl-4 text-xs text-gray-400 [&>li]:list-disc">
                  {UPGRADE_DELTA.map((row) => (
                    <li key={row.item}>{row.item}</li>
                  ))}
                </ul>
              </span>
            </label>
          )}

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-dashed border-cyan-400/40 bg-cyan-400/5 p-4 text-left">
            <input
              type="checkbox"
              checked={bump}
              onChange={(e) => setBump(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-cyan-400"
            />
            <span className="text-sm text-gray-300">
              <strong className="text-white">
                Yes, add {BUMP_LABEL} for {`$${BUMP_PRICE_VALUE}`}.
              </strong>{' '}
              {BUMP_COPY}
            </span>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={!valid || submitting}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Taking you to checkout…' : `Continue to payment. $${total} →`}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          Secure payment via Stripe. One time. No subscription.
        </p>
      </div>
    </div>,
    document.body
  )
}
