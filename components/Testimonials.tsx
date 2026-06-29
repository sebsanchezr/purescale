'use client'

export function Testimonials() {
  const testimonials = [
    {
      initials: "SH",
      color: "bg-blue-500",
      name: "Shai",
      role: "Founder, Revice",
      review: "We had the organic side nailed. Paid media was a blackhole - creative fatigue every 4 weeks. The real shift was treating creative production as an operational function, not an art project. They built a system. ROAS hit 2.5x and stayed there while we scaled. That's not luck.",
    },
    {
      initials: "AL",
      color: "bg-purple-500",
      name: "Alia",
      role: "Founder, L'Alingi",
      review: "Two international markets, different audiences, different cultural sensitivities. Most agencies freeze when there's complexity. These guys built distinct creative frameworks for each market. 5x ROAS across both. The kicker: no margin compression. That's intentional work.",
    },
    {
      initials: "KT",
      color: "bg-pink-500",
      name: "Katherine",
      role: "Founder, Posh",
      review: "Growing organically to a ceiling is the classic problem. Paid media felt chaotic - too many guesses, not enough data. They diagnosed creative fatigue within week one. Built a systematic testing framework. By day 90, we'd 10x'ed revenue. Stayed for 2 years because the model works.",
    },
    {
      initials: "MI",
      color: "bg-cyan-500",
      name: "Mike",
      role: "Founder, Winit",
      review: "I'd burned through three agencies. Each one promised the moon, delivered vanity metrics. Seb's team thinks differently - they ask about margins before they ask about ROAS. Our breakeven ROAS is 2.1x because of product margins. They optimize for that, not for 3x. That's rare.",
    },
    {
      initials: "SP",
      color: "bg-orange-500",
      name: "Sophie",
      role: "Co-founder, Sant & Abel",
      review: "The difference between working with someone who understands ecommerce and someone who just runs ads is like night and day. They understand cash conversion cycles, inventory constraints, returns management. The creative strategy they built accounted for all of it. Not just good creatives - smart creatives.",
    },
  ]

  // Duplicate testimonials for seamless scroll
  const scrollTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            What <span className="font-poppins-italic">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-lg">Real founders. Real results. Real impact.</p>
        </div>

        {/* Row 1 - Scrolling Left */}
        <div className="mb-8 overflow-hidden scroll-track">
          <div className="scroll-left flex gap-6 pb-8" style={{ width: 'fit-content' }}>
            {scrollTestimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex-shrink-0 w-80 hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${t.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-cyan-300 text-xs">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-100 italic text-sm leading-relaxed">&quot;{t.review}&quot;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolling Right (opposite direction) */}
        <div className="overflow-hidden scroll-track">
          <div className="scroll-right flex gap-6" style={{ width: 'fit-content' }}>
            {scrollTestimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex-shrink-0 w-80 hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${t.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-cyan-300 text-xs">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-100 italic text-sm leading-relaxed">&quot;{t.review}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
