import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Changelog | UPPR Agency",
  description: "What's changed on the UPPR Agency dashboard and platform, month by month.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const ENTRIES = [
  {
    date: "July 2026",
    items: [
      "Added a full profit & margin tracker to the client dashboard — real profit, not just revenue",
      "New free tools: Deliverability Checker, List Health Check, Send Time Optimizer, Spam Word Checker, Unsubscribe Rate Calculator",
      "Client dashboard now shows month-over-month and year-over-year comparisons automatically",
      "One-click PDF export for any monthly report",
    ],
  },
  {
    date: "June 2026",
    items: [
      "Redesigned admin panel with a portfolio-wide overview — revenue, profit, and missing reports at a glance",
      "Added onboarding checklist and internal notes per client",
      "Newsletter-level reporting — every campaign broken down individually, not just a monthly average",
    ],
  },
  {
    date: "May 2026",
    items: [
      "Launched the client dashboard — real-time reporting, replacing monthly email recaps",
      "Rate limiting and audit logging added across admin actions",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)" }}>
          <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>[ PRODUCT UPDATES ]</span>
          <h1 style={{ margin: "16px 0 8px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Changelog
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: "#A29DB8" }}>What's changed on the dashboard and platform, month by month.</p>
        </header>

        <main style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {ENTRIES.map((entry) => (
              <div key={entry.date}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#C084FC", ...mono, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 14 }}>
                  {entry.date}
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {entry.items.map((item, i) => (
                    <li key={i} style={{ fontSize: 14.5, lineHeight: 1.6, color: "#C4BCDC" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
