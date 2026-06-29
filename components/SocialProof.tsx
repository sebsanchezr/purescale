import Image from 'next/image'

export function SocialProof() {
  const caseStudies = [
    {
      name: "Shai, Revice Denim",
      metric: "$9M → $42M",
      detail: "sustainable growth",
      duration: "2.5 years",
      description: "Started with 4-6 rotating creatives. Introduced systematic production - weekly rotation of 20+ variations. Ad spend scaled from $10k to $250k/month. The real win: ROAS stayed consistent while scaling, margins stayed protected. Shai's insight: 'It's not about growing faster, it's about growing profitably.'"
    },
    {
      name: "Alia, L'Alingi",
      metric: "5x ROAS",
      detail: "across two markets",
      duration: "2+ years",
      description: "Entered GCC + US simultaneously with zero prior ad history. We built market-specific creative frameworks, tested in parallel. The challenge wasn't budget - it was creative fatigue across culturally distinct audiences. Result: sustained 5x ROAS across both regions without margin compression."
    },
    {
      name: "Katherine, Posh",
      metric: "10x revenue",
      detail: "90-day turnaround",
      duration: "2 years",
      description: "Katherine had strong organic growth but no paid system. Built full-funnel infrastructure: creative production, testing velocity, conversion optimization. Day 1 to day 90 proved the concept. The partnership evolved into systematic production that kept scaling without creative fatigue."
    },
    {
      name: "Go Forth Goods",
      metric: "£95k → £240k",
      detail: "monthly, sustained",
      duration: "3 years",
      description: "Hit a revenue plateau. Root cause: creative fatigue. Introduced 50+ assets per week production engine. Within 90 days, broke through ceiling. Stayed for 3 years because they realized this wasn't a campaign - it was operational infrastructure that protected margins while scaling."
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Proof That <span className="font-poppins-italic">Matters</span>
          </h2>
          <p className="text-xl text-gray-400">Real founders. Real metrics. Real profitability.</p>
        </div>

        {/* Our Own Analytics */}
        <div className="mb-20">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <span>📊</span> Our Own Campaigns
            </h3>
            <p className="text-gray-400 text-sm italic">and 80+ more results from brands we work with</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/50 hover:bg-blue-950/30 transition-all duration-300">
            <Image src="/analytics.png" alt="PureScale analytics dashboard showing growth" width={1200} height={600} className="w-full h-auto" quality={75} />
            <div className="p-6 bg-black/40 backdrop-blur-sm">
              <p className="text-gray-300 text-sm">Live analytics from our own ad accounts. $26.7M gross sales, 15.4M sessions, 1.44% conversion rate - Jan 1 - Dec 31, 2024.</p>
            </div>
          </div>
        </div>

        {/* Case Studies - Line by Line */}
        <div className="space-y-6">
          {caseStudies.map((study, i) => {
            const images = [
              'https://sfycdn.speedsize.com/a251ae65-68d6-477c-b0b5-b876e0109cb9/www.revicedenim.com/cdn/shop/files/Revice-Vice-jeans-Blue-Crast_b65c7994-2f9b-4f2d-8a3f-b13a28a6af90.jpg?v=1749595464&width=1000',
              'https://www.lalingi.com/cdn/shop/files/1_e9033e87-cf1d-4f9f-b92f-aaf4a5446115.png',
              'https://poshmia.com/cdn/shop/files/Desktop_2ae1ed79-d75b-4287-894f-e440adb3e800.jpg?v=1781932839&width=800',
              'https://www.goforthgoods.com/cdn/shop/files/avery-tote-medium-saddle-new-web.jpg'
            ]
            return (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/50 hover:bg-blue-950/30 transition-all duration-300">
              {/* Image with fade overlay */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={images[i]}
                  alt={study.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={300}
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{study.name}</h3>
                    <p className="text-gray-400 text-sm italic">DTC E-commerce Brand</p>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{study.metric}</div>
                    <div className="text-gray-400 text-sm">{study.detail}</div>
                    <div className="text-cyan-300 font-semibold text-xs mt-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full inline-block">{study.duration}</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{study.description}</p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
