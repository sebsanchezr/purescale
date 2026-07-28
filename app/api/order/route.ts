import { NextRequest, NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/offer'
import { encryptSecret, encryptionReady } from '@/lib/crypto'

async function notifyDiscord(o: {
  storeUrl?: string
  bestAdUrl?: string
  email?: string
  notes?: string
  id?: string
  auditRequested?: boolean
  auditAccountId?: string
  auditTokenStored?: boolean
}) {
  const url = process.env.DISCORD_ORDER_WEBHOOK
  if (!url) return
  const tracker = o.id ? `${SITE_URL}/order/${o.id}` : SITE_URL
  // NOTE: the read-only token is NEVER included here, only whether it was stored.
  const auditLine = o.auditRequested
    ? `🔍 Requested · ${o.auditAccountId || 'no account id'} · ${
        o.auditTokenStored ? 'read-only token stored ✅' : 'no token, ask client to send'
      }`
    : ', '
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'PureScale Orders',
        embeds: [
          {
            title: '🟢 New $97 order. 24h clock started',
            url: tracker,
            color: 0x22d3ee,
            fields: [
              { name: 'Store', value: o.storeUrl || '-' },
              { name: 'Best ad', value: o.bestAdUrl || '-' },
              { name: 'Email', value: o.email || '-', inline: true },
              { name: 'Notes', value: o.notes || ', ', inline: true },
              { name: 'Ad account audit', value: auditLine },
              { name: 'Live tracker', value: tracker },
            ],
            footer: { text: 'Mark delivered in /admin/orders when done' },
          },
        ],
      }),
    })
  } catch {}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { storeUrl, bestAdUrl, email, notes, auditRequested, auditAccountId, auditToken } = body

    // Encrypt the read-only token at rest. If no encryption key is configured we
    // refuse to persist it (fail safe) rather than store plaintext.
    let auditTokenEnc: string | null = null
    let auditTokenStored = false
    if (auditRequested && auditToken) {
      if (encryptionReady()) {
        auditTokenEnc = encryptSecret(String(auditToken))
        auditTokenStored = !!auditTokenEnc
      } else {
        console.error('AUDIT_ENC_KEY not set, refusing to store audit token in plaintext')
      }
    }

    let id: string | undefined
    let createdAt: string | undefined

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)
        // Base payload never touches the audit columns, so normal checkout works
        // even before the audit migration runs. Audit fields are added only when
        // the customer opted in.
        const payload: Record<string, unknown> = {
          business: storeUrl,
          revenue: bestAdUrl,
          timeline: notes || null,
          email,
          status: 'in_progress',
          source: 'purescale_97_order',
        }
        if (auditRequested) {
          payload.audit_requested = true
          payload.audit_account_id = auditAccountId || null
          payload.audit_token = auditTokenEnc
        }
        const { data, error } = await supabase
          .from('ce_website_forms')
          .insert(payload)
          .select('id, created_at')
          .single()
        if (error) console.error('Supabase insert error:', error)
        id = (data as { id?: string } | null)?.id
        createdAt = (data as { created_at?: string } | null)?.created_at
      } catch (e) {
        console.error('Supabase client error:', e)
      }
    }

    notifyDiscord({
      storeUrl,
      bestAdUrl,
      email,
      notes,
      id,
      auditRequested: !!auditRequested,
      auditAccountId,
      auditTokenStored,
    }).catch(() => {})

    return NextResponse.json({ success: true, id, createdAt }, { status: 200 })
  } catch (error) {
    console.error('Order intake error:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit' }, { status: 500 })
  }
}
