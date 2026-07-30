import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { VSL } from '@/components/VSL'
import { HowItWorks } from '@/components/HowItWorks'
import { Guarantee } from '@/components/Guarantee'
import { SocialProof } from '@/components/SocialProof'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { CalFloatingButton } from '@/components/CalFloatingButton'
import { LegalFooter } from '@/components/LegalFooter'

// Archived 30 Jul 2026: this was the old root homepage ("/"), replaced by the
// /email free-audit page. Kept here, unindexed, in case any copy or layout is
// worth salvaging later. Not linked from anywhere in the live site.
export const metadata: Metadata = {
  title: 'Archived homepage - PureScale',
  robots: 'noindex, nofollow',
}

export default function LegacyHome() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <VSL />
      <HowItWorks />
      <Guarantee />
      <SocialProof />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <CalFloatingButton />
      <LegalFooter />
    </main>
  )
}
