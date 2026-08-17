/**
 * GoHighLevel (LeadConnector) API v2 client.
 *
 * Used by the $97 offer funnel to keep the CRM as the single source of truth for
 * contacts, tags and pipeline stage. Every workflow in GHL triggers off the tags
 * written here, so tag names must match the ones configured in the sub-account:
 *
 *   checkout_started  -> W7 abandoned-checkout sequence
 *   purchase_97       -> W1 new-order (receipt + intake request)
 *
 * Docs: https://highlevel.stoplight.io/docs/integrations
 */

const GHL_BASE = 'https://services.leadconnectorhq.com'
const GHL_VERSION = '2021-07-28'

export interface GhlContactInput {
  email: string
  phone?: string
  firstName?: string
  lastName?: string
  tags?: string[]
  source?: string
  customFields?: Record<string, string>
}

function headers() {
  const token = process.env.GHL_API_KEY
  if (!token) throw new Error('GHL_API_KEY is not set')
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

/**
 * Create or update a contact by email. Returns the GHL contact id.
 * Tags are additive in GHL, upserting never removes existing tags.
 */
export async function upsertContact(input: GhlContactInput): Promise<string | null> {
  const locationId = process.env.GHL_LOCATION_ID
  if (!locationId) throw new Error('GHL_LOCATION_ID is not set')

  const body: Record<string, unknown> = {
    locationId,
    email: input.email,
    name: [input.firstName, input.lastName].filter(Boolean).join(' ') || undefined,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    tags: input.tags ?? [],
    source: input.source ?? 'PureScale $97 offer',
  }

  if (input.customFields) {
    body.customFields = Object.entries(input.customFields).map(([key, value]) => ({
      key,
      field_value: value,
    }))
  }

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('[ghl] upsertContact failed', res.status, await res.text())
    return null
  }

  const json = await res.json()
  return json?.contact?.id ?? null
}

/** Look up a contact by email. Returns null if no contact exists yet. */
export async function findContactByEmail(
  email: string
): Promise<{ id: string; tags: string[] } | null> {
  const locationId = process.env.GHL_LOCATION_ID
  if (!locationId) throw new Error('GHL_LOCATION_ID is not set')

  const res = await fetch(
    `${GHL_BASE}/contacts/?locationId=${locationId}&query=${encodeURIComponent(email)}&limit=1`,
    { headers: headers() }
  )
  if (!res.ok) {
    console.error('[ghl] findContactByEmail failed', res.status, await res.text())
    return null
  }
  const json = await res.json()
  const contact = json?.contacts?.[0]
  if (!contact || contact.email?.toLowerCase() !== email.toLowerCase()) return null
  return { id: contact.id, tags: contact.tags ?? [] }
}

/** Add tags to an existing contact (used post-purchase). */
export async function addTags(contactId: string, tags: string[]): Promise<void> {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ tags }),
  })
  if (!res.ok) console.error('[ghl] addTags failed', res.status, await res.text())
}

/**
 * Remove tags from a contact. Used to pull `checkout_started` off a contact once
 * they buy, so the abandoned-checkout sequence stops firing at them.
 */
export async function removeTags(contactId: string, tags: string[]): Promise<void> {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ tags }),
  })
  if (!res.ok) console.error('[ghl] removeTags failed', res.status, await res.text())
}

/**
 * Drop an opportunity into the PureScale Offer pipeline at the "New Order" stage.
 * Safe to skip if the pipeline env vars are not configured yet, the tag-driven
 * workflows still run, this only affects the visual pipeline board.
 */
export async function createOpportunity(params: {
  contactId: string
  name: string
  monetaryValue?: number
}): Promise<string | null> {
  const locationId = process.env.GHL_LOCATION_ID
  const pipelineId = process.env.GHL_PIPELINE_ID
  const stageId = process.env.GHL_STAGE_NEW_ORDER_ID

  if (!pipelineId || !stageId) {
    console.warn('[ghl] pipeline env vars missing, skipping opportunity creation')
    return null
  }

  const res = await fetch(`${GHL_BASE}/opportunities/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      locationId,
      pipelineId,
      pipelineStageId: stageId,
      contactId: params.contactId,
      name: params.name,
      status: 'open',
      monetaryValue: params.monetaryValue ?? 97,
    }),
  })

  if (!res.ok) {
    console.error('[ghl] createOpportunity failed', res.status, await res.text())
    return null
  }

  const json = await res.json()
  return json?.opportunity?.id ?? null
}
