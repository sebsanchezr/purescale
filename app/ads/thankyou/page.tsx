import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { OrderConfirm } from '@/components/OrderConfirm'
import { CreativeExamples } from '@/components/CreativeExamples'
import { LegalFooter } from '@/components/LegalFooter'
import { CEO_CALL_URL, CEO_CALLS_INCLUDED } from '@/lib/offer'

export const metadata: Metadata = {
  title: 'Order confirmed. PureScale',
  description: 'Your 10 ad creatives are in production.',
  robots: 'noindex',
}

export default function AdsThankYouPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-12">
          <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Payment confirmed
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
            You&apos;re in.{' '}
            <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Let&apos;s build.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-gray-300">
            Your 10 scroll-stopping ad creatives are on the way, delivered within 24 hours, built to
            beat what you&apos;re running now.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <OrderConfirm />
        </div>

        {/* ── Reassurance: you made a great call ── */}
        <div className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
            You&apos;re in good hands
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            The same engine that&apos;s driven{' '}
            <span className="font-poppins-italic text-cyan-300">$600M+</span> for DTC brands is now
            building yours
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { n: '$600M+', l: 'revenue driven' },
              { n: '80+', l: 'DTC brands' },
              { n: '3.8×', l: 'avg ROAS sustained' },
              { n: '24 hrs', l: 'to your inbox' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
                  {s.n}
                </div>
                <p className="mt-1 text-xs text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-left">
            {[
              { m: '$9M → $26M → $42M on track', b: 'Revice Denim', d: 'Same creative engine you just bought into. Now their best year yet.' },
              { m: '10× revenue in 90 days', b: 'Posh', d: 'From a standing start. Fresh creative tested faster than fatigue could catch up.' },
              { m: '$95k → $240k / month', b: 'Go Forth Goods', d: 'Broke a revenue plateau by feeding the algorithm new winners every week.' },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div>
                  <p className="font-semibold text-white">{c.b}</p>
                  <p className="mt-1 text-sm text-gray-400">{c.d}</p>
                </div>
                <div className="shrink-0 text-right font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-sm font-bold text-transparent sm:text-base">
                  {c.m}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The calls are part of what they just paid for, so surface them here
            rather than relying on an email. No duration stated: the length is
            whatever the calendar says, and hard-coding it here guarantees the
            two disagree the moment one changes. */}
        <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6">
          <p className="font-semibold text-white">
            Your {CEO_CALLS_INCLUDED} calls with the CEO are included
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-gray-400">
            Private and 1-to-1, on your actual account. Most people take the first while
            their creatives are being built, and save the second for after they&apos;ve run
            them.
          </p>
          <a
            href={CEO_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
          >
            Book my first call →
          </a>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Questions? Reply to your receipt email and we&apos;ll jump on it.
        </p>
      </div>

      {/* Same wall as the landing page: reassurance right after paying is worth
          more than it was before paying. */}
      <div className="mt-16">
        <CreativeExamples />
      </div>

      <LegalFooter />
    </main>
  )
}
