'use client'
import { useState } from 'react'

export function EmailFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    {
      q: 'Who do you work with?',
      a: 'We work with brands spending £20k+/month on ads, because below that threshold there isn\'t enough testing velocity to show meaningful results quickly.',
    },
    {
      q: 'What does the call cover?',
      a: 'On the call we go through your current creative, identify exactly where fatigue is costing you CPA, and map out what a proper testing architecture looks like for your brand.',
    },
    {
      q: 'How is this different from what my current agency does?',
      a: 'Most agencies produce 3-5 creatives a month and call it a testing strategy. We run systematic production. 20, 50, 100+ assets per week depending on your budget, with a clear framework for identifying winners, scaling them, and killing underperformers fast. The volume gap is why CPA stays flat or drops instead of climbing.',
    },
    {
      q: 'Do I need to fire my current media buyer or agency?',
      a: 'No. We slot in as the creative production arm. Your current buyer, or ours, runs the account. We just make sure the creative pipeline never runs dry. Most brands keep their existing setup and just add our production layer on top.',
    },
    {
      q: 'What does the paid service cost?',
      a: 'We work with brands doing £100k+/month in revenue. The investment covers both our fee and ad spend, we\'ll map out the specifics on the call based on your current numbers. The short answer: if you\'re reinvesting 20% of revenue back into marketing, our model fits within that budget and protects margins.',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold text-center mb-4 text-white">
          <span className="font-poppins-italic">Questions?</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12 italic">Everything you&apos;re probably wondering</p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 font-semibold flex justify-between items-center text-white hover:bg-white/5"
              >
                <span>{faq.q}</span>
                <span className="text-cyan-400 text-xl flex-shrink-0 ml-4">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-white/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
