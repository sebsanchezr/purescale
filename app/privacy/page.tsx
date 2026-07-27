import type { Metadata } from 'next'
import { LegalPage, LegalH2 } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | PureScale',
  description: 'What we collect, why, and how to get rid of it.',
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="27 July 2026">
      <p>
        August Marketing Ltd, trading as PureScale, is the data controller for the personal
        data described here. This policy covers purescale.co and the $97 creative pack.
      </p>

      <LegalH2>What we collect</LegalH2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Contact details</strong> — name, email address and phone number, given by
          you at checkout, so we can deliver your order and support you.
        </li>
        <li>
          <strong>Order and business details</strong> — your store URL, your current best
          ad, what you sell and your approximate monthly ad spend, given on the intake form,
          so we can build creatives that fit your brand.
        </li>
        <li>
          <strong>Payment details</strong> — handled entirely by Stripe. We never see or
          store your card number.
        </li>
        <li>
          <strong>Usage data</strong> — pages viewed and actions taken on this site, via
          cookies and the Meta pixel, and only where you have consented.
        </li>
        <li>
          <strong>Advertising account data (optional)</strong> — if you choose to share
          access to your ad account, the performance data we read from it.
        </li>
      </ul>

      <LegalH2>Advertising account access, specifically</LegalH2>
      <p>
        Sharing ad account access is entirely optional and the $97 pack is delivered the
        same either way. Where you do share it:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>We use it to read performance data only — never to spend, change or post.</li>
        <li>
          We use it to inform your creatives and to produce the audit we send back to you.
        </li>
        <li>Credentials are stored encrypted, restricted to the people doing your work.</li>
        <li>
          You can revoke access yourself at any time from your own account settings, and we
          remove our access once the work is finished. Ask us to remove it sooner and we
          will do it the same working day.
        </li>
        <li>We never pass it to anyone else, and we never use it for another client.</li>
      </ul>

      <LegalH2>Why we are allowed to hold it</LegalH2>
      <p>
        To perform our contract with you (delivering what you bought), for our legitimate
        interest in running and improving the business, with your consent for marketing
        cookies and marketing email, and to meet legal obligations such as keeping tax
        records.
      </p>

      <LegalH2>Who we share it with</LegalH2>
      <p>
        Only the suppliers who make the service work: Stripe (payments), GoHighLevel (CRM,
        email and SMS), Vercel (hosting), Supabase (order database), Google (file delivery
        and email), Meta (advertising measurement), and the AI tooling used to produce
        creatives. Some are outside the UK; those transfers rely on the UK addendum to the
        EU standard contractual clauses. We do not sell your data. Ever.
      </p>

      <LegalH2>How long we keep it</LegalH2>
      <p>
        Order and contact records for six years, as required for tax. Ad account access
        only for as long as the work takes. Marketing contact details until you
        unsubscribe. Anything else, no longer than we need it.
      </p>

      <LegalH2>Your rights</LegalH2>
      <p>
        You can ask us for a copy of your data, ask us to correct or delete it, object to
        or restrict how we use it, and withdraw consent at any time. Email{' '}
        <a href="mailto:hello@purescale.co" className="text-cyan-300 hover:underline">
          hello@purescale.co
        </a>{' '}
        and we will respond within one month. If you are unhappy with our response you can
        complain to the Information Commissioner&rsquo;s Office at ico.org.uk.
      </p>

      <LegalH2>Cookies</LegalH2>
      <p>
        We use essential cookies to make the site work, and — only if you accept them —
        Meta advertising cookies that let us measure which ads lead to purchases. You can
        change your choice at any time by clearing this site&rsquo;s cookies and reloading
        the page. Declining does not affect anything you buy from us.
      </p>

      <LegalH2>Marketing</LegalH2>
      <p>
        If you buy from us, we will email you about your order and about our services.
        Every marketing email has a one-click unsubscribe, and we honour it immediately.
      </p>
    </LegalPage>
  )
}
