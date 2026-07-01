import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { EmailHero } from '@/components/EmailHero'
import { VSL } from '@/components/VSL'
import { HowItWorks } from '@/components/HowItWorks'
import { Guarantee } from '@/components/Guarantee'
import { SocialProof } from '@/components/SocialProof'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { EmailFinalCTA } from '@/components/EmailFinalCTA'
import { CalEmbed } from '@/components/CalEmbed'

export const metadata: Metadata = {
  title: 'Get Free Ad Creatives - PureScale',
  description: 'We\'ll create your first batch of ad creatives for free. Book a 20-minute call.',
  robots: 'noindex',
}

export default function EmailPage() {
  return (
    <main className="bg-black">
      <Navbar />
      <EmailHero />
      <VSL />
      <HowItWorks />
      <Guarantee />
      <SocialProof />
      <Testimonials />
      <FAQ />
      <EmailFinalCTA />

      {/* Cal embed at bottom — anchor linked from CTAs */}
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
