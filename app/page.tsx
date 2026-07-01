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

export default function Home() {
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
    </main>
  )
}
