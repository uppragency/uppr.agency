import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteBackground from "@/components/site/SiteBackground";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Status | UPPR Agency",
  description: "Starea curentă a sistemelor UPPR Agency.",
};

export const revalidate = 30;

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

async function checkDatabase(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("clients").select("id").limit(1);
    return !error;
  } catch {
    return false;
  }
}

function StatusRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 600 }}>{label}</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12.5,
          fontWeight: 700,
          ...mono,
          color: ok ? "#4ADE80" : "#FF6B9D",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: ok ? "#4ADE80" : "#FF6B9D",
            boxShadow: ok ? "0 0 8px #4ADE80" : "0 0 8px #FF6B9D",
          }}
        />
        {ok ? "Operațional" : "Probleme detectate"}
      </span>
    </div>
  );
}

export default async function StatusPage() {
  const dbOk = await checkDatabase();
  const emailConfigured = !!process.env.RESEND_API_KEY;
  const now = new Date().toLocaleString("ro-RO", { dateStyle: "medium", timeStyle: "short" });

  const allOperational = dbOk;

  return (
    <div style={{ position: "relative" }}>
      <SiteBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <main style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(120px,18vw,170px) clamp(18px,5vw,28px) 100px" }}>
          <div
            className="uppr-pill"
            style={{
              marginBottom: 24,
              background: allOperational ? "rgba(74,222,128,.1)" : "rgba(255,107,157,.1)",
              borderColor: allOperational ? "rgba(74,222,128,.3)" : "rgba(255,107,157,.3)",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: allOperational ? "#4ADE80" : "#FF6B9D", ...mono }}>
              {allOperational ? "TOATE SISTEMELE FUNCȚIONEAZĂ" : "PROBLEME DETECTATE"}
            </span>
          </div>

          <h1 style={{ margin: "0 0 12px", ...heading, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", letterSpacing: "-.02em" }}>
            Status sisteme
          </h1>
          <p style={{ margin: "0 0 32px", fontSize: 14.5, color: "#A29DB8" }}>
            Verificat automat · ultima actualizare {now}
          </p>

          <div className="uppr-card">
            <div className="uppr-card-inner" style={{ padding: 0 }}>
              <StatusRow label="Website (uppr.agency)" ok={true} />
              <StatusRow label="Bază de date" ok={dbOk} />
              <StatusRow label="Panouri admin & client" ok={dbOk} />
              <StatusRow label="Notificări email" ok={emailConfigured} />
            </div>
          </div>

          <p style={{ marginTop: 24, fontSize: 13, color: "#6E6980", lineHeight: 1.6 }}>
            Pagina verifică live conexiunea la bază de date la fiecare încărcare. Pentru probleme urgente, contactează{" "}
            <a href="mailto:office@uppr.agency" style={{ color: "#C084FC" }}>
              office@uppr.agency
            </a>
            .
          </p>
        </main>

        <Footer />
      </div>
    </div>
  );
}
