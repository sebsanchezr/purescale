'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Is it really just $97?',
    a: "Yes. $97, one time, for 10 ad creatives. No subscription, no upsell required, no card tricks. We run this offer because when the creatives beat your current ads, a lot of brands come back for the full engine. But you're under zero obligation to.",
  },
  {
    q: "What's the catch?",
    a: "There isn't one on the deliverable, you get 10 creatives and you own them outright. The honest framing: $97 doesn't cover our cost to make these. It's a way to prove the quality to brands who'd never take a call cold. If it works for you, the retainer is where we both win.",
  },
  {
    q: 'What exactly do I get for $97?',
    a: '10 ad creatives built for your brand using your products, a mix of UGC-style, statics, and scroll-stopping hooks, each engineered to test a different angle. Delivered in 24 hours, ready to upload. You also get two private 1-to-1 AI creative calls with our CEO, we go through your actual account, your angles and what to test next. Not a group call, not a replay.',
  },
  {
    q: 'How fast is delivery?',
    a: '24 hours from when you send your store link and current best-performing ad. That best ad is your control, everything we build is designed to beat it.',
  },
  {
    q: 'Do I own the creatives?',
    a: 'Completely. You own all 10 outright and can run them on Meta, TikTok, wherever you want, for as long as you want. No license fees, no strings.',
  },
  {
    q: 'What if they don\'t perform?',
    a: "Worst case, you spent $97 and walked away with 10 fresh assets to test against creative you were about to have to make anyway. Best case, one becomes your new winner and pays for itself on day one.",
  },
  {
    q: 'Who is this for?',
    a: 'Brands spending $20k+/month on paid ads whose cost per acquisition is creeping up because the creative has gone stale. Most of our work is ecommerce, but the same engine builds for local service businesses, SaaS and info offers. If you\'re running the same 3 or 4 ads week after week, this is built for you.',
  },
  {
    q: 'What is the free ad account audit?',
    a: "It's an optional bonus. You add us as a partner on your Meta ad account with Analyst access, the standard read-only role, and we send back a teardown: where your spend is leaking, which creatives are fatigued, what to fix first. No tokens, no passwords, no logins, and it takes about a minute in Business Settings. Analyst means we can only look, never spend, edit, pause or post. It's genuinely optional; skip it and you still get all 10 creatives. You revoke access in one click once we deliver.",
  },
  {
    q: 'What happens after?',
    a: 'If the batch performs and you want fresh winners every week plus full creative management, we\'ll show you the retainer. Same engine that\'s driven $600M+ for DTC brands. Totally optional, the 10 creatives are yours either way.',
  },
]

export function AdsFAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-4xl font-bold text-white">
          Questions? <span className="font-poppins-italic text-cyan-300">Answered.</span>
        </h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white">{f.q}</span>
                <span
                  className={`shrink-0 text-cyan-300 transition-transform ${open === i ? 'rotate-45' : ''}`}
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
