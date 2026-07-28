'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { PRICE_VALUE } from '@/lib/offer'

// Fires the Meta Pixel Purchase event when Stripe redirects back with
// ?purchase=success. Set that as the Payment Link's after-payment URL.
export function PurchasePixel() {
  const params = useSearchParams()
  useEffect(() => {
    if (params.get('purchase') === 'success') {
      try {
        window.fbq?.('track', 'Purchase', {
          value: PRICE_VALUE,
          currency: 'USD',
          content_name: '10 Ad Creatives in 24h',
        })
      } catch {}
    }
  }, [params])
  return null
}
