'use client'

import { useEffect } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Wistia web component
      'wistia-player': any
    }
  }
}

// Native Wistia embed. Scripts load async after mount (non-blocking), and
// Wistia shows a blurred swatch poster until the player defines + the video
// only streams on play — so this adds ~0 to initial page load.
export function WistiaPlayer({
  mediaId,
  aspect = '1.7777777777777777',
}: {
  mediaId: string
  aspect?: string
}) {
  useEffect(() => {
    const add = (src: string, module = false) => {
      if (document.querySelector(`script[data-wistia="${src}"]`)) return
      const s = document.createElement('script')
      s.src = src
      s.async = true
      if (module) s.type = 'module'
      s.setAttribute('data-wistia', src)
      document.body.appendChild(s)
    }
    add('https://fast.wistia.com/player.js')
    add(`https://fast.wistia.com/embed/${mediaId}.js`, true)
  }, [mediaId])

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-cyan-500/10">
        <style>{`wistia-player[media-id='${mediaId}']:not(:defined){background:center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');display:block;filter:blur(5px);padding-top:56.25%;}`}</style>
        <wistia-player media-id={mediaId} aspect={aspect}></wistia-player>
      </div>
    </div>
  )
}
