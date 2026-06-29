import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { business, revenue, spend, timeline, firstName, lastName, email, phone } = body

    // Log the submission (for now)
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

    // TODO: Send email via Resend or similar service
    // For now, just return success

    return NextResponse.json(
      {
        success: true,
        message: 'Application received. We will be in touch within 24 hours.',
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
