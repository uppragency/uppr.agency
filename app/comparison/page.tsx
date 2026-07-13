import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import ComparisonMatrix from "@/components/site/ComparisonMatrix";

export const metadata: Metadata = {
  title: "DIY vs Freelancer vs Agency vs In-house vs UPPR | Compare Retention Options",
  description:
    "A detailed, honest comparison of every way to run email & SMS retention marketing — DIY, freelancer, generalist agency, in-house hire, or UPPR.",
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

const PROFILES = [
  {
    title: "Pre-revenue or under 500 contacts",
    verdict: "DIY, for now",
    desc: "There isn't enough list yet to justify outside help. Get the basics live yourself, revisit once you have a real list to work with.",
  },
  {
    title: "You already run flows, want occasional help",
    verdict: "Freelancer",
    desc: "If the need is narrow and infrequent — a one-off flow build, a design refresh — a freelancer can be the right scope-fit.",
  },
  {
    title: "Retention is one line item among many channels",
    verdict: "Generalist agency",
    desc: "If you're already bundling ads, SEO, and social with one agency and just want email checked off the list, this can work — with the trade-offs in the table above.",
  },
  {
    title: "Retention is a top-3 priority and you have the budget",
    verdict: "In-house hire or UPPR",
    desc: "Both can work well here. In-house means direct control but a hiring and ramp-up cycle. UPPR means senior-level execution starting in weeks, without the hiring risk.",
  },
  {
    title: "You want senior execution without managing it yourself",
    verdict: "UPPR",
    desc: "If you want retention run by people who do only this, without the overhead of hiring, training, or babysitting a rotating account manager — this is exactly the gap UPPR fills.",
  },
];

const FAQS = [
  {
    q: "Isn't DIY just cheaper?",
    a: "In direct dollars, yes, at first. But the real cost is the hours you spend learning platform mechanics, deliverability rules, and segmentation logic — hours that don't compound the way a built flow does. DIY makes sense with a small list and real time to invest; it stops making sense once your list (and the revenue at stake) grows.",
  },
  {
    q: "Why not just hire a freelancer?",
    a: "Freelancers are a good fit for narrow, well-defined tasks. The risk is continuity — if they get busy, move on, or the scope grows past what one person handles, you're back to searching. There's also no backup pod if they're unavailable when something breaks.",
  },
  {
    q: "What's actually wrong with a generalist agency?",
    a: "Nothing, for some businesses. The trade-off is depth: an agency running ads, SEO, social, and email for you is spreading attention across channels, and retention often becomes the channel that gets the least strategic thinking, not because it doesn't matter, but because it's one of five things on their plate.",
  },
  {
    q: "When does hiring in-house make more sense than an agency?",
    a: "Usually once retention revenue is large enough that a full-time specialist is clearly justified by the numbers, and you want the strategic thinking to live inside the company long-term. The trade-off is the hiring cycle, ramp-up time, and the risk of losing all continuity if that person leaves.",
  },
  {
    q: "How is UPPR actually different from a typical retention agency?",
    a: "Retention is the only service UPPR offers — not one line item bundled with ads and social. That means the team lives inside theMarketer daily, and the same dedicated pod (not a rotating account manager) stays on your account from setup through ongoing optimization.",
  },
];

export default function ComparisonPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>THE FULL COMPARISON</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(30px,5.5vw,48px)", lineHeight: 1.12, letterSpacing: "-.02em" }}>
            Five ways to run retention. <span className="grad-text">One honest comparison.</span>
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.6, color: "#A29DB8" }}>
            DIY, freelancer, generalist agency, in-house hire, or UPPR — eighteen points of comparison, no spin either way.
          </p>
        </header>

        {/* MATRIX */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <ComparisonMatrix />
        </section>

        {/* COST CONTEXT */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <SectionLabel>THE REAL NUMBERS</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              What each option actually costs, all-in.
            </h2>
          </div>
          <div
            style={{
              borderRadius: 20,
              padding: "clamp(24px,4vw,32px)",
              background: "linear-gradient(165deg,#150E22,#0B0817)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <p style={{ margin: "0 0 20px", fontSize: 14, lineHeight: 1.6, color: "#8B84A0" }}>
              These are illustrative ranges based on typical SMB budgets, not fixed quotes — actual costs vary by list size, scope, and market. What they don&apos;t show is opportunity cost: time spent learning, hiring, or managing is time not spent on the parts of the business only you can do.
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                ["DIY", "$0 direct + your time", "#8B84A0"],
                ["Freelancer", "$500 – $2,000 / mo", "#8B84A0"],
                ["Generalist agency", "$2,000 – $6,000 / mo", "#8B84A0"],
                ["In-house hire", "$4,000 – $8,000+ / mo (fully loaded)", "#8B84A0"],
                ["UPPR", "Scoped per account — ask on the call", "#4ADE80"],
              ].map(([label, value, color]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,.02)" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#C4BCDC" }}>{label}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: color as string, ...mono }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DECISION GUIDE */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>WHICH ONE IS RIGHT FOR YOU</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Match your situation to the option.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 18 }}>
            {PROFILES.map((p) => (
              <div key={p.title} className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span
                    style={{
                      display: "inline-block",
                      alignSelf: "flex-start",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".04em",
                      textTransform: "uppercase",
                      color: p.verdict === "UPPR" ? "#4ADE80" : "#D6C6FA",
                      background: p.verdict === "UPPR" ? "rgba(74,222,128,.12)" : "rgba(168,85,247,.12)",
                      padding: "5px 11px",
                      borderRadius: 999,
                      ...mono,
                    }}
                  >
                    {p.verdict}
                  </span>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 16.5, lineHeight: 1.35 }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <SectionLabel>OBJECTIONS, ANSWERED</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              The questions this comparison usually raises.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f) => (
              <div key={f.q} className="uppr-card">
                <details className="uppr-card-inner" style={{ padding: "18px 22px" }}>
                  <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 15, color: "#F5F3FF", listStyle: "none" }}>{f.q}</summary>
                  <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "#A29DB8" }}>{f.a}</p>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Not sure which column fits you?
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "#A29DB8" }}>
            15 minutes, no slide deck — we&apos;ll tell you honestly whether UPPR is the right fit or not.
          </p>
          <a href="/#lm-form" className="uppr-btn-primary" style={{ padding: "16px 28px", fontSize: 15.5, textDecoration: "none", display: "inline-block" }}>
            Book a free 15-minute consultation →
          </a>
        </section>

        <Footer />
      </div>
    </div>
  );
}
