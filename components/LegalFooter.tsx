import Link from 'next/link'

/**
 * Footer for the /ads page. Meta's ad review looks for reachable terms, privacy and
 * refund links plus a real trading entity on landing pages that take payment, a
 * missing footer is a common cause of "unacceptable business practices" rejections.
 */
export function LegalFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto max-w-4xl text-center text-sm text-gray-500">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/trial" className="hover:text-gray-300">10-Day Trial</Link>
          <Link href="/terms" className="hover:text-gray-300">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
          <Link href="/refunds" className="hover:text-gray-300">Refunds</Link>
          <a href="mailto:hello@purescale.co" className="hover:text-gray-300">Contact</a>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-gray-600">
          PureScale is a trading name of August Marketing Ltd · 5 Castle Court, London
          SE26 4HT, United Kingdom · Registered in England &amp; Wales No. 11508146
          <br />
          Results shown are those achieved by specific clients and are not a guarantee of
          your results.
        </p>
      </div>
    </footer>
  )
}
