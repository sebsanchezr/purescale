'use client'

/**
 * Two-step checkout for the $97 offer.
 *
 * Step 1 captures name/email/phone into GHL before Stripe ever loads. That single
 * decision is what makes abandoned-checkout recovery possible — a one-click jump
 * straight to Stripe would convert marginally better on the day and lose every
 * person who hesitates.
 *
 * Pixel events fire browser-side with an eventID that the server reuses for the
 * CAPI copy, so Meta counts each conversion once.
 */

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Read a first-party cookie (used for _fbp / _fbc match quality). */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[2]) : undefined
}

function newEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    window.fbq?.('track', 'InitiateCheckout', {
      content_name: '$97 10-Creative Pack',
      currency: 'USD',
      value: 97,
    })
  }, [open])

  // Close on Escape — a trapped modal on a paid landing page is a refund request.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const valid = email.includes('@') && phone.replace(/\D/g, '').length >= 7

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    const eventId = newEventId('lead')
    window.fbq?.('track', 'Lead', { content_name: '$97 10-Creative Pack' }, { eventID: eventId })

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          eventId,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
          sourceUrl: window.location.href,
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8 overflow-y-auto"
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
          Next step is payment — $97 once, then a 2-minute form so we know what to build.
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
          <input
            type="tel"
            required
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:bg-white/15 focus:outline-none"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={!valid || submitting}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Taking you to checkout…' : 'Continue to payment — $97 →'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          Secure payment via Stripe. One time. No subscription.
        </p>
      </div>
    </div>
  )
}
