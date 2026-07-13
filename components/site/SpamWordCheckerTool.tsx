"use client";

import { useState } from "react";
import { SPAM_WORDS, detectLanguage, type Lang } from "@/lib/subject-line-grader";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

function analyzeBody(text: string) {
  const lang: Lang = detectLanguage(text);
  const lower = text.toLowerCase();
  const found = SPAM_WORDS[lang].filter((w) => lower.includes(w));
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const capsWords = text.split(/\s+/).filter((w) => w.length > 3 && w === w.toUpperCase());
  const exclamations = (text.match(/!/g) ?? []).length;

  let riskScore = found.length * 12 + capsWords.length * 6 + Math.max(0, exclamations - 1) * 5;
  riskScore = Math.min(100, riskScore);

  let label = "Risc scăzut";
  let color = "#4ADE80";
  if (riskScore > 60) {
    label = "Risc ridicat";
    color = "#FF6B9D";
  } else if (riskScore > 25) {
    label = "Risc moderat";
    color = "#FBBF24";
  }

  return { lang, found, wordCount, capsWords, exclamations, riskScore, label, color };
}

export default function SpamWordCheckerTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeBody> | null>(null);

  function handleCheck() {
    if (!text.trim()) return;
    setResult(analyzeBody(text));
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Lipește aici conținutul email-ului tău..."
        className="uppr-input"
        style={{ minHeight: 220, fontSize: 14, marginBottom: 16 }}
      />
      <button onClick={handleCheck} disabled={!text.trim()} className="uppr-btn-primary" style={{ marginBottom: 28 }}>
        Verifică textul →
      </button>

      {result && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: "#6E6980", ...mono }}>SCOR RISC SPAM</span>
              <span style={{ fontWeight: 700, fontSize: 20, color: result.color, ...mono }}>
                {result.riskScore}/100 — {result.label}
              </span>
            </div>

            <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.06)", overflow: "hidden", marginBottom: 24 }}>
              <div style={{ width: `${result.riskScore}%`, height: "100%", background: result.color, transition: "width .3s" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#F5F3FF", marginBottom: 6 }}>
                  Cuvinte/fraze cu risc de spam ({result.found.length})
                </div>
                {result.found.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {result.found.map((w) => (
                      <span key={w} style={{ fontSize: 11.5, padding: "4px 10px", borderRadius: 999, background: "rgba(255,107,157,.12)", color: "#FF6B9D", ...mono }}>
                        {w}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: 13, color: "#4ADE80" }}>Niciun cuvânt cu risc mare găsit.</p>
                )}
              </div>

              <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#A29DB8" }}>
                <span>{result.wordCount} cuvinte</span>
                <span>{result.capsWords.length} cuvinte ALL CAPS</span>
                <span>{result.exclamations} semne de exclamare</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, color: "#6E6980", marginTop: 20, lineHeight: 1.6 }}>
        Verificare orientativă — deliverability-ul real depinde și de reputația domeniului, autentificare (SPF/DKIM/DMARC) și engagement-ul listei, nu doar de text.
      </p>
    </div>
  );
}
