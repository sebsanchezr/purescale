import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { OrderTracker } from '@/components/OrderTracker'

export const metadata: Metadata = {
  title: 'Your order — PureScale',
  robots: 'noindex',
}

export const dynamic = 'force-dynamic'

async function getOrder(id: string) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return null
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data } = await supabase
      .from('ce_website_forms')
      .select('created_at, status, email')
      .eq('id', id)
      .maybeSingle()
    return data as { created_at?: string; status?: string; email?: string } | null
  } catch {
    return null
  }
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id)
  const startTs = order?.created_at ? new Date(order.created_at).getTime() : Date.now()
  const delivered = order?.status === 'delivered'

  return (
    <main className="min-h-screen bg-black px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Order confirmed
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
            We&apos;re{' '}
            <span className="font-poppins-italic bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              building your creatives
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-gray-300">
            Bookmark this page — it updates live as your 10 creatives move through production.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
          <OrderTracker startTs={startTs} orderId={params.id} initialDelivered={delivered} />
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Questions? Reply to your receipt email and we&apos;ll jump on it.
        </p>
      </div>
    </main>
  )
}
