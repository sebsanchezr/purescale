'use client'
import { useState } from 'react'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    {
      q: 'What\'s the difference between this and freelancers or hiring in-house?',
      a: 'Freelancers produce one-off creatives; you manage the chaos. In-house teams cost $60-100k+ per year plus benefits, and they\'re locked into one way of thinking. We\'re systematized production with accountability to your ROAS. You don\'t manage the details, we do. And if it doesn\'t work, you don\'t pay.',
    },
    {
      q: 'How is this not just another agency?',
      a: 'Most agencies optimize for billable hours. We optimize for your ROAS. We\'re embedded in your account for the long-term, not chasing the next contract. We understand the difference between ROAS and actual profitability. And we specialize in brands doing $1M-$10M+ where the unit economics matter.',
    },
    {
      q: 'When do we see improvement?',
      a: 'Week 2-3 you\'ll see testing data; we\'ll identify what\'s working. Week 4-6, winners start scaling. By week 8, if ROAS hasn\'t improved measurably, the guarantee kicks in and you don\'t pay. Most clients stay because the improvement is real.',
    },
    {
      q: 'Do you manage my ad accounts or just build creatives?',
      a: 'We can. We manage over $10M annually in client ad spend. Your current media buyer can stay on too if you prefer. Most brands have us handle the full account optimization - creative, testing strategy, and performance management. Ask us on the call what makes sense for your situation.',
    },
    {
      q: 'What\'s the monthly investment?',
      a: 'We work exclusively with brands doing $100k+ monthly revenue. Our minimum overall spend (including our fee + ad spend) is $10k/month. The math: take your monthly revenue, reinvest 20% back into marketing for scaling - that budget covers both our fee and your ad spend while still protecting margins. This gives you enough testing velocity to actually work.',
    },
    {
      q: 'Do I need to produce all the creative assets?',
      a: 'No. That\'s the whole point of our service - we produce everything. What we need from you: organized access to your content drive with product shots, brand guidelines, and messaging angles. We pull from raw content, create variations, test, and scale. You provide the source material; we do the production.',
    },
    {
      q: 'How do you know if creative is actually the problem?',
      a: 'We audit your account in week one. If ROAS is declining on consistent targeting and budget, creative fatigue is almost always the culprit. If your problem is audience targeting or bid strategy, we\'ll tell you upfront - that\'s not our solve. We\'re honest about what we can fix.',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold text-center mb-4 text-white">
          <span className="font-poppins-italic">Questions?</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12 italic">Common objections answered</p>
        
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
