import { ApplyForm } from '@/components/ApplyForm'
import type { Metadata } from 'next'
import { LegalFooter } from '@/components/LegalFooter'

export const metadata: Metadata = {
  title: 'Apply - PureScale',
  description: 'Apply for PureScale\'s AI ad creative service.',
}

export default function ApplyPage() {
  return (
    <main className="bg-black min-h-screen">
      <ApplyForm />
      <LegalFooter />
    </main>
  )
}
