import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { OrderConfirm } from '@/components/OrderConfirm'

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

        <p className="mt-10 text-sm text-gray-500">
          Questions? Reply to your receipt email and we&apos;ll jump on it.
        </p>
      </div>
    </main>
  )
}
