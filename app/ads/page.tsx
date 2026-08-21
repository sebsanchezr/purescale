import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/Navbar'
import { AdsVSL } from '@/components/AdsVSL'
import { BuyButton } from '@/components/BuyButton'
import { AdsFAQ } from '@/components/AdsFAQ'
import { CreativeExamples } from '@/components/CreativeExamples'
import { ScalingNow } from '@/components/ScalingNow'
import { PurchasePixel } from '@/components/PurchasePixel'
import { Testimonials } from '@/components/Testimonials'
import { AugustMarketingTrust } from '@/components/AugustMarketingTrust'
import { AdsCallCta } from '@/components/AdsCallCta'
import {
  VALUE_STACK,
  TOTAL_VALUE,
  PRICE,
  PRO_VALUE_STACK,
  PRO_TOTAL_VALUE,
  PRO_PRICE,
  BUMP_LABEL,
  BUMP_PRICE,
  BUMP_COPY,
} from '@/lib/offer'

export const metadata: Metadata = {
  title: '10 Ad Creatives in 24 Hours for $97 - PureScale',
  description:
    'Ten scroll-stopping ad creatives, built for your brand, delivered in 24 hours for $97. Made to beat what you\'re running now. You own everything.',
  robots: 'noindex',
}

const Orbs = () => (
  <>
    <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
  </>
)

export default function AdsPage() {
  return (
    <main className="bg-stone-900">
      <Suspense fallback={null}>
        <PurchasePixel />
      </Suspense>
      <Navbar ctaBuy ctaLabel="Get 10 Creatives. $97" />

      {/* ── HERO, impulse zone ── */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32">
        <Orbs />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            For businesses spending over $20k a month on paid ads
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            10 scroll-stopping ad creatives.{' '}
            <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              In 24 hours.
            </span>{' '}
            For {PRICE}.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Built for your brand, using your products, engineered to beat what you&apos;re running
            right now. Not a subscription. Not a call. You own every one of them.
          </p>

          <div className="mt-10">
            <AugustMarketingTrust />
          </div>

          <div className="mt-6">
            <AdsVSL />
          </div>

          <div className="mt-10">
            <BuyButton
              label="Get My 10 Creatives. $97"
              sub="Delivered in 24 hours · You own everything · No subscription"
            />
          </div>

          {/* trust bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
            <span><strong className="text-white">$600M+</strong> driven for DTC brands</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span><strong className="text-white">80+</strong> brands</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span><strong className="text-white">24-hour</strong> delivery</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span><strong className="text-white">3.8×</strong> avg ROAS sustained</span>
          </div>
        </div>
      </section>

      {/* ── TIER COMPARISON ── */}
      <section id="buy" className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Pick your batch
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
            Both ship in 24 hours. Both include two private calls with our CEO. Pro adds video,
            native platform cuts, and a live audit of your ad account.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* ── STARTER ── */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Starter</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-poppins-italic text-4xl font-extrabold text-white">{PRICE}</p>
                <p className="text-lg font-semibold text-gray-400 line-through decoration-gray-400/60 decoration-2">
                  {TOTAL_VALUE}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">10 creatives, statics only</p>

              <div className="mt-6 flex-1 space-y-3">
                {VALUE_STACK.map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-cyan-300">✓</span>
                    <span className="text-sm text-gray-300">{row.item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <BuyButton
                  tier="starter"
                  label="Get Starter. $97"
                  sub="One time. No subscription. Keep everything."
                  buttonClassName="w-full justify-center rounded-full border border-white/20 bg-white/5 px-9 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
                />
              </div>
            </div>

            {/* ── PRO ── */}
            <div className="relative flex flex-col rounded-2xl border border-cyan-400/40 bg-cyan-400/5 p-8">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Most brands pick this
              </span>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Pro</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-poppins-italic text-4xl font-extrabold text-white">{PRO_PRICE}</p>
                <p className="text-lg font-semibold text-gray-400 line-through decoration-gray-400/60 decoration-2">
                  {PRO_TOTAL_VALUE}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-400">10 creatives, statics + video, native cuts</p>

              <div className="mt-6 flex-1 space-y-3">
                {PRO_VALUE_STACK.map((row, i) => {
                  const isBonus = 'bonus' in row && row.bonus
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 text-cyan-300">{isBonus ? '★' : '✓'}</span>
                      <span className="text-sm text-gray-200">
                        {isBonus && (
                          <span className="mr-2 rounded bg-cyan-400/15 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                            Included
                          </span>
                        )}
                        {row.item}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-8">
                <BuyButton
                  tier="pro"
                  label="Get Pro. $297"
                  sub="One time. No subscription. Keep everything."
                  buttonClassName="group w-full justify-center inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                />
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-sm text-gray-500">
            At checkout: add <strong className="text-white">{BUMP_LABEL}</strong> for {BUMP_PRICE}.{' '}
            {BUMP_COPY}
          </p>
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-20">
        <Orbs />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Your targeting is fine. Your budget is fine.
            <br />
            <span className="font-poppins-italic text-cyan-300">Your creative is fatigued.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            The brands beating you aren&apos;t outspending you. They&apos;re out-testing you, feeding
            the algorithm fresh creative faster than it can burn out. That&apos;s the whole game now.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '4 ads', l: 'what you\'ve run for the last six weeks straight' },
              { n: '40+', l: 'what the brands beating you tested this month' },
              { n: '↑ CAC', l: 'climbs quietly weeks before your results visibly drop' },
              { n: '$0', l: 'extra budget needed, it was never the spend' },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-blue-400/30"
              >
                <div className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-3xl font-extrabold text-transparent">
                  {s.n}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF WALL ── answers the "fatigued creative" claim visually */}
      <CreativeExamples />

      {/* ── HOW IT WORKS ── */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            From your best ad to ten fresh winners,{' '}
            <span className="font-poppins-italic text-cyan-300">in a day</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { k: '01', t: 'You send', d: 'Your store link and your current best-performing ad. That best ad is the control, everything we build is made to beat it. Takes two minutes.' },
              { k: '02', t: 'We build', d: '10 creatives in 24 hours. UGC-style, statics and hooks, on your brand and products, each testing a different angle. We handle briefs, production, revisions.' },
              { k: '03', t: 'You run', d: 'Upload straight into your ad account and measure against what you were running. You own all 10 outright, forever.' },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <div className="font-poppins-italic text-2xl font-bold text-cyan-300">{s.k}</div>
                <h3 className="mt-3 text-xl font-bold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-400">
            All we need from you: a store link and one ad. We do the rest.
          </p>
        </div>
      </section>

      {/* ── MECHANISM ── earns the mid-page CTA instead of just placing one */}
      <ScalingNow />


      {/* ── VIDEO / TEXT TESTIMONIALS (reused) ── */}
      <Testimonials />

      {/* ── PROOF ── */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-20">
        <Orbs />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-cyan-300">
            Receipts, not theory
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold text-white sm:text-4xl">
            The same engine that&apos;s driven{' '}
            <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              $600M+
            </span>{' '}
            for DTC brands
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '$9M → $26M', l: 'Revice Denim', s: '→ $42M on track this year' },
              { n: '$95k → $240k', l: 'Go Forth Goods', s: '▲ 152% monthly revenue' },
              { n: '10×', l: 'Posh, in 90 days', s: 'from a standing start' },
              { n: '9.3×', l: 'L\'alingi, GCC + US', s: 'no prior ad history' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
                  {c.n}
                </div>
                <p className="mt-3 font-semibold text-white">{c.l}</p>
                <p className="mt-1 text-sm text-gray-500">{c.s}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-400">
            One client account we run: <strong className="text-white">$26.7M gross sales, 15.4M sessions, 1.44% conversion rate</strong> in a single year, off the same creative engine that builds your ten.
          </p>
        </div>
      </section>

      {/* ── RISK REVERSAL ── */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            The math is <span className="font-poppins-italic text-cyan-300">stupid</span> in your favor
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Worst case</p>
              <p className="mt-3 text-lg text-gray-200">
                You&apos;re out <strong className="text-white">$97</strong> and up{' '}
                <strong className="text-white">10 fresh assets</strong> to test, creative you were
                going to have to make anyway.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-8 text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Best case</p>
              <p className="mt-3 text-lg text-gray-200">
                One of them becomes your{' '}
                <strong className="text-white">new winner</strong> and pays for itself on{' '}
                <strong className="text-white">day one</strong>.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <BuyButton sub="You own all 10 either way. Delivered in 24 hours." />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div className="border-t border-white/10">
        <AdsFAQ />
      </div>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-24">
        <Orbs />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Ten creatives. Twenty-four hours.
            <br />
            <span className="font-poppins-italic text-cyan-300">Ninety-seven dollars.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Send your store, get your batch tomorrow, and let one of them become the ad that pays for
            all of it. Let&apos;s go.
          </p>
          <div className="mt-10">
            <BuyButton
              label="Get My 10 Creatives. $97"
              sub="One time · Keep everything · Delivered in 24 hours"
            />
          </div>
        </div>
      </section>

      <AdsCallCta />

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} PureScale. We build creative for anyone buying paid traffic: ecommerce, local service businesses, SaaS and info. If you run ads, we can make yours.
      </footer>
    </main>
  )
}
