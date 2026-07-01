export function EmailFinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-black via-blue-950/30 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl transform -translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
          Stop reacting to <span className="font-poppins-italic">creative fatigue.</span> Get ahead of it.
        </h2>

        <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
          Every week without fresh creative is a week your competitors are pulling ahead in the auction. You already know you need more. The brief has probably been sitting there for two weeks.
        </p>

        <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto italic">
          We&apos;ll build the first batch for free. No brief to write, no agency to manage, no 2-week wait. You provide the content drive, we handle the rest.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="#book"
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70"
          >
            Get your free creative batch →
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          Takes 20 minutes on a call. Creatives delivered in 5-7 days. <span className="text-gray-300">No commitment required.</span>
        </p>
      </div>
    </section>
  )
}
