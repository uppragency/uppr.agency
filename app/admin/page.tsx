import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

export default async function AdminHome() {
  const supabase = await createClient();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const { data: clients } = await supabase.from("clients").select("id, name, domain").order("name");

  const { data: currentReports } = await supabase
    .from("campaign_reports")
    .select("client_id, status, ecom_revenue, newsletters(revenue)")
    .eq("month", currentMonth)
    .eq("year", currentYear);

  const { data: articles } = await supabase.from("articles").select("id, status");

  const reportByClient = new Map((currentReports ?? []).map((r) => [r.client_id, r]));

  const totalRevenueThisMonth = (currentReports ?? []).reduce((sum, r) => {
    const campaignRevenue = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
    return sum + campaignRevenue + Number(r.ecom_revenue);
  }, 0);

  const missingCount = (clients?.length ?? 0) - (currentReports?.length ?? 0);
  const draftCount = (currentReports ?? []).filter((r) => r.status === "draft").length;
  const publishedArticles = (articles ?? []).filter((a) => a.status === "published").length;

  return (
    <div className="space-y-8">
      <div>
        <span className="uppr-label" style={{ color: "#A855F7" }}>
          [ PANOU ADMINISTRATOR ]
        </span>
        <h1
          className="mt-3"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 3.5vw, 34px)",
            letterSpacing: "-.02em",
          }}
        >
          {LUNI[currentMonth - 1]} {currentYear} — dintr-o privire
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>Revenue total luna asta</span>
            <div style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 26, marginTop: 8 }}>
              {totalRevenueThisMonth.toLocaleString("ro-RO")} Lei
            </div>
          </div>
        </div>
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>Rapoarte lipsă luna asta</span>
            <div style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 26, marginTop: 8, color: missingCount > 0 ? "#FF6B9D" : "#4ADE80" }}>
              {missingCount}
            </div>
          </div>
        </div>
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>Rapoarte în draft</span>
            <div style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 26, marginTop: 8 }}>
              {draftCount}
            </div>
          </div>
        </div>
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>Articole publicate</span>
            <div style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 26, marginTop: 8 }}>
              {publishedArticles}
            </div>
          </div>
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner" style={{ padding: 0 }}>
          <table className="uppr-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Raport {LUNI[currentMonth - 1]}</th>
                <th>Revenue luna asta</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients?.map((client) => {
                const report = reportByClient.get(client.id);
                const revenue = report
                  ? (report.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0) + Number(report.ecom_revenue)
                  : null;
                return (
                  <tr key={client.id}>
                    <td style={{ fontWeight: 600 }}>{client.name}</td>
                    <td>
                      {!report && (
                        <span className="uppr-badge" style={{ color: "#FF6B9D", background: "rgba(255,107,157,.12)" }}>
                          Lipsește
                        </span>
                      )}
                      {report?.status === "draft" && <span className="uppr-badge uppr-badge-draft">Draft</span>}
                      {report?.status === "published" && <span className="uppr-badge uppr-badge-live">Publicat</span>}
                    </td>
                    <td>{revenue !== null ? `${revenue.toLocaleString("ro-RO")} Lei` : "—"}</td>
                    <td>
                      <Link href={`/admin/clients/${client.id}`} className="text-sm font-semibold" style={{ color: "var(--uppr-violet-3)" }}>
                        Vezi rapoarte →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Link href="/admin/blog" className="uppr-card block">
          <div className="uppr-card-inner space-y-2">
            <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
              Content
            </span>
            <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "20px" }}>
              Articole blog + SEO
            </h2>
            <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
              Creezi, editezi și publici articole cu titlu, meta description și imagine OG.
            </p>
          </div>
        </Link>

        <Link href="/admin/clients" className="uppr-card block">
          <div className="uppr-card-inner space-y-2">
            <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
              Rapoarte
            </span>
            <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "20px" }}>
              Rapoarte lunare clienți
            </h2>
            <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
              Introduci statisticile lunare de campanie pentru fiecare client.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
