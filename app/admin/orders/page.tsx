import { AdminDeliverButton } from '@/components/AdminDeliverButton'
import { AuditReveal } from '@/components/AuditReveal'

export const dynamic = 'force-dynamic'
export const metadata = { robots: 'noindex' }

async function getOrders() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return []
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, supabaseKey)
  const base = 'id, email, business, revenue, timeline, status, created_at'
  // Try with audit columns; fall back to base if the migration hasn't run yet.
  const withAudit = await supabase
    .from('ce_website_forms')
    .select(`${base}, audit_requested, audit_account_id`)
    .eq('source', 'purescale_97_order')
    .order('created_at', { ascending: false })
    .limit(100)
  if (!withAudit.error) return (withAudit.data as any[]) || []
  const fallback = await supabase
    .from('ce_website_forms')
    .select(base)
    .eq('source', 'purescale_97_order')
    .order('created_at', { ascending: false })
    .limit(100)
  return (fallback.data as any[]) || []
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { key?: string }
}) {
  const key = searchParams.key || ''
  const authed = !!process.env.ADMIN_KEY && key === process.env.ADMIN_KEY

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-center">
        <div>
          <p className="text-lg font-semibold text-white">Paid orders — locked</p>
          <p className="mt-2 text-sm text-gray-500">
            Open with <code className="text-cyan-300">/admin/orders?key=YOUR_ADMIN_KEY</code>
          </p>
        </div>
      </main>
    )
  }

  const orders = await getOrders()

  return (
    <main className="min-h-screen bg-black px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold text-white">$97 Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} total</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Store</th>
                <th className="px-4 py-3">Best ad</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Audit</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-white/10 text-gray-200">
                  <td className="px-4 py-3 text-gray-400">
                    {o.created_at ? new Date(o.created_at).toLocaleString() : '-'}
                  </td>
                  <td className="max-w-[180px] truncate px-4 py-3">
                    <a href={o.business} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
                      {o.business}
                    </a>
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3">
                    <a href={o.revenue} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
                      {o.revenue}
                    </a>
                  </td>
                  <td className="px-4 py-3">{o.email}</td>
                  <td className="px-4 py-3">
                    {o.audit_requested ? (
                      <AuditReveal id={o.id} adminKey={key} accountId={o.audit_account_id} />
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <AdminDeliverButton id={o.id} adminKey={key} delivered={o.status === 'delivered'} />
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
