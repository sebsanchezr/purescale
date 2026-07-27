import type { Metadata } from 'next'
import { LegalPage, LegalH2 } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service | PureScale',
  description: 'The terms you agree to when you buy the $97 creative pack.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="27 July 2026">
      <p>
        These terms govern the purchase of the PureScale creative pack (&ldquo;the
        Service&rdquo;) from August Marketing Ltd, trading as PureScale. By buying, you
        agree to them.
      </p>

      <LegalH2>1. What you are buying</LegalH2>
      <p>
        Ten advertising creatives produced for your brand: a mix of static images,
        UGC-style images and short videos, supplied in formats sized for paid social. The
        exact split is at our discretion and is chosen to give you a spread of testing
        angles rather than variations of one idea.
      </p>
      <p>
        The Service is sold to businesses for business use. You confirm you are buying in
        the course of a business.
      </p>

      <LegalH2>2. What we need from you</LegalH2>
      <p>
        After payment you complete an intake form giving us your store URL, your
        best-performing current ad and what you want featured. We cannot start without it.
        Delivery is within one business day of that form being submitted — not of your
        payment.
      </p>
      <p>
        You confirm you own or are licensed to use any brand assets, product images,
        logos or footage you send us, and that we may use them to produce your creatives.
      </p>

      <LegalH2>3. Ownership</LegalH2>
      <p>
        On payment, you own the delivered creatives outright and may use them on any
        platform, indefinitely, without further fee or attribution. We retain the right to
        show the work in our own portfolio and marketing unless you ask us in writing not
        to.
      </p>
      <p>
        Some creatives are produced with the assistance of generative AI tools. You should
        satisfy yourself that the output is suitable for your brand before running it.
      </p>

      <LegalH2>4. Revisions</LegalH2>
      <p>
        One round of revisions is included, at no cost, for creatives you are unhappy with.
        Beyond that, further work is chargeable.
      </p>

      <LegalH2>5. Categories we will not build for</LegalH2>
      <p>
        We decline work for brands in categories that cannot be advertised safely or
        lawfully on paid social — including adult content, weapons, illegal substances, and
        products making unsubstantiated health or financial claims. If we decline after you
        have paid, you receive a full refund.
      </p>

      <LegalH2>6. No performance guarantee</LegalH2>
      <p>
        We do not guarantee any advertising result, revenue, return on ad spend or account
        outcome. Results depend on factors we do not control at this tier, including your
        product, pricing, offer, audience, budget, website and the platforms themselves.
        Case studies shown on our site describe what specific clients achieved and are not
        a prediction of your results.
      </p>

      <LegalH2>7. Ad account access (optional)</LegalH2>
      <p>
        If you choose to share access to your advertising account so we can review your
        performance data, that access is used solely to inform the creatives we build for
        you and any audit we return to you. It is never used to make changes, spend money
        or contact anyone. You can revoke it at any time, and we will remove it once the
        work is complete. See our{' '}
        <a href="/privacy" className="text-cyan-300 hover:underline">Privacy Policy</a> for
        how that data is handled.
      </p>

      <LegalH2>8. Refunds</LegalH2>
      <p>
        Set out in full in our{' '}
        <a href="/refunds" className="text-cyan-300 hover:underline">Refund Policy</a>,
        which forms part of these terms.
      </p>

      <LegalH2>9. Price and tax</LegalH2>
      <p>
        The price is $97 for one pack of ten creatives. Where value added tax or local
        sales tax applies to your purchase it is calculated and shown at checkout.
      </p>

      <LegalH2>10. Liability</LegalH2>
      <p>
        Our total liability arising from the Service is limited to the amount you paid us.
        We are not liable for indirect or consequential loss, including lost profit, lost
        revenue or advertising spend. Nothing here limits liability for death, personal
        injury or fraud, which cannot be limited by law.
      </p>

      <LegalH2>11. Community access</LegalH2>
      <p>
        Purchase includes access to our members&rsquo; community and live sessions while we
        run them. We may change the format, platform or schedule, and behaviour that is
        abusive or spammy will have access removed without refund.
      </p>

      <LegalH2>12. Governing law</LegalH2>
      <p>
        These terms are governed by the laws of England and Wales, and the courts of
        England and Wales have exclusive jurisdiction.
      </p>
    </LegalPage>
  )
}
