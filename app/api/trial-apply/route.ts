/**
 * /trial application intake.
 *
 * Every application is forwarded into August OS (owns the funnel_applications
 * table and the agency_ads_review workflow, see AUGUST_OS_V4_1_MASTER.md wave 6)
 * so a human reviews qualified applications before the call is booked. That
 * forward is fire-and-forget: if the OS is down, unreachable, or the shared
 * secret is not set yet, the applicant still gets a success response and the
 * submission still lands in the logs. Losing a lead to a webhook outage is
 * worse than double-handling one that arrives twice.
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendCapiEvent } from '@/lib/meta-capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OS_WEBHOOK_URL = 'https://augustosv3.vercel.app/api/webhooks/funnel-application'

interface TrialApplyBody {
  name?: string
  email?: string
  company?: string
  vertical?: string
  website?: string
  monthlySpend?: string
  revenue?: string
  problem?: string
  qualified?: boolean
  eventId?: string
  fbp?: string
  fbc?: string
}

async function notifyOs(payload: Record<string, unknown>): Promise<void> {
  const secret = process.env.FUNNEL_WEBHOOK_SECRET
  if (!secret) {
    console.warn('[trial-apply] FUNNEL_WEBHOOK_SECRET not set, OS not notified', payload)
    return
  }
  try {
    const res = await fetch(OS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-funnel-secret': secret,
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('[trial-apply] OS webhook rejected', res.status, await res.text().catch(() => ''))
    }
  } catch (err) {
    console.error('[trial-apply] OS webhook unreachable', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TrialApplyBody
    const {
      name,
      email,
      company,
      vertical,
      website,
      monthlySpend,
      revenue,
      problem,
      qualified,
      eventId,
      fbp,
      fbc,
    } = body

    if (!name || !email || !company) {
      return NextResponse.json(
        { success: false, error: 'Name, email and company are required' },
        { status: 400 }
      )
    }

    console.log('[trial-apply] submission received', {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      vertical,
      website,
      monthlySpend,
      revenue,
      problem,
      qualified: !!qualified,
    })

    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const userAgent = request.headers.get('user-agent') ?? undefined

    // Lead event only fires for applications that clear the $25k/month floor.
    // Firing it for every submission would tell Meta's optimiser that
    // under-floor traffic is what a "qualified" lead looks like.
    if (qualified) {
      const id = eventId ?? `trial_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      void sendCapiEvent({
        eventName: 'Lead',
        eventId: id,
        eventSourceUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://purescale.co'}/trial/apply`,
        userData: { email, firstName: name, fbp, fbc, clientIp, userAgent },
        customData: { content_name: '14-Day Creative Trial', monthly_spend: monthlySpend },
      })
    }

    void notifyOs({
      source: 'purescale_trial',
      name,
      email,
      company,
      vertical,
      website,
      monthly_meta_spend: monthlySpend,
      revenue_bracket: revenue,
      biggest_problem: problem,
      qualified: !!qualified,
      submitted_at: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, qualified: !!qualified },
      { status: 200 }
    )
  } catch (error) {
    console.error('[trial-apply] submission error', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
