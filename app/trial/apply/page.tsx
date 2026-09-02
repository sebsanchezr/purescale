import type { Metadata } from 'next'
import { TrialApplyForm } from '@/components/TrialApplyForm'
import { LegalFooter } from '@/components/LegalFooter'

export const metadata: Metadata = {
  title: 'Apply for the 10-Day Trial - PureScale',
  description:
    'Apply for the risk-reversed 10-day creative trial. For ecommerce brands spending £15,000+/month on Meta. Beat your current ROAS in 10 days or pay nothing.',
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
