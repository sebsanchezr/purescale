import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { CalEmbed } from '@/components/CalEmbed'

export const metadata: Metadata = {
  title: 'Get Free Ad Creatives - PureScale',
  description: 'We\'ll create your first batch of ad creatives for free. Book a call and we\'ll get started.',
  robots: 'noindex',
}

const caseStudies = [
  { brand: 'Revice Denim', result: '$9M → $42M', detail: 'Ad spend scaled from $10k to $250k/month. ROAS held throughout.' },
  { brand: 'L\'Alingi', result: '5x ROAS', detail: 'Two markets simultaneously. No margin compression.' },
  { brand: 'Go Forth Goods', result: '£95k → £240k/month', detail: 'Broke a 6-month plateau in 90 days.' },
]

const faqs = [
  {
    q: 'What do I actually get for free?',
    a: 'A batch of ad creatives built specifically for your brand — UGC-style, statics, or video depending on what we think will perform best for you. No catch. We do this because we\'re confident in what we produce.',
  },
  {
    q: 'Why are you giving creatives away for free?',
    a: 'We\'ve worked with 80+ D2C brands. When founders see what systematic creative production looks like, they want to keep going. The free batch is how we prove it. You\'re under no obligation.',
  },
  {
    q: 'What do you need from me?',
    a: 'Access to your content drive — product shots, brand guidelines, any existing assets. We pull from raw content and build from there. Takes about 10 minutes of your time.',
  },
  {
    q: 'How long does it take to get the creatives?',
    a: 'We discuss your brand on the call, build within 5-7 business days, and send them over ready to launch.',
  },
]

export default function EmailPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold">
              For D2C Brands on Meta &amp; TikTok
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              We&apos;ll create your first
            </span>
            <br />
            <span className="font-poppins-italic bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              ad creatives for free.
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a 20-minute call. We&apos;ll learn your brand, build a batch of creatives, and send them over — no strings attached. If you love what we produce, we can talk about working together.
          </p>
          <a
            href="#book"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-bold text-lg transition-all duration-200 shadow-2xl shadow-blue-500/50"
          >
            Claim your free creatives →
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How it <span className="font-poppins-italic text-cyan-300">works</span>
          </h2>
          <div className="space-y-6">
            {[
              { n: '01', title: 'Book the call', desc: 'Pick a 20-minute slot below. No prep needed — just show up.' },
              { n: '02', title: 'We learn your brand', desc: 'We ask about your audience, product, and what\'s working (or not) in your ads right now.' },
              { n: '03', title: 'We build your creatives', desc: 'Our team produces a batch of ad-ready creatives within 5-7 days. Yours to keep and run, no matter what.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent flex-shrink-0 w-10">
                  {step.n}
                </div>
                <div>
                  <p className="font-bold text-white mb-1">{step.title}</p>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What brands like yours <span className="font-poppins-italic text-cyan-300">have seen</span>
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10">We&apos;ve worked with 80+ D2C brands. Here are three.</p>
          <div className="space-y-4">
            {caseStudies.map((cs, i) => (
              <div key={i} className="flex items-start justify-between bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all gap-4">
                <div>
                  <p className="font-bold text-white">{cs.brand}</p>
                  <p className="text-gray-400 text-sm mt-1">{cs.detail}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{cs.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            <span className="font-poppins-italic">Questions?</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cal embed */}
      <section id="book" className="py-20 px-4 bg-black border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              Book your <span className="font-poppins-italic text-cyan-300">free call</span>
            </h2>
            <p className="text-gray-400">20 minutes. We&apos;ll handle everything after.</p>
          </div>
          <CalEmbed />
        </div>
      </section>

    </main>
  )
}
