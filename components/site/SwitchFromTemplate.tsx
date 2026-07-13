import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>
      [ {children} ]
    </span>
  );
}

const MIGRATION_STEPS = [
  { title: "Free audit", desc: "We review your current setup, list, and flows before touching anything." },
  { title: "Export & migrate", desc: "Your list, tags, and templates move over — nothing gets left behind or lost." },
  { title: "Rebuild in TheMarketer", desc: "Flows get rebuilt properly on the new platform, tested before anything goes live." },
  { title: "Parallel run, then cutover", desc: "We run both systems briefly to confirm everything fires correctly, then switch fully." },
];

export type SwitchFromData = {
  competitor: string;
  reasons: { title: string; desc: string }[];
  whatStays: string;
};

export default function SwitchFromTemplate({ data }: { data: SwitchFromData }) {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>SWITCHING PLATFORMS</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,5vw,44px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Switching from {data.competitor}? <span className="grad-text">Here&apos;s what actually changes.</span>
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.6, color: "#A29DB8" }}>
            Your list, your history, your templates — none of it gets lost in the move.
          </p>
        </header>

        {/* REASONS */}
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>WHAT WE HEAR FROM SWITCHERS</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Common reasons businesses look to move.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 18 }}>
            {data.reasons.map((r) => (
              <div key={r.title} className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 16.5 }}>{r.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MIGRATION STEPS */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>THE MIGRATION</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              What the switch actually looks like.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {MIGRATION_STEPS.map((s, i) => (
              <div key={s.title} style={{ display: "flex", gap: 18, padding: "18px 0", borderBottom: i < MIGRATION_STEPS.length - 1 ? "1px solid rgba(255,255,255,.06)" : undefined }}>
                <span style={{ flex: "none", width: 30, height: 30, borderRadius: 999, background: "rgba(168,85,247,.15)", color: "#C084FC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, ...mono }}>
                  {i + 1}
                </span>
                <div>
                  <h3 style={{ margin: "0 0 4px", ...heading, fontWeight: 600, fontSize: 15.5 }}>{s.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT STAYS */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div
            style={{
              borderRadius: 20,
              padding: "clamp(24px,4vw,32px)",
              background: "linear-gradient(165deg,#150E22,#0B0817)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <span style={{ fontSize: 20 }}>✓</span>
            <p style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#C4BCDC" }}>{data.whatStays}</p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Free consultation, before you decide anything.
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "#A29DB8" }}>
            15 minutes to see exactly what a migration would look like for your account.
          </p>
          <a href="/#lm-form" className="uppr-btn-primary" style={{ padding: "16px 28px", fontSize: 15.5, textDecoration: "none", display: "inline-block" }}>
            Book a free 15-minute consultation →
          </a>
          <p style={{ marginTop: 32, fontSize: 11.5, color: "#6E6980" }}>
            {data.competitor} is a trademark of its respective owner. UPPR Agency is not affiliated with or endorsed by {data.competitor}.
          </p>
        </section>

        <Footer />
      </div>
    </div>
  );
}
