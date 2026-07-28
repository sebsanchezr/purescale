import type { Metadata } from 'next'
import { LegalPage, LegalH2 } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Refund Policy | PureScale',
  description: 'When you can get your $97 back, and when you cannot.',
}

/**
 * Refund window is tied to DELIVERY, not to a fixed clock: we start building the
 * moment the intake form lands and deliver within one business day, so the honest
 * framing is "any time before we deliver — usually just under 24 hours".
 *
 * Stating a flat "24 hours" would be a promise we break every time we deliver in
 * four hours, which is exactly the kind of small dishonesty that produces chargebacks.
 */
export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy" updated="27 July 2026">
      <p>
        We would rather refund you than have you feel stung by a $97 purchase. This page
        says plainly when you can have your money back and when you cannot.
      </p>

      <LegalH2>Full refund before we deliver</LegalH2>
      <p>
        You can request a full refund at any point <strong>before your creatives are
        delivered</strong>. No reason needed, no questions. Email{' '}
        <a href="mailto:hello@purescale.co" className="text-cyan-300 hover:underline">
          hello@purescale.co
        </a>{' '}
        and we will refund the full $97 to your original payment method, normally within
        two working days and always within ten.
      </p>
      <p>
        In practice this gives you a little under 24 hours: we begin work as soon as you
        submit your intake form and deliver within one business day of it. If we have
        already sent your creatives, the work is done and the fee is not refundable.
      </p>

      <LegalH2>If we cannot deliver</LegalH2>
      <p>
        If we are unable to build your creatives — your store is unreachable, the brand
        falls into a category we cannot advertise safely, or we simply run out of capacity
        — we refund you in full and tell you why. You keep nothing and pay nothing.
      </p>

      <LegalH2>If you are not happy with what we deliver</LegalH2>
      <p>
        Tell us. We will rebuild the creatives you are unhappy with, once, at no cost. We
        would rather fix the work than argue about it. What we will not do is refund
        delivered creatives, because you keep them and can run them indefinitely — that is
        the trade at this price.
      </p>

      <LegalH2>What this offer is not</LegalH2>
      <p>
        We make no guarantee about the commercial performance of any creative we produce.
        Results depend on your product, price, offer, audience, budget and landing page,
        none of which we control at this tier. Past results described on our site were
        achieved by specific clients under specific conditions and are not a prediction of
        your outcome.
      </p>

      <LegalH2>Chargebacks</LegalH2>
      <p>
        If something has gone wrong, email us first. We will almost always resolve it
        faster than your bank will, and a raised dispute freezes any refund we could
        otherwise send you immediately.
      </p>

      <LegalH2>Business customers</LegalH2>
      <p>
        This offer is sold to businesses. Statutory consumer cancellation rights under the
        Consumer Contracts Regulations do not apply to business purchases. By buying and
        submitting your intake form you are asking us to begin work immediately.
      </p>
    </LegalPage>
  )
}
