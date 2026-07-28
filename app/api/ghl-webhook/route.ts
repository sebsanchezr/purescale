/**
 * Inbound webhook from GoHighLevel. One endpoint, two jobs, switched on `type`:
 *
 *   type: "intake"         — buyer submitted the intake form (store URL + best ad).
 *                            Queues an `offer_orders` row that the Mac fulfilment
 *                            worker claims. This is where the 24h SLA clock starts.
 *
 *   type: "qualified_call" — buyer booked a strategy call AND passed the qualifying
 *                            questions. Fires a QualifiedCall CAPI event so Meta
 *                            optimises toward buyers who become retainer prospects,
 *                            not just anyone who books. Unqualified bookings are
 *                            filtered inside the GHL workflow and never reach here.
 *
 * Auth: shared secret in the `x-webhook-secret` header (set it in the GHL webhook
 * action). Without GHL_WEBHOOK_SECRET set, the route refuses to run.
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendCapiEvent } from '@/lib/meta-capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Insert a row via the Supabase REST API — avoids pulling in the JS SDK. */
async function insertOfferOrder(row: Record<string, unknown>): Promise<boolean> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    console.error('[ghl-webhook] Supabase env not set — order NOT queued', row)
    return false
  }

  const res = await fetch(`${url}/rest/v1/offer_orders`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    console.error('[ghl-webhook] offer_orders insert failed', res.status, await res.text())
    return false
  }
  return true
}

export async function POST(request: NextRequest) {
  const expected = process.env.GHL_WEBHOOK_SECRET
  if (!expected) {
    console.error('[ghl-webhook] GHL_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }
  if (request.headers.get('x-webhook-secret') !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, string | undefined>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const type = body.type ?? 'intake'

  if (type === 'qualified_call') {
    await sendCapiEvent({
      eventName: 'QualifiedCall',
      // GHL appointment id keeps this idempotent if the workflow re-fires.
      eventId: body.appointment_id ?? `qcall_${body.email}_${Date.now()}`,
      userData: {
        email: body.email,
        phone: body.phone,
        firstName: body.first_name,
        lastName: body.last_name,
      },
      customData: {
        content_name: 'Strategy call booked (qualified)',
        monthly_ad_spend: body.monthly_ad_spend,
      },
    })
    return NextResponse.json({ received: true })
  }

  if (type === 'intake') {
    const queued = await insertOfferOrder({
      brand_name: body.brand_name ?? body.store_url ?? 'Unknown brand',
      contact_name: [body.first_name, body.last_name].filter(Boolean).join(' ') || null,
      contact_email: body.email ?? null,
      contact_phone: body.phone ?? null,
      ghl_contact_id: body.contact_id ?? null,
      store_url: body.store_url ?? null,
      best_ad_url: body.best_ad_url ?? null,
      product_focus: body.product_focus ?? null,
      monthly_ad_spend: body.monthly_ad_spend ?? null,
      notes: body.notes ?? null,
      status: 'pending',
    })

    return NextResponse.json(
      { received: true, queued },
      { status: queued ? 200 : 500 }
    )
  }

  return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 })
}
