"use client";

import { useState } from "react";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const INDUSTRIES = [
  {
    key: "ecommerce",
    label: "Ecommerce",
    days: "Tuesday, Wednesday, Thursday",
    time: "10:00–12:00 or 19:00–21:00",
    note: "Late-morning catches people between tasks; evening catches browsing on the couch. Avoid Monday mornings — inboxes are flooded.",
  },
  {
    key: "services",
    label: "Servicii (booking-based)",
    days: "Monday, Tuesday, Wednesday",
    time: "09:00–11:00",
    note: "Early in the week and early in the day, while people are still planning their schedule for the days ahead.",
  },
  {
    key: "saas",
    label: "SaaS / B2B",
    days: "Tuesday, Wednesday, Thursday",
    time: "08:00–10:00 or 14:00–15:00",
    note: "Aligns with when professionals check email at the start of the workday, or right after the post-lunch dip.",
  },
  {
    key: "b2c-general",
    label: "B2C general / lifestyle",
    days: "Thursday, Friday, Saturday",
    time: "17:00–20:00",
    note: "End-of-week and weekend windows tend to have more relaxed, higher-engagement browsing.",
  },
];

const REGIONS = [
  { key: "ro", label: "România (EET/EEST)" },
  { key: "eu-west", label: "Vestul Europei (CET/CEST)" },
  { key: "uk", label: "UK (GMT/BST)" },
  { key: "us-east", label: "US East (EST/EDT)" },
];

export default function SendTimeOptimizerTool() {
  const [industry, setIndustry] = useState(INDUSTRIES[0].key);
  const [region, setRegion] = useState(REGIONS[0].key);
  const [showResult, setShowResult] = useState(false);

  const selected = INDUSTRIES.find((i) => i.key === industry)!;
  const selectedRegion = REGIONS.find((r) => r.key === region)!;

  return (
    <div>
      <div className="uppr-card" style={{ marginBottom: 20 }}>
        <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label className="uppr-label" style={{ display: "block", marginBottom: 10 }}>
              Ce tip de business ai?
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {INDUSTRIES.map((i) => (
                <button
                  key={i.key}
                  onClick={() => {
                    setIndustry(i.key);
                    setShowResult(false);
                  }}
                  style={{
                    padding: "9px 15px",
                    borderRadius: 999,
                    border: `1px solid ${industry === i.key ? "rgba(168,85,247,.5)" : "rgba(255,255,255,.1)"}`,
                    background: industry === i.key ? "rgba(168,85,247,.18)" : "transparent",
                    color: industry === i.key ? "#F5F3FF" : "#8B84A0",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="uppr-label" style={{ display: "block", marginBottom: 10 }}>
              Fusul orar principal al listei tale?
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {REGIONS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    setRegion(r.key);
                    setShowResult(false);
                  }}
                  style={{
                    padding: "9px 15px",
                    borderRadius: 999,
                    border: `1px solid ${region === r.key ? "rgba(168,85,247,.5)" : "rgba(255,255,255,.1)"}`,
                    background: region === r.key ? "rgba(168,85,247,.18)" : "transparent",
                    color: region === r.key ? "#F5F3FF" : "#8B84A0",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} className="uppr-btn-primary">
            Vezi recomandarea →
          </button>
        </div>
      </div>

      {showResult && (
        <div
          style={{
            borderRadius: 20,
            padding: 1,
            background: "linear-gradient(160deg,rgba(168,85,247,.6),rgba(255,255,255,.04))",
          }}
        >
          <div style={{ background: "linear-gradient(165deg,#160F2E,#0B0817)", borderRadius: 19, padding: "clamp(24px,4vw,32px)" }}>
            <div style={{ fontSize: 11, color: "#6E6980", ...mono, marginBottom: 10, textTransform: "uppercase", letterSpacing: ".04em" }}>
              Recomandare pentru {selected.label} · {selectedRegion.label}
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#8B84A0" }}>Zile</div>
                <div style={{ ...heading, fontWeight: 700, fontSize: 18, color: "#F5F3FF" }}>{selected.days}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#8B84A0" }}>Oră (local)</div>
                <div style={{ ...heading, fontWeight: 700, fontSize: 18, color: "#4ADE80" }}>{selected.time}</div>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#A29DB8" }}>{selected.note}</p>
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, color: "#6E6980", marginTop: 20, lineHeight: 1.6 }}>
        Recomandare orientativă, bazată pe benchmark-uri publice de industrie — nu pe datele contului tău. Cel mai bun mod de a afla ora ideală rămâne testarea A/B pe propria listă.
      </p>
    </div>
  );
}
