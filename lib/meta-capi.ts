/**
 * Meta Conversions API (server-side events).
 *
 * Every event sent here is deduplicated against the browser pixel by sharing an
 * `eventId` — the browser fires fbq('track', name, {}, {eventID}) with the same
 * value. Without that, Meta counts conversions twice and the CPA we optimise on
 * is wrong.
 *
 * Purchase is fired from the Stripe webhook (never the browser) so iOS/ad-block
 * traffic still reports, and so a conversion can only exist if money moved.
 */

import { createHash } from 'crypto'

const GRAPH_VERSION = 'v21.0'

/** Meta requires SHA-256 of normalised (trimmed, lowercased) PII. */
function hash(value?: string | null): string | undefined {
  if (!value) return undefined
  const normalised = value.trim().toLowerCase()
  if (!normalised) return undefined
  return createHash('sha256').update(normalised).digest('hex')
}

/** Phones must be digits only (no +, spaces or dashes) before hashing. */
function hashPhone(value?: string | null): string | undefined {
  if (!value) return undefined
  const digits = value.replace(/\D/g, '')
  if (!digits) return undefined
  return createHash('sha256').update(digits).digest('hex')
}

export interface CapiUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  /** _fbp cookie — materially improves match quality, pass it through. */
  fbp?: string
  /** _fbc cookie (click id) — the strongest match signal we have. */
  fbc?: string
  clientIp?: string
  userAgent?: string
}

export interface CapiEvent {
  eventName: 'Lead' | 'InitiateCheckout' | 'Purchase' | 'QualifiedCall'
  eventId: string
  eventSourceUrl?: string
  userData: CapiUserData
  customData?: Record<string, unknown>
}

/**
 * Send a single event. Never throws — a tracking failure must not break checkout,
 * so callers can fire-and-forget. Returns true when Meta accepted the event.
 */
export async function sendCapiEvent(event: CapiEvent): Promise<boolean> {
  const pixelId = process.env.META_PIXEL_ID
  const token = process.env.META_CAPI_TOKEN

  if (!pixelId || !token) {
    console.warn('[capi] META_PIXEL_ID / META_CAPI_TOKEN not set — event skipped')
    return false
  }

  const { userData } = event

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        event_source_url: event.eventSourceUrl,
        user_data: {
          em: hash(userData.email),
          ph: hashPhone(userData.phone),
          fn: hash(userData.firstName),
          ln: hash(userData.lastName),
          fbp: userData.fbp,
          fbc: userData.fbc,
          client_ip_address: userData.clientIp,
          client_user_agent: userData.userAgent,
        },
        custom_data: event.customData,
      },
    ],
  }

  // Routes events to Test Events instead of live reporting when set.
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    if (!res.ok) {
      console.error('[capi] event rejected', event.eventName, res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('[capi] event failed', event.eventName, err)
    return false
  }
}
