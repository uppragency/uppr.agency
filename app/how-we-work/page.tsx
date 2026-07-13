import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";

export const metadata: Metadata = {
  title: "How We Work | UPPR Agency",
  description: "How UPPR actually runs an account day to day — communication, approvals, cadence, and who does what.",
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

const WEEK = [
  { day: "Monday", task: "Campaign for the week gets drafted — subject lines, offer, segment." },
  { day: "Tuesday", task: "You get the draft for approval. Usually a same-day back-and-forth, not a ticket queue." },
  { day: "Wednesday", task: "Send goes out at the tested best time for your list. Flows keep running in the background, untouched." },
  { day: "Thursday", task: "Results come in — open rate, click rate, revenue — visible on your dashboard, no waiting for a recap." },
  { day: "Friday", task: "Quick check-in on anything that needs attention before the following week, plus any flow tweaks." },
];

const PRINCIPLES = [
  { icon: "💬", title: "Direct communication", desc: "WhatsApp or email, straight to the people actually working your account — not a support ticket system with a rotating queue." },
  { icon: "✅", title: "You approve, we execute", desc: "Nothing goes out without your sign-off on the first few sends. Once trust is built, we can move to a lighter-touch review cadence if you prefer." },
  { icon: "📅", title: "Fixed cadence, not ad hoc", desc: "Campaigns follow a set calendar. Flows run continuously. Optimization happens on a schedule, not only when something breaks." },
  { icon: "📊", title: "You always see the numbers", desc: "Your dashboard updates in real time — you're never waiting for a monthly email to know what's working." },
  { icon: "🔁", title: "Same people, every time", desc: "One dedicated pod stays on your account from setup through ongoing management — no rotating account managers." },
  { icon: "🚪", title: "Nothing hidden, no lock-in", desc: "Your list, templates, and TheMarketer account are always yours. We explain what we're doing and why, not just what the result was." },
];

export default function HowWeWorkPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,7vw,70px)", textAlign: "center" }}>
          <div className="uppr-pill" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>THE PROCESS</span>
          </div>
          <h1 style={{ margin: "0 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(30px,5.5vw,48px)", lineHeight: 1.12, letterSpacing: "-.02em" }}>
            How we actually work, week to week.
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.6, color: "#A29DB8" }}>
            Not the pitch version — the real cadence, from a Monday draft to a Friday check-in.
          </p>
        </header>

        {/* PRINCIPLES */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>HOW WE OPERATE</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Six things that stay constant.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 18 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="uppr-card">
                <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 17 }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TYPICAL WEEK */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionLabel>A TYPICAL WEEK</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              What actually happens, day by day.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {WEEK.map((w, i) => (
              <div key={w.day} style={{ display: "flex", gap: 20, padding: "18px 0", borderBottom: i < WEEK.length - 1 ? "1px solid rgba(255,255,255,.06)" : undefined }}>
                <span style={{ flex: "none", width: 90, fontSize: 12.5, fontWeight: 700, color: "#A855F7", ...mono, textTransform: "uppercase", letterSpacing: ".04em", paddingTop: 2 }}>
                  {w.day}
                </span>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#C4BCDC" }}>{w.task}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(80px,10vw,120px)", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Want to see if this cadence fits you?
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "#A29DB8" }}>
            15 minutes, no slide deck — we'll walk through exactly how the first month would look.
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
