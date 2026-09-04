'use client'
import { useEffect } from 'react'

/**
 * Inline booking calendar at the foot of /trial.
 *
 * The apply form is the qualified door (spend floor, then the calendar). This is
 * the unqualified one: a buyer who has read the whole page and would rather pick
 * a slot than answer four questions gets the calendar right here. The floor is
 * stated above the calendar and enforced again on the call.
 *
 * Own Cal namespace ("trialcall") so it does not fight the floating button's
 * "purescale-creative-strategy-call" namespace for the same ui/on handlers.
 * Carries UTMs forward the same way /ads does so the booking traces back to
 * whatever earned the click. Booking success fires the Schedule pixel event and
 * lands on /thankyou, matching the apply-form calendar.
 */
export function TrialBookCall() {
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

      Cal("init", "trialcall", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      Cal.ns["trialcall"]("inline", {
        elementOrSelector: "#my-cal-inline-trialcall",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" },
        calLink: "${calLink}",
      });

      Cal.ns["trialcall"]("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });

      Cal.ns["trialcall"]("on", {
        action: "bookingSuccessful",
        callback: function () {
          if (window.fbq) { window.fbq('track', 'Schedule'); }
          window.location.href = "/thankyou";
        }
      });
    `
    document.head.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 sm:p-4">
        <div
          id="my-cal-inline-trialcall"
          style={{ width: '100%', height: '650px', overflow: 'scroll' }}
        />
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        Rather answer four questions first?{' '}
        <a href="/trial/apply" className="text-cyan-300 hover:underline">
          Apply for the trial
        </a>{' '}
        and we will send you the calendar if you qualify.
      </p>
    </div>
  )
}
