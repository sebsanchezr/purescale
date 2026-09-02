import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { AugustMarketingTrust } from '@/components/AugustMarketingTrust'
import { CreativeExamples } from '@/components/CreativeExamples'
import { Testimonials } from '@/components/Testimonials'
import { TrialFAQ } from '@/components/TrialFAQ'
import { LegalFooter } from '@/components/LegalFooter'

export const metadata: Metadata = {
  title: '10-Day Creative Trial for £15k+/month Brands - PureScale',
  description:
    'We build your next ten creatives and run them on your account. Beat your current ROAS in 10 days or pay nothing. For ecommerce brands spending £15,000+/month on Meta.',
}

const Orbs = () => (
  <>
    <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
  </>
)

const DAYS = [
  { d: 'Day 0', t: 'Access and control', desc: 'You add us as a Partner on your Meta Business Manager and hand over the ad set we will run in. We pull your current best-performing creative, that becomes the control everything else is built to beat.' },
  { d: 'Day 1-2', t: 'First five creatives launch', desc: 'Five new angles go live in the same ad set, same budget, same targeting. Nothing structural changes. Advantage+ starts learning against the control from hour one.' },
  { d: 'Day 3-5', t: 'Kill rule applied', desc: 'Anything that has burned roughly £75-£170 with at most one purchase gets paused. CTR tells us which angle is working before CPA has even printed, and we build more of that angle next.' },
  { d: 'Day 6-8', t: 'Second and third batches', desc: 'Fresh creatives replace what got killed. By now the account usually has a clear leader. We do not rebalance spend by hand, Advantage+ concentrates it on the winner on its own.' },
  { d: 'Day 9-10', t: 'The read', desc: 'We compare blended ROAS on the ad set across the 10 days against your baseline. If we beat it, you see the numbers and we talk retainer. If we do not, you keep all fifteen creatives and owe nothing.' },
]

const FIT_YES = [
  'Ecommerce brand spending £15,000+ a month on Meta right now',
  'Running the same handful of creatives for six or more weeks straight',
  'CPA has been drifting up with no change in targeting or budget',
  'Willing to grant Partner (Advertiser) access on one ad set for 10 days',
  'Can commit to a 40-minute call before the trial starts',
]

const FIT_NO = [
  'Spending under £15,000 a month on Meta (the $97 pack is built for you instead)',
  'Not able to grant ad account access for the trial window',
  'Looking for a targeting or bidding fix rather than a creative one',
  'Not running paid social yet',
]

export default function TrialPage() {
  return (
    <main className="bg-stone-900">
      <Navbar ctaHref="/trial/apply" ctaLabel="Apply for the Trial →" />

      {/* HOOK */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32">
        <Orbs />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            For ecommerce brands spending £15,000+/month on Meta
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            Your creative is fatigued.{' '}
            <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Your CPA is climbing.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            We build your next ten creatives and run them on your account. If we do not beat
            your current ROAS in 10 days, you pay nothing. Three spots a month, apply then a
            40-minute call.
          </p>

          <div className="mt-10">
            <AugustMarketingTrust />
          </div>

          <div className="mt-10">
            <a
              href="/trial/apply"
              className="inline-flex flex-col items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
            >
              Apply for the Trial →
            </a>
            <p className="mt-3 text-sm text-gray-500">
              Free to apply. No payment, no card, until the trial has already beaten your ROAS.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
            <span><strong className="text-white">10 days.</strong> Never 14.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span><strong className="text-white">Pay nothing</strong> if we do not beat your ROAS</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span><strong className="text-white">3 spots</strong> a month</span>
          </div>
        </div>
      </section>

      {/* MECHANISM: Yeubo case study */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-cyan-300">
            One structure. Creative volume. Kill rules.
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold text-white sm:text-4xl">
            The exact turnaround from a live account.{' '}
            <span className="font-poppins-italic text-cyan-300">Same method, your account.</span>
          </h2>

          <div className="mt-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Week one</p>
                <p className="mt-2 font-poppins-italic text-4xl font-extrabold text-white">£297</p>
                <p className="mt-1 text-sm text-gray-400">per purchase. Same budget, five video ads.</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Week two</p>
                <p className="mt-2 font-poppins-italic text-4xl font-extrabold text-white">£29</p>
                <p className="mt-1 text-sm text-gray-400">per purchase. Same budget, same ad set.</p>
              </div>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-gray-200">
              Yeubo, a kids&apos; supplement brand: week one <strong className="text-white">£297 a purchase</strong>.
              Week two <strong className="text-white">£29</strong>. Same budget, same audience, same ad set.
              Fifteen creatives, one structure, zero guesswork. No targeting change, no bid change,
              no new ad set, the entire turnaround was which creatives were live.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-cyan-300">One structure</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                One ad set, broad targeting, one fixed daily budget. We do not touch it. Every
                change we make is a creative being added or paused, nothing else.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-cyan-300">Creative volume</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Fifteen creatives across the 10 days, shipped in batches, not one hero ad and a
                prayer. Volume is the lever now, not a bigger budget.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-cyan-300">Kill rules</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Anything spending roughly £75-£170 with at most one purchase gets paused within
                three to five days. CTR tells us the winner before CPA has printed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF WALL */}
      <CreativeExamples />

      {/* HOW THE 10 DAYS RUN */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            How the <span className="font-poppins-italic text-cyan-300">10 days</span> run
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
            Day by day, exactly what happens once you are in.
          </p>

          <div className="mt-12 space-y-4">
            {DAYS.map((s, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex-shrink-0">
                  <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-300">
                    {s.d}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR / NOT FOR */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Who this is <span className="font-poppins-italic text-cyan-300">for</span>,
            and who it is not
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
            The floor is stated plainly: <strong className="text-white">£15,000+/month on Meta.</strong>{' '}
            Below that, the ten days are not enough spend for a fair read.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.05] p-8">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/50 text-xs font-bold text-cyan-300"
                >
                  ✓
                </span>
                <p className="font-semibold uppercase tracking-wide text-cyan-300">Good fit</p>
              </div>
              <ul className="mt-5 space-y-3">
                {FIT_YES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                    <span aria-hidden="true" className="mt-0.5 text-cyan-300">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-8">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-bold text-gray-400"
                >
                  ✕
                </span>
                <p className="font-semibold uppercase tracking-wide text-gray-400">Not a fit yet</p>
              </div>
              <ul className="mt-5 space-y-3">
                {FIT_NO.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <span aria-hidden="true" className="mt-0.5 text-gray-500">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-500">
                Under the floor? <a href="/ads" className="text-cyan-300 hover:underline">Get 10 creatives for $97</a>{' '}
                instead, same production engine, no spend commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <Testimonials />

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
              { n: '£297 → £29', l: 'Yeubo, one week to the next', s: 'same budget, same ad set' },
              { n: '$9M → $26M', l: 'Revice Denim', s: '→ $42M on track this year' },
              { n: '10×', l: 'Posh, in 90 days', s: 'from a standing start' },
              { n: '9.3×', l: "L'alingi, GCC + US", s: 'no prior ad history' },
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
        </div>
      </section>

      {/* FAQ */}
      <div className="border-t border-white/10">
        <TrialFAQ />
      </div>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-24">
        <Orbs />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Ten days.
            <br />
            <span className="font-poppins-italic text-cyan-300">Pay nothing if we don&apos;t beat your ROAS.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Apply, then a 40-minute call to confirm the account and the control creative.
            Three spots a month, first come, qualified first served.
          </p>
          <div className="mt-10">
            <a
              href="/trial/apply"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
            >
              Apply for the Trial →
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} PureScale. The 10-day trial is built for ecommerce brands
        spending £15,000+/month on Meta. Under the floor? The $97 pack is built for you instead.
      </footer>
      <LegalFooter />
    </main>
  )
}
