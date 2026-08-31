/**
 * Cold-email click attribution.
 *
 * The $97 copy tells people not to reply, just to visit the link. So a buyer
 * produces no reply, and until now produced no signal at all: link tracking is
 * off (it costs deliverability) and the link carried no UTMs, so 2,981 cold
 * emails generated zero measurable clicks and we could not tell a failing email
 * from a failing landing page.
 *
 * Each sequence variant now links to /ads/<code>. This logs the hit and
 * redirects to /ads with UTMs attached, which the existing CheckoutModal
 * attribution chain (sessionStorage -> /api/checkout -> GHL custom fields)
 * already carries all the way to a paid order. Nothing downstream changes.
 *
 * The path stays short and wordless on purpose. It is a plain-text email, so
 * the URL is the visible link text; a query string full of utm_ params in the
 * body reads as bulk mail.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// k = UK campaign, u = US campaign, then step number, then A/B variant.
//
// r and c (added 31 Aug) are the bulk-pool campaigns, role inboxes and
// catch-all. Both were built by copying the UK sequence, so every one of their
// steps still points at a k-code and their clicks land here labelled `uk`:
// treat any UK click number from before 31 Aug as UK plus bulk, not UK alone.
// Only the Q4 variant is separated so far.
//
// q is the Q4 gifting variant, a third step-1 variant added alongside the two
// existing ones rather than replacing either. See 45_add_q4_variant.py.
const CODES: Record<string, { campaign: string; step: number; ab: string }> = {
  k1q: { campaign: 'uk', step: 1, ab: 'q' },
  u1q: { campaign: 'us', step: 1, ab: 'q' },
  r1q: { campaign: 'role', step: 1, ab: 'q' },
  c1q: { campaign: 'catch_all', step: 1, ab: 'q' },
  k1a: { campaign: 'uk', step: 1, ab: 'a' },
  k1b: { campaign: 'uk', step: 1, ab: 'b' },
  k2a: { campaign: 'uk', step: 2, ab: 'a' },
  k2b: { campaign: 'uk', step: 2, ab: 'b' },
  k3a: { campaign: 'uk', step: 3, ab: 'a' },
  k3b: { campaign: 'uk', step: 3, ab: 'b' },
  u1a: { campaign: 'us', step: 1, ab: 'a' },
  u1b: { campaign: 'us', step: 1, ab: 'b' },
  u2a: { campaign: 'us', step: 2, ab: 'a' },
  u2b: { campaign: 'us', step: 2, ab: 'b' },
  u3a: { campaign: 'us', step: 3, ab: 'a' },
  u3b: { campaign: 'us', step: 3, ab: 'b' },
}

// Security scanners in corporate mail gateways fetch every link in an inbound
// message before the human ever sees it. Counting those as clicks would invent
// a click rate out of nothing, which is exactly the failure mode this table
// exists to end. Flagged rather than dropped so the ratio stays auditable.
const BOT = /bot|crawl|spider|slurp|preview|scan|monitor|curl|wget|python-requests|headless|proofpoint|barracuda|mimecast|microsoft|google-safety|facebookexternalhit/i

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ v: string }> }
) {
  const { v } = await context.params
  const code = (v || '').toLowerCase()
  const meta = CODES[code]

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin ?? 'https://purescale.co'

  // An unknown code still lands the prospect on the offer. Losing a sale to a
  // typo in a link would cost more than the missing data point.
  if (!meta) {
    return NextResponse.redirect(`${origin}/ads`, 302)
  }

  const userAgent = request.headers.get('user-agent') ?? ''
  const isBot = BOT.test(userAgent)

  // Logging must never delay or block the redirect. A prospect who clicked is
  // worth more than a row in a table.
  void logVisit({
    variant: code,
    campaign: meta.campaign,
    step: meta.step,
    ab: meta.ab,
    referrer: request.headers.get('referer') ?? null,
    user_agent: userAgent.slice(0, 500),
    ip_hash: hashIp(
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
    ),
    is_bot: isBot,
  }).catch(() => {})

  const target = new URL('/ads', origin)
  target.searchParams.set('utm_source', 'cold_email')
  target.searchParams.set('utm_medium', 'email')
  target.searchParams.set('utm_campaign', meta.campaign)
  target.searchParams.set('utm_content', code)

  return NextResponse.redirect(target.toString(), 302)
}

function hashIp(ip: string): string | null {
  if (!ip) return null
  // Salted so the table cannot be reversed into a list of visitor addresses,
  // while still letting us collapse one person refreshing into one visit.
  const salt = process.env.IP_HASH_SALT ?? 'purescale'
  return createHash('sha256').update(salt + ip).digest('hex').slice(0, 32)
}

async function logVisit(row: Record<string, unknown>): Promise<void> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) return

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(url, key)
  const { error } = await supabase.from('ce_lp_visits').insert(row)
  if (error) console.error('ce_lp_visits insert failed:', error.message)
}
