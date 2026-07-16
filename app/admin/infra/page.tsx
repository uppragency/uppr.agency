import { createClient } from "@/lib/supabase/server";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

const SUPABASE_FREE_LIMIT_BYTES = 500 * 1024 * 1024; // 500 MB, planul gratuit Supabase

export default async function InfraPage() {
  const supabase = await createClient();
  const { data: stats, error } = await supabase.rpc("get_db_stats");

  const totalBytes = (stats ?? []).reduce((sum, t) => sum + Number(t.total_size_bytes), 0);
  const usagePct = Math.min(100, (totalBytes / SUPABASE_FREE_LIMIT_BYTES) * 100);

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="uppr-label" style={{ color: "#A855F7" }}>
          [ INFRASTRUCTURĂ ]
        </span>
        <h1
          className="mt-2"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "28px",
            letterSpacing: "-.02em",
          }}
        >
          Cost & utilizare infrastructură
        </h1>
      </div>

      {error && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <p style={{ color: "var(--uppr-pink)", fontSize: 14 }}>
              Nu s-au putut încărca statisticile bazei de date: {error.message}
            </p>
          </div>
        </div>
      )}

      {stats && (
        <>
          <div className="uppr-card">
            <div className="uppr-card-inner">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
                  Supabase — dimensiune bază de date
                </span>
                <span style={{ ...mono, fontSize: 13, color: usagePct > 80 ? "#FF6B9D" : "#4ADE80", fontWeight: 700 }}>
                  {formatSize(totalBytes)} / 500 MB (plan gratuit)
                </span>
              </div>
              <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${usagePct}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: usagePct > 80 ? "linear-gradient(90deg,#FF6B9D,#FF4D8D)" : "linear-gradient(90deg,#7C3AED,#A855F7)",
                    transition: "width .3s",
                  }}
                />
              </div>
              {usagePct > 80 && (
                <p style={{ marginTop: 10, fontSize: 12.5, color: "#FF6B9D" }}>
                  ⚠️ Te apropii de limita planului gratuit — ia în calcul un upgrade la Supabase Pro dacă baza de date continuă să crească.
                </p>
              )}
            </div>
          </div>

          <div className="uppr-card">
            <div className="uppr-card-inner" style={{ padding: 0 }}>
              <table className="uppr-table">
                <thead>
                  <tr>
                    <th>Tabel</th>
                    <th>Rânduri (aprox.)</th>
                    <th>Dimensiune</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((t) => (
                    <tr key={t.table_name}>
                      <td style={{ fontWeight: 600, ...mono, fontSize: 13 }}>{t.table_name}</td>
                      <td>{Number(t.row_count).toLocaleString("ro-RO")}</td>
                      <td>{t.total_size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <a href="https://supabase.com/dashboard" target="_blank" className="uppr-card block">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
              Supabase
            </span>
            <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "17px", margin: "8px 0 6px" }}>
              Dashboard complet →
            </h2>
            <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
              Bandwidth, storage fișiere, requests API, facturare — date live doar acolo, nu sunt accesibile din acest panou.
            </p>
          </div>
        </a>

        <a href="https://vercel.com/dashboard" target="_blank" className="uppr-card block">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
              Vercel
            </span>
            <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "17px", margin: "8px 0 6px" }}>
              Dashboard complet →
            </h2>
            <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
              Bandwidth, function invocations, build minutes, facturare — date live doar acolo.
            </p>
          </div>
        </a>
      </div>

      <p style={{ fontSize: 12, color: "var(--uppr-muted)", lineHeight: 1.6 }}>
        Notă: dimensiunea bazei de date de mai sus e calculată live, direct din Postgres. Bandwidth-ul, numărul de cereri API și
        facturarea completă nu sunt accesibile din interiorul aplicației — necesită token-uri separate de Management API pentru
        Supabase și Vercel, pe care nu le avem configurate aici. Linkurile de mai jos duc direct la datele complete.
      </p>
    </div>
  );
}
