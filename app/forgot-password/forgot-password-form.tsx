"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Ceva n-a mers. Încearcă din nou.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="uppr-card w-full max-w-sm" style={{ animation: "riseIn .7s cubic-bezier(.2,.8,.2,1) both" }}>
      <div className="uppr-card-inner">
        <div className="uppr-pill mb-6">
          <span className="uppr-label" style={{ color: "#D6C6FA" }}>
            UPPR AGENCY
          </span>
        </div>

        {sent ? (
          <>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "rgba(74,222,128,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                marginBottom: 16,
              }}
            >
              ✉️
            </div>
            <h1
              className="mb-2"
              style={{
                fontFamily: "var(--font-heading), sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                letterSpacing: "-.02em",
              }}
            >
              Email trimis
            </h1>
            <p className="text-sm mb-6" style={{ color: "var(--uppr-muted)", lineHeight: 1.6 }}>
              Dacă adresa <strong style={{ color: "var(--uppr-fg)" }}>{email}</strong> există în sistem, vei primi un link de resetare în câteva minute. Verifică și folderul Spam.
            </p>
            <Link href="/login" className="uppr-btn-primary w-full text-center block">
              Înapoi la autentificare
            </Link>
          </>
        ) : (
          <>
            <h1
              className="mb-1"
              style={{
                fontFamily: "var(--font-heading), sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                letterSpacing: "-.02em",
              }}
            >
              Ai uitat parola?
            </h1>
            <p className="text-sm mb-6" style={{ color: "var(--uppr-muted)" }}>
              Introdu adresa de email și îți trimitem un link de resetare.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="uppr-label block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="uppr-input"
                  placeholder="adresa@ta.com"
                />
              </div>

              {error && (
                <p className="text-sm" style={{ color: "var(--uppr-pink)" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="uppr-btn-primary w-full">
                {loading ? "Se trimite..." : "Trimite link de resetare →"}
              </button>
            </form>

            <p className="text-center mt-5 text-sm">
              <Link href="/login" style={{ color: "var(--uppr-violet-3)", fontWeight: 600 }}>
                ← Înapoi la autentificare
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
