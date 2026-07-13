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

export type VerticalData = {
  label: string;
  headline: string;
  subhead: string;
  painPoints: { title: string; desc: string }[];
  flows: { title: string; desc: string }[];
};

export default function VerticalTemplate({ data }: { data: VerticalData }) {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>{data.label}</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,5.5vw,46px)", lineHeight: 1.12, letterSpacing: "-.02em" }}>
            {data.headline}
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.6, color: "#A29DB8" }}>
            {data.subhead}
          </p>
        </header>

        {/* PAIN POINTS */}
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>THE SPECIFICS</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Built around how you actually sell.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 18 }}>
            {data.painPoints.map((p) => (
              <div key={p.title} className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 16.5 }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLOWS */}
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>WHAT WE'D BUILD FIRST</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Flows that fit this business model.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 18 }}>
            {data.flows.map((f) => (
              <div key={f.title} className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 16.5 }}>{f.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Let&apos;s see what applies to you.
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "#A29DB8" }}>
            15 minutes, no slide deck — a direct look at what a first 90 days would look like.
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
