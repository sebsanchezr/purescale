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
import { WistiaPlayer } from '@/components/WistiaPlayer'
import { AugustMarketingTrust } from '@/components/AugustMarketingTrust'
import { LegalFooter } from '@/components/LegalFooter'

// Promoted to the homepage 30 Jul 2026 (was /email). Old homepage archived at
// /legacy-home. This page's VSL uses the same working Wistia embed /email always
// had; the old homepage's VSL was a decorative placeholder with no real video.
export const metadata: Metadata = {
  title: 'Free Ad Creative Audit - PureScale',
  description: 'Free sample creative in 24 hours, tested against your current ads. If it doesn\'t beat them, you don\'t pay.',
}

export default function Home() {
  return (
    <main className="bg-stone-900">
      <Navbar ctaHref="#book" ctaLabel="Book Your Free Audit Call →" />

      {/* Top: Identify the pain, make the offer */}
      <EmailHero />

      <AugustMarketingTrust />

      {/* VSL */}
      <section className="px-4 pb-8 bg-stone-900">
        <div className="max-w-3xl mx-auto">
          <WistiaPlayer mediaId="cotigqzwyv" />
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
              Book your <span className="font-poppins-italic text-cyan-300">free audit call</span>
            </h2>
            <p className="text-gray-400">20 minutes. We come prepared. You leave with a roadmap and a free batch incoming.</p>
          </div>
          <CalEmbed />
        </div>
      </section>
      <LegalFooter />
    </main>
  )
}
