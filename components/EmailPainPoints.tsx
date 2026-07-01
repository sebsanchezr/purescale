export function EmailPainPoints() {
  const pains = [
    {
      stat: '6 weeks',
      headline: 'How long most brands run the same creative before touching it',
      body: 'The algorithm has already moved on. Your CPA has been climbing for weeks. You know something is off but the brief still isn\'t written, the UGC creator still hasn\'t delivered, and the agency is "working on it." This is creative starvation — and it\'s the single biggest reason scaling brands plateau.',
    },
    {
      stat: '3-5',
      headline: 'Active creatives the average £100k/month brand is running',
      body: 'High-performing brands at your revenue level are running 30-50. The gap isn\'t budget — it\'s production. Every creative you\'re not testing is a CPA reduction you\'re not capturing. You can\'t A/B test your way to scale when you only have 4 assets to test with.',
    },
    {
      stat: '2 weeks',
      headline: 'Average agency turnaround — by which point the insight is already outdated',
      body: 'By the time the revisions land and the creative goes live, you\'ve already lost two weeks of testing data. The Meta auction doesn\'t wait. Brands winning at scale aren\'t briefing for next month — they\'re launching new creative every single week, iterating on live performance data in real time.',
    },
    {
      stat: '80%',
      headline: 'Of ad spend wasted on fatigued creative that should have been rotated out',
      body: 'You\'re not losing because of poor targeting or the wrong bidding strategy. You\'re losing because your best creative ran out of gas three weeks ago and nothing replaced it. Every day that budget runs against a fatigued ad is money you\'re burning instead of investing.',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-64 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Why brands at your level <span className="font-poppins-italic">stop scaling</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            It&apos;s almost never the product. It&apos;s almost never the targeting. It&apos;s this.
          </p>
        </div>

        <div className="space-y-6">
          {pains.map((pain, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-blue-400/30 transition-all duration-300 flex gap-8 items-start">
              <div className="flex-shrink-0 text-center w-20">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-none">{pain.stat}</div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-3">{pain.headline}</h3>
                <p className="text-gray-400 leading-relaxed">{pain.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#book"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50"
          >
            See what your pipeline should look like →
          </a>
        </div>
      </div>
    </section>
  )
}
