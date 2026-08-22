"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function SetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setSessionReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Parola trebuie să aibă cel puțin 8 caractere.");
      return;
    }
    if (password !== confirm) {
      setError("Parolele nu coincid.");
      return;
    }

    setLoading(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    // Trimitem notificare de confirmare
    try {
      await fetch("/api/auth/password-changed-notify", { method: "POST" });
    } catch {
      // ignorăm erori de notificare — parola a fost setată oricum
    }

    setDone(true);
    setTimeout(() => router.push("/dashboard"), 2500);
  }

  if (done) {
    return (
      <div className="uppr-card w-full max-w-sm" style={{ animation: "riseIn .7s cubic-bezier(.2,.8,.2,1) both" }}>
        <div className="uppr-card-inner text-center">
          <div style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(74,222,128,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 16px" }}>
            ✓
          </div>
          <h1 className="mb-2" style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: "22px" }}>
            Parolă setată cu succes
          </h1>
          <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
            Te redirecționăm spre dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="uppr-card w-full max-w-sm" style={{ animation: "riseIn .7s cubic-bezier(.2,.8,.2,1) both" }}>
        <div className="uppr-card-inner text-center">
          <div style={{ width: 36, height: 36, borderRadius: 999, border: "2px solid rgba(168,85,247,.4)", borderTop: "2px solid #A855F7", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
            Se activează contul tău...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="uppr-card w-full max-w-sm" style={{ animation: "riseIn .7s cubic-bezier(.2,.8,.2,1) both" }}>
      <div className="uppr-card-inner">
        <div className="uppr-pill mb-6">
          <span className="uppr-label" style={{ color: "#D6C6FA" }}>UPPR AGENCY</span>
        </div>

        <h1 className="mb-1" style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: "26px", letterSpacing: "-.02em" }}>
          Setează parola
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--uppr-muted)" }}>
          Alege o parolă pentru contul tău și accesează dashboard-ul.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="password" className="uppr-label block">Parolă</label>
            <input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="uppr-input" placeholder="Minim 8 caractere" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirm" className="uppr-label block">Confirmă parola</label>
            <input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="uppr-input" placeholder="Repetă parola" />
          </div>

          {error && <p className="text-sm" style={{ color: "var(--uppr-pink)" }}>{error}</p>}

          <button type="submit" disabled={loading} className="uppr-btn-primary w-full">
            {loading ? "Se activează..." : "Activează contul →"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          <Link href="/login" style={{ color: "var(--uppr-violet-3)", fontWeight: 600 }}>
            Ai deja o parolă? Autentifică-te
          </Link>
        </p>
      </div>
    </div>
  );
}
