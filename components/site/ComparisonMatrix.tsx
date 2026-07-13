"use client";

import { useState } from "react";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

type Category = "Speed" | "Cost" | "Expertise" | "Ownership";

const CATEGORIES: Category[] = ["Speed", "Cost", "Expertise", "Ownership"];

const COLUMNS = ["DIY", "Freelancer", "Generalist agency", "In-house hire", "UPPR"] as const;

type Row = {
  category: Category;
  label: string;
  values: [string, string, string, string, string];
};

const ROWS: Row[] = [
  // SPEED
  { category: "Speed", label: "Time to first flow live", values: ["Weeks, part-time", "1–2 weeks", "4–8 weeks", "4–10 weeks (hiring + ramp-up)", "2–3 weeks"] },
  { category: "Speed", label: "Time to full core setup", values: ["1–3 months", "2–4 weeks", "2–3 months", "2–3 months", "3–4 weeks"] },
  { category: "Speed", label: "Response time when something breaks", values: ["Whenever you notice", "Depends on availability", "Ticket queue, 24–72h", "Immediate, if not on leave", "Same business day"] },
  { category: "Speed", label: "Cadence of ongoing optimization", values: ["When you find time", "Ad hoc", "Monthly, if scheduled", "Continuous, if prioritized", "Continuous"] },

  // COST
  { category: "Cost", label: "Direct monthly cost", values: ["$0 + your time", "$500–2,000", "$2,000–6,000", "$4,000–8,000+ (salary & benefits)", "Scoped per account"] },
  { category: "Cost", label: "Hidden costs", values: ["Tool subscriptions, trial & error", "Revision rounds, scope creep", "Add-ons billed separately", "Recruiting, training, turnover", "None — fixed scope"] },
  { category: "Cost", label: "Cost to scale up", values: ["Your time, linearly", "Renegotiate or hire more", "Retainer tier increase", "Second hire, new ramp-up", "Scoped, no re-hiring"] },
  { category: "Cost", label: "Cost if it doesn't work out", values: ["Time already spent", "Contract exit, restart search", "Contract exit, restart search", "Severance, re-hiring, lost months", "No long-term lock-in"] },

  // EXPERTISE
  { category: "Expertise", label: "Platform-specific depth", values: ["Self-taught", "Varies widely", "Spread across 5+ channels", "One person's ceiling", "TheMarketer-native, daily"] },
  { category: "Expertise", label: "Deliverability expertise", values: ["Learn by getting flagged", "Rarely a specialty", "Generalist knowledge", "Depends on hire", "Core specialty"] },
  { category: "Expertise", label: "Segmentation sophistication", values: ["Basic, manual", "Depends on the person", "Templated approach", "Depends on hire", "Behavior-based, ongoing"] },
  { category: "Expertise", label: "A/B testing rigor", values: ["Rare, unstructured", "Inconsistent", "Occasional", "Depends on bandwidth", "Built into the cadence"] },
  { category: "Expertise", label: "Copy & design quality", values: ["DIY templates", "One person's style", "Agency house style", "Depends on hire", "Dedicated design + copy" ] },
  { category: "Expertise", label: "Reporting depth", values: ["Native platform reports", "Basic recap emails", "Monthly summary deck", "Internal, if tracked", "Live dashboard, per-campaign"] },

  // OWNERSHIP
  { category: "Ownership", label: "Who owns your list & templates", values: ["You", "You (usually)", "Often tied to their systems", "You", "Always you, no lock-in"] },
  { category: "Ownership", label: "Contract flexibility", values: ["N/A", "Varies", "Often 6–12mo minimum", "Employment terms", "No long-term contract"] },
  { category: "Ownership", label: "Continuity if one person leaves", values: ["N/A — it's you", "Restart from scratch", "Rotating account managers", "Full restart", "Dedicated pod, not one person"] },
  { category: "Ownership", label: "Single point of accountability", values: ["You", "Usually, yes", "Rotates often", "Yes, until they leave", "Yes — same pod throughout"] },
];

export default function ComparisonMatrix() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const visibleRows = activeCategory === "All" ? ROWS : ROWS.filter((r) => r.category === activeCategory);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, justifyContent: "center" }}>
        {(["All", ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: `1px solid ${activeCategory === cat ? "rgba(168,85,247,.5)" : "rgba(255,255,255,.1)"}`,
              background: activeCategory === cat ? "rgba(168,85,247,.18)" : "transparent",
              color: activeCategory === cat ? "#F5F3FF" : "#8B84A0",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              transition: "all .2s",
              ...mono,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          overflowX: "auto",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,.08)",
          background: "linear-gradient(165deg,#130C24,#0A0718)",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 900 }}>
          <thead>
            <tr>
              <th
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                  background: "#160F2E",
                  textAlign: "left",
                  padding: "16px 18px",
                  fontSize: 11.5,
                  color: "#6E6980",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                  minWidth: 220,
                  ...mono,
                }}
              >
                Compared on
              </th>
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  style={{
                    textAlign: "left",
                    padding: "16px 18px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: i === 4 ? "#F5F3FF" : "#B8B2CC",
                    background: i === 4 ? "linear-gradient(135deg,rgba(124,58,237,.35),rgba(168,85,247,.25))" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,.08)",
                    minWidth: 160,
                    whiteSpace: "nowrap",
                    ...heading,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, ri) => (
              <tr key={row.label}>
                <td
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    background: "#130C24",
                    padding: "14px 18px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#C4BCDC",
                    borderBottom: ri < visibleRows.length - 1 ? "1px solid rgba(255,255,255,.05)" : undefined,
                  }}
                >
                  {row.label}
                </td>
                {row.values.map((val, i) => (
                  <td
                    key={i}
                    style={{
                      padding: "14px 18px",
                      fontSize: 13,
                      color: i === 4 ? "#4ADE80" : "#8B84A0",
                      fontWeight: i === 4 ? 600 : 400,
                      background: i === 4 ? "rgba(168,85,247,.06)" : "transparent",
                      borderBottom: ri < visibleRows.length - 1 ? "1px solid rgba(255,255,255,.05)" : undefined,
                    }}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "#6E6980" }}>
        Scroll horizontally on smaller screens →
      </p>
    </div>
  );
}
