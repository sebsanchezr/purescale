'use client'
import { useEffect } from 'react'

/**
 * Secondary "book a call" section at the foot of /ads.
 *
 * Why this exists: the cold email tells prospects there is no call and points them
 * at this page to buy. The first brand that ever converted off the sequence
 * ignored all of it — the mail was forwarded internally, the colleague landed on
 * purescale.co rather than /ads, and booked a call from the Cal embed that only
 * exists on the root page. They run 220 live Meta ads. That is a retainer
 * prospect who happened to find a $97 door, and on /ads there was no door at all.
 *
 * Copy is deliberately NOT "creative isn't what you need" — a visitor is on this
 * page because they want creative, and telling them otherwise argues against the
 * $97 offer above it. This instead frames the call as going further: handing off
 * the whole account rather than buying one batch. Same demand, bigger ask.
 *
 * Inline embed, matching the root-page CalEmbed, so it reads as a real extension
 * of the page rather than a popup interruption after the primary CTA. Forwards
 * the UTMs set by /ads/<code> (or the stored session attribution) so a booking
 * traces back to the email variant that earned it.
 */
export function AdsCallCta() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const carried = new URLSearchParams()
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = params.get(key)
      if (value) carried.set(key, value)
    }
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
    const calLink = query
      ? `august-marketing-ceo/purescale-creative-strategy-call?${query}`
      : 'august-marketing-ceo/purescale-creative-strategy-call'

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

      Cal.ns["adscall"]("inline", {
        elementOrSelector: "#my-cal-inline-adscall",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" },
        calLink: "${calLink}",
      });

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
    <section className="border-t border-white/10 px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Want us to go further?
        </p>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
          Talk to the team about taking over your ad account.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-gray-400">
          The $97 batch is a sample. If it lands, some brands want more than ten creatives —
          they want us running point on their whole creative pipeline. Book fifteen minutes
          and we&apos;ll talk through what that looks like for you.
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-xl font-bold text-white">$600M+</p>
            <p className="mt-1 text-xs text-gray-500">Driven for DTC brands</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-xl font-bold text-white">$9M → $26M</p>
            <p className="mt-1 text-xs text-gray-500">Revice Denim, → $42M on track this year</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-xl font-bold text-white">9.3x ROAS</p>
            <p className="mt-1 text-xs text-gray-500">On L&apos;alingi&apos;s top campaign</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div
          id="my-cal-inline-adscall"
          style={{ width: '100%', height: '650px', overflow: 'scroll' }}
        />
      </div>
    </section>
  )
}
