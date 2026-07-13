"use client";

import { useState, useEffect } from "react";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const STEPS = [
  {
    day: "Day 0",
    label: "Welcome",
    icon: "👋",
    subject: "Welcome to the list 🎉",
    preview: "Thanks for joining — here's your 15% off code, ready whenever you are.",
  },
  {
    day: "Day 2",
    label: "Brand story",
    icon: "📖",
    subject: "Why we started this",
    preview: "A quick look at what makes the product different, no hard sell yet.",
  },
  {
    day: "Day 4",
    label: "Social proof",
    icon: "⭐",
    subject: "1,200+ five-star reviews",
    preview: "Don't just take our word for it — here's what real customers say.",
  },
  {
    day: "Day 7",
    label: "Bestsellers",
    icon: "🛍",
    subject: "The 5 most-loved picks",
    preview: "Here's what everyone's actually buying first, curated for you.",
  },
  {
    day: "Day 10–14",
    label: "Last call",
    icon: "⏰",
    subject: "Your code expires tonight",
    preview: "Last chance to use your welcome discount before it's gone.",
  },
];

const STEP_DURATION = 2600;

export default function WelcomeFlowDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  const step = STEPS[active];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(360px,100%),1fr))", gap: "clamp(28px,5vw,48px)", alignItems: "center" }}>
      {/* TIMELINE */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {STEPS.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div key={s.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    flex: "none",
                    background: isActive
                      ? "linear-gradient(135deg,#7C3AED,#A855F7)"
                      : isPast
                      ? "rgba(168,85,247,.18)"
                      : "rgba(255,255,255,.05)",
                    border: isActive ? "none" : "1px solid rgba(255,255,255,.1)",
                    boxShadow: isActive ? "0 0 18px rgba(168,85,247,.6)" : undefined,
                    transition: "all .4s ease",
                  }}
                >
                  {s.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 30,
                      background: isPast ? "rgba(168,85,247,.5)" : "rgba(255,255,255,.08)",
                      transition: "background .4s ease",
                    }}
                  />
                )}
              </div>
              <div style={{ paddingTop: 6, paddingBottom: i < STEPS.length - 1 ? 22 : 0 }}>
                <div style={{ fontSize: 11, ...mono, color: isActive ? "#C084FC" : "#6E6980", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", transition: "color .4s ease" }}>
                  {s.day}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: isActive ? "#F5F3FF" : "#8B84A0", transition: "color .4s ease" }}>
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* INBOX MOCKUP */}
      <div
        style={{
          borderRadius: 24,
          padding: 1,
          background: "linear-gradient(160deg,rgba(168,85,247,.6),rgba(255,255,255,.04) 40%,rgba(124,58,237,.35))",
          boxShadow: "0 30px 80px rgba(88,28,235,.35)",
        }}
      >
        <div style={{ background: "linear-gradient(165deg,#160F2E,#0C0820)", borderRadius: 23, padding: "clamp(20px,3vw,28px)", minHeight: 260 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <span style={{ fontWeight: 700, fontSize: 11, color: "#B8B2CC", letterSpacing: ".06em", textTransform: "uppercase", ...mono }}>
              WELCOME_SERIES.flow
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: "#4ADE80", ...mono }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: "#4ADE80", animation: "pulseDot 1.8s infinite", boxShadow: "0 0 8px #4ADE80" }} />
              AUTO-RUNNING
            </span>
          </div>

          <div
            key={active}
            style={{
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              animation: "riseIn .5s cubic-bezier(.2,.8,.2,1) both",
            }}
          >
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f0", fontFamily: "Arial,sans-serif" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: "#202124", fontSize: 13.5 }}>Your Brand</span>
                <span style={{ fontSize: 11.5, color: "#5f6368" }}>{step.day}</span>
              </div>
              <div style={{ fontWeight: 700, color: "#202124", fontSize: 14.5, marginBottom: 4 }}>{step.subject}</div>
              <div style={{ fontSize: 13, color: "#5f6368", lineHeight: 1.5 }}>{step.preview}</div>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#9aa0a6", ...mono }}>{step.label}</span>
              <span style={{ fontSize: 11, color: "#4ADE80", fontWeight: 700, ...mono }}>opened</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 5, marginTop: 18, justifyContent: "center" }}>
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === active ? 20 : 6,
                  height: 6,
                  borderRadius: 999,
                  background: i === active ? "linear-gradient(90deg,#A855F7,#C084FC)" : "rgba(255,255,255,.15)",
                  transition: "all .4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
