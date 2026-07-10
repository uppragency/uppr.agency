"use client";

import Image from "next/image";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteInteractions from "@/components/site/SiteInteractions";
import Reveal from "@/components/site/Reveal";
import {
  marquee,
  manifestoWords,
  resultShots,
  services,
  process,
  advantages,
  growthStack,
  faqs,
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

export default function HomeContent() {
  function goCal() {
    window.location.href = CAL_URL;
  }
  function goResults() {
    document.getElementById("lm-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

        {/* HERO */}
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

            {/* HERO VISUAL */}
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

        {/* MARQUEE */}
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

        <ProblemSolution />
        <TrafficLeak />
        <ServicesSection />
        <ProcessSection />
        <AdvantagesSection />
        <GrowthStackSection />
        <ResultsSection goCal={goCal} />
        <FaqSection />
        <FinalCta goCal={goCal} />

        <Footer />
      </div>
    </div>
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

function ProblemSolution() {
  return (
    <section id="lm-problem" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px,9vw,110px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <SectionLabel>THE MATH HAS CHANGED</SectionLabel>
        <h2 style={{ margin: "16px 0 16px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          You&apos;re renting traffic. You should <span className="grad-text">own the relationship</span>.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: 20 }}>
        <Reveal delay={0.05} className="uppr-card">
          <div className="uppr-card-inner">
            <span style={{ display: "inline-block", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B9D", background: "rgba(255,107,157,.12)", padding: "6px 12px", borderRadius: 999, ...mono }}>
              the leak
            </span>
            <h3 style={{ margin: "18px 0 8px", ...heading, fontWeight: 700, fontSize: 22 }}>Acquisition costs keep climbing</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, marginTop: 20 }}>
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
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, marginTop: 20 }}>
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

function TrafficLeak() {
  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(40px,7vw,70px) clamp(18px,5vw,28px)", textAlign: "center" }}>
      <Reveal>
        <SectionLabel>WHERE YOUR TRAFFIC ACTUALLY GOES</SectionLabel>
        <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Every visitor who leaves without a way back is <span className="grad-text">traffic you paid for and lost</span>.
        </h2>
      </Reveal>
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
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(40px,7vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
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

function ResultsSection({ goCal }: { goCal: () => void }) {
  return (
    <section id="lm-results" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 20 }}>
        <SectionLabel>PROOF, NOT PROMISES</SectionLabel>
        <h2 style={{ margin: "16px 0 0", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.1, letterSpacing: "-.025em" }}>
          Numbers from the first <span className="grad-text">60–90 days</span>.
        </h2>
      </Reveal>

      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px,8vw,80px)", flexWrap: "wrap", margin: "44px 0 56px" }}>
        <div style={{ textAlign: "center" }}>
          <div className="grad-text" style={{ ...heading, fontWeight: 700, fontSize: "clamp(38px,7vw,58px)", letterSpacing: "-.03em", lineHeight: 1 }}>
            +<span data-reveal data-count-to="247" data-suffix="%" style={{ opacity: 1 }}>0%</span>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#8B84A0", ...mono, textTransform: "uppercase", letterSpacing: ".05em" }}>avg. flow revenue lift</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="grad-text" style={{ ...heading, fontWeight: 700, fontSize: "clamp(38px,7vw,58px)", letterSpacing: "-.03em", lineHeight: 1 }}>
            <span data-reveal data-count-to="42" data-suffix="%" style={{ opacity: 1 }}>0%</span>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#8B84A0", ...mono, textTransform: "uppercase", letterSpacing: ".05em" }}>avg. open rate</p>
        </div>
      </div>

      <Reveal style={{ textAlign: "center", marginBottom: 30 }}>
        <h3 style={{ margin: 0, ...heading, fontWeight: 700, fontSize: "clamp(22px,3.5vw,30px)" }}>
          Real client results, <span className="grad-text">unedited</span>.
        </h3>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 20 }}>
        {resultShots.map((shot, i) => (
          <Reveal key={shot.src} delay={i * 0.05} className="uppr-card">
            <div className="uppr-card-inner">
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 12, overflow: "hidden", marginBottom: 12, border: "1px solid rgba(255,255,255,.08)" }}>
                <Image src={shot.src} alt={shot.alt} fill style={{ objectFit: "cover" }} />
              </div>
              <p style={{ margin: "0 0 8px", fontSize: 13, color: "#A29DB8" }}>{shot.caption}</p>
              <div style={{ display: "flex", gap: 14, fontSize: 12.5, ...mono, color: "#D6C6FA" }}>
                <span>{shot.stat}</span>
                <span>{shot.orders} orders</span>
                <span>{shot.revenue}</span>
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
  );
}

function FaqSection() {
  return (
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(40px,7vw,80px) clamp(18px,5vw,28px)" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
        <SectionLabel>FAQ</SectionLabel>
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
