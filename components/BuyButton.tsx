'use client'

import { PAYMENT_LINK, PRICE_VALUE } from '@/lib/offer'

export function BuyButton({
  label = 'Get My 10 Creatives — $97',
  className = '',
  sub,
}: {
  label?: string
  className?: string
  sub?: string
}) {
  const go = () => {
    // fire Meta InitiateCheckout, then send them to Stripe
    try {
      window.fbq?.('track', 'InitiateCheckout', {
        value: PRICE_VALUE,
        currency: 'USD',
        content_name: '10 Ad Creatives in 24h',
      })
    } catch {}
    if (PAYMENT_LINK.includes('REPLACE_WITH_YOUR')) {
      // eslint-disable-next-line no-console
      console.warn('Set NEXT_PUBLIC_STRIPE_PAYMENT_LINK or edit lib/offer.ts')
    }
    window.location.href = PAYMENT_LINK
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        onClick={go}
        className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        {label}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
      {sub && <p className="mt-3 text-sm text-gray-400">{sub}</p>}
    </div>
  )
}
