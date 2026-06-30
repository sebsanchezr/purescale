import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'You&apos;re booked in - PureScale',
  description: 'Your call is confirmed. Here is everything you need to know before we speak.',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero confirmation */}
      <section className="pt-20 pb-16 px-4 text-center border-b border-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-2xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            You&apos;re <span className="font-poppins-italic bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">booked in</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Check your email for the calendar invite. We&apos;ll speak soon.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-300 text-sm font-semibold">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            20-minute strategy call confirmed
          </div>
        </div>
      </section>

      {/* Pre-call homework — commitment device */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-blue-400/30 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Before the call — <span className="font-poppins-italic text-cyan-300">5 minutes of prep</span>
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Founders who come prepared get 3x more value from the call. Here&apos;s what to have ready:
            </p>
            <ul className="space-y-4">
              {[
                { icon: '📊', text: 'Your last 90 days of Meta/TikTok ad spend and ROAS', sub: 'Screenshot from Ads Manager is fine' },
                { icon: '📉', text: 'Your current creative refresh cadence', sub: 'How often are you rotating new creatives?' },
                { icon: '🎯', text: 'Your target ROAS and current blended ROAS', sub: 'We\'ll identify the gap and show you how to close it' },
                { icon: '💰', text: 'Rough monthly revenue and gross margin', sub: 'Ballpark is fine — this shapes the creative strategy' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.text}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-gray-500 text-sm">
            You don&apos;t need perfect numbers. We just want enough context to give you a real roadmap, not a generic pitch.
          </p>
        </div>
      </section>

      {/* What the call covers */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            What we&apos;ll cover
          </h2>
          <p className="text-gray-400 text-center mb-10 text-sm">This is a working session, not a sales call.</p>

          <div className="space-y-4">
            {[
              { time: 'Min 0-5', title: 'Diagnose your creative situation', desc: 'We look at your current ad fatigue signals, creative cadence, and where ROAS is leaking.' },
              { time: 'Min 5-12', title: 'Build your production roadmap', desc: 'We map out exactly what a 90-day systematic creative programme looks like for your brand — volumes, formats, testing structure.' },
              { time: 'Min 12-18', title: 'ROAS and margin projection', desc: 'Based on your current numbers, we show you what realistic improvement looks like and the unit economics behind it.' },
              { time: 'Min 18-20', title: 'Decision', desc: 'If it makes sense to work together, we talk about next steps. No pressure, no pitch deck.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-blue-400/30 transition-all">
                <div className="flex-shrink-0 text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-2 py-1 h-fit whitespace-nowrap mt-0.5">
                  {item.time}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof — relevant case studies */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Brands like yours, <span className="font-poppins-italic text-cyan-300">already scaling</span>
          </h2>
          <p className="text-gray-400 text-center mb-10 text-sm">D2C brands at your revenue level.</p>

          <div className="space-y-4">
            {[
              {
                brand: 'Revice Denim',
                result: '$9M → $42M revenue',
                detail: 'Scaled ad spend from $10k to $250k/month. ROAS held consistent throughout. Creative fatigue was the ceiling — systematic production broke it.',
                duration: '2.5 year partnership',
              },
              {
                brand: 'L\'Alingi',
                result: '5x ROAS, two markets simultaneously',
                detail: 'Entered GCC + US with zero prior ad history. Market-specific creative frameworks. No margin compression despite aggressive scaling.',
                duration: '2+ year partnership',
              },
              {
                brand: 'Go Forth Goods',
                result: '£95k → £240k/month',
                detail: '50+ new creative assets per week. Broke through a revenue plateau that had stalled for 6 months. Still running 3 years later.',
                duration: '3 year partnership',
              },
            ].map((cs, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-white">{cs.brand}</p>
                    <p className="text-xs text-gray-500">{cs.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{cs.result}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{cs.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About PureScale */}
      <section className="py-16 px-4 bg-black border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Who you&apos;re speaking with
          </h2>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                SS
              </div>
              <div>
                <p className="font-bold text-white">Sebastian Sanchez</p>
                <p className="text-cyan-300 text-sm">Founder, PureScale</p>
                <p className="text-gray-400 text-xs mt-1">Managing $10M+ in annual client ad spend</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              I started PureScale because I kept seeing the same problem: great brands plateauing not because of weak products or bad targeting, but because creative production couldn&apos;t keep up with the testing velocity needed to scale. We built a systematic production model that solves it. We work exclusively with $1M+ D2C brands where margins actually matter.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { stat: '$10M+', label: 'annual ad spend managed' },
              { stat: '80+', label: 'D2C brands served' },
              { stat: '3.8x', label: 'average ROAS sustained' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{s.stat}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reminders + what happens next */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-blue-950/20 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            What happens next
          </h2>
          <div className="space-y-4 text-left max-w-lg mx-auto mb-10">
            {[
              { step: '1', text: 'You\'ll receive a calendar confirmation email with the Zoom link.' },
              { step: '2', text: 'We\'ll send a reminder 24 hours before the call and again 1 hour before.' },
              { step: '3', text: 'We review your application before the call so we already have context.' },
              { step: '4', text: 'The call is 20 minutes. We\'ll be on time. Bring your numbers.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            Questions before the call? Email us at{' '}
            <a href="mailto:seb@puresca1e.com" className="text-cyan-400 hover:underline">seb@puresca1e.com</a>
          </p>
        </div>
      </section>

    </main>
  )
}
