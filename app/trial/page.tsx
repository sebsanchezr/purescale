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

// The objection that actually stops a $25k/month advertiser booking is not
// "does it work", it is "I already have an agency and I am not blowing up my
// account for a stranger". So the page answers that first, in its own section,
// before it argues anything else.
const KEEP = [
  'Your agency, your team, your in-house editor. Nobody gets replaced.',
  'Your campaign structure. We do not rebuild anything.',
  'Your budget. Not a pound more than you spend today.',
  'Your reporting and your meetings. We do not show up in them.',
]

const WE_TOUCH = [
  'One ad set that you choose. Nothing else in the account.',
  'The creatives that run inside it, made by us, 15 of them in 14 days.',
  'A written read on why your current creative stalled.',
  'That is the entire footprint. Partner access, one ad set, 14 days.',
]

// What a buyer actually wants to know before a call: what happens, when, and
// what it costs them in time. A timeline reads faster than three feature cards
// and answers the question the cards did not.
const TIMELINE = [
  {
    when: 'Day 0',
    what: 'One 40 minute call',
    body: 'We agree in writing which ad set we run in and what number we have to beat. You grant Partner access. That is the last meeting you are in.',
  },
  {
    when: 'Days 1 to 3',
    what: 'First five creatives live',
    body: 'Built from your account log, not from a mood board. We read what already worked and what already died before we write a single hook.',
  },
  {
    when: 'Days 4 to 7',
    what: 'We kill and we double down',
    body: 'Anything burning spend with nothing to show is paused. Click through rate shows which angle has legs about three days before cost per purchase confirms it, so batch two is already variations of the leader.',
  },
  {
    when: 'Days 8 to 14',
    what: 'Ten more, weighted to the winner',
    body: 'Volume is the only lever we pull. No budget change, no targeting change, no new ad set. Meta finds the winner when you give it something to find.',
  },
  {
    when: 'Day 15',
    what: 'The number, and your decision',
    body: 'We beat the control or we did not. Either way you keep all 15 creatives, the angle that worked, and the data showing why.',
  },
]

const HOLD = [
  '15 production ready creatives. Yours from the day they are made, win or lose.',
  'The angle that worked, and the data showing why it worked.',
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
            Keep your agency. Give us one ad set. We ship 15 creatives into it over 14 days and
            beat your current return on ad spend, or you pay nothing and keep all 15 anyway.
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

      {/* YOU ARE NOT SWITCHING AGENCIES */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-cyan-300">
            Before anything else
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold text-white sm:text-4xl">
            You are not firing anyone.{' '}
            <span className="font-poppins-italic text-cyan-300">You are borrowing a creative team for a fortnight.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            This is not a pitch to replace your agency. It is one ad set, 14 days, and 15 creatives
            you keep whatever happens. If it works you have a decision to make. If it does not, you
            have lost nothing but the 40 minutes.
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid sm:grid-cols-2">
              <div className="bg-white/[0.02] p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Stays exactly as it is
                </p>
                <ul className="mt-5 space-y-3">
                  {KEEP.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                      <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 bg-cyan-400/[0.06] p-8 sm:border-l sm:border-t-0">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  All we touch
                </p>
                <ul className="mt-5 space-y-3">
                  {WE_TOUCH.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-200">
                      <span aria-hidden="true" className="mt-0.5 text-cyan-300">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold text-white">
            The risk you are being asked to take is Partner access to one ad set.
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

      {/* WHAT HAPPENS, DAY BY DAY */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-cyan-300">
            The whole engagement
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold text-white sm:text-4xl">
            One call, then{' '}
            <span className="font-poppins-italic text-cyan-300">you go back to your day</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            Total time this costs you: 40 minutes on day zero, and reading one message a week.
          </p>

          <ol className="mt-12 space-y-0">
            {TIMELINE.map((step, i) => (
              <li key={step.when} className="relative grid gap-4 pl-8 sm:grid-cols-[130px_1fr] sm:gap-8 sm:pl-10">
                {/* the rail */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[5px] top-3 w-px bg-white/10 ${i === TIMELINE.length - 1 ? 'h-0' : 'h-full'}`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 ${
                    i === TIMELINE.length - 1
                      ? 'border-cyan-300 bg-cyan-300'
                      : 'border-cyan-400/50 bg-stone-900'
                  }`}
                />
                <div className="pb-10">
                  <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">{step.when}</p>
                </div>
                <div className="-mt-[26px] pb-10 sm:mt-0">
                  <p className="font-semibold text-white">{step.what}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT IT COSTS */}
      <section className="relative border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            What it costs,{' '}
            <span className="font-poppins-italic text-cyan-300">stated plainly</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            Nobody books a call to find out the price. So here it is.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">If we miss</p>
              <p className="mt-3 font-poppins-italic text-4xl font-extrabold text-white">$0</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                You keep the 15 creatives and the write up. There is no invoice, no clawback and
                nothing to cancel.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-cyan-400/40 bg-cyan-400/[0.06] p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">If we beat it</p>
              <p className="mt-3 font-poppins-italic text-4xl font-extrabold text-white">$3,000</p>
              <p className="mt-1 text-sm text-cyan-300">a month, month to month</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-200">
                Creative and media buying together, 15 or more new creatives a month, and the same
                three rules that produced the result. Cancel with 30 days notice.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Either way</p>
              <p className="mt-3 font-poppins-italic text-4xl font-extrabold text-white">15</p>
              <p className="mt-1 text-sm text-gray-400">creatives, yours to keep</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Run them with your current team, your current agency, or nobody. They are your
                files from the day they are made.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">
            No setup fee, no minimum term, no percentage of spend.
          </p>
        </div>
      </section>

      {/* PROOF WALL */}
      <CreativeExamples variant="trial" />

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
              Get 10 creatives for $97
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
            Apply, then one 40 minute call. On that call we read your account back to you: which
            creative is carrying your spend, what has fatigued, and what we would ship first. You
            get that read whether or not you take the trial. Three accounts a month, taken in the
            order they qualify.
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
