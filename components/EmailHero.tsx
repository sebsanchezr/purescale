export function EmailHero() {
  return (
    <section className="pt-40 pb-20 px-4 sm:px-6 bg-gradient-to-b from-black via-blue-950/30 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold">
            For D2C Brands Spending £20k+/Month on Ads
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Your ad account is
          </span>
          <br />
          <span className="text-5xl sm:text-6xl font-poppins-italic bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            starving for creative.
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed font-light">
          Your targeting is fine. Your budget is fine. What&apos;s killing your CPA is running the same 4 creatives for 6 weeks while your competitors are testing 40.
        </p>

        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          We&apos;ll audit your account and build you a free batch of creatives to prove it. Book a call, see how they perform, take them with you — no obligation whatsoever.
        </p>

        <a
          href="#book"
          className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 mb-4"
        >
          Get a free creative audit + batch →
        </a>

        <p className="text-gray-500 text-sm">Takes 20 minutes. Zero strings.</p>
      </div>
    </section>
  )
}
