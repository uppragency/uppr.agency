import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "Thank You | UPPR Agency",
  description: "Thanks for reaching out — here's what happens next.",
  robots: { index: false, follow: true },
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const NEXT_STEPS = [
  { icon: "📧", title: "Check your inbox", desc: "A confirmation is on its way. If it's not there in a few minutes, check spam — first emails sometimes land there." },
  { icon: "🔍", title: "We'll take a quick look first", desc: "Before we talk, we review whatever you shared so the conversation isn't spent on basics." },
  { icon: "📞", title: "15 minutes, no slide deck", desc: "Just a direct conversation about where the opportunities are, and whether UPPR is actually the right fit." },
];

export default function ThankYouPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <main style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(130px,20vw,190px) clamp(18px,5vw,28px) clamp(100px,14vw,140px)", textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "linear-gradient(135deg,#4ADE80,#22C55E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 28,
              boxShadow: "0 0 30px rgba(74,222,128,.4)",
            }}
          >
            ✓
          </div>
          <h1 style={{ margin: "0 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(28px,5vw,42px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            You&apos;re in. <span className="grad-text">Thank you.</span>
          </h1>
          <p style={{ margin: "0 0 48px", fontSize: 15.5, lineHeight: 1.6, color: "#A29DB8" }}>
            We&apos;ve got your details. Here&apos;s exactly what happens next.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left", marginBottom: 48 }}>
            {NEXT_STEPS.map((s) => (
              <div key={s.title} className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22, flex: "none" }}>{s.icon}</span>
                  <div>
                    <h3 style={{ margin: "0 0 4px", ...heading, fontWeight: 600, fontSize: 15.5 }}>{s.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ margin: "0 0 20px", fontSize: 14, color: "#8B84A0" }}>
            While you wait, a couple of things worth a look:
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/blog" className="uppr-btn-secondary" style={{ padding: "12px 20px", fontSize: 13.5, textDecoration: "none" }}>
              Read the blog
            </Link>
            <Link href="/comparison" className="uppr-btn-secondary" style={{ padding: "12px 20px", fontSize: 13.5, textDecoration: "none" }}>
              Compare your options
            </Link>
            <a href="https://wa.me/40790682363" target="_blank" className="uppr-btn-secondary" style={{ padding: "12px 20px", fontSize: 13.5, textDecoration: "none" }}>
              Message us on WhatsApp
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
