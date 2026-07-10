import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import SiteInteractions from "@/components/site/SiteInteractions";
import Reveal from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Referral Program | UPPR Agency",
  description: "Refer a business to UPPR and get 20% of the contract value. No cap, no complicated tiers.",
};

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

const steps = [
  { no: "01", title: "Message Andrei directly", desc: <>Email <a href="mailto:andrei@uppr.agency" style={{ color: "#C084FC" }}>andrei@uppr.agency</a> or WhatsApp <a href="https://wa.me/40790682363" style={{ color: "#C084FC" }}>0790 682 363</a> with who you&apos;re referring.</> },
  { no: "02", title: "We check it's a fit", desc: "If the business matches who we actually work with, we reach out and run the same free consultation every lead gets." },
  { no: "03", title: "You get rewarded", desc: "If they sign on, you get 20% of the contract value agreed with them. That's it.", highlight: true },
];

const whoCanRefer = [
  "Current or past UPPR clients",
  "TheMarketer users and partners",
  "Agencies and freelancers who don't do retention",
  "Anyone in your network with a business that fits",
];

const faqs = [
  { q: "When do I actually get paid?", a: "Once the business you referred signs a contract with us. Andrei will confirm directly with you once that happens." },
  { q: "What counts as \"a fit\"?", a: "A small or mid-sized business with an existing customer list and a repeat-purchase or repeat-booking cycle — the same criteria we use for every lead, referred or not. If you're not sure, just send it and we'll tell you." },
  { q: "Do they need to become a paying client, or just book a call?", a: "A paying client. A booked call is a good start, but the reward is tied to them actually signing a contract, not just taking the meeting." },
  { q: "Is there a limit on how many businesses I can refer?", a: "No cap. Refer as many businesses as you'd like, and get 20% of the contract value for every one that becomes a client." },
  { q: "Can I refer a business I'm not directly connected to?", a: "The referral works best when there's a real introduction, even a short one. If we can't confirm the business heard about us through you, we may not be able to attribute the reward." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>
      [ {children} ]
    </span>
  );
}

export default function ReferralProgramPage() {
  return (
    <div style={{ position: "relative" }}>
      <SiteInteractions />
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <header style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(50px,8vw,80px)", textAlign: "center" }}>
          <div style={{ animation: "riseIn .8s cubic-bezier(.2,.8,.2,1) both" }}>
            <div className="uppr-pill" style={{ marginBottom: 26 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>UPPR Referral Program</span>
            </div>
            <h1 style={{ margin: "0 0 22px", ...heading, fontWeight: 700, fontSize: "clamp(34px,6.4vw,60px)", lineHeight: 1.08, letterSpacing: "-.03em" }}>
              Know a business leaking revenue in their <span className="grad-text">customers&apos; inboxes</span>?
            </h1>
            <p style={{ margin: "0 auto 32px", fontSize: "clamp(15.5px,2vw,18px)", lineHeight: 1.55, color: "#A29DB8", maxWidth: 600 }}>
              Tell them about UPPR. If they become a client, you get rewarded — no cap, no complicated tiers.
            </p>
            <a href="#refer-form" className="uppr-btn-primary" style={{ display: "inline-block", padding: "17px 30px", fontSize: 16, textDecoration: "none" }}>
              Refer a business →
            </a>
          </div>
        </header>

        {/* HOW IT WORKS */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(40px,7vw,70px) clamp(18px,5vw,28px)" }}>
          <Reveal style={{ textAlign: "center", maxWidth: 600, marginLeft: "auto", marginRight: "auto", marginBottom: 44 }}>
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
              Three steps. <span className="grad-text">No paperwork.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 20 }}>
            {steps.map((s, i) => (
              <Reveal
                key={s.no}
                delay={i * 0.08}
                style={{
                  borderRadius: 22,
                  padding: 1,
                  background: s.highlight
                    ? "linear-gradient(160deg,#A855F7,#7C3AED)"
                    : "linear-gradient(160deg,rgba(168,85,247,.3),rgba(255,255,255,.04))",
                }}
              >
                <div style={{ background: s.highlight ? "linear-gradient(165deg,#1D0F3D,#120A28)" : "linear-gradient(165deg,#130C24,#0A0718)", borderRadius: 21, padding: "clamp(24px,4vw,30px)", height: "100%", position: "relative", overflow: "hidden" }}>
                  <span style={{ position: "relative", display: "block", fontWeight: 700, fontSize: 42, color: s.highlight ? "rgba(255,255,255,.18)" : "rgba(168,85,247,.14)", lineHeight: 1, ...heading }}>
                    {s.no}
                  </span>
                  <h3 style={{ margin: "10px 0 10px", ...heading, fontWeight: 700, fontSize: 19, position: "relative" }}>{s.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: s.highlight ? "#C4BCDC" : "#A29DB8", position: "relative" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* REWARD HIGHLIGHT */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(20px,4vw,30px) clamp(18px,5vw,28px) clamp(50px,8vw,80px)" }}>
          <Reveal style={{ borderRadius: 24, padding: 1, background: "linear-gradient(150deg,rgba(168,85,247,.6),rgba(255,255,255,.05))" }}>
            <div style={{ background: "linear-gradient(160deg,#1D0F3D,#0B0817)", borderRadius: 23, padding: "clamp(36px,6vw,52px) clamp(24px,5vw,40px)", textAlign: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#8B84A0", ...mono }}>
                Per successful referral
              </span>
              <div className="grad-text" style={{ margin: "10px 0 6px", ...heading, fontWeight: 700, fontSize: "clamp(52px,9vw,88px)", letterSpacing: "-.03em", lineHeight: 1 }}>
                20%
              </div>
              <p style={{ margin: "0 auto", fontSize: 14.5, color: "#C4BCDC", maxWidth: 460 }}>
                Of the contract value agreed with the referred client — but only if that business is a real fit for what we do. No limit on how many you refer.
              </p>
            </div>
          </Reveal>
        </section>

        {/* WHO CAN REFER */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(20px,4vw,30px) clamp(18px,5vw,28px) clamp(50px,8vw,80px)" }}>
          <Reveal style={{ textAlign: "center", maxWidth: 620, marginLeft: "auto", marginRight: "auto", marginBottom: 44 }}>
            <SectionLabel>WHO CAN REFER</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
              Anyone. <span className="grad-text">Seriously.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 16 }}>
            {whoCanRefer.map((item, i) => (
              <Reveal key={item} delay={i * 0.05} style={{ display: "flex", alignItems: "flex-start", gap: 12, borderRadius: 16, padding: "16px 18px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, background: "rgba(74,222,128,.14)", color: "#4ADE80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flex: "none" }}>✓</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "#C4BCDC" }}>{item}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(20px,4vw,30px) clamp(18px,5vw,28px) clamp(50px,8vw,80px)" }}>
          <Reveal style={{ textAlign: "center", maxWidth: 600, marginLeft: "auto", marginRight: "auto", marginBottom: 40 }}>
            <SectionLabel>QUESTIONS</SectionLabel>
            <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
              Straight answers.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04} style={{ borderRadius: 18, padding: 1, background: "linear-gradient(160deg,rgba(168,85,247,.25),rgba(255,255,255,.04))" }}>
                <details>
                  <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px clamp(18px,3vw,24px)", background: "linear-gradient(165deg,#130C24,#0A0718)", borderRadius: 17, fontWeight: 600, fontSize: 15.5, color: "#F5F3FF", cursor: "pointer", listStyle: "none" }}>
                    {f.q}
                  </summary>
                  <p style={{ margin: 0, padding: "4px clamp(18px,3vw,24px) 20px", fontSize: 14.5, lineHeight: 1.6, color: "#A29DB8", background: "#0A0718", borderRadius: "0 0 17px 17px" }}>
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="refer-form" style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(20px,4vw,30px) clamp(18px,5vw,28px) clamp(70px,10vw,100px)" }}>
          <Reveal style={{ borderRadius: 24, padding: 1, background: "linear-gradient(160deg,rgba(168,85,247,.6),rgba(255,255,255,.05))" }}>
            <div style={{ background: "linear-gradient(165deg,#160F2E,#0B0817)", borderRadius: 23, padding: "clamp(32px,5vw,44px)", textAlign: "center" }}>
              <SectionLabel>REFER A BUSINESS</SectionLabel>
              <h2 style={{ margin: "16px 0 8px", ...heading, fontWeight: 700, fontSize: "clamp(24px,3.6vw,32px)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
                Message Andrei directly.
              </h2>
              <p style={{ margin: "0 auto 30px", fontSize: 14.5, lineHeight: 1.55, color: "#A29DB8", maxWidth: 440 }}>
                Tell him who you&apos;re referring and how to reach them. That&apos;s it, no form to fill out.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                <a href="mailto:andrei@uppr.agency?subject=Referral" className="uppr-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 26px", fontSize: 15.5, textDecoration: "none" }}>
                  ✉ andrei@uppr.agency
                </a>
                <a href="https://wa.me/40790682363" target="_blank" className="uppr-btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 26px", fontSize: 15.5, textDecoration: "none" }}>
                  📱 WhatsApp · 0790 682 363
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </div>
  );
}
