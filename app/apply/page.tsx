import { ApplyForm } from '@/components/ApplyForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply - PureScale',
  description: 'Apply for PureScale\'s AI ad creative service. Better ROAS guaranteed in 45 days.',
}

export default function ApplyPage() {
  return (
    <main className="bg-black min-h-screen">
      <ApplyForm />
    </main>
  )
}
