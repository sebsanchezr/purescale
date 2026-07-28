'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Wistia web component
      'wistia-player': any
    }
  }
}

/**
 * Native Wistia embed.
 *
 * The previous version appended the scripts inside useEffect and rendered
 * <wistia-player> immediately, which is a race: on a cold visit the element
 * existed long before player.js defined the custom element, so it sat on the
 * :not(:defined) blurred poster indefinitely. A refresh served the script from
 * cache, it won the race, and the video "worked". That is exactly the
 * works-only-on-second-load behaviour this had.
 *
 * The element is now rendered only once player.js reports loaded, so the custom
 * element is always defined before it exists. A timeout fallback renders it
 * anyway if onLoad never fires (blocked script, ad blocker), because a player
 * that tries and fails beats a permanent grey box.
 */
export function WistiaPlayer({
  mediaId,
  aspect = '1.7777777777777777',
}: {
  mediaId: string
  aspect?: string
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // If an earlier instance already loaded the script, the element is defined
    // and onLoad will not fire again for this one.
    if (typeof window !== 'undefined' && window.customElements?.get('wistia-player')) {
      setReady(true)
      return
    }
    const t = setTimeout(() => setReady(true), 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <Script
        src="https://fast.wistia.com/player.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <Script
        src={`https://fast.wistia.com/embed/${mediaId}.js`}
        type="module"
        strategy="afterInteractive"
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-cyan-500/10">
        <style>{`wistia-player[media-id='${mediaId}']:not(:defined){background:center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');display:block;filter:blur(5px);padding-top:56.25%;}`}</style>
        {ready ? (
          <wistia-player media-id={mediaId} aspect={aspect}></wistia-player>
        ) : (
          // Same height as the player so the page does not jump when it swaps in.
          <div
            aria-hidden="true"
            style={{ paddingTop: '56.25%' }}
            className="w-full animate-pulse bg-white/[0.04]"
          />
        )}
      </div>
    </div>
  )
}
