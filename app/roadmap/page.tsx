import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Roadmap | UPPR Agency",
  description: "What's shipped, in progress, and planned for the UPPR Agency dashboard and platform.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const COLUMNS = [
  {
    label: "Shipped",
    color: "#4ADE80",
    items: [
      "Client dashboard with real-time, per-newsletter reporting",
      "Profit & margin tracking, break-even indicator, portfolio-wide profit view",
      "5 free tools: Subject Line Grader, Deliverability Checker, List Health Check, Send Time Optimizer, Spam Word Checker, Unsubscribe Rate Calculator",
      "One-click PDF export, audit logging, and admin portfolio overview",
      "18-point comparison page, industry pages, and platform migration guides",
      "Month timeline, focus mode, and anonymized portfolio comparison on the client dashboard",
      "Automatic milestone celebrations for collaboration anniversaries and revenue thresholds",
      "Free-form report tags, suspicious-data warnings, and newsletter duplication in admin",
      "Live infrastructure monitoring page (database size & table breakdown)",
      "Auto-linked glossary terms inside blog articles",
    ],
  },
  {
    label: "In progress",
    color: "#A855F7",
    items: [
      "Expanded interactive demo section with live flow walkthroughs",
      "Deeper platform-usage demos for prospective clients",
    ],
  },
  {
    label: "Planned",
    color: "#FBBF24",
    items: [
      "Public pricing page with indicative packages",
      "Detailed case studies per client vertical",
      "Full Romanian-language homepage (beyond the existing RO landing page)",
      "Expanded template gallery",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)" }}>
          <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>[ WHAT'S NEXT ]</span>
          <h1 style={{ margin: "16px 0 8px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Roadmap
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: "#A29DB8" }}>What's already live, what's actively being built, and what's planned next.</p>
        </header>

        <main style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 20 }}>
            {COLUMNS.map((col) => (
              <div key={col.label} className="uppr-card">
                <div className="uppr-card-inner">
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".04em",
                      textTransform: "uppercase",
                      color: col.color,
                      background: `${col.color}20`,
                      padding: "5px 11px",
                      borderRadius: 999,
                      marginBottom: 16,
                      ...mono,
                    }}
                  >
                    {col.label}
                  </span>
                  <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.items.map((item, i) => (
                      <li key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
