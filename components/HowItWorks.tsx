export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-black to-blue-950/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            How We <span className="font-poppins-italic">Scale Your ROAS</span>
          </h2>
          <p className="text-xl text-gray-400 italic">Three phases. Measurable results. No guessing.</p>
        </div>

        {/* Step 1: Diagnose */}
        <div className="mb-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">01</div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-white mb-4">
                Diagnose Your Bottleneck
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We audit your account, understand your margins, and identify exactly why ROAS is declining. Most brands discover creative fatigue is the silent killer - same ads work for 4-6 weeks, then ROAS tanks. We map the real problem.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Systematize */}
        <div className="mb-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">02</div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-white mb-4">
                Build Systematic Production
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We produce a consistent stream of UGC, statics, videos, and carousel variations. No more &quot;hoping one hero creative works.&quot; We test 20+ variations simultaneously across formats, identify winners within days, and kill underperformers immediately. You get fresh creative velocity every week.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Scale & Monitor */}
        <div className="mb-16 bg-gradient-to-br from-blue-950/40 to-cyan-950/40 backdrop-blur-md border border-blue-400/30 rounded-2xl p-10">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">03</div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-white mb-4">
                Scale Winners, Monitor Margins
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Once we identify what converts, we scale it systematically. But here&apos;s what most agencies miss: we watch your contribution margin, not just ROAS. A 4X ROAS on a 25% margin product is different from a 4X on a 50% margin product. We make sure growth doesn&apos;t compress your profitability. You hit your ROAS targets while protecting margins. That&apos;s the whole point.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
