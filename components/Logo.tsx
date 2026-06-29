export function Logo() {
  return (
    <svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Growth curve upward */}
      <path d="M 8 20 Q 12 12 16 8 T 24 4" stroke="url(#gradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Arrow pointing up */}
      <path d="M 24 4 L 20 8 M 24 4 L 28 8" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Text: PureScale */}
      <text x="38" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="white">
        <tspan fill="url(#gradient)">Pure</tspan>
        <tspan fill="white">Scale</tspan>
      </text>
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  )
}
