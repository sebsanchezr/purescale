import { Logo } from './Logo'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Logo />
        <a
          href="/apply"
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-500 hover:to-cyan-400 font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
        >
          Book a Free Call →
        </a>
      </div>
    </nav>
  )
}
