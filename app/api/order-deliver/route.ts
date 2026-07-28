import { NextRequest, NextResponse } from 'next/server'

// Marks an order delivered. Key-gated (ADMIN_KEY env). Used by /admin/orders.
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
    const { error } = await supabase
      .from('ce_website_forms')
      .update({ status: 'delivered' })
      .eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
