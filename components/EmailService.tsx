export function EmailService() {
  const outcomes = [
    {
      metric: 'Lower CPA',
      headline: 'More creative variations = more data = cheaper conversions',
      body: 'When you\'re testing 20-30 creatives a week, you find the 2-3 that convert at half the CPA of everything else. That\'s not luck — it\'s volume. Brands we work with long-term consistently drop CPA 20-40% in the first 90 days because they\'re finally testing at the velocity the auction rewards.',
    },
    {
      metric: 'Protected margins',
      headline: 'Scaling revenue without scaling your cost base',
      body: 'Most agencies push spend until ROAS looks good on paper and margins quietly collapse. We work backwards from your contribution margin — every creative brief, every test, every scale decision is made with profitability as the filter. Higher revenue on the same margin is a business. Higher revenue on shrinking margins is a debt.',
    },
    {
      metric: 'No creative drought',
      headline: 'Fresh creative in your account every single week, not every 6',
      body: 'The pipeline never stops. While your current winners are running, next week\'s challengers are already in production. You stop reacting to fatigue and start staying ahead of it. Your ad account is always fed. Your CPA stays flat. Your competitors wonder why they can\'t catch you.',
    },
    {
      metric: 'You stay in control',
      headline: 'We produce. You approve and scale.',
      body: 'You keep control of budget, audiences, and what goes live. We handle creative strategy, production, and performance analysis. Your media buyer (or ours) has a constant supply of battle-tested creative to work with. No more "we\'re waiting on creative" as an excuse for why spend can\'t scale.',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -right-64 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 -left-64 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
            For brands that want to go further
          </span>
        </div>
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-white mb-4">
            What brands doing £100k+/month <span className="font-poppins-italic">actually need</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The free batch proves we can produce. This is what ongoing production does for your business.
          </p>
        </div>

        <div className="space-y-6">
          {outcomes.map((item, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-shrink-0">
                  <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full text-cyan-300 text-sm font-bold whitespace-nowrap">
                    {item.metric}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">{item.headline}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-gradient-to-br from-white/5 to-blue-950/20 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-3">
            We work with brands spending <span className="font-poppins-italic text-cyan-300">£20k+/month on ads</span>
          </p>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            At that spend level, creative velocity isn&apos;t a nice-to-have — it&apos;s the difference between a brand that compounds and one that plateaus. The free batch is how you find out which side of that line you&apos;re currently on.
          </p>
          <a
            href="#book"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-xl shadow-blue-500/50"
          >
            Start with the free audit →
          </a>
        </div>
      </div>
    </section>
  )
}
