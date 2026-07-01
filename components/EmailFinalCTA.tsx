export function EmailFinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-black via-blue-950/30 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl transform -translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
          Your CPA doesn&apos;t have to keep <span className="font-poppins-italic">climbing.</span>
        </h2>

        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
          You&apos;re already spending the budget. The targeting is already dialled. The only variable you haven&apos;t systematised is creative production — and that&apos;s the one that compounds.
        </p>

        <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto italic">
          Book the call. We&apos;ll audit your account, tell you exactly where creative fatigue is costing you, and build you a free batch to prove we know what we&apos;re doing.
        </p>

        <a
          href="#book"
          className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 mb-6"
        >
          Book the free audit →
        </a>

        <p className="text-gray-500 text-sm">
          We work with brands spending £20k+/month. If that&apos;s you, <span className="text-gray-300 font-semibold">we should talk.</span>
        </p>
      </div>
    </section>
  )
}
