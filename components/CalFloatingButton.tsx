'use client'
import { useEffect } from 'react'

export function CalFloatingButton() {
  useEffect(() => {
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

      Cal("init", "purescale-creative-strategy-call", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      Cal.ns["purescale-creative-strategy-call"]("floatingButton", {
        calLink: "august-marketing-ceo/purescale-creative-strategy-call",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true"
        },
        buttonText: "Book a call"
      });

      Cal.ns["purescale-creative-strategy-call"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    `
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
