import { Logo } from './Logo'
import { BuyButton } from './BuyButton'

interface NavbarProps {
  ctaHref?: string
  ctaLabel?: string
  /**
   * Open the checkout modal instead of following a link.
   *
   * /ads passed ctaHref="#buy", which only scrolled the page to the value stack.
   * The nav is the most persistent CTA on the page (it follows the reader the
   * whole way down) and it could not take money.
   */
  ctaBuy?: boolean
}

export function Navbar({
  ctaHref = '/apply',
  ctaLabel = 'Book a Free Call →',
  ctaBuy = false,
}: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-stone-950/40 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Logo />
        {ctaBuy ? (
          <BuyButton
            label={ctaLabel}
            className="!flex-row"
            buttonClassName="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
          />
        ) : (
          <a
            href={ctaHref}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </nav>
  )
}
