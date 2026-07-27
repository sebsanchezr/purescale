import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'

export const metadata: Metadata = {
  title: "You're in — tell us what to build | PureScale",
  description: 'Payment confirmed. Two minutes of detail and your 10 creatives are underway.',
  robots: { index: false, follow: false },
}

/**
 * Post-purchase page.
 *
 * The intake form is embedded here rather than only emailed, because the moment
 * straight after payment is the highest-intent moment we will ever get with this
 * buyer — every hour of delay between paying and telling us their store URL is an
 * hour the 24h SLA cannot start. The emailed copy (workflow W1) is the safety net,
 * not the primary path.
 *
 * No Purchase pixel fires here by design: the Stripe webhook sends it server-side,
 * so a refreshed tab or a shared link can never inflate the conversion count.
 */
export default function AdsSuccessPage() {
  const intakeFormUrl = process.env.NEXT_PUBLIC_GHL_INTAKE_FORM_URL

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <Logo />
        </div>

        <div className="text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-2xl text-cyan-300">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Payment confirmed. Now the <span className="font-poppins-italic text-cyan-300">two-minute</span> part.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Fill this in and your build starts immediately — your 10 creatives land within one
            business day of this form, not of your payment. Check your inbox too: we&apos;ve emailed
            you the same link and your receipt.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {intakeFormUrl ? (
            <iframe
              src={intakeFormUrl}
              title="PureScale intake form"
              className="h-[900px] w-full border-0"
            />
          ) : (
            <div className="p-10 text-center">
              <p className="text-gray-300">
                Your intake link is on its way by email and text right now.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Nothing within 5 minutes? Email{' '}
                <a href="mailto:hello@purescale.co" className="text-cyan-300 underline">
                  hello@purescale.co
                </a>{' '}
                and we&apos;ll sort it immediately.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { k: '01', t: 'You just did this', d: 'Payment secured. Your build slot is held.' },
            { k: '02', t: 'Tell us the brand', d: 'Store link + your best-performing ad as the control.' },
            { k: '03', t: 'We build', d: '10 creatives, each testing a different angle. One business day.' },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="font-mono text-xs font-bold text-cyan-300">{s.k}</div>
              <div className="mt-2 font-semibold text-white">{s.t}</div>
              <div className="mt-1 text-sm text-gray-400">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
