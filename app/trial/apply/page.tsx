import type { Metadata } from 'next'
import { TrialApplyForm } from '@/components/TrialApplyForm'
import { LegalFooter } from '@/components/LegalFooter'

export const metadata: Metadata = {
  title: 'Apply for the 14-Day Trial - PureScale',
  description:
    'Apply for the risk-reversed creative trial. First creatives live within 24 hours, 15 in total, and we beat your current return on ad spend inside 14 days or you pay nothing. For advertisers spending $25,000+/month on Meta.',
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
