'use client'

import { useEffect, useState } from 'react'
import { CEO_CALL_URL, CEO_CALLS_INCLUDED } from '@/lib/offer'

// Stages auto-advance on a 24h timeline. "In production" is the long stage
// (~12h, roughly 2x the others). Only "Delivered" is real — it flips when the
// order's status is set to 'delivered' (polled from the API).
const STAGES = [
  { key: 'confirmed', label: 'Payment confirmed', desc: 'You\'re in. Order received.', at: 0 },
  { key: 'brief', label: 'Brief received', desc: 'Your store + best ad are with the team.', at: 1 },
  { key: 'production', label: 'In production', desc: 'Building your 10 creatives — UGC, static & hooks.', at: 6 },
  { key: 'review', label: 'Final review & QA', desc: 'Polishing and checking every creative.', at: 18 },
  { key: 'delivered', label: 'Delivered to your inbox', desc: 'All 10 creatives, ready to upload.', at: 24, real: true },
]

const TOTAL_MS = 24 * 60 * 60 * 1000

export function OrderTracker({
  startTs,
  orderId,
  initialDelivered = false,
}: {
  startTs: number
  orderId?: string
  initialDelivered?: boolean
}) {
  const [now, setNow] = useState(startTs)
  const [delivered, setDelivered] = useState(initialDelivered)

  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!orderId || delivered) return
    let stop = false
    const check = async () => {
      try {
        const r = await fetch(`/api/order-status?id=${encodeURIComponent(orderId)}`)
        const j = await r.json()
        if (!stop && j?.status === 'delivered') setDelivered(true)
      } catch {}
    }
    check()
    const t = setInterval(check, 60000)
    return () => {
      stop = true
      clearInterval(t)
    }
  }, [orderId, delivered])

  const elapsedH = (now - startTs) / 3600000
  let timeIdx = 0
  STAGES.forEach((s, i) => {
    if (!s.real && elapsedH >= s.at) timeIdx = i
  })
  const activeIdx = delivered ? STAGES.length - 1 : timeIdx

  const remainMs = Math.max(0, TOTAL_MS - (now - startTs))
  const hrs = Math.floor(remainMs / 3600000)
  const mins = Math.floor((remainMs % 3600000) / 60000)

  return (
    <div className="text-left">
      <div className="mb-6 flex items-baseline justify-between">
        <p className="text-lg font-bold text-white">Your order</p>
        {!delivered ? (
          <p className="font-poppins-italic text-sm text-cyan-300">
            ~{hrs}h {mins}m to delivery
          </p>
        ) : (
          <p className="font-poppins-italic text-sm text-green-400">Delivered ✓</p>
        )}
      </div>

      <ol className="relative space-y-6">
        {STAGES.map((s, i) => {
          const done = i < activeIdx
          const active = i === activeIdx
          return (
            <li key={s.key} className="relative flex gap-4">
              {i < STAGES.length - 1 && (
                <span
                  className={`absolute left-[11px] top-6 h-full w-0.5 ${done ? 'bg-cyan-400' : 'bg-white/10'}`}
                />
              )}
              <span
                className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                  done
                    ? 'bg-cyan-400 text-black'
                    : active
                      ? 'bg-cyan-400/20 text-cyan-300 ring-2 ring-cyan-400'
                      : 'bg-white/10 text-gray-500'
                }`}
              >
                {done ? '✓' : active ? '●' : i + 1}
              </span>
              <div className={active ? '' : done ? 'opacity-80' : 'opacity-40'}>
                <p className={`font-semibold ${active ? 'text-cyan-300' : 'text-white'}`}>
                  {s.label}
                  {active && !delivered && (
                    <span className="ml-2 inline-flex items-center gap-1 align-middle text-xs text-cyan-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /> now
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-gray-400">{s.desc}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href={CEO_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-5 py-4 text-center transition-all hover:bg-cyan-400/10"
        >
          <p className="font-semibold text-white">Book a call with the CEO</p>
          <p className="mt-1 text-xs text-gray-400">15 min, while your creatives are built</p>
        </a>
        <a
          href={CEO_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center transition-all hover:border-cyan-400/30"
        >
          <p className="font-semibold text-white">Book your 1-to-1 calls</p>
          <p className="mt-1 text-xs text-gray-400">Weekly AI-creative calls + Q&amp;A</p>
        </a>
      </div>
    </div>
  )
}
