'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PRICE_VALUE } from '@/lib/offer'
import { OrderTracker } from './OrderTracker'

export function OrderConfirm() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [fallbackStart, setFallbackStart] = useState<number | null>(null)
  const [form, setForm] = useState({
    storeUrl: '',
    bestAdUrl: '',
    email: '',
    notes: '',
    auditRequested: false,
    auditAccountId: '',
    auditToken: '',
  })
  const [showGuide, setShowGuide] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploads, setUploads] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  /**
   * Upload dropped files and fold their URLs into bestAdUrl.
   *
   * Appending to the same field rather than adding a new one keeps the payload,
   * the Discord alert and the fulfilment worker unchanged: they all already read
   * bestAdUrl, so nothing downstream needs to know uploads exist.
   */
  const upload = async (fileList: FileList | null) => {
    if (!fileList?.length) return
    setUploading(true)
    setUploadError(null)
    try {
      const body = new FormData()
      Array.from(fileList).forEach((f) => body.append('files', f))
      const r = await fetch('/api/upload', { method: 'POST', body })
      const j = await r.json()
      if (j?.success && Array.isArray(j.urls)) {
        const next = [...uploads, ...j.urls]
        setUploads(next)
        setForm((prev) => ({
          ...prev,
          bestAdUrl: [prev.bestAdUrl.trim(), ...j.urls].filter(Boolean).join('\n'),
        }))
      } else {
        setUploadError(j?.error ?? 'Upload failed. Paste a link instead?')
      }
    } catch {
      setUploadError('Upload failed. Paste a link instead?')
    }
    setUploading(false)
  }

  // This page is only reached after a successful Stripe payment → fire Purchase.
  //
  // The eventID MUST be the Stripe checkout session id, because the Stripe webhook
  // sends the same Purchase server-side using that id. Without it Meta counts one
  // sale twice, and every CPA we optimise against would be half what it really is.
  useEffect(() => {
    try {
      const sessionId = new URLSearchParams(window.location.search).get('session_id')
      window.fbq?.(
        'track',
        'Purchase',
        { value: PRICE_VALUE, currency: 'USD', content_name: '10 Ad Creatives in 24h' },
        sessionId ? { eventID: sessionId } : undefined
      )
    } catch {}
  }, [])

  // Tiny completion meter. The form is short, but after paying people want to know
  // how much is left before they can close the tab.
  const REQUIRED = ['storeUrl', 'bestAdUrl', 'email'] as const
  const done = REQUIRED.filter((k) => String(form[k]).trim().length > 0).length
  const pct = Math.round((done / REQUIRED.length) * 100)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      const r = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const j = await r.json()
      if (j?.id) {
        router.push(`/order/${j.id}`) // dedicated live tracker page
        return
      }
      setFallbackStart(Date.now()) // db not returning an id, show tracker inline
    } catch {
      setFallbackStart(Date.now())
    } finally {
      setBusy(false)
    }
  }

  const input =
    'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none'

  if (fallbackStart) return <OrderTracker startTs={fallbackStart} />

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={submit} className="space-y-4 text-left">
        <p className="text-center text-gray-400">
          One quick step and the 24-hour clock starts. Drop the two links below.
        </p>

        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="shrink-0 font-mono text-[11px] text-gray-500">
            {done}/{REQUIRED.length}
          </span>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Your store URL</label>
          <input
            type="url"
            required
            placeholder="https://yourstore.com"
            className={input}
            value={form.storeUrl}
            onChange={(e) => setForm({ ...form, storeUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Your current best-performing ad</label>
          <input
            type="text"
            required
            placeholder="Ad link, Ads Library URL, or a Google Drive / Dropbox link"
            className={input}
            value={form.bestAdUrl}
            onChange={(e) => setForm({ ...form, bestAdUrl: e.target.value })}
          />
          <p className="mt-1 text-xs text-gray-500">
            Paste a link, or drop the files straight in below.
          </p>

          <label
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              upload(e.dataTransfer.files)
            }}
            className={`mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition-colors ${
              dragging
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-white/20 bg-white/[0.03] hover:border-cyan-400/40'
            }`}
          >
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => upload(e.target.files)}
            />
            <span className="text-sm text-gray-300">
              {uploading ? 'Uploading…' : 'Drop your ad files here, or click to browse'}
            </span>
            <span className="mt-1 text-xs text-gray-500">Images or video, up to 25MB each</span>
          </label>

          {uploads.length > 0 && (
            <ul className="mt-3 space-y-1">
              {uploads.map((u, i) => (
                <li key={u} className="flex items-center gap-2 text-xs text-cyan-300">
                  <span>✓</span>
                  <span className="truncate">File {i + 1} uploaded</span>
                </li>
              ))}
            </ul>
          )}
          {uploadError && <p className="mt-2 text-xs text-red-400">{uploadError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Email (same as your receipt)</label>
          <input
            type="email"
            required
            placeholder="you@brand.com"
            className={input}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Anything we should know? (optional)</label>
          <textarea
            rows={3}
            placeholder="Angles you want tested, offers, tone…"
            className={input}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        {/* ── FREE AD ACCOUNT AUDIT (optional bonus) ── */}
        <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/[0.06] p-5">
          <div className="flex items-start gap-3">
            <input
              id="auditRequested"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-cyan-400"
              checked={form.auditRequested}
              onChange={(e) => setForm({ ...form, auditRequested: e.target.checked })}
            />
            <label htmlFor="auditRequested" className="cursor-pointer">
              <span className="mr-2 rounded bg-cyan-400/15 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                Free · Included
              </span>
              <span className="font-semibold text-white">Run my free ad account audit</span>
              <p className="mt-1 text-sm text-gray-400">
                Grant us <strong className="text-white">read-only</strong> access to your Meta ad
                account and we&apos;ll send a PDF teardown with prioritised fixes inside 24 hours , 
                alongside your creatives. Totally optional, and read-only means we can never spend,
                edit, or post anything.
              </p>
            </label>
          </div>

          {form.auditRequested && (
            <div className="mt-4 space-y-3 border-t border-cyan-400/15 pt-4">
              <div>
                <label className="mb-1 block text-sm text-gray-300">Meta Ad Account ID</label>
                <input
                  type="text"
                  placeholder="act_1234567890"
                  className={input}
                  value={form.auditAccountId}
                  onChange={(e) => setForm({ ...form, auditAccountId: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Read-only access token
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Paste your read-only token"
                  className={input}
                  value={form.auditToken}
                  onChange={(e) => setForm({ ...form, auditToken: e.target.value })}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Encrypted the moment it reaches us. Never shown to anyone but the analyst running
                  your audit. Delete it on your end once you have the PDF.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowGuide((v) => !v)}
                className="text-sm font-semibold text-cyan-300 hover:underline"
              >
                {showGuide ? 'Hide' : 'How do I get a read-only token? (2 min)'}
              </button>
              {showGuide && (
                <ol className="list-decimal space-y-2 rounded-lg border border-white/10 bg-black/40 px-6 py-4 text-sm text-gray-300">
                  <li>
                    Go to{' '}
                    <a
                      href="https://developers.facebook.com/tools/explorer/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      Graph API Explorer
                    </a>{' '}
                    (developers.facebook.com/tools/explorer).
                  </li>
                  <li>
                    Under <strong className="text-white">Permissions</strong>, add only{' '}
                    <code className="text-cyan-300">ads_read</code>, nothing else. This is
                    read-only: no spending, no editing.
                  </li>
                  <li>
                    Click <strong className="text-white">Generate Access Token</strong> and approve
                    the popup.
                  </li>
                  <li>Copy the token it shows and paste it in the box above.</li>
                  <li>
                    Find your <strong className="text-white">Ad Account ID</strong> in Ads Manager
                    (top left, starts with <code className="text-cyan-300">act_</code>) and paste it
                    too.
                  </li>
                  <li>
                    Done. Once we deliver the audit you can revoke the token any time under Settings
                    → Business Integrations.
                  </li>
                </ol>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
        >
          {busy ? 'Starting…' : 'Start my 24-hour build →'}
        </button>
      </form>
    </div>
  )
}
