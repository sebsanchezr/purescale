import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Reports the REAL delivered flag for the tracker. Your OS (or /admin/orders)
// sets the order row's `status` to 'delivered'. Everything before that is timed
// client-side. Lookup by order id (preferred) or email.
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  const email = request.nextUrl.searchParams.get('email')
  if (!id && !email) return NextResponse.json({ status: 'in_progress' })

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return NextResponse.json({ status: 'in_progress' })

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    let q = supabase.from('ce_website_forms').select('status').eq('source', 'purescale_97_order')
    q = id ? q.eq('id', id) : q.eq('email', email as string)
    const { data } = await q.order('created_at', { ascending: false }).limit(1).maybeSingle()

    const delivered = (data as { status?: string } | null)?.status === 'delivered'
    return NextResponse.json({ status: delivered ? 'delivered' : 'in_progress' })
  } catch {
    return NextResponse.json({ status: 'in_progress' })
  }
}
