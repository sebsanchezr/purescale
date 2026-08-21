'use client'
import { useEffect, useState } from 'react'

/**
 * Secondary "book a call" CTA for the /ads page.
 *
 * Why this exists: the cold email tells prospects there is no call and points them
 * at this page to buy. The first brand that ever converted off the sequence
 * ignored all of it — the mail was forwarded internally, the colleague landed on
 * purescale.co rather than /ads, and booked a call from the Cal embed that only
 * exists on the root page. They run 220 live Meta ads. That is a retainer
 * prospect who happened to find a $97 door, and on /ads there was no door at all.
 *
 * Deliberately placed below the final $97 CTA and styled down: the self-serve
 * purchase stays the primary action, and this catches the buyer for whom $97 was
 * never the right shape. Framing it around ad spend self-selects the larger
 * advertiser rather than inviting everyone to book instead of buying.
 *
 * Uses Cal's popup embed rather than an inline calendar so the page keeps its
 * weight, and forwards the UTMs already on the URL (set by /ads/<code>) so a
 * booking can be traced back to the email variant that produced it.
 */
export function AdsCallCta() {
  const [calLink, setCalLink] = useState('august-marketing-ceo/15min')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const carried = new URLSearchParams()
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = params.get(key)
      if (value) carried.set(key, value)
    }
    // Fall back to the attribution stored on arrival, because a visitor who
    // wandered the page and lost the query string is still the same lead.
    if (![...carried].length) {
      try {
        const stored = JSON.parse(sessionStorage.getItem('ps_attribution') || '{}')
        for (const [key, value] of Object.entries(stored)) {
          if (typeof value === 'string') carried.set(key, value)
        }
      } catch {
        // no attribution available, the booking still works
      }
    }
    const query = carried.toString()
    if (query) setCalLink(`august-marketing-ceo/15min?${query}`)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "adscall", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      Cal.ns["adscall"]("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });

      Cal.ns["adscall"]("on", {
        action: "bookingSuccessful",
        callback: function () {
          if (window.fbq) { window.fbq('track', 'Schedule'); }
        }
      });
    `
    document.head.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <section className="border-t border-white/10 px-4 py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Spending over $20k a month?
        </p>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Ten creatives might not be what you need.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          If you&apos;re running serious volume and the real problem is a creative pipeline rather
          than a one-off batch, book fifteen minutes. We&apos;ll pull up your ad account, show you
          what we&apos;d change, and you can decide whether it&apos;s worth continuing.
        </p>
        <button
          type="button"
          data-cal-namespace="adscall"
          data-cal-link={calLink}
          data-cal-config='{"layout":"month_view","theme":"dark"}'
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:text-cyan-200"
        >
          Book a 15-minute call
        </button>
        <p className="mt-3 text-xs text-gray-600">
          No pitch deck. We look at your ads and tell you what we&apos;d do.
        </p>
      </div>
    </section>
  )
}
