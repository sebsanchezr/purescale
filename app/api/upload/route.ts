/**
 * Intake file upload.
 *
 * The form only accepted a link, so a buyer whose best ad was a file on their
 * desktop had to go and make a Drive link first. That is friction at the exact
 * moment we need the intake finished, since the 24h clock cannot start without it.
 *
 * Files land in the existing `creatives` bucket under purescale-intake/, and the
 * route returns public URLs that get appended to the order.
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BYTES = 25 * 1024 * 1024
const BUCKET = 'creatives'

export async function POST(request: NextRequest) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json({ success: false, error: 'Uploads not configured' }, { status: 503 })
  }

  try {
    const form = await request.formData()
    const files = form.getAll('files').filter((f): f is File => f instanceof File)

    if (!files.length) {
      return NextResponse.json({ success: false, error: 'No files' }, { status: 400 })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)

    const uploaded: string[] = []
    for (const file of files) {
      if (file.size > MAX_BYTES) continue

      // Prefix with time + random so two buyers uploading "ad.jpg" cannot collide.
      const safe = file.name.replace(/[^A-Za-z0-9._-]+/g, '-').slice(-80)
      const path = `purescale-intake/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, Buffer.from(await file.arrayBuffer()), {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        })

      if (error) {
        console.error('[upload] failed', file.name, error.message)
        continue
      }
      uploaded.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl)
    }

    if (!uploaded.length) {
      return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
    }
    return NextResponse.json({ success: true, urls: uploaded })
  } catch (err) {
    console.error('[upload] error', err)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
