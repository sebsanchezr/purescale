import { BuyButton } from './BuyButton'

/**
 * Mid-page mechanism section, sitting between "how it works" and the proof.
 *
 * A bare CTA here would have been a wasted slot. The agency market is a stage 4
 * to 5 sophistication niche: buyers have heard every version of "we make better
 * ads", so louder claims do nothing and only a credible *mechanism* moves them.
 * This section explains why creative volume is the lever on Meta now, which is
 * the reasoning that makes a $97 pack of ten look obvious rather than cheap.
 *
 * It also does the qualifying work the ad copy cannot: someone who reads this and
 * agrees is a retainer prospect, not just a $97 buyer.
 */

const POINTS = [
  {
    n: '01',
    t: 'Targeting stopped being the lever',
    d: "Broad plus Advantage+ now beats hand-picked interests in most accounts. Meta already knows who your buyer is. What it needs from you is more things to show them.",
  },
  {
    n: '02',
    t: 'Creative is the targeting',
    d: 'Every new angle you upload is a new audience test. Ten creatives is ten shots at finding the message that unlocks a segment you were never going to find by ticking a box.',
  },
  {
    n: '03',
    t: 'Ads expire faster than they used to',
    d: 'Frequency climbs, CTR sags, CPA drifts up. It shows up in cost weeks before it shows up in revenue, which is why it feels sudden when it lands.',
  },
  {
    n: '04',
    t: 'So the winners just ship more',
    d: 'Not bigger budgets. More angles, more often, killing losers fast. That is the entire difference between the accounts that scale and the ones that plateau.',
  },
]

export function ScalingNow() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-4 py-20">
      <div className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            How scaling actually works now
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Nobody scaled in 2026 by finding a{' '}
            <span className="font-poppins-italic text-cyan-300">better audience</span>
          </h2>
          <p className="mt-5 text-gray-400">
            If your account has stalled, it is almost never the targeting and almost never
            the budget. Here is what actually changed, and why ten fresh angles does more
            for you this week than another round of interest testing.
          </p>

          <div className="mt-8 hidden lg:block">
            <BuyButton
              label="Get My 10 Creatives. $97"
              className="!items-start"
              sub="One business day. You own all ten."
            />
          </div>
        </div>

        <div className="space-y-4">
          {POINTS.map((p) => (
            <div
              key={p.n}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-cyan-400/30"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm font-bold text-cyan-300">{p.n}</span>
                <h3 className="text-lg font-semibold text-white">{p.t}</h3>
              </div>
              <p className="mt-3 pl-10 text-sm leading-relaxed text-gray-400">{p.d}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6">
            <p className="text-gray-300">
              You can build that volume in-house with a designer, a brief and three weeks.
              Or you can have ten of them tomorrow, on your products, for $97, and find out
              this week whether it was ever your targeting.
            </p>
          </div>

          <div className="pt-2 lg:hidden">
            <BuyButton
              label="Get My 10 Creatives. $97"
              sub="One business day. You own all ten."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
