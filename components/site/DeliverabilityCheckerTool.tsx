"use client";

import { useState } from "react";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

type Result = {
  domain: string;
  spf: { found: boolean; record: string | null };
  dmarc: { found: boolean; record: string | null; policy: string | null };
  dkim: { found: boolean; selectorsFound: string[] };
};

function StatusRow({ label, ok, detail }: { label: string; ok: boolean; detail: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <span
        style={{
          flex: "none",
          width: 26,
          height: 26,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          background: ok ? "rgba(74,222,128,.14)" : "rgba(255,107,157,.14)",
          color: ok ? "#4ADE80" : "#FF6B9D",
        }}
      >
        {ok ? "✓" : "✕"}
      </span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#F5F3FF" }}>{label}</div>
        <div style={{ fontSize: 13, color: "#A29DB8", marginTop: 2 }}>{detail}</div>
      </div>
    </div>
  );
}

export default function DeliverabilityCheckerTool() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/check-deliverability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Verificare eșuată");
      } else {
        setResult(data);
      }
    } catch {
      setError("Verificare eșuată. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleCheck} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="exemplu.ro"
          className="uppr-input"
          style={{ flex: "1 1 240px" }}
        />
        <button type="submit" disabled={loading || !domain} className="uppr-btn-primary" style={{ flex: "none" }}>
          {loading ? "Verific..." : "Verifică →"}
        </button>
      </form>

      {error && (
        <p style={{ color: "#FF6B9D", fontSize: 14, marginBottom: 20 }}>{error}</p>
      )}

      {result && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <div style={{ marginBottom: 8, fontSize: 12, color: "#6E6980", ...mono }}>
              REZULTATE PENTRU {result.domain.toUpperCase()}
            </div>
            <StatusRow
              label="SPF"
              ok={result.spf.found}
              detail={result.spf.found ? "Record SPF găsit — servere autorizate sunt definite." : "Niciun record SPF găsit — email-urile pot fi marcate ca spam mai ușor."}
            />
            <StatusRow
              label="DMARC"
              ok={result.dmarc.found}
              detail={
                result.dmarc.found
                  ? `Record DMARC găsit, politică: ${result.dmarc.policy ?? "necunoscută"}.`
                  : "Niciun record DMARC găsit — nu ai protecție împotriva spoofing-ului de domeniu."
              }
            />
            <div style={{ padding: "16px 0 0" }}>
              <StatusRow
                label="DKIM"
                ok={result.dkim.found}
                detail={
                  result.dkim.found
                    ? `Selector(oare) găsit: ${result.dkim.selectorsFound.join(", ")}.`
                    : "Niciun selector comun găsit — dar DKIM poate folosi un selector personalizat, nedetectabil automat. Verifică manual în platforma ta de email."
                }
              />
            </div>
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, color: "#6E6980", marginTop: 20, lineHeight: 1.6 }}>
        Verificare informativă, bazată pe DNS public. Pentru un audit complet de deliverability, discută cu noi la o consultație gratuită.
      </p>
    </div>
  );
}
