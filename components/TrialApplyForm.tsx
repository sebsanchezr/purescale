'use client'

/**
 * Application form for the risk-reversed 10-day creative trial.
 *
 * Single step, not the multi-screen wizard /apply uses: a trial applicant has
 * already read the spend floor on /trial and self-selected, so the job here is
 * capturing the account fast, not qualifying them again one question at a time.
 *
 * Qualification is decided client-side from the spend bracket the instant the
 * form is submitted: under the £15k/month floor routes to the $97 downsell,
 * at or above it shows the booking step. The POST to /api/trial-apply always
 * fires regardless of bracket, every application is a lead worth having on
 * record even when it downsells.
 */

import { useState } from 'react'
import { CalEmbed } from './CalEmbed'

const SPEND_OPTIONS = [
  { value: 'under_5k', label: 'Under £5,000/month' },
  { value: '5k_15k', label: '£5,000 - £15,000/month' },
  { value: '15k_50k', label: '£15,000 - £50,000/month' },
  { value: '50k_plus', label: '£50,000+/month' },
] as const

// The trial floor. Anything below this bracket never spends enough over 10
// days for the Yeubo-style kill-and-scale method to reach a fair read.
const QUALIFYING_SPEND = new Set(['15k_50k', '50k_plus'])

const REVENUE_OPTIONS = [
  { value: 'under_50k', label: 'Under £50,000/month' },
  { value: '50k_200k', label: '£50,000 - £200,000/month' },
  { value: '200k_1m', label: '£200,000 - £1,000,000/month' },
  { value: '1m_plus', label: '£1,000,000+/month' },
] as const

type Stage = 'form' | 'downsell' | 'booked'

/** Read a first-party cookie (used for _fbp / _fbc match quality on the Lead event). */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[2]) : undefined
}

function newEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export function TrialApplyForm() {
  const [stage, setStage] = useState<Stage>('form')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    monthlySpend: '',
    revenue: '',
    problem: '',
  })

  const update = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const valid =
    formData.name.trim() &&
    formData.email.includes('@') &&
    formData.company.trim() &&
    formData.website.trim() &&
    formData.monthlySpend &&
    formData.revenue

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    const qualified = QUALIFYING_SPEND.has(formData.monthlySpend)
    const eventId = newEventId('trial_lead')

    try {
      await fetch('/api/trial-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          qualified,
          eventId,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        }),
      })
    } catch {
      // The intake still succeeds for the applicant even if the network call
      // itself failed here, /api/trial-apply already degrades on its side.
    }

    if (qualified) {
      window.fbq?.('track', 'Lead', { content_name: '10-Day Creative Trial' }, { eventID: eventId })
    }

    setSubmitting(false)
    setStage(qualified ? 'booked' : 'downsell')
  }

  if (stage === 'downsell') {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300">
            <span aria-hidden="true">i</span>
            Not quite the trial floor
          </span>
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            The trial is built for £15,000+/month spenders.{' '}
            <span className="font-poppins-italic text-cyan-300">This is built for you.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-gray-300">
            Below the trial floor, 10 days is not enough spend for a fair read on fifteen
            creatives. The same production engine is available with no spend commitment and no
            call required: ten ad creatives, built on your brand, delivered fast, for $97. You
            own every one of them.
          </p>
          <div className="mt-10">
            <a
              href="/ads"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-9 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
            >
              Get My 10 Creatives. $97 →
            </a>
            <p className="mt-3 text-sm text-gray-500">
              One time. No subscription. Keep everything.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'booked') {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <span aria-hidden="true">✓</span>
              Application received
            </span>
            <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Book your <span className="font-poppins-italic text-cyan-300">40-minute call</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              We confirm the account, the control creative, and the exact 10-day start date on this
              call. Come with access to grant on your Meta Business Manager and your
              current best-performing ad ready to share.
            </p>
          </div>
          <div className="mt-10">
            <CalEmbed />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Apply for the 10-day trial
          </span>
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Tell us about your <span className="font-poppins-italic">account</span>
          </h1>
          <p className="mt-3 text-gray-400">
            Two minutes. Qualified applications move straight to a 40-minute call.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-400 focus:bg-white/15 focus:outline-none"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300" htmlFor="email">
                Business email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-400 focus:bg-white/15 focus:outline-none"
                placeholder="jane@brand.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                type="text"
                required
                value={formData.company}
                onChange={(e) => update('company', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-400 focus:bg-white/15 focus:outline-none"
                placeholder="Brand Ltd"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300" htmlFor="website">
                Website / store link
              </label>
              <input
                id="website"
                type="text"
                required
                value={formData.website}
                onChange={(e) => update('website', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-400 focus:bg-white/15 focus:outline-none"
                placeholder="brand.com"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-gray-300">Monthly Meta ad spend</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SPEND_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update('monthlySpend', opt.value)}
                  aria-pressed={formData.monthlySpend === opt.value}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                    formData.monthlySpend === opt.value
                      ? 'border-cyan-400 bg-cyan-400/10 text-white'
                      : 'border-white/15 bg-white/5 text-gray-300 hover:border-blue-400/50 hover:bg-white/10'
                  }`}
                >
                  {formData.monthlySpend === opt.value ? '✓ ' : ''}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-gray-300">Monthly revenue</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {REVENUE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update('revenue', opt.value)}
                  aria-pressed={formData.revenue === opt.value}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                    formData.revenue === opt.value
                      ? 'border-cyan-400 bg-cyan-400/10 text-white'
                      : 'border-white/15 bg-white/5 text-gray-300 hover:border-blue-400/50 hover:bg-white/10'
                  }`}
                >
                  {formData.revenue === opt.value ? '✓ ' : ''}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-300" htmlFor="problem">
              What is the biggest problem right now?
            </label>
            <textarea
              id="problem"
              value={formData.problem}
              onChange={(e) => update('problem', e.target.value)}
              className="h-28 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-400 focus:bg-white/15 focus:outline-none"
              placeholder="e.g. Same 4 ads running for two months, CPA is up 40% since spring..."
            />
          </div>

          {error && (
            <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-400">
              <span aria-hidden="true">!</span>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!valid || submitting}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Apply for the Trial →'}
          </button>
          <p className="text-center text-xs text-gray-500">
            Under the £15,000/month floor? You will be shown the $97 pack instead, no call
            required.
          </p>
        </form>
      </div>
    </div>
  )
}
