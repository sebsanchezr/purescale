import { redirect } from 'next/navigation'

/**
 * Legacy post-purchase URL.
 *
 * Checkout used to send buyers here, to a page embedding a GoHighLevel form that
 * was never built. /ads/thankyou carries the working intake form, so this now
 * forwards there rather than stranding anyone holding an older link, including
 * any Stripe session created before the success_url changed.
 */
export default async function AdsSuccessRedirect({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams
  redirect(sessionId ? `/ads/thankyou?session_id=${sessionId}` : '/ads/thankyou')
}
