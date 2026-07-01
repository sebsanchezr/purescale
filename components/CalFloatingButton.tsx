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

      Cal("init", "15min", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      Cal.ns["15min"]("floatingButton", {
        calLink: "august-marketing-ceo/15min",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true"
        },
        buttonText: "Book a Free Call"
      });

      Cal.ns["15min"]("ui", {
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
