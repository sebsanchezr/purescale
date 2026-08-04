'use client'

/**
 * The one buy CTA for the $97 offer.
 *
 * Two implementations existed after the branches met: a straight redirect to a
 * Stripe Payment Link, and a two-step modal that captures details first. This
 * keeps the modal, because the Payment Link version cannot capture an email
 * before payment, and most people who reach a checkout never finish it. Without
 * their address those people are simply gone, which is the most expensive gap a
 * $97 funnel can have. The modal also lets Stripe Checkout apply UK VAT, which a
 * Payment Link would not.
 *
 * The visual API (label / className / sub) is kept from the Payment Link version
 * so every existing call site on /ads keeps working untouched.
 */

import { useState } from 'react'
import { CheckoutModal } from './CheckoutModal'
import { GHL_CHECKOUT_URL } from '@/lib/offer'

const DEFAULT_BUTTON =
  'group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300'

export function BuyButton({
  label = 'Get My 10 Creatives. $97',
  className = '',
  sub,
  /** Override the button styling, e.g. the smaller square nav variant. */
  buttonClassName,
  /** Which tier this CTA points at, carried through as ?tier= on the GHL link. */
  tier = 'starter',
}: {
  label?: string
  className?: string
  sub?: string
  buttonClassName?: string
  tier?: 'starter' | 'pro'
}) {
  const [open, setOpen] = useState(false)

  // Once NEXT_PUBLIC_GHL_CHECKOUT_URL is set, every CTA becomes a plain link to
  // the GHL order form instead of opening the Stripe modal. Fire InitiateCheckout
  // here, since CheckoutModal (which used to own that event) is bypassed on this
  // path entirely.
  if (GHL_CHECKOUT_URL) {
    const href = `${GHL_CHECKOUT_URL}${GHL_CHECKOUT_URL.includes('?') ? '&' : '?'}tier=${tier}`
    const go = () => {
      try {
        window.fbq?.('track', 'InitiateCheckout', {
          content_name: tier === 'pro' ? '$297 Pro Pack' : '$97 10-Creative Pack',
          currency: 'USD',
          value: tier === 'pro' ? 297 : 97,
        })
      } catch {}
    }
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <a href={href} onClick={go} className={buttonClassName ?? DEFAULT_BUTTON}>
          {label}
          {!buttonClassName && (
            <span className="transition-transform group-hover:translate-x-1">→</span>
          )}
        </a>
        {sub && <p className="mt-3 text-sm text-gray-400">{sub}</p>}
      </div>
    )
  }

  // No pixel event here. CheckoutModal fires InitiateCheckout when it opens, and
  // firing a second copy from this click handler double-counted every one.
  const start = () => setOpen(true)

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button onClick={start} className={buttonClassName ?? DEFAULT_BUTTON}>
        {label}
        {!buttonClassName && (
          <span className="transition-transform group-hover:translate-x-1">→</span>
        )}
      </button>
      {sub && <p className="mt-3 text-sm text-gray-400">{sub}</p>}
      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
