import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { EmailHero } from '@/components/EmailHero'
import { EmailPainPoints } from '@/components/EmailPainPoints'
import { EmailOffer } from '@/components/EmailOffer'
import { SocialProof } from '@/components/SocialProof'
import { Testimonials } from '@/components/Testimonials'
import { EmailService } from '@/components/EmailService'
import { EmailGuarantee } from '@/components/EmailGuarantee'
import { EmailFAQ } from '@/components/EmailFAQ'
import { EmailFinalCTA } from '@/components/EmailFinalCTA'
import { CalEmbed } from '@/components/CalEmbed'
import { CreativeExamples } from '@/components/CreativeExamples'
import { VideoPlayer } from '@/components/VideoPlayer'
import { AugustMarketingTrust } from '@/components/AugustMarketingTrust'
import { LegalFooter } from '@/components/LegalFooter'

// Promoted to the homepage 30 Jul 2026 (was /email). Old homepage archived at
// /legacy-home.
export const metadata: Metadata = {
  title: 'Ad Creative for DTC Brands - PureScale',
  description:
    'Your targeting is fine. Your budget is fine. What\'s killing your CPA is running the same 4 creatives for 6 weeks while your competitors are testing 40.',
}

export default function Home() {
  return (
    <main className="bg-stone-900">
      <Navbar ctaHref="#book" ctaLabel="Book a call →" />

      {/* Top: Identify the pain, make the offer */}
      <EmailHero />

      <AugustMarketingTrust />

      {/* VSL */}
      <section className="px-4 pb-8 bg-stone-900">
        <div className="max-w-3xl mx-auto">
          <VideoPlayer src="/vsl-email.mp4" poster="/vsl-email-poster.jpg" autoPlay={false} />
        </div>
      </section>

      <EmailPainPoints />
      <EmailOffer />
      <CreativeExamples />

      {/* Middle: Proof it works */}
      <SocialProof />
      <Testimonials />

      {/* Transition: What this becomes long-term */}
      <EmailService />
      <EmailGuarantee />
      <EmailFAQ />

      {/* Close */}
      <EmailFinalCTA />

      {/* Cal embed */}
      <section id="book" className="py-20 px-4 bg-stone-900 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              Book a <span className="font-poppins-italic text-cyan-300">call</span>
            </h2>
            <p className="text-gray-400">20 minutes. We come prepared.</p>
          </div>
          <CalEmbed />
        </div>
      </section>
      <LegalFooter />
    </main>
  )
}
