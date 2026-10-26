export function EmailOffer() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-stone-900 to-blue-950/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-white mb-4">
            Here&apos;s what we&apos;re <span className="font-poppins-italic">offering you</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No agency pitch. No proposal. This is what ongoing production does for your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {[
            {
              step: '01',
              title: 'Where fatigue is costing you',
              body: 'On the call we go through your current creative, identify exactly where fatigue is costing you CPA, and map out what a proper testing architecture looks like for your brand.',
            },
            {
              step: '02',
              title: 'Fresh creative in your account every single week, not every 6',
              body: 'The pipeline never stops. While your current winners are running, next week\'s challengers are already in production. You stop reacting to fatigue and start staying ahead of it. Your ad account is always fed. Your CPA stays flat. Your competitors wonder why they can\'t catch you.',
            },
            {
              step: '03',
              title: 'We produce. You approve and scale.',
              body: 'You keep control of budget, audiences, and what goes live. We handle creative strategy, production, and performance analysis. Your media buyer (or ours) has a constant supply of battle-tested creative to work with. No more "we\'re waiting on creative" as an excuse for why spend can\'t scale.',
            },
          ].map((item) => (
            <div key={item.step} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-7 hover:border-blue-400/30 transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">{item.step}</div>
              <h3 className="text-white font-bold text-base mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* What we need */}
        <div className="bg-gradient-to-br from-white/5 to-blue-950/20 border border-blue-400/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            What we need from you, <span className="font-poppins-italic text-cyan-300">almost nothing</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🎯', text: 'Your current best-performing ad' },
              { icon: '💬', text: '20 minutes on a call to understand your brand, your customer, and what\'s already working' },
              { icon: '✅', text: 'That\'s it.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#book"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50"
          >
            Book a call →
          </a>
          <p className="text-gray-500 text-sm mt-3">20 minutes. We come prepared.</p>
        </div>

        {/* $97 downsell */}
        <div className="mt-8 max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-300 text-sm mb-4">
            Not ready for a call? <span className="text-white font-semibold">Get 10 ad creatives in 24 hours for $97</span> and put them straight to work, no strings, keep everything.
          </p>
          <a
            href="/ads"
            className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-lg hover:from-emerald-500 hover:to-green-400 font-bold text-sm transition-all duration-200 shadow-xl shadow-emerald-500/30"
          >
            Get My 10 Creatives. $97 →
          </a>
        </div>

        {/* $25k+/month trial */}
        <div className="mt-4 max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-300 text-sm mb-4">
            Already spending <span className="text-white font-semibold">$25,000+/month on Meta</span>?
            We&apos;ll build your next 15 creatives and run them on your account. Beat your current
            return on ad spend in 14 days or pay nothing.
          </p>
          <a
            href="/trial"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-sm transition-all duration-200 shadow-xl shadow-blue-500/30"
          >
            Apply for the 14-Day Trial →
          </a>
        </div>
      </div>
    </section>
  )
}
