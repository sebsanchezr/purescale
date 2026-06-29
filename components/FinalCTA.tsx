export function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-black via-blue-950/30 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl transform -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
          <span className="font-poppins-italic">If creative fatigue</span> is killing your ROAS, let&apos;s talk.
        </h2>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto italic">
          We work with $1M-$10M+ brands where margins matter. If that&apos;s you, apply below. We&apos;ll spend 20 minutes analyzing your account and tell you exactly what we&apos;d do.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="/apply"
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70"
          >
            Apply for Partnership
          </a>
          <a
            href="/apply"
            className="px-10 py-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 font-semibold text-lg transition-all duration-200 backdrop-blur-md"
          >
            Schedule a Call
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          We&apos;re selective about partnerships. We take on 3-4 new brands per quarter. <span className="text-gray-300 font-semibold">If you&apos;re consistently hitting profitability targets and ROAS is your bottleneck, we probably should work together.</span>
        </p>
      </div>
    </section>
  )
}
