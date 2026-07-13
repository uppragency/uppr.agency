"use client";

import { useState } from "react";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

type Option = { label: string; points: number };
type Question = { key: string; label: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    key: "openRate",
    label: "Care e open rate-ul tău mediu?",
    options: [
      { label: "Sub 15%", points: 0 },
      { label: "15–25%", points: 5 },
      { label: "25–40%", points: 10 },
      { label: "Peste 40%", points: 15 },
    ],
  },
  {
    key: "bounceRate",
    label: "Care e bounce rate-ul tău mediu?",
    options: [
      { label: "Peste 5%", points: 0 },
      { label: "2–5%", points: 5 },
      { label: "0.5–2%", points: 10 },
      { label: "Sub 0.5%", points: 15 },
    ],
  },
  {
    key: "unsubRate",
    label: "Câți se dezabonează per campanie, în medie?",
    options: [
      { label: "Peste 1%", points: 0 },
      { label: "0.3–1%", points: 5 },
      { label: "0.1–0.3%", points: 10 },
      { label: "Sub 0.1%", points: 15 },
    ],
  },
  {
    key: "lastCleaned",
    label: "Când ai curățat ultima dată lista de contacte inactive?",
    options: [
      { label: "Niciodată / nu știu", points: 0 },
      { label: "Peste 1 an", points: 5 },
      { label: "În ultimele 6-12 luni", points: 10 },
      { label: "În ultimele 3 luni", points: 15 },
    ],
  },
  {
    key: "engaged",
    label: "Ce procent din listă a interacționat în ultimele 90 de zile?",
    options: [
      { label: "Sub 20%", points: 0 },
      { label: "20–40%", points: 7 },
      { label: "40–60%", points: 12 },
      { label: "Peste 60%", points: 15 },
    ],
  },
  {
    key: "flows",
    label: "Ai automatizări (welcome, coș abandonat, win-back) live?",
    options: [
      { label: "Niciuna", points: 0 },
      { label: "Doar una", points: 5 },
      { label: "Două-trei", points: 10 },
      { label: "Toate cele de bază", points: 15 },
    ],
  },
];

function getVerdict(score: number) {
  if (score >= 80) return { label: "Excelentă", color: "#4ADE80", desc: "Lista ta e într-o formă foarte bună. Focus acum pe optimizare fină, nu pe reparații de bază." };
  if (score >= 55) return { label: "Bună, cu loc de mai bine", color: "#A855F7", desc: "Fundamentele sunt solide, dar sunt 1-2 zone clare unde poți recupera revenue rapid." };
  if (score >= 30) return { label: "Necesită atenție", color: "#FBBF24", desc: "Sunt câteva probleme structurale care probabil îți afectează deja deliverability-ul și revenue-ul." };
  return { label: "În risc", color: "#FF6B9D", desc: "Lista are semnale serioase de risc — merită o discuție cât mai curând, înainte să se agraveze." };
}

export default function ListHealthCheckTool() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.key] !== undefined);
  const totalScore = Object.values(answers).reduce((sum, p) => sum + p, 0);
  const maxScore = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.points)), 0);
  const scorePct = Math.round((totalScore / maxScore) * 100);
  const verdict = getVerdict(scorePct);

  function selectAnswer(key: string, points: number) {
    setAnswers((a) => ({ ...a, [key]: points }));
  }

  if (showResult) {
    return (
      <div>
        <div className="uppr-card">
          <div className="uppr-card-inner" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#6E6980", ...mono, marginBottom: 8 }}>SCOR SĂNĂTATE LISTĂ</div>
            <div style={{ ...heading, fontWeight: 700, fontSize: 56, color: verdict.color, lineHeight: 1 }}>{scorePct}%</div>
            <div style={{ ...heading, fontWeight: 600, fontSize: 20, color: verdict.color, marginTop: 12 }}>{verdict.label}</div>
            <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "#A29DB8", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
              {verdict.desc}
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              setAnswers({});
              setShowResult(false);
            }}
            className="uppr-btn-secondary"
          >
            Reia testul
          </button>
          <a href="/#lm-form" className="uppr-btn-primary" style={{ textDecoration: "none" }}>
            Discută rezultatele cu noi →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {QUESTIONS.map((q) => (
        <div key={q.key} className="uppr-card">
          <div className="uppr-card-inner">
            <p style={{ margin: "0 0 14px", fontWeight: 600, fontSize: 15, color: "#F5F3FF" }}>{q.label}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {q.options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => selectAnswer(q.key, o.points)}
                  style={{
                    padding: "9px 15px",
                    borderRadius: 999,
                    border: `1px solid ${answers[q.key] === o.points ? "rgba(168,85,247,.5)" : "rgba(255,255,255,.1)"}`,
                    background: answers[q.key] === o.points ? "rgba(168,85,247,.18)" : "transparent",
                    color: answers[q.key] === o.points ? "#F5F3FF" : "#8B84A0",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowResult(true)}
        disabled={!allAnswered}
        className="uppr-btn-primary"
        style={{ opacity: allAnswered ? 1 : 0.4, cursor: allAnswered ? "pointer" : "not-allowed" }}
      >
        Vezi scorul →
      </button>
    </div>
  );
}
