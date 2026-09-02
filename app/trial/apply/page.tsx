import type { Metadata } from 'next'
import { TrialApplyForm } from '@/components/TrialApplyForm'
import { LegalFooter } from '@/components/LegalFooter'

export const metadata: Metadata = {
  title: 'Apply for the 14-Day Trial - PureScale',
  description:
    'Apply for the risk-reversed 14-day creative trial. For advertisers spending $25,000+/month on Meta. Beat your current return on ad spend in 14 days or pay nothing.',
  robots: 'noindex',
}

export default function TrialApplyPage() {
  return (
    <main className="min-h-screen bg-black">
      <TrialApplyForm />
      <LegalFooter />
    </main>
  )
}
