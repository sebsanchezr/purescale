'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What happens if you do not beat the control?',
    a: 'You pay us nothing and you keep all 15 creatives. That is the entire downside for you, and it is the reason we are careful about who we take.',
  },
  {
    q: 'Do I have to wait 14 days for the creatives?',
    a: 'No. Your first five are live in the ad set within 24 hours of access. The 14 days is the test window, the time the ads need to spend to give an honest read against your control. The rest of the batch lands across that fortnight, weighted towards whatever is already winning.',
  },
  {
    q: 'Who owns the creatives?',
    a: 'You do, from the moment they are made, whether we win or lose. There is no licence and nothing reverts to us.',
  },
  {
    q: 'Why only three accounts a month?',
    a: 'Because 15 creatives, with the first five live inside 24 hours, is real production work and a real buyer watching the account daily. Three is what we can do at the standard the numbers above came from. When we say the month is full, it is full.',
  },
  {
    q: 'What access do you need?',
    a: 'Partner access on your Meta Business Manager and one ad set to run in. Not your whole account, not your page passwords, not your Shopify.',
  },
  {
    q: 'What is the catch?',
    a: 'We expect to win and we expect you to keep us on afterwards. That is the entire business model. If we lose we have spent two weeks and a production batch finding that out, which is why the floor and the qualifying call exist.',
  },
  {
    q: 'Does this work outside ecommerce?',
    a: 'Yes. The method is about creative volume against a fixed structure, which holds anywhere the conversion event fires often enough. Our published numbers happen to come from an ecommerce account because that is the one we have permission to show.',
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
