import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { AugustMarketingTrust } from '@/components/AugustMarketingTrust'
import { CreativeExamples } from '@/components/CreativeExamples'
import { Testimonials } from '@/components/Testimonials'
import { TrialFAQ } from '@/components/TrialFAQ'
import { LegalFooter } from '@/components/LegalFooter'

export const metadata: Metadata = {
  title: '14-Day Creative Trial for $25k+/month Advertisers - PureScale',
  description:
    'We ship 15 creatives into your account and beat your current return on ad spend in 14 days, or you pay nothing. For advertisers spending $25,000+/month on Meta.',
}

const Orbs = () => (
  <>
    <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
  </>
)

const MOMENT_CARDS = [
  'Your best performing ad launched months ago and nothing since has come close.',
  'One creative is taking the majority of the spend and there is nothing queued behind it.',
  'A batch takes your editor nine days, so by the time it lands the winner has already fatigued.',
  'Every new angle is a guess, because nobody has read the account log to see what actually moved.',
]

const RULES = [
  {
    t: 'We never touch the structure',
    body: 'One ad set, broad, one fixed daily budget. In the turnaround above there was not a single budget change, targeting change or new ad set. Every change was a creative going live or getting paused. If your account is being rebuilt every fortnight, that is the problem.',
  },
  {
    t: 'Volume is the only lever we pull',
    body: '15 creatives in 14 days, shipped in batches of three to five, not one hero ad and a hope. Meta will find the winner if you give it something to find. Most accounts starve it.',
  },
  {
    t: 'We kill fast and build more of what works',
    body: 'Anything burning real spend with nothing to show gets paused inside three to five days. Click through rate tells us which angle has legs about three days before cost per purchase confirms it, so the next batch is already variations of the winner.',
  },
]

const HOLD = [
  '15 production ready creatives. Yours, from the day they are made, win or lose.',
  'The angle that worked and the data showing why it worked.',
  'A written read on why your existing creative stalled.',
  'If we did not beat the control, an invoice for nothing.',
]

const FIT_YES = [
  'Spending $25,000 a month or more on Meta',
  'Creative is the bottleneck, not your offer, your landing page or your targeting',
  'Your conversion event fires at least 100 times in a fortnight',
  'You can grant Partner access to one ad set inside 48 hours',
]

const FIT_NO = [
  'Spending under $25,000 a month. There is not enough volume in 14 days for an honest read',
  'Looking for a targeting or bidding fix rather than a creative one',
  'Cannot give access to the ad account',
  'Not running paid social yet',
]

export default function TrialPage() {
  return (
    <main className="bg-stone-900">
      <Navbar ctaHref="/trial/apply" ctaLabel="Apply for the trial" />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32">
        <Orbs />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            For advertisers spending $25k+ a month on Meta
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            One ad is carrying most of your spend.{' '}
            <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              You already know what happens when it dies.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            We ship 15 creatives into your account over 14 days and beat your current return on
            ad spend. If we miss, you pay nothing and you keep all 15.
          </p>

          <div className="mt-10">
            <AugustMarketingTrust />
          </div>

          <div className="mt-10">
            <a
              href="/trial/apply"
              className="inline-flex flex-col items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
            >
              Apply for the trial
            </a>
            <p className="mt-3 text-sm text-gray-500">
              Free to apply. No card. Three accounts a month.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
            <span className="text-white font-semibold">15 creatives in 14 days</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-white font-semibold">You keep them either way</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-white font-semibold">Partner access to one ad set</span>
          </div>
        </div>
      </section>

      {/* THE MOMENT */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            You are not short of budget.{' '}
            <span className="font-poppins-italic text-cyan-300">You are short of bench.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-400">
            Every account we open looks the same way by the time someone calls us.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {MOMENT_CARDS.map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm leading-relaxed text-gray-200">{c}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-lg font-semibold text-white">
            None of that is a targeting problem. Changing the audience will not fix it.
          </p>
        </div>
      </section>

      {/* BEFORE AND AFTER */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-cyan-300">
            One account, two weeks apart
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold text-white sm:text-4xl">
            The same budget.{' '}
            <span className="font-poppins-italic text-cyan-300">The same ad set. The same audience.</span>
          </h2>

          <div className="mt-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-8 sm:p-10">
            <div className="grid gap-8 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div>
                <span className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Before
                </span>
                <p className="mt-4 text-sm text-gray-500">17 to 23 August</p>
                <p className="mt-2 font-poppins-italic text-4xl font-extrabold text-gray-400">$297</p>
                <p className="mt-1 text-sm text-gray-500">per purchase</p>
                <ul className="mt-4 space-y-1 text-sm text-gray-500">
                  <li>5 video ads</li>
                  <li>1 purchase in 7 days</li>
                </ul>
              </div>
              <div className="pt-8 sm:pl-8 sm:pt-0">
                <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-300">
                  After
                </span>
                <p className="mt-4 text-sm text-gray-400">24 to 31 August</p>
                <p className="mt-2 font-poppins-italic text-4xl font-extrabold text-white">$29</p>
                <p className="mt-1 text-sm text-gray-400">per purchase</p>
                <ul className="mt-4 space-y-1 text-sm text-gray-300">
                  <li>15 creatives, mostly long copy statics</li>
                  <li>15 purchases in 8 days</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-lg leading-relaxed text-gray-200">
                Ten times cheaper per purchase. No budget change, no targeting change, no bid
                change, no new ad set. The only thing that changed was which creatives were live.
              </p>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Yeubo, a childrens supplement brand. Numbers taken from the account, not a case study
            deck.
          </p>
        </div>
      </section>

      {/* MECHANISM */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-cyan-300">
            How
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold text-white sm:text-4xl">
            Three rules.{' '}
            <span className="font-poppins-italic text-cyan-300">That is the whole method.</span>
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {RULES.map((r, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold text-cyan-300">{r.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF WALL */}
      <CreativeExamples />

      {/* WHAT YOU HOLD AT THE END */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            What you have on{' '}
            <span className="font-poppins-italic text-cyan-300">day 15, either way</span>
          </h2>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
            <ul className="space-y-4">
              {HOLD.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-200">
                  <span aria-hidden="true" className="mt-0.5 text-cyan-300">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* THE CONTROL */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border-2 border-cyan-400/40 bg-cyan-400/[0.05] p-8 text-center sm:p-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              We write the number down{' '}
              <span className="font-poppins-italic text-cyan-300">before we start</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-200">
              Before day zero we agree the control in writing: your trailing 30 day blended
              return on ad spend on the ad set we are running in. We beat that number across the
              14 days or you pay nothing. It is signed before we touch anything, so there is
              nothing to argue about on day 15.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm font-semibold text-gray-400">
              Most agencies keep this vague on purpose. We would rather lose the deal than win the
              argument.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR / NOT FOR */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Who this <span className="font-poppins-italic text-cyan-300">works for</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
            The method does not care what you sell. It cares that you spend enough for a clean
            read and that creative is genuinely what is holding you back.
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
                <p className="font-semibold uppercase tracking-wide text-cyan-300">A fit</p>
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
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">
            Ecommerce, information products, coaching, apps, lead generation. We have run all of
            them. The example above is ecommerce because that is the account we can show you
            numbers from.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-500">
            Under the floor?{' '}
            <a href="/ads" className="text-cyan-300 hover:underline">
              Get 15 creatives for $97
            </a>{' '}
            instead, same production engine, no spend commitment.
          </p>
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
              { n: '$297 → $29', l: 'Yeubo, one week to the next', s: 'same budget, same ad set' },
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

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-24">
        <Orbs />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Beat your return on ad spend
            <br />
            <span className="font-poppins-italic text-cyan-300">in 14 days, or pay nothing.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Apply, then a 40 minute call to agree the control and the ad set. Three accounts a
            month, and we take them in the order they qualify.
          </p>
          <div className="mt-10">
            <a
              href="/trial/apply"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
            >
              Apply for the trial
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} PureScale. The 14-day trial is built for advertisers
        spending $25,000+/month on Meta. Beat your return on ad spend in 14 days or pay nothing.
        Under the floor? The $97 pack is built for you instead.
      </footer>
      <LegalFooter />
    </main>
  )
}
