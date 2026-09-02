import Link from 'next/link'
import { Logo } from './Logo'

/**
 * Shared shell for /terms, /privacy and /refunds.
 *
 * These pages are not decoration: Meta's ad review checks for them on commerce
 * landing pages and Stripe requires a published refund policy. They also have to
 * be reachable from the footer of the page running the ads, not just by URL.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <Link href="/ads">
            <Logo />
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated {updated}</p>

        <div className="legal-body mt-10 space-y-6 text-[15px] leading-relaxed text-gray-300">
          {children}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-gray-500">
          <p className="font-semibold text-gray-400">
            PureScale is a trading name of August Marketing Ltd
          </p>
          <p className="mt-1">
            5 Castle Court, London SE26 4HT, United Kingdom
            <br />
            Registered in England &amp; Wales No. 11508146 · VAT No. 413 5379 06
            <br />
            <a href="mailto:hello@purescale.co" className="text-cyan-300 hover:underline">
              hello@purescale.co
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
            <Link href="/refunds" className="hover:text-gray-300">Refunds</Link>
            <Link href="/ads" className="hover:text-gray-300">Back to the offer</Link>
            <Link href="/trial" className="hover:text-gray-300">10-Day Trial</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Section heading used inside legal copy. */
export function LegalH2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-xl font-bold text-white">{children}</h2>
}
