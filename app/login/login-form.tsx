"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Autentificare eșuată");
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="uppr-card w-full max-w-sm" style={{ animation: "riseIn .7s cubic-bezier(.2,.8,.2,1) both" }}>
      <div className="uppr-card-inner">
        <div className="uppr-pill mb-6">
          <span className="uppr-label" style={{ color: "#D6C6FA" }}>
            UPPR AGENCY
          </span>
        </div>

        <h1
          className="mb-1"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "26px",
            letterSpacing: "-.02em",
          }}
        >
          Autentificare
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--uppr-muted)" }}>
          Acces panouri administrare și rapoarte.
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
              placeholder="nume@uppr.agency"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="uppr-label block">
              Parolă
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="uppr-input"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: "var(--uppr-pink)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="uppr-btn-primary w-full"
          >
            {loading ? "Se autentifică..." : "Autentificare →"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          <a
            href="https://wa.me/40790682363?text=Bun%C4%83%2C%20am%20uitat%20parola%20de%20la%20dashboard"
            target="_blank"
            style={{ color: "var(--uppr-violet-3)", fontWeight: 600 }}
          >
            Ai uitat parola? Scrie-ne pe WhatsApp →
          </a>
        </p>
      </div>
    </div>
  );
}
