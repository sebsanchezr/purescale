/**
 * Marks a cold-email landing visit as executed by a real browser.
 *
 * /ads/[v] logs every hit and hands the row id back in a `ps_visit` cookie.
 * Mail-gateway link scanners follow the redirect with a real Chrome user agent
 * but never run the page's JavaScript, so a row that reaches here was opened
 * by a person. The weekly review and the daily monitor count `confirmed`
 * visits only; the raw count is kept for the scanner ratio.
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const id = Number(request.cookies.get('ps_visit')?.value)
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false }, { status: 204 })
  }
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) return NextResponse.json({ ok: false }, { status: 204 })

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(url, key)
  const { error } = await supabase
    .from('ce_lp_visits')
    .update({ confirmed: true })
    .eq('id', id)
    .eq('confirmed', false)
  if (error) console.error('visit confirm failed:', error.message)

  const response = NextResponse.json({ ok: !error })
  // One confirmation per visit. Clearing the cookie stops a refresh from
  // re-posting and keeps the endpoint from being a free write path.
  response.cookies.set('ps_visit', '', { maxAge: 0, path: '/' })
  return response
}
