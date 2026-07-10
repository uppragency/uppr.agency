"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
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
      </div>
    </div>
  );
}
