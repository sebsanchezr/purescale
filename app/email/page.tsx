import { redirect } from 'next/navigation'

/**
 * Legacy URL. /email's content is now the homepage ("/") as of 30 Jul 2026.
 * Forwards anyone holding an old link (sent emails, ScaledMail redirects not
 * yet updated) rather than stranding them on a 404.
 */
export default function EmailRedirect() {
  redirect('/')
}
