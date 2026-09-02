'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What if you don’t beat our current ROAS?',
    a: 'You pay nothing. That is the entire structure of the trial, not a footnote to it. We build and run the ten creatives against your current best ad set for 10 days; if the blended ROAS on that spend does not beat what you were already getting, there is no invoice. You keep every creative either way.',
  },
  {
    q: 'Who owns the creatives?',
    a: 'You do, outright, from day one. Whether the trial beats your ROAS or not, the ten creatives are yours to run on any platform, forever. Nothing is licensed back to us and nothing is pulled down if you walk away.',
  },
  {
    q: 'What access do you need to our ad account?',
    a: 'Partner access on your Meta Business Manager, Advertiser role, so we can launch and manage the ten creatives inside your existing campaign structure. We never touch your billing, your other campaigns, or anything outside the ad set we agree on. Access is revocable by you in one click at any point.',
  },
  {
    q: 'Why the £15,000 a month floor?',
    a: 'Below that, ten days is not enough spend for the algorithm to reach a reliable read on fifteen creatives, and the trial stops being a fair test of the method. If you are under the floor, the $97 pack is the right door: same production engine, no spend commitment, no call required.',
  },
  {
    q: 'Why only three spots a month?',
    a: 'Because a real trial means us actually running your account for 10 days, not queuing a template. Three at a time is the number our production and media buying can genuinely hold to the same standard as the account this method was proven on.',
  },
  {
    q: 'Do you touch our targeting or budget?',
    a: 'No. The Yeubo result was built on one ad set, one budget, zero structural changes, for the whole 10 days. We only add and kill creatives. If your account needs a targeting or budget fix, we will tell you on the call, but that is not what the trial tests.',
  },
  {
    q: 'What happens after the 10 days?',
    a: 'If we beat your ROAS, we walk you into the retainer: paid ads plus a weekly creative batch, same engine, ongoing. If we do not, you owe nothing and keep the creatives. Either way there is no auto-renewal and no card held on file.',
  },
  {
    q: 'What do you need from us to start?',
    a: 'Partner access to the ad account, your current top-performing creative as the control, and a short call to confirm the angle. That is the whole intake. We handle briefing, production and launch from there.',
  },
]

export function TrialFAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-4xl font-bold text-white">
          Questions? <span className="font-poppins-italic text-cyan-300">Answered.</span>
        </h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white">{f.q}</span>
                <span
                  className={`shrink-0 text-cyan-300 transition-transform ${open === i ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {open === i && (
                <p className="px-6 pb-6 leading-relaxed text-gray-400">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
