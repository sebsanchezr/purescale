export function EmailOffer() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-black to-blue-950/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-white mb-4">
            Here&apos;s what we&apos;re <span className="font-poppins-italic">offering you</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No agency pitch. No proposal. Just a free look at what your account could be doing.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {[
            {
              step: '01',
              title: 'We audit your ad account',
              body: 'On the call we go through your current creative, identify exactly where fatigue is costing you CPA, and map out what a proper testing architecture looks like for your brand.',
            },
            {
              step: '02',
              title: 'We build your first batch',
              body: 'We produce a set of creatives tailored to your brand — UGC, statics, or video — built to test against your current control ads. Delivered in 5-7 days, ready to launch.',
            },
            {
              step: '03',
              title: 'You run them and see',
              body: 'Take the creatives, run them in your account, and measure against what you were running before. You keep them regardless of what you decide next.',
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
            What we need from you — <span className="font-poppins-italic text-cyan-300">almost nothing</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '📁', text: 'Access to your content drive — product shots, brand assets, any existing UGC' },
              { icon: '🎯', text: 'Your current best-performing ad (we\'ll build to beat it)' },
              { icon: '💬', text: '20 minutes on a call to understand your brand voice and customer' },
              { icon: '✅', text: 'That\'s it. We handle briefs, production, revisions, and delivery.' },
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
            Book the audit call →
          </a>
          <p className="text-gray-500 text-sm mt-3">Free. 20 minutes. No commitment.</p>
        </div>
      </div>
    </section>
  )
}
