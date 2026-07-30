/**
 * Wistia embed, iframe form.
 *
 * This was previously Wistia's <wistia-player> web component. It depended on two
 * async scripts defining a custom element before the element rendered, and it
 * would sit on a blurred poster until a page refresh warmed the script cache.
 * Two attempts to sequence that correctly still left it broken in a real browser.
 *
 * The iframe has none of that surface: no custom element, no script race, no
 * hydration timing, nothing to block. It is the same embed Wistia's own oembed
 * endpoint hands out. A VSL that reliably plays first time is worth more than a
 * marginally more native player that sometimes does not.
 *
 * No 'use client' needed either, this renders on the server.
 */
export function WistiaPlayer({ mediaId }: { mediaId: string; aspect?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-stone-950 shadow-2xl shadow-cyan-500/10">
        {/* padding-top 56.25% reserves the 16:9 box so the page never jumps. */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={`https://fast.wistia.net/embed/iframe/${mediaId}?videoFoam=false`}
            title="PureScale VSL"
            allow="autoplay; fullscreen"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
