"use client";

import { useState } from "react";

export default function CreateClientButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  function reset() {
    setName("");
    setEmail("");
    setDomain("");
    setResult(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/clients/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, domain }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ success: false, message: data.error ?? "Eroare la creare." });
      } else {
        setResult({
          success: true,
          message: data.emailSent
            ? `Client creat și email de bun venit trimis la ${email}.`
            : `Client creat. Emailul de bun venit nu a putut fi trimis — verifică Resend.`,
        });
        reset();
        // Reîncarcă pagina pentru a afișa noul client
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      }
    } catch {
      setResult({ success: false, message: "Eroare de rețea. Încearcă din nou." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => { setOpen(true); reset(); }}
        className="uppr-btn-primary"
        style={{ padding: "8px 16px", fontSize: 13, minHeight: "auto" }}
      >
        + Client nou
      </button>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(5,3,9,.85)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="uppr-card" style={{ width: "100%", maxWidth: 460, animation: "riseIn .3s cubic-bezier(.2,.8,.2,1) both" }}>
            <div className="uppr-card-inner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 20 }}>
                  Client nou
                </h2>
                <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--uppr-muted)", fontSize: 20, cursor: "pointer" }}>✕</button>
              </div>

              {result ? (
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <div style={{
                    fontSize: 32, marginBottom: 12,
                  }}>
                    {result.success ? "✓" : "✗"}
                  </div>
                  <p style={{
                    fontSize: 14, lineHeight: 1.6,
                    color: result.success ? "#4ADE80" : "var(--uppr-pink)"
                  }}>
                    {result.message}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="uppr-label block">Nume client / companie</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className="uppr-input" placeholder="Ex: Anastate" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="uppr-label block">Email client</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="uppr-input" placeholder="client@business.ro" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="uppr-label block">Domeniu (opțional)</label>
                    <input value={domain} onChange={(e) => setDomain(e.target.value)} className="uppr-input" placeholder="business.ro" />
                  </div>
                  <p style={{ fontSize: 12, color: "var(--uppr-muted)", lineHeight: 1.5 }}>
                    Clientul va primi automat un email de bun venit cu link de setare parolă, trimis din <strong>info@uppr.agency</strong>.
                  </p>
                  <button type="submit" disabled={loading} className="uppr-btn-primary w-full">
                    {loading ? "Se creează..." : "Creează client și trimite email →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
