'use client'

/**
 * Drop-in replacement for the `<a href="#buy">` CTAs on /ads.
 *
 * Every buy CTA on the page should render this so the checkout modal is opened
 * from one place — the previous anchors only scrolled the page and could never
 * take money. Usage:
 *
 *   <BuyButton>Get My 10 Creatives — $97 →</BuyButton>
 *   <BuyButton className="...custom...">Start now</BuyButton>
 */

import { useState } from 'react'
import { CheckoutModal } from './CheckoutModal'

const DEFAULT_CLASSES =
  'inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/50'

export function BuyButton({
  children = 'Get My 10 Creatives — $97 →',
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className={className ?? DEFAULT_CLASSES}>
        {children}
      </button>
      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
