'use client'

import { useRef, useState } from 'react'

// Self-hosted VSL. No third-party player, no external script, no upgrade
// race — just a native <video> tag served from our own CDN.
//
// Autoplays muted (browsers block unmuted autoplay). First click unmutes,
// restarts from 0, and plays with sound.
export function VideoPlayer({
  src,
  poster,
}: {
  src: string
  poster: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [unmuted, setUnmuted] = useState(false)

  const handleClick = () => {
    const video = videoRef.current
    if (!video) return
    if (unmuted) return
    setUnmuted(true)
    video.muted = false
    video.currentTime = 0
    video.play()
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {!unmuted && (
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-cyan-300">
          Click to watch with sound
        </p>
      )}
      <div
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-cyan-500/10"
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          className="block w-full"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop={!unmuted}
          playsInline
          controls={unmuted}
          preload="auto"
        />
        {!unmuted && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-black">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
