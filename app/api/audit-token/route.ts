import { NextRequest, NextResponse } from 'next/server'
import { decryptSecret } from '@/lib/crypto'

// Reveals a customer's decrypted read-only Meta token. Key-gated (ADMIN_KEY).
// Only the analyst running the audit hits this, the token is never in the
// order list, Discord, or logs. Revoke after use.
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
      .select('audit_token, audit_account_id')
      .eq('id', id)
      .maybeSingle()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const enc = (data as { audit_token?: string } | null)?.audit_token
    if (!enc) return NextResponse.json({ error: 'no token on file' }, { status: 404 })
    const token = decryptSecret(enc)
    if (!token) {
      return NextResponse.json({ error: 'decrypt failed. AUDIT_ENC_KEY mismatch?' }, { status: 500 })
    }
    return NextResponse.json({
      token,
      accountId: (data as { audit_account_id?: string } | null)?.audit_account_id || null,
    })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
