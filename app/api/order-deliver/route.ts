import { NextRequest, NextResponse } from 'next/server'
import { upsertContact } from '@/lib/ghl'

// Marks an order delivered. Key-gated (ADMIN_KEY env). Used by /admin/orders.
//
// Also tags the GHL contact `delivered`, this is the trigger W3/W4/W5/W6/W8
// and the Pro delivery+1 audit-booking email depend on. Without it, marking
// delivered here only ever updated our own status column and every
// downstream GHL workflow stayed dead.
export async function POST(request: NextRequest) {
  try {
    const { id, key } = await request.json()
    if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
    if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 })

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'no db' }, { status: 500 })
    }
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from('ce_website_forms')
      .update({ status: 'delivered' })
      .eq('id', id)
      .select('email')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const email = (data as { email?: string } | null)?.email
    if (email) {
      try {
        await upsertContact({ email, tags: ['delivered'], source: 'PureScale order delivered' })
      } catch (err) {
        console.error('[order-deliver] GHL delivered tag failed', err)
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
