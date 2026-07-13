import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

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
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 36px" }}>
            <SectionLabel>PART ONE — FOR THEM</SectionLabel>
            <h2 style={{ margin: "16px 0 12px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              What your customers <span className="grad-text">see and receive</span>.
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#A29DB8" }}>
              Every flow that runs quietly in the background, from the moment someone joins your list to the moment they come back.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 18 }}>
            {CUSTOMER_TOUCHPOINTS.map((t) => (
              <TouchpointCard key={t.title} {...t} />
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: "#6E6980" }}>
            Interactive, live demos of each flow are coming to this page soon.
          </p>
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
