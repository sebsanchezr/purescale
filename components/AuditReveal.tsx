'use client'

import { useState } from 'react'

// Admin-only. Fetches the decrypted read-only token on demand (key-gated),
// shows it once, and offers copy. Nothing is rendered until clicked.
export function AuditReveal({
  id,
  adminKey,
  accountId,
}: {
  id: string
  adminKey: string
  accountId?: string | null
}) {
  const [token, setToken] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const reveal = async () => {
    setBusy(true)
    setErr(null)
    try {
      const r = await fetch('/api/audit-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, key: adminKey }),
      })
      const j = await r.json()
      if (j?.token) setToken(j.token)
      else setErr(j?.error || 'failed')
    } catch {
      setErr('failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="text-xs">
      <span className="text-cyan-300">🔍 {accountId || 'audit'}</span>
      {token ? (
        <div className="mt-1">
          <code className="block max-w-[220px] truncate rounded bg-black/60 px-2 py-1 text-gray-300">
            {token}
          </code>
          <button
            onClick={() => navigator.clipboard?.writeText(token)}
            className="mt-1 text-cyan-300 hover:underline"
          >
            Copy token
          </button>
        </div>
      ) : (
        <button
          onClick={reveal}
          disabled={busy}
          className="ml-2 rounded border border-cyan-400/30 px-2 py-0.5 text-cyan-300 hover:bg-cyan-400/10 disabled:opacity-50"
        >
          {busy ? '…' : 'Reveal token'}
        </button>
      )}
      {err && <p className="mt-1 text-red-400">{err}</p>}
    </div>
  )
}
