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
import { PRICE_VALUE } from '@/lib/offer'

const DEFAULT_BUTTON =
  'group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300'

export function BuyButton({
  label = 'Get My 10 Creatives. $97',
  className = '',
  sub,
  /** Override the button styling, e.g. the smaller square nav variant. */
  buttonClassName,
}: {
  label?: string
  className?: string
  sub?: string
  buttonClassName?: string
}) {
  const [open, setOpen] = useState(false)

  const start = () => {
    // InitiateCheckout fires on intent, before the modal renders, so it counts
    // the same moment the old Payment Link version counted.
    try {
      window.fbq?.('track', 'InitiateCheckout', {
        value: PRICE_VALUE,
        currency: 'USD',
        content_name: '10 Ad Creatives in 24h',
      })
    } catch {}
    setOpen(true)
  }

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
