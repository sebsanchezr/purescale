'use client'

/**
 * Cookie consent for the Meta pixel.
 *
 * We advertise to the UK and EU, where firing a marketing pixel before consent is
 * unlawful and against Meta's own business tools terms. This uses Meta's consent
 * mode: the pixel still loads, but holds events until consent is granted.
 *
 * IMPORTANT, pair this with one line in the pixel snippet in app/layout.tsx, placed
 * immediately after fbq('init', ...) and BEFORE the first fbq('track','PageView'):
 *
 *     fbq('consent', 'revoke');
 *
 * Without it there is a race where PageView fires before this component mounts.
 * This component then grants consent on mount for anyone who has already accepted.
 */

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ps_consent'


export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      // Private browsing with storage disabled, treat as undecided, ask again.
    }

    if (stored === 'granted') {
      window.fbq?.('consent', 'grant')
    } else if (stored === 'denied') {
      window.fbq?.('consent', 'revoke')
    } else {
      window.fbq?.('consent', 'revoke')
      setVisible(true)
    }
  }, [])

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied')
    } catch {
      // Choice still applies for this page view even if we cannot remember it.
    }
    window.fbq?.('consent', granted ? 'grant' : 'revoke')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0b0d]/95 px-4 py-4 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-gray-300">
          We use cookies to measure which ads bring people here. Decline and everything on
          this site still works exactly the same.{' '}
          <a href="/privacy" className="text-cyan-300 hover:underline">
            Privacy policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decide(false)}
            className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
          >
            Decline
          </button>
          <button
            onClick={() => decide(true)}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-bold text-white transition-all hover:from-blue-500 hover:to-cyan-400"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
