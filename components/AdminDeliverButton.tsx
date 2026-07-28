'use client'

import { useState } from 'react'

export function AdminDeliverButton({
  id,
  adminKey,
  delivered,
}: {
  id: string
  adminKey: string
  delivered: boolean
}) {
  const [done, setDone] = useState(delivered)
  const [busy, setBusy] = useState(false)

  if (done) return <span className="text-sm font-semibold text-green-400">Delivered ✓</span>

  const mark = async () => {
    setBusy(true)
    try {
      const r = await fetch('/api/order-deliver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, key: adminKey }),
      })
      if (r.ok) setDone(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={mark}
      disabled={busy}
      className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
    >
      {busy ? 'Marking…' : 'Mark delivered'}
    </button>
  )
}
