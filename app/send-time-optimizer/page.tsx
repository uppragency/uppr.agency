import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import SendTimeOptimizerTool from "@/components/site/SendTimeOptimizerTool";

export const metadata: Metadata = {
  title: "Free Send Time Optimizer | UPPR Agency",
  description: "Get a recommended send day and time for your emails, based on your industry and timezone.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default function SendTimeOptimizerPage() {
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
            Send Time Optimizer
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#A29DB8" }}>
            Alege tipul de business și fusul orar — primești o recomandare de zi și oră de trimitere.
          </p>
        </header>

        <main style={{ maxWidth: 620, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(100px,14vw,140px)" }}>
          <SendTimeOptimizerTool />
        </main>

        <Footer />
      </div>
    </div>
  );
}
