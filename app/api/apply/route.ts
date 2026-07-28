import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

async function sendCapiEvent(email: string, phone: string | undefined, eventId: string) {
  const token = process.env.FACEBOOK_CAPI_TOKEN
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
  if (!token || !pixelId) return
  const hash = (v: string) => crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex')
  try {
    await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: 'website',
          user_data: {
            em: email ? [hash(email)] : [],
            ph: phone ? [hash(phone.replace(/\s/g, ''))] : [],
          },
        }],
      }),
    })
  } catch {}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { business, revenue, spend, timeline, firstName, lastName, email, phone } = body

    // Log the submission as a fallback record
    console.log('Form submission received:', {
      timestamp: new Date().toISOString(),
      business,
      revenue,
      spend,
      timeline,
      firstName,
      lastName,
      email,
      phone,
    })

    // Insert into Supabase if env vars are configured
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { error } = await supabase.from('ce_website_forms').insert({
          business,
          revenue,
          spend,
          timeline,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          source: 'purescale_apply',
        })

        if (error) {
          console.error('Supabase insert error:', error)
        }
      } catch (supabaseError) {
        console.error('Supabase client error:', supabaseError)
      }
    }

    // Fire CAPI Lead event server-side for deduplication with browser pixel
    const eventId = `apply_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    sendCapiEvent(email, phone, eventId).catch(() => {})

    return NextResponse.json(
      {
        success: true,
        message: 'Application received. We will be in touch within 24 hours.',
        eventId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
