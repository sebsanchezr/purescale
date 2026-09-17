import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Logo } from '@/components/Logo'
import { BookedConfirm } from '@/components/BookedConfirm'
import { LegalFooter } from '@/components/LegalFooter'

// Cal.com's "redirect on booking" target for the PureScale event type. Kept
// out of the index: it is a post-booking page, not a landing page, and an
// indexed confirmation page ranks for the brand name and confuses everyone.
export const metadata: Metadata = {
  title: "You're booked in. PureScale",
  description: 'Your call is confirmed. What happens between now and then, what to have ready, and who you are speaking with.',
  robots: 'noindex',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-stone-900 pb-20 text-white">
      <div className="mx-auto flex max-w-2xl px-5 pt-8">
        <a href="/" aria-label="PureScale home">
          <Logo />
        </a>
      </div>

      <Suspense fallback={<div className="mx-auto max-w-2xl px-5 pt-20" />}>
        <BookedConfirm />
      </Suspense>

      <LegalFooter />
    </main>
  )
}
