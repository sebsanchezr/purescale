import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { EmailHero } from '@/components/EmailHero'
import { EmailPainPoints } from '@/components/EmailPainPoints'
import { EmailOffer } from '@/components/EmailOffer'
import { SocialProof } from '@/components/SocialProof'
import { Testimonials } from '@/components/Testimonials'
import { EmailService } from '@/components/EmailService'
import { Guarantee } from '@/components/Guarantee'
import { FAQ } from '@/components/FAQ'
import { EmailFinalCTA } from '@/components/EmailFinalCTA'
import { CalEmbed } from '@/components/CalEmbed'

export const metadata: Metadata = {
  title: 'Free Ad Creative Audit - PureScale',
  description: 'We\'ll audit your ad account and build you a free batch of creatives. Book a 20-minute call.',
  robots: 'noindex',
}

export default function EmailPage() {
  return (
    <main className="bg-black">
      <Navbar />

      {/* Top: Identify the pain, make the offer */}
      <EmailHero />
      <EmailPainPoints />
      <EmailOffer />

      {/* Middle: Proof it works */}
      <SocialProof />
      <Testimonials />

      {/* Transition: What this becomes long-term */}
      <EmailService />
      <Guarantee />
      <FAQ />

      {/* Close */}
      <EmailFinalCTA />

      {/* Cal embed */}
      <section id="book" className="py-20 px-4 bg-black border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              Book your <span className="font-poppins-italic text-cyan-300">free audit call</span>
            </h2>
            <p className="text-gray-400">20 minutes. We come prepared. You leave with a roadmap and a free batch incoming.</p>
          </div>
          <CalEmbed />
        </div>
      </section>
    </main>
  )
}
