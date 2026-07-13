import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import ListHealthCheckTool from "@/components/site/ListHealthCheckTool";

export const metadata: Metadata = {
  title: "Free List Health Check | UPPR Agency",
  description: "6 quick questions to estimate how healthy your email list actually is — free, no signup required.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default function ListHealthCheckPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(40px,6vw,60px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>FREE TOOL</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,5vw,42px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            List Health Check
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#A29DB8" }}>
            6 întrebări rapide, un scor clar — vezi cât de sănătoasă e lista ta de email chiar acum.
          </p>
        </header>

        <main style={{ maxWidth: 620, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(100px,14vw,140px)" }}>
          <ListHealthCheckTool />
        </main>

        <Footer />
      </div>
    </div>
  );
}
