"use client";

import Image from "next/image";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteInteractions from "@/components/site/SiteInteractions";
import Reveal from "@/components/site/Reveal";
import WelcomeFlowDemo from "@/components/site/WelcomeFlowDemo";
import CalBooking from "@/components/site/CalBooking";
import {
  marquee,
  manifestoWords,
  resultShots,
  services,
  process,
  advantages,
  growthStack,
  faqs,
  socialProofStats,
  testimonial,
  comparisonPlans,
  notAFit,
  goodFit,
  leadFormBenefits,
  CAL_URL,
  AFFILIATE_URL,
} from "@/lib/site-data";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppr-label" style={{ ...mono, color: "#A855F7", fontSize: 12 }}>
      [ {children} ]
    </span>
  );
}

function parseInlineStyle(css: string): React.CSSProperties {
  if (!css) return {};
  const out: Record<string, string> = {};
  css.split(";").forEach((rule) => {
    const [k, v] = rule.split(":");
    if (!k || !v) return;
    const camel = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = v.trim();
  });
  return out as React.CSSProperties;
}

export default function HomeContent() {
  function goCal() {
    window.location.href = CAL_URL;
  }
  function goResults() {
    document.getElementById("lm-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function goAffiliate() {
    window.open(AFFILIATE_URL, "_blank");
  }

  return (
    <div style={{ position: "relative" }}>
      <SiteInteractions />

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 55% at 50% -8%,rgba(124,58,237,.35),transparent 60%),radial-gradient(ellipse 60% 45% at 88% 18%,rgba(168,85,247,.18),transparent 55%),radial-gradient(ellipse 70% 50% at 8% 82%,rgba(88,28,235,.16),transparent 55%)",
          }}
        />
        <div data-parallax="0.4" className="uppr-bg-blob-1" />
        <div data-parallax="0.7" className="uppr-bg-blob-2" />
        <div className="uppr-bg-grid" />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <Hero goCal={goCal} goResults={goResults} />
        <Marquee />
        <Manifesto />
        <FlowDemoSection />
        <ProblemSolution />
        <TrafficCaptureExplainer goCal={goCal} />
        <ComparisonTable />
        <ProcessSection />
        <ServicesSection />
        <GrowthStackSection />
        <AdvantagesSection />
        <ResultsSection goCal={goCal} />
        <QualificationSection />
        <LeadFormSection />
        <AffiliateSection goAffiliate={goAffiliate} />
        <FaqSection />
        <FinalCta goCal={goCal} />
        <Footer />
      </div>
    </div>
  );
}

function Hero({ goCal, goResults }: { goCal: () => void; goResults: () => void }) {
  return (
    <header
      style={{
        position: "relative",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) clamp(56px,9vw,96px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(460px,100%),1fr))",
          gap: "clamp(32px,5vw,52px)",
          alignItems: "center",
        }}
      >
        <div style={{ animation: "riseIn .8s cubic-bezier(.2,.8,.2,1) both" }}>
          <div className="uppr-pill" style={{ marginBottom: 26 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D6C6FA", ...mono }}>
              <a href={AFFILIATE_URL} target="_blank" style={{ color: "inherit" }}>
                TheMarketer
              </a>{" "}
              Certified Partner
            </span>
          </div>
          <h1
            style={{
              margin: "0 0 22px",
              ...heading,
              fontWeight: 700,
              fontSize: "clamp(38px,7.2vw,74px)",
              lineHeight: 1.03,
              letterSpacing: "-.03em",
            }}
          >
            Turn traffic you already have into <span className="grad-text">compounding revenue</span>.
          </h1>
          <p
            style={{
              margin: "0 0 32px",
              fontSize: "clamp(15.5px,2vw,18px)",
              lineHeight: 1.55,
              color: "#A29DB8",
              maxWidth: 520,
            }}
          >
            Full-service email &amp; SMS retention, engineered and managed on{" "}
            <strong style={{ color: "#F5F3FF", fontWeight: 600 }}>
              <a href={AFFILIATE_URL} target="_blank" style={{ color: "inherit" }}>
                TheMarketer
              </a>
            </strong>{" "}
            — built for small and mid-sized businesses that need lost leads and dormant customers to stop
            bleeding revenue on autopilot.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <button onClick={goCal} className="uppr-btn-primary" style={{ flex: "1 1 auto", minWidth: 240, padding: "17px 26px", fontSize: 16 }}>
              Book a free 15-minute consultation →
            </button>
            <button onClick={goResults} className="uppr-btn-secondary" style={{ flex: "1 1 auto", minWidth: 170, padding: "17px 24px", fontSize: 16 }}>
              See the numbers
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 38, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(135deg,#A855F7,#7C3AED)", border: "2px solid #050309" }} />
              <div style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(135deg,#C084FC,#A855F7)", border: "2px solid #050309", marginLeft: -11 }} />
              <div style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(135deg,#7C3AED,#581CEB)", border: "2px solid #050309", marginLeft: -11 }} />
            </div>
            <span style={{ fontSize: 14, color: "#A29DB8" }}>
              Trusted by <strong style={{ color: "#F5F3FF" }}>40+ small and mid-sized businesses</strong> on{" "}
              <a href={AFFILIATE_URL} target="_blank" style={{ color: "inherit" }}>
                TheMarketer
              </a>
            </span>
          </div>
        </div>

        <div
          data-parallax="0.22"
          style={{
            position: "relative",
            animation: "riseIn 1s cubic-bezier(.2,.8,.2,1) both",
            animationDelay: ".12s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "clamp(280px,38vw,420px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "clamp(260px,38vw,440px)",
              height: "clamp(260px,38vw,440px)",
              borderRadius: "50%",
              background: "conic-gradient(from 0deg,transparent,rgba(168,85,247,.5),transparent 40%)",
              animation: "spin 12s linear infinite",
              WebkitMask: "radial-gradient(circle,transparent 63%,#000 64%)",
              mask: "radial-gradient(circle,transparent 63%,#000 64%)",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "clamp(210px,30vw,360px)",
              height: "clamp(210px,30vw,360px)",
              borderRadius: "50%",
              border: "1px solid rgba(168,85,247,.18)",
              animation: "spinRev 20s linear infinite",
            }}
          />
          <div style={{ animation: "floaty 6.5s ease-in-out infinite", position: "relative", width: "100%", maxWidth: 360 }}>
            <div
              style={{
                position: "relative",
                borderRadius: 24,
                padding: 1,
                background: "linear-gradient(160deg,rgba(168,85,247,.7),rgba(255,255,255,.04) 40%,rgba(124,58,237,.4))",
                boxShadow: "0 30px 80px rgba(88,28,235,.45)",
              }}
            >
              <div style={{ background: "linear-gradient(165deg,#160F2E,#0C0820)", borderRadius: 23, padding: 22, position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontWeight: 700, fontSize: 11, color: "#B8B2CC", letterSpacing: ".06em", textTransform: "uppercase", ...mono }}>
                    LEAD_RECOVERY.flow
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: "#4ADE80", ...mono }}>
                    <span style={{ width: 7, height: 7, borderRadius: 999, background: "#4ADE80", animation: "pulseDot 1.8s infinite", boxShadow: "0 0 8px #4ADE80" }} />
                    LIVE
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 13, background: "rgba(168,85,247,.09)", border: "1px solid rgba(168,85,247,.18)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#7C3AED,#A855F7)", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, boxShadow: "0 0 14px rgba(168,85,247,.5)" }}>✦</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#F5F3FF" }}>Follow-up · 1h</div>
                      <div style={{ fontSize: 11, color: "#8B84A0", ...mono }}>→ 1,204 contacts</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#4ADE80", ...mono }}>62%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 1, height: 14, background: "linear-gradient(#A855F7,transparent)" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 13, background: "rgba(168,85,247,.09)", border: "1px solid rgba(168,85,247,.18)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#A855F7,#C084FC)", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, boxShadow: "0 0 14px rgba(192,132,252,.5)" }}>◷</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#F5F3FF" }}>Special offer · 22h</div>
                      <div style={{ fontSize: 11, color: "#8B84A0", ...mono }}>→ dynamic + SMS</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#4ADE80", ...mono }}>38%</span>
                  </div>
                </div>
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#8B84A0", marginBottom: 3, ...mono }}>RECOVERED / MO</div>
                    <div style={{ fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: "-.02em", ...heading }}>
                      $<span data-reveal data-count-to="48200" style={{ opacity: 0 }}>0</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 44 }}>
                    {[
                      ["40%", "rgba(168,85,247,.4)", ".1s"],
                      ["62%", "rgba(168,85,247,.6)", ".2s"],
                      ["55%", "rgba(168,85,247,.4)", ".3s"],
                      ["88%", "#A855F7", ".4s"],
                      ["100%", "#C084FC", ".5s"],
                    ].map(([bar, bg, delay], i) => (
                      <div
                        key={i}
                        data-reveal
                        data-bar={bar}
                        style={{
                          width: 9,
                          height: 0,
                          borderRadius: 4,
                          background: bg,
                          boxShadow: i >= 3 ? `0 0 10px ${bg === "#C084FC" ? "rgba(192,132,252,.8)" : "rgba(168,85,247,.7)"}` : undefined,
                          transition: `height .8s ease ${delay}`,
                          opacity: 1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div data-hide-narrow style={{ position: "absolute", top: -22, right: -30, animation: "floaty2 5s ease-in-out infinite", padding: "10px 14px", borderRadius: 12, background: "rgba(20,14,40,.85)", border: "1px solid rgba(168,85,247,.3)", backdropFilter: "blur(10px)", boxShadow: "0 12px 30px rgba(0,0,0,.4)" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#4ADE80", ...heading }}>+27%</div>
              <div style={{ fontSize: 10, color: "#8B84A0", ...mono }}>email rev</div>
            </div>
            <div data-hide-narrow style={{ position: "absolute", bottom: -18, left: -34, animation: "floaty 5.6s ease-in-out infinite", padding: "10px 14px", borderRadius: 12, background: "rgba(20,14,40,.85)", border: "1px solid rgba(168,85,247,.3)", backdropFilter: "blur(10px)", boxShadow: "0 12px 30px rgba(0,0,0,.4)" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#C084FC", ...heading }}>42%</div>
              <div style={{ fontSize: 10, color: "#8B84A0", ...mono }}>open rate</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Marquee() {
  return (
    <section style={{ padding: "8px 0 clamp(40px,7vw,56px)", overflow: "hidden" }}>
      <p style={{ textAlign: "center", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "#6E6980", margin: "0 0 26px", padding: "0 18px", ...mono }}>
        // retention we run on{" "}
        <a href={AFFILIATE_URL} target="_blank" style={{ color: "inherit" }}>
          TheMarketer
        </a>
      </p>
      <div style={{ position: "relative", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
        <div style={{ display: "flex", gap: 56, width: "max-content", animation: "marqueeScroll 28s linear infinite" }}>
          {marquee.map((m, i) => (
            <span key={i} style={{ fontWeight: 700, fontSize: 20, color: "#6E6980", letterSpacing: "-.02em", whiteSpace: "nowrap", ...heading, ...parseInlineStyle(m.style) }}>
              {m.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="lm-manifesto" style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(30px,6vw,50px) clamp(18px,5vw,28px) clamp(70px,10vw,110px)", textAlign: "center" }}>
      <SectionLabel>THE PHILOSOPHY</SectionLabel>
      <p style={{ margin: "20px 0 0", ...heading, fontWeight: 600, fontSize: "clamp(22px,4.4vw,38px)", lineHeight: 1.5, letterSpacing: "-.01em" }}>
        {manifestoWords.map((w, i) => (
          <span key={i} data-mword style={{ color: "#3A3450", transition: "color .4s ease", display: "inline-block", marginRight: ".28em" }}>
            {w}
          </span>
        ))}
      </p>
    </section>
  );
}

function FlowDemoSection() {
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(20px,4vw,40px) clamp(18px,5vw,28px) clamp(60px,9vw,100px)" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto", marginBottom: 44 }}>
        <SectionLabel>SEE IT RUN</SectionLabel>
        <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Not a mockup. This is <span className="grad-text">exactly how a flow runs</span>.
        </h2>
        <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.55, color: "#A29DB8" }}>
          A live look at a welcome series — five emails, timed automatically from the moment someone joins your list.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <WelcomeFlowDemo />
      </Reveal>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section id="lm-problem" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,70px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
        <SectionLabel>THE MATH HAS CHANGED</SectionLabel>
        <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          You&apos;re renting traffic. You should <span className="grad-text">own the relationship</span>.
        </h2>
        <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.55, color: "#A29DB8" }}>
          Every new customer costs more than the last. Meanwhile the buyers already in your list are the cheapest revenue you&apos;ll ever make — if you actually talk to them.
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 22 }}>
        <Reveal delay={0.05} className="uppr-card">
          <div className="uppr-card-inner">
            <span style={{ display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B9D", background: "rgba(255,107,157,.12)", padding: "6px 12px", borderRadius: 999, ...mono }}>
              the leak
            </span>
            <h3 style={{ margin: "18px 0 8px", ...heading, fontWeight: 700, fontSize: 22 }}>Acquisition costs keep climbing</h3>
            <p style={{ margin: "0 0 26px", fontSize: 14.5, lineHeight: 1.5, color: "#A29DB8" }}>Ad platforms take a bigger cut each year. Chasing new clicks to stand still is a losing trade.</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
              {[["$21", "34%", "rgba(255,107,157,.3)", "'23"], ["$29", "55%", "rgba(255,107,157,.5)", "'24"], ["$38", "76%", "rgba(255,107,157,.72)", "'25"], ["$47", "100%", "#FF4D8D", "'26"]].map(([val, bar, bg, yr], i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: i === 3 ? "#FF6B9D" : "#B8B2CC", ...mono }}>{val}</span>
                  <div data-reveal data-bar={bar} style={{ width: "100%", height: 0, borderRadius: "7px 7px 0 0", background: bg, boxShadow: i === 3 ? "0 0 18px rgba(255,77,141,.5)" : undefined, transition: "height .9s ease" }} />
                  <span style={{ fontSize: 11, color: "#6E6980", ...mono }}>{yr}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: "16px 0 0", fontSize: 12, color: "#6E6980", textAlign: "center", ...mono }}>blended CAC · SMB median</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="uppr-card">
          <div className="uppr-card-inner">
            <span style={{ display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#D6C6FA", background: "rgba(168,85,247,.15)", padding: "6px 12px", borderRadius: 999, ...mono }}>
              the engine
            </span>
            <h3 style={{ margin: "18px 0 8px", ...heading, fontWeight: 700, fontSize: 22 }}>Retention compounds every month</h3>
            <p style={{ margin: "0 0 26px", fontSize: 14.5, lineHeight: 1.5, color: "#C4BCDC" }}>A well-built flow keeps earning long after it ships. Same list, more revenue, near-zero marginal cost.</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
              {[["3×", "30%", "rgba(124,58,237,.7)", "Wk1", "#D6C6FA"], ["7×", "52%", "rgba(168,85,247,.8)", "Mo1", "#D6C6FA"], ["18×", "74%", "#A855F7", "Mo3", "#D6C6FA"], ["40×", "100%", "linear-gradient(180deg,#E9D5FF,#A855F7)", "Mo6", "#fff"]].map(([val, bar, bg, mo, color], i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: color as string, ...mono }}>{val}</span>
                  <div data-reveal data-bar={bar} style={{ width: "100%", height: 0, borderRadius: "7px 7px 0 0", background: bg, boxShadow: i === 3 ? "0 0 20px rgba(192,132,252,.7)" : undefined, transition: "height .9s ease" }} />
                  <span style={{ fontSize: 11, color: "#8B84A0", ...mono }}>{mo}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: "16px 0 0", fontSize: 12, color: "#8B84A0", textAlign: "center", ...mono }}>return per $1 of setup</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrafficCaptureExplainer({ goCal }: { goCal: () => void }) {
  return (
    <section id="lm-traffic" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,70px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 700, marginLeft: "auto", marginRight: "auto", marginBottom: 44 }}>
        <SectionLabel>WHERE YOUR TRAFFIC ACTUALLY GOES</SectionLabel>
        <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Every visitor who leaves without a way back is <span className="grad-text">traffic you paid for and lost</span>.
        </h2>
        <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.55, color: "#A29DB8" }}>
          You&apos;re already paying to get people to your site — ads, SEO, word of mouth. Without a way to capture that traffic, almost all of it browses once and disappears. No email, no phone number, no second chance.
        </p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 22 }}>
        <Reveal style={{ borderRadius: 24, padding: 1, background: "linear-gradient(160deg,rgba(255,80,140,.4),rgba(255,255,255,.04))" }}>
          <div style={{ background: "linear-gradient(165deg,#150E22,#0B0817)", borderRadius: 23, padding: "clamp(24px,4vw,32px)", height: "100%" }}>
            <span style={{ display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B9D", background: "rgba(255,107,157,.12)", padding: "6px 12px", borderRadius: 999, ...mono }}>
              without a popup
            </span>
            <h3 style={{ margin: "18px 0 24px", ...heading, fontWeight: 700, fontSize: 20 }}>Traffic in, traffic gone</h3>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              {[["●", "Visitor arrives"], ["▭", "Browses the site"], ["✕", "Closes the tab"]].map(([icon, label], i) => (
                <div key={label} style={{ display: "contents" }}>
                  {i > 0 && <span style={{ color: "#4A4460", fontSize: 16, paddingTop: 12 }}>→</span>}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 88 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 999, background: i === 2 ? "rgba(255,107,157,.14)" : "rgba(255,255,255,.06)", border: `1px solid ${i === 2 ? "rgba(255,107,157,.3)" : "rgba(255,255,255,.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: i === 2 ? "#FF6B9D" : "#B8B2CC" }}>{icon}</div>
                    <span style={{ fontSize: 11.5, textAlign: "center", lineHeight: 1.35, color: "#8B84A0" }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 26, textAlign: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 999, background: "rgba(255,107,157,.1)", border: "1px solid rgba(255,107,157,.3)", fontWeight: 600, fontSize: 12.5, color: "#FF6B9D", ...mono }}>
                ✕ Gone. No way to reach them again.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} style={{ borderRadius: 24, padding: 1, background: "linear-gradient(160deg,rgba(168,85,247,.7),rgba(255,255,255,.05))" }}>
          <div style={{ background: "linear-gradient(165deg,#1D0F3D,#120A28)", borderRadius: 23, padding: "clamp(24px,4vw,32px)", height: "100%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.35),transparent 70%)", animation: "glowPulse 4s ease-in-out infinite" }} />
            <span style={{ position: "relative", display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#D6C6FA", background: "rgba(168,85,247,.15)", padding: "6px 12px", borderRadius: 999, ...mono }}>
              with a popup, captured &amp; retargeted
            </span>
            <h3 style={{ position: "relative", margin: "18px 0 24px", ...heading, fontWeight: 700, fontSize: 20 }}>Traffic in, revenue out</h3>
            <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              {[["●", "Visitor arrives", false], ["⊞", "Sees a subscribe popup", true], ["✉", "Joins your list", true], ["⇄", "Enters retarget flows", true]].map(([icon, label, active], i) => (
                <div key={label as string} style={{ display: "contents" }}>
                  {i > 0 && <span style={{ color: "#7C6E96", fontSize: 16, paddingTop: 12 }}>→</span>}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 84 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 999, background: active ? "rgba(168,85,247,.14)" : "rgba(255,255,255,.06)", border: `1px solid ${active ? "rgba(168,85,247,.35)" : "rgba(255,255,255,.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: active ? "#C084FC" : "#C4BCDC", boxShadow: active ? "0 0 14px rgba(168,85,247,.3)" : undefined }}>{icon}</div>
                    <span style={{ fontSize: 11.5, textAlign: "center", lineHeight: 1.35, color: "#B8B2CC" }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: "relative", marginTop: 26, textAlign: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 999, background: "rgba(74,222,128,.12)", border: "1px solid rgba(74,222,128,.35)", fontWeight: 600, fontSize: 12.5, color: "#4ADE80", ...mono }}>
                ✓ Becomes a customer who converts.
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal style={{ marginTop: "clamp(28px,4vw,36px)", maxWidth: 640, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#6E6980" }}>
          This is exactly what our Setup &amp; Integration and Automated Flows services are built to solve — a popup is only useful if what happens after someone subscribes actually converts them.
        </p>
      </Reveal>
      <Reveal style={{ textAlign: "center", marginTop: "clamp(26px,4vw,34px)" }}>
        <button onClick={goCal} className="uppr-btn-primary" style={{ padding: "16px 28px", fontSize: 15.5 }}>
          Book a free 15-minute consultation →
        </button>
      </Reveal>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section id="lm-compare" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,8vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 720, marginLeft: "auto", marginRight: "auto", marginBottom: 44 }}>
        <SectionLabel>HOW THE OPTIONS STACK UP</SectionLabel>
        <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Three ways to run retention. One is <span className="grad-text">built for SMBs</span>.
        </h2>
        <p style={{ margin: 0, fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.55, color: "#A29DB8" }}>
          Same goal, different tradeoffs. Here&apos;s what each route actually costs you in time, attention, and ceiling.
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 20, alignItems: "stretch" }}>
        {comparisonPlans.map((plan, i) => (
          <Reveal
            key={plan.tag}
            delay={i * 0.06}
            style={{
              borderRadius: 24,
              padding: 1,
              background: plan.highlight ? "linear-gradient(160deg,#A855F7,#7C3AED)" : "linear-gradient(160deg,rgba(255,255,255,.12),rgba(255,255,255,.03))",
            }}
          >
            <div style={{ background: plan.highlight ? "linear-gradient(165deg,#1D0F3D,#120A28)" : "linear-gradient(165deg,#130C24,#0A0718)", borderRadius: 23, padding: "clamp(24px,4vw,30px)", height: "100%", position: "relative", overflow: "hidden" }}>
              {plan.highlight && (
                <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.35),transparent 70%)", animation: "glowPulse 4s ease-in-out infinite" }} />
              )}
              <span style={{ position: "relative", display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: plan.highlight ? "#E9D5FF" : "#B8B2CC", background: plan.highlight ? "rgba(168,85,247,.2)" : "rgba(255,255,255,.06)", padding: "6px 12px", borderRadius: 999, ...mono }}>
                {plan.tag}
              </span>
              <h3 style={{ position: "relative", margin: "18px 0 20px", ...heading, fontWeight: 700, fontSize: 21 }}>{plan.title}</h3>
              {plan.rows.map(([label, value], ri) => (
                <div
                  key={label}
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "11px 0",
                    borderBottom: ri < plan.rows.length - 1 ? `1px solid rgba(255,255,255,${plan.highlight ? ".08" : ".06"})` : undefined,
                  }}
                >
                  <span style={{ fontSize: 13, color: plan.highlight ? "#C4BCDC" : "#8B84A0" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: plan.highlight ? 700 : 600, color: plan.highlight ? "#4ADE80" : "#A29DB8", textAlign: "right" }}>{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="lm-services" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
        <SectionLabel>WHAT WE DO</SectionLabel>
        <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Everything your retention channel needs, <span className="grad-text">run for you</span>.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 20 }}>
        {services.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.06} className="uppr-card">
            <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <span style={{ fontSize: 12, color: "#6E6980", ...mono }}>{s.no}</span>
              </div>
              <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 19 }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#A29DB8" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 8 }}>
                {s.tags.map((t) => (
                  <span key={t} style={{ fontSize: 11, padding: "4px 9px", borderRadius: 999, background: "rgba(168,85,247,.1)", color: "#D6C6FA", ...mono }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="lm-process" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,8vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
        <SectionLabel>HOW WE START</SectionLabel>
        <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          From free call to <span className="grad-text">flows live</span> in weeks, not quarters.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 18 }}>
        {process.map((p, i) => (
          <Reveal key={p.no} delay={i * 0.08} className="uppr-card">
            <div className="uppr-card-inner">
              <span style={{ fontSize: 13, fontWeight: 700, color: "#A855F7", ...mono }}>{p.no}</span>
              <div style={{ fontSize: 11, color: "#6E6980", marginTop: 6, marginBottom: 10, ...mono, textTransform: "uppercase", letterSpacing: ".05em" }}>{p.phase}</div>
              <h3 style={{ margin: "0 0 8px", ...heading, fontWeight: 600, fontSize: 17 }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function GrowthStackSection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
        <SectionLabel>BEYOND EMAIL &amp; SMS</SectionLabel>
        <h2 style={{ margin: "16px 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          The <span className="grad-text">PRO Growth Stack</span>.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 18 }}>
        {growthStack.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06} className="uppr-card">
            <div className="uppr-card-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{g.icon}</span>
              <h3 style={{ margin: 0, ...heading, fontWeight: 600, fontSize: 17 }}>{g.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{g.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 6 }}>
                {g.tags.map((t) => (
                  <span key={t} style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 999, background: "rgba(168,85,247,.1)", color: "#D6C6FA", ...mono }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AdvantagesSection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
        <SectionLabel>WHY UPPR</SectionLabel>
        <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          The <span className="grad-text">UPPR</span> advantage.
        </h2>
      </Reveal>
      <div data-bento style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: 18 }}>
        {advantages.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05} className="uppr-card">
            <div className="uppr-card-inner" style={{ minHeight: 160 }}>
              <span style={{ fontSize: 26, color: "#C084FC" }}>{a.icon}</span>
              <h3 style={{ margin: "14px 0 6px", ...heading, fontWeight: 600, fontSize: 18 }}>{a.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#A29DB8" }}>{a.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ResultsSection({ goCal }: { goCal: () => void }) {
  return (
    <>
      <section id="lm-results" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,8vw,80px) clamp(18px,5vw,28px)" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "clamp(30px,5vw,46px)" }}>
          <SectionLabel>RECEIPTS, NOT ADJECTIVES</SectionLabel>
          <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
            Numbers from the first <span className="grad-text">60–90 days</span>.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 20, marginBottom: 22 }}>
          {socialProofStats.map((stat, i) => (
            <Reveal
              key={stat.caption}
              delay={i * 0.08}
              style={{
                textAlign: "center",
                borderRadius: 22,
                padding: 1,
                background: stat.variant === "solid" ? "linear-gradient(160deg,#A855F7,#7C3AED)" : "linear-gradient(160deg,rgba(168,85,247,.4),rgba(255,255,255,.04))",
              }}
            >
              <div style={{ background: stat.variant === "solid" ? "linear-gradient(165deg,#1D0F3D,#120A28)" : "linear-gradient(165deg,#130C24,#0A0718)", borderRadius: 21, padding: "clamp(30px,5vw,40px) 24px", height: "100%" }}>
                <div
                  className={stat.variant === "outline" ? "grad-text" : undefined}
                  style={{
                    ...heading,
                    fontWeight: 700,
                    fontSize: "clamp(38px,7vw,58px)",
                    letterSpacing: "-.03em",
                    lineHeight: 1,
                    color: stat.variant === "solid" ? "#fff" : undefined,
                    textShadow: stat.variant === "solid" ? "0 0 30px rgba(192,132,252,.6)" : undefined,
                  }}
                >
                  {stat.prefix}
                  <span data-reveal data-count-to={stat.value} data-suffix={stat.suffix} style={{ opacity: 1 }}>
                    0{stat.suffix}
                  </span>
                </div>
                <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.5, color: stat.variant === "solid" ? "#D6C6FA" : "#A29DB8" }}>{stat.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ borderRadius: 24, padding: 1, background: "linear-gradient(120deg,rgba(168,85,247,.5),rgba(255,255,255,.04))" }}>
          <div style={{ background: "linear-gradient(135deg,#160F2E,#0C0820)", borderRadius: 23, padding: "clamp(28px,5vw,40px) clamp(24px,5vw,42px)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, left: 40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.25),transparent 70%)" }} />
            <div style={{ ...heading, fontWeight: 700, fontSize: "clamp(44px,8vw,64px)", color: "#A855F7", lineHeight: 0.6, flex: "none", position: "relative" }}>&ldquo;</div>
            <div style={{ position: "relative" }}>
              <p style={{ margin: "0 0 16px", fontSize: "clamp(16px,2.4vw,19px)", lineHeight: 1.5, color: "#EDE9FA", fontWeight: 500, maxWidth: 780 }}>
                UPPR rebuilt our welcome and win-back flows on{" "}
                <a href={AFFILIATE_URL} target="_blank" style={{ color: "inherit" }}>
                  TheMarketer
                </a>{" "}
                in three weeks. Email went from 9% of revenue to 27% without touching our ad spend. It just runs now.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: "linear-gradient(135deg,#A855F7,#7C3AED)" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#F5F3FF" }}>{testimonial.name}</div>
                  <div style={{ fontSize: 12.5, color: "#8B84A0", ...mono }}>{testimonial.title}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="lm-screenshots" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,8vw,80px) clamp(18px,5vw,28px)" }}>
        <Reveal style={{ textAlign: "center", maxWidth: 700, marginLeft: "auto", marginRight: "auto", marginBottom: "clamp(30px,5vw,48px)" }}>
          <SectionLabel>STRAIGHT FROM THE DASHBOARD</SectionLabel>
          <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
            Real client results, <span className="grad-text">unedited</span>.
          </h2>
          <p style={{ margin: "0 0 14px", fontSize: "clamp(15px,2vw,17px)", lineHeight: 1.55, color: "#A29DB8" }}>
            Screenshots pulled directly from{" "}
            <a href={AFFILIATE_URL} target="_blank" style={{ color: "inherit" }}>
              TheMarketer
            </a>{" "}
            reporting — no cherry-picked charts.
          </p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 15px", borderRadius: 999, background: "rgba(74,222,128,.1)", border: "1px solid rgba(74,222,128,.3)", fontWeight: 600, fontSize: 12.5, color: "#4ADE80", ...mono }}>
            Every client below started from 0 lei email marketing revenue
          </span>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(360px,100%),1fr))", gap: 22 }}>
          {resultShots.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 0.05} className="uppr-card">
              <div className="uppr-card-inner">
                <div style={{ position: "relative", width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 12, border: "1px solid rgba(255,255,255,.08)", background: "#0A0718" }}>
                  <Image src={shot.src} alt={shot.alt} width={800} height={500} style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 13, color: "#A29DB8" }}>{shot.caption}</p>
                <div style={{ display: "flex", gap: 22 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#4ADE80", ...mono }}>{shot.stat}</div>
                    <div style={{ fontSize: 10, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em", marginTop: 2 }}>CVR</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#C084FC", ...mono }}>{shot.orders}</div>
                    <div style={{ fontSize: 10, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em", marginTop: 2 }}>Orders</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#FDBA74", ...mono }}>{shot.revenue}</div>
                    <div style={{ fontSize: 10, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em", marginTop: 2 }}>Revenue</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={goCal} className="uppr-btn-primary" style={{ padding: "17px 30px", fontSize: 16 }}>
            Book a free 15-minute consultation →
          </button>
        </div>
      </section>
    </>
  );
}

function QualificationSection() {
  return (
    <section id="lm-fit" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,8vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto", marginBottom: "clamp(30px,5vw,48px)" }}>
        <SectionLabel>IS THIS A FIT</SectionLabel>
        <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Built for some businesses. <span className="grad-text">Not built for others.</span>
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 22 }}>
        <Reveal style={{ borderRadius: 24, padding: 1, background: "linear-gradient(160deg,rgba(255,80,140,.4),rgba(255,255,255,.04))" }}>
          <div style={{ background: "linear-gradient(165deg,#150E22,#0B0817)", borderRadius: 23, padding: "clamp(24px,4vw,32px)", height: "100%" }}>
            <span style={{ display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B9D", background: "rgba(255,107,157,.12)", padding: "6px 12px", borderRadius: 999, ...mono }}>
              probably not a fit
            </span>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {notAFit.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, background: "rgba(255,107,157,.14)", color: "#FF6B9D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flex: "none", marginTop: 1 }}>✕</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "#C4BCDC" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} style={{ borderRadius: 24, padding: 1, background: "linear-gradient(160deg,rgba(168,85,247,.7),rgba(255,255,255,.05))" }}>
          <div style={{ background: "linear-gradient(165deg,#1D0F3D,#120A28)", borderRadius: 23, padding: "clamp(24px,4vw,32px)", height: "100%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.35),transparent 70%)", animation: "glowPulse 4s ease-in-out infinite" }} />
            <span style={{ position: "relative", display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#D6C6FA", background: "rgba(168,85,247,.15)", padding: "6px 12px", borderRadius: 999, ...mono }}>
              good fit
            </span>
            <div style={{ position: "relative", marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {goodFit.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, background: "rgba(74,222,128,.14)", color: "#4ADE80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flex: "none", marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "#EDE9FA" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LeadFormSection() {
  return (
    <section id="lm-form" style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(50px,8vw,80px) clamp(18px,5vw,28px) clamp(60px,9vw,90px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: "clamp(32px,5vw,56px)", alignItems: "start" }}>
        <Reveal>
          <SectionLabel>FREE 15-MINUTE CONSULTATION</SectionLabel>
          <h2 style={{ margin: "16px 0 18px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.08, letterSpacing: "-.025em" }}>
            See exactly where your business <span className="grad-text">leaks revenue</span>.
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: "clamp(15px,2vw,16.5px)", lineHeight: 1.55, color: "#A29DB8", maxWidth: 440 }}>
            Book a quick 15-minute consultation and we&apos;ll identify opportunities to increase retention, recover lost revenue, and optimize your customer lifecycle.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {leadFormBenefits.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, background: "rgba(74,222,128,.14)", color: "#4ADE80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flex: "none" }}>✓</span>
                <span style={{ fontSize: 15, color: "#C4BCDC" }}>{b}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} style={{ borderRadius: 24, padding: 1, background: "linear-gradient(160deg,rgba(168,85,247,.6),rgba(255,255,255,.05))" }}>
          <div style={{ background: "linear-gradient(165deg,#160F2E,#0B0817)", borderRadius: 23, padding: "clamp(16px,3vw,24px)", boxShadow: "0 24px 70px rgba(88,28,235,.3)" }}>
            <CalBooking />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AffiliateSection({ goAffiliate }: { goAffiliate: () => void }) {
  return (
    <section id="lm-affiliate" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(18px,5vw,28px) clamp(70px,10vw,100px)" }}>
      <Reveal style={{ borderRadius: 24, padding: 1, background: "linear-gradient(150deg,rgba(168,85,247,.6),rgba(255,255,255,.05))" }}>
        <div style={{ background: "linear-gradient(160deg,#1D0F3D,#0B0817)", borderRadius: 23, padding: "clamp(32px,6vw,48px)", position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(28px,5vw,40px)", alignItems: "center" }}>
          <div style={{ position: "absolute", top: -60, right: -40, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.3),transparent 70%)", animation: "glowPulse 5s ease-in-out infinite" }} />
          <div style={{ position: "relative" }}>
            <SectionLabel>TEST THE PLATFORM</SectionLabel>
            <h2 style={{ margin: "16px 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.12, letterSpacing: "-.02em" }}>
              Want to try the <span className="grad-text">TheMarketer platform</span>?
            </h2>
            <p style={{ margin: "0 0 22px", fontSize: 15.5, lineHeight: 1.55, color: "#C4BCDC", maxWidth: 460 }}>
              Register now and get 30% off your first month by using the code: UPPRMARKETING30 at checkout.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 999, background: "rgba(168,85,247,.1)", border: "1px solid rgba(168,85,247,.28)" }}>
              <span style={{ fontSize: 12, color: "#8B84A0" }}>Discount code for new clients</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#F5F3FF", letterSpacing: ".02em", ...mono }}>UPPRMARKETING30</span>
            </div>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
            <button onClick={goAffiliate} className="uppr-btn-primary" style={{ padding: "17px 30px", fontSize: 16, whiteSpace: "nowrap" }}>
              Register now →
            </button>
            <span style={{ fontSize: 12.5, color: "#8B84A0", ...mono }}>api.themarketer.com/invite/upprmarketing</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="lm-faq" style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(50px,8vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto", marginBottom: 40 }}>
        <SectionLabel>QUESTIONS WE GET ASKED</SectionLabel>
        <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Straight answers, before you <span className="grad-text">book a call</span>.
        </h2>
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={Math.min(i * 0.03, 0.3)} className="uppr-card">
            <details className="uppr-card-inner" style={{ padding: "18px 22px" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 15, color: "#F5F3FF", listStyle: "none" }}>
                {f.q}
              </summary>
              <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "#A29DB8" }}>{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCta({ goCal }: { goCal: () => void }) {
  return (
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(50px,9vw,110px) clamp(18px,5vw,28px)", textAlign: "center" }}>
      <Reveal>
        <h2 style={{ margin: "16px 0 14px", ...heading, fontWeight: 700, fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.12, letterSpacing: "-.02em" }}>
          Your customers are moving on. <span className="grad-text">Are you?</span>
        </h2>
        <p style={{ margin: "0 0 32px", fontSize: 15.5, color: "#A29DB8" }}>
          15 minutes. No slide deck, no pressure — just a clear look at what a retention channel could do for your business.
        </p>
        <button onClick={goCal} className="uppr-btn-primary" style={{ padding: "17px 30px", fontSize: 16 }}>
          Book a free 15-minute consultation →
        </button>
      </Reveal>
    </section>
  );
}
