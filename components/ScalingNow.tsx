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
    d: 'Broad beats hand-picked interests in most accounts now. Meta knows your buyer. It needs more to show them.',
  },
  {
    n: '02',
    t: 'Creative is the targeting',
    d: 'Every angle you upload is an audience test. Ten creatives is ten shots at a segment you would never tick a box to find.',
  },
  {
    n: '03',
    t: 'Ads expire faster than they used to',
    d: 'Frequency climbs, CTR sags, CPA drifts. It lands in cost weeks before it lands in revenue.',
  },
  {
    n: '04',
    t: 'So the winners just ship more',
    d: 'Not bigger budgets. More angles, more often, killing losers fast. That is the whole difference.',
  },
]

export function ScalingNow() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-4 py-14">
      <div className="pointer-events-none absolute -right-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
            How scaling actually works now
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl">
            Nobody scaled in 2026 by finding a{' '}
            <span className="font-poppins-italic text-cyan-300">better audience</span>
          </h2>
        </div>

        {/* Two columns of compact rows rather than four full-width cards: the
            stacked version pushed the CTA a screen and a half down the page. */}
        <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {POINTS.map((p) => (
            <div key={p.n} className="flex gap-3">
              <span className="mt-0.5 font-mono text-xs font-bold text-cyan-300">{p.n}</span>
              <div>
                <h3 className="text-sm font-semibold text-white">{p.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6 text-center">
          <p className="mx-auto max-w-2xl text-gray-300">
            Build that volume in-house with a designer, a brief and three weeks. Or have ten
            tomorrow, on your products, for $97, and find out this week whether it was ever
            your targeting.
          </p>
          <div className="mt-6">
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
