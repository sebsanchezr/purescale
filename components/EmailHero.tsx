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
            Free Ad Creatives — No Strings Attached
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            We&apos;ll build your
          </span>
          <br />
          <span className="text-5xl sm:text-6xl font-poppins-italic bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            first ads for free.
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          Book a 20-minute call. We learn your brand, build a batch of creatives, and hand them over — ready to run. <span className="text-cyan-300 font-semibold italic">No obligation, no catch.</span>
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-14 py-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">3.8x</div>
            <div className="text-gray-400 text-sm mt-2 italic">avg. ROAS sustained</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">80+</div>
            <div className="text-gray-400 text-sm mt-2 italic">D2C brands served</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">60</div>
            <div className="text-gray-400 text-sm mt-2 italic">day guarantee</div>
          </div>
        </div>

        <a
          href="#book"
          className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70"
        >
          Claim your free creatives →
        </a>
      </div>
    </section>
  )
}
