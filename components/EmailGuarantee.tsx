export function EmailGuarantee() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-white/5 to-blue-950/20 backdrop-blur-lg border border-white/10 rounded-2xl p-12 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-4xl font-playfair italic text-white mb-2">In Writing</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
          </div>

          <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">For brands that move to our paid service</p>

          <p className="text-xl text-gray-200 mb-8 leading-relaxed font-light">
            100+ creatives per week. Full account management. <span className="text-cyan-300 font-semibold">Measurable ROAS improvement in 60 days</span> — or you don&apos;t pay.
          </p>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            When brands move to our ongoing service — weekly creative production, systematic testing, and paid media management — we put it in writing. If ROAS hasn&apos;t improved measurably by week 8, you pay nothing. We&apos;ve built our business on this because we know the economics work.
          </p>

          <p className="text-sm text-gray-400 italic">
            The free batch shows you what we can produce. The guarantee covers what we deliver when we&apos;re fully embedded in your account.
          </p>

          <div className="pt-10 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-6">Signed,</p>
            <p className="text-4xl font-great-vibes text-gray-200 mb-2">Sebastian Sanchez</p>
            <p className="font-semibold text-white text-sm">Founder, PureScale</p>
          </div>
        </div>
      </div>
    </section>
  )
}
