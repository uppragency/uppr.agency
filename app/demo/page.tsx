import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import FlowDemoTabs from "@/components/site/FlowDemoTabs";

export const metadata: Metadata = {
  title: "Demo | UPPR Agency",
  description: "See what your customers experience, and what you see on your reporting dashboard.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>
      [ {children} ]
    </span>
  );
}

const CUSTOMER_TOUCHPOINTS = [
  {
    icon: "👋",
    title: "Welcome series",
    desc: "5 emails over 2 weeks, from first-touch discount to last-call urgency — timed automatically from signup.",
  },
  {
    icon: "🛒",
    title: "Abandoned cart recovery",
    desc: "A short, tightly-timed sequence that brings someone back to a cart they left, before they forget why they wanted it.",
  },
  {
    icon: "🏆",
    title: "Loyalty & rewards",
    desc: "Points, tiers, and perks that show up right where a customer already is — inbox, on-site, or SMS.",
  },
  {
    icon: "💬",
    title: "SMS win-back",
    desc: "A short, direct nudge for contacts who've gone quiet, on the channel with the highest open rate there is.",
  },
];

const CAMPAIGN_TYPES = [
  {
    icon: "💸",
    title: "Sales emails",
    desc: "Direct promotional sends when you have something specific to push — a new product, a restock, a seasonal push.",
  },
  {
    icon: "🎁",
    title: "Offers & promotions",
    desc: "Discount codes, bundle deals, flash sales — timed and segmented so they land with the right people, not everyone.",
  },
  {
    icon: "📰",
    title: "Informational newsletters",
    desc: "Company updates, educational content, behind-the-scenes — keeps your list engaged even in weeks you're not selling.",
  },
  {
    icon: "🧩",
    title: "Any other newsletter type",
    desc: "Product launches, event invites, surveys, re-announcements — whatever your business needs to send, built into the same calendar.",
  },
];

const CAPTURE_TOOLS = [
  {
    icon: "⊞",
    title: "Subscribe popups",
    desc: "On-site popups that turn anonymous visitors into contacts you can actually reach again — timed, not annoying.",
  },
  {
    icon: "📋",
    title: "Data collection",
    desc: "Beyond just an email — birthday, preferences, purchase intent — whatever helps segment and personalize later.",
  },
];

const DASHBOARD_FEATURES = [
  {
    icon: "📊",
    title: "Every campaign, broken down",
    desc: "Sent, open rate, click rate, transactions, revenue — per newsletter, not just a monthly average.",
  },
  {
    icon: "💰",
    title: "Real profit, not just revenue",
    desc: "What you paid for the platform and for us, subtracted automatically — you see actual margin, every month.",
  },
  {
    icon: "📈",
    title: "Trend charts that update themselves",
    desc: "Revenue, profit, and engagement over time, with month-over-month and year-over-year comparisons built in.",
  },
  {
    icon: "📄",
    title: "One-click PDF export",
    desc: "Every monthly report, formatted and ready to download or forward internally, whenever you need it.",
  },
];

function TouchpointCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="uppr-card">
      <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 17 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{desc}</p>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>SEE IT IN ACTION</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(32px,5.5vw,50px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Two sides of the same system.
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(15.5px,2vw,17px)", lineHeight: 1.6, color: "#A29DB8" }}>
            What your customers experience on the other end of a flow — and what you see on your reporting dashboard, every single month.
          </p>
        </header>

        {/* SECTION 1 — CUSTOMERS & VISITORS */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(30px,5vw,50px) clamp(18px,5vw,28px)" }}>
          <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 44px" }}>
            <SectionLabel>PART ONE — FOR THEM</SectionLabel>
            <h2 style={{ margin: "16px 0 12px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              What your customers <span className="grad-text">see and receive</span>.
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A29DB8" }}>
              Not just automated flows — everything we actually send on your behalf, from the popup that captures a visitor to the email that closes a sale.
            </p>
          </div>

          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 16 }}>
            Automated flows
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 18, marginBottom: 44 }}>
            {CUSTOMER_TOUCHPOINTS.map((t) => (
              <TouchpointCard key={t.title} {...t} />
            ))}
          </div>

          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 16 }}>
            Campaigns we send for you
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 18, marginBottom: 44 }}>
            {CAMPAIGN_TYPES.map((t) => (
              <TouchpointCard key={t.title} {...t} />
            ))}
          </div>

          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 16 }}>
            Growing your list
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 18, marginBottom: 44 }}>
            {CAPTURE_TOOLS.map((t) => (
              <TouchpointCard key={t.title} {...t} />
            ))}
          </div>

          <div
            style={{
              borderRadius: 20,
              padding: "clamp(24px,4vw,32px)",
              background: "linear-gradient(135deg,rgba(74,222,128,.08),rgba(168,85,247,.06))",
              border: "1px solid rgba(74,222,128,.2)",
              marginBottom: 48,
              display: "flex",
              gap: 18,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 28 }}>🤝</span>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h3 style={{ margin: "0 0 6px", ...heading, fontWeight: 600, fontSize: 17, color: "#F5F3FF" }}>
                Real communication, not just automation
              </h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#A29DB8" }}>
                Behind every send is someone who knows your catalog and your calendar — writing sales emails when you have something to push, not just letting flows run untouched. Automation handles the repetitive moments; a person handles the ones that need judgment.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 32px" }}>
            <span className="uppr-label" style={{ ...mono, color: "#4ADE80", fontSize: 11.5 }}>
              LIVE PREVIEW — PICK A FLOW
            </span>
          </div>
          <FlowDemoTabs />
        </section>

        {/* SECTION 2 — YOU (DASHBOARD) */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(50px,7vw,80px) clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 36px" }}>
            <SectionLabel>PART TWO — FOR YOU</SectionLabel>
            <h2 style={{ margin: "16px 0 12px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              What you see <span className="grad-text">on your dashboard</span>.
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A29DB8" }}>
              A private, real-time report of exactly what's working — no waiting for a monthly email.
            </p>
          </div>

          <div
            style={{
              borderRadius: 24,
              padding: 1,
              background: "linear-gradient(160deg,rgba(168,85,247,.6),rgba(255,255,255,.04) 40%,rgba(124,58,237,.35))",
              boxShadow: "0 30px 80px rgba(88,28,235,.3)",
              marginBottom: 32,
            }}
          >
            <div style={{ background: "linear-gradient(165deg,#160F2E,#0C0820)", borderRadius: 23, padding: "clamp(24px,4vw,36px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontWeight: 700, fontSize: 11, color: "#B8B2CC", letterSpacing: ".06em", textTransform: "uppercase", ...mono }}>
                  CLIENT_DASHBOARD.preview
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: "#4ADE80", ...mono }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: "#4ADE80", boxShadow: "0 0 8px #4ADE80" }} />
                  LIVE DATA
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(140px,100%),1fr))", gap: 14 }}>
                {[
                  { label: "Revenue campanii", value: "18,992 Lei", color: "#4ADE80" },
                  { label: "Profit net", value: "12,410 Lei", color: "#A855F7" },
                  { label: "Marjă", value: "65.4%", color: "#FDBA74" },
                  { label: "Open rate", value: "42%", color: "#60A5FA" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 14, padding: "14px 16px" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: stat.color, ...mono }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: "#8B84A0", marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ fontSize: 10.5, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".03em", display: "block", marginBottom: 14 }}>
                  Funnel campanie — Newsletter Iulie
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(110px,100%),1fr))", gap: 0 }}>
                  {[
                    { label: "Trimise", value: "4.263", pct: 100, color: "#60A5FA" },
                    { label: "Deschise", value: "1.792", pct: 42, color: "#A855F7" },
                    { label: "Click-uri", value: "316", pct: 7.4, color: "#C084FC" },
                    { label: "Conversii", value: "29", pct: 0.7, color: "#4ADE80" },
                  ].map((s, i) => (
                    <div key={s.label} style={{ padding: "0 16px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,.06)" : undefined }}>
                      <div style={{ ...heading, fontWeight: 700, fontSize: 19 }}>{s.value}</div>
                      <div style={{ fontSize: 10.5, color: "#8B84A0", margin: "2px 0 8px" }}>{s.label}</div>
                      <div style={{ height: 5, borderRadius: 999, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                        <div style={{ width: `${Math.max(4, s.pct)}%`, height: "100%", background: s.color, borderRadius: 999 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ fontSize: 10.5, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".03em", display: "block", marginBottom: 14 }}>
                  Trend revenue — ultimele 6 luni
                </span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90 }}>
                  {[38, 45, 52, 60, 71, 100].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                      <div
                        style={{
                          width: "100%",
                          height: `${h}%`,
                          borderRadius: "5px 5px 0 0",
                          background: i === 5 ? "linear-gradient(180deg,#C084FC,#7C3AED)" : "rgba(168,85,247,.3)",
                          boxShadow: i === 5 ? "0 0 16px rgba(168,85,247,.5)" : undefined,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 18 }}>
            {DASHBOARD_FEATURES.map((f) => (
              <TouchpointCard key={f.title} {...f} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/#lm-form" className="uppr-btn-primary" style={{ padding: "16px 28px", fontSize: 15.5, textDecoration: "none" }}>
              Get access to your own dashboard →
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
