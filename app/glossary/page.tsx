import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import { GLOSSARY_TERMS } from "@/lib/glossary-terms";

export const metadata: Metadata = {
  title: "Glossary | Email & SMS Retention Marketing Terms | UPPR Agency",
  description: "Plain-English definitions of the email and SMS retention marketing terms you'll actually run into.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default function GlossaryPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>GLOSSARY</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
            Retention marketing, in plain English.
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#A29DB8" }}>
            The terms that come up constantly in email and SMS retention — no jargon left unexplained.
          </p>
        </header>

        <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {GLOSSARY_TERMS.map((t) => (
              <div key={t.term} id={t.slug} style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,.06)", scrollMarginTop: 100 }}>
                <h2 style={{ margin: "0 0 6px", ...heading, fontWeight: 600, fontSize: 17, color: "#F5F3FF" }}>{t.term}</h2>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#A29DB8" }}>{t.def}</p>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

