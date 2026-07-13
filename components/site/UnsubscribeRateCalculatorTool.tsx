"use client";

import { useState } from "react";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function getBenchmark(rate: number) {
  if (rate < 0.2) return { label: "Excelentă", color: "#4ADE80", desc: "Sub benchmark-ul de industrie — lista ta e bine segmentată și conținutul rezonează." };
  if (rate < 0.5) return { label: "Normală", color: "#A855F7", desc: "În linia benchmark-ului tipic de industrie (0.2–0.5%). Nimic de îngrijorare, dar loc de optimizare." };
  if (rate < 1) return { label: "Peste medie", color: "#FBBF24", desc: "Puțin peste normal — merită revizuită frecvența de trimitere sau relevanța segmentării." };
  return { label: "Îngrijorătoare", color: "#FF6B9D", desc: "Semnificativ peste benchmark — un semnal clar că ceva din strategia de conținut sau frecvență nu funcționează." };
}

export default function UnsubscribeRateCalculatorTool() {
  const [sent, setSent] = useState("");
  const [unsubs, setUnsubs] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function handleCalculate() {
    const sentNum = Number(sent);
    const unsubsNum = Number(unsubs);
    if (!sentNum || sentNum <= 0) return;
    setResult((unsubsNum / sentNum) * 100);
  }

  const benchmark = result !== null ? getBenchmark(result) : null;

  return (
    <div>
      <div className="uppr-card" style={{ marginBottom: 24 }}>
        <div className="uppr-card-inner">
          <div className="grid grid-cols-2 gap-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label className="uppr-label" style={{ display: "block", marginBottom: 8 }}>
                Email-uri trimise
              </label>
              <input
                type="number"
                value={sent}
                onChange={(e) => setSent(e.target.value)}
                placeholder="10000"
                className="uppr-input"
              />
            </div>
            <div>
              <label className="uppr-label" style={{ display: "block", marginBottom: 8 }}>
                Dezabonări
              </label>
              <input
                type="number"
                value={unsubs}
                onChange={(e) => setUnsubs(e.target.value)}
                placeholder="15"
                className="uppr-input"
              />
            </div>
          </div>
          <button onClick={handleCalculate} disabled={!sent || !unsubs} className="uppr-btn-primary">
            Calculează →
          </button>
        </div>
      </div>

      {result !== null && benchmark && (
        <div
          style={{
            borderRadius: 20,
            padding: 1,
            background: "linear-gradient(160deg,rgba(168,85,247,.6),rgba(255,255,255,.04))",
          }}
        >
          <div style={{ background: "linear-gradient(165deg,#160F2E,#0B0817)", borderRadius: 19, padding: "clamp(24px,4vw,32px)", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#6E6980", ...mono, marginBottom: 8 }}>RATA TA DE DEZABONARE</div>
            <div style={{ ...heading, fontWeight: 700, fontSize: 48, color: benchmark.color, lineHeight: 1 }}>
              {result.toFixed(2)}%
            </div>
            <div style={{ ...heading, fontWeight: 600, fontSize: 18, color: benchmark.color, marginTop: 10 }}>{benchmark.label}</div>
            <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "#A29DB8", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              {benchmark.desc}
            </p>
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, color: "#6E6980", marginTop: 20, lineHeight: 1.6 }}>
        Benchmark orientativ de industrie (0.2–0.5% per campanie e considerat normal). Rate reale variază pe nișă și frecvență de trimitere.
      </p>
    </div>
  );
}
