"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

const CAL_NAMESPACE = "book-a-free-15-minute-consultation";

export default function CalBooking() {
  useEffect(() => {
    // Snippet oficial de încărcare Cal.com embed (identic cu cel din site-ul original)
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api = function (...apiArgs: any[]) {
              p(api, apiArgs);
            } as any;
            const namespace = args[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], args);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, args);
            }
            return;
          }
          p(cal, args);
        };
    })(window, "https://app.cal.eu/embed/embed.js", "init");

    window.Cal("init", CAL_NAMESPACE, { origin: "https://app.cal.eu" });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;
    window.Cal.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: "#my-cal-inline-book-a-free-15-minute-consultation",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: true },
      calLink: "upprmarketing/book-a-free-15-minute-consultation",
    });
    window.Cal.ns[CAL_NAMESPACE]("ui", { hideEventTypeDetails: true, layout: "month_view" });
  }, []);

  return (
    <div
      id="my-cal-inline-book-a-free-15-minute-consultation"
      style={{
        width: "100%",
        minHeight: 560,
        height: "clamp(560px,90vw,680px)",
        overflow: "visible",
        borderRadius: 14,
      }}
    />
  );
}
