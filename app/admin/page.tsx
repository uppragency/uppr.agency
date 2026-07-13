import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CopyMissingButton from "@/components/admin/CopyMissingButton";
import AllClientsChart from "@/components/admin/AllClientsChart";
import { computeProfit } from "@/lib/profit";

const LUNI_SCURT = [
  "Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec",
];

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
    .select("client_id, status, ecom_revenue, cost_themarketer, cost_invoice, newsletters(revenue)")
    .eq("month", currentMonth)
    .eq("year", currentYear);

  const { data: articles } = await supabase.from("articles").select("id, status");

  const reportByClient = new Map((currentReports ?? []).map((r) => [r.client_id, r]));

  const totalRevenueThisMonth = (currentReports ?? []).reduce((sum, r) => {
    const campaignRevenue = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
    return sum + campaignRevenue + Number(r.ecom_revenue);
  }, 0);

  const totalProfitThisMonth = (currentReports ?? []).reduce((sum, r) => {
    const campaignRevenue = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
    const totalRevenue = campaignRevenue + Number(r.ecom_revenue);
    return sum + computeProfit(totalRevenue, Number(r.cost_themarketer), Number(r.cost_invoice));
  }, 0);

  const negativeProfitCount = (currentReports ?? []).filter((r) => {
    const campaignRevenue = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
    const totalRevenue = campaignRevenue + Number(r.ecom_revenue);
    return computeProfit(totalRevenue, Number(r.cost_themarketer), Number(r.cost_invoice)) < 0;
  }).length;

  const missingCount = (clients?.length ?? 0) - (currentReports?.length ?? 0);
  const missingNames = (clients ?? [])
    .filter((c) => !reportByClient.has(c.id))
    .map((c) => c.name);
  const draftCount = (currentReports ?? []).filter((r) => r.status === "draft").length;
  const publishedArticles = (articles ?? []).filter((a) => a.status === "published").length;

  // Widget "azi": ultima campanie trimisă (oricărui client) + estimare
  // pentru următorul raport lipsă
  const { data: latestNewsletter } = await supabase
    .from("newsletters")
    .select("title, created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const daysSinceLastCampaign = latestNewsletter
    ? Math.floor((Date.now() - new Date(latestNewsletter.created_at).getTime()) / 86400000)
    : null;

  // Chart combinat: revenue lunar pe fiecare client, ultimele 6 luni
  const { data: allReports } = await supabase
    .from("campaign_reports")
    .select("client_id, month, year, ecom_revenue, newsletters(revenue)")
    .order("year", { ascending: false })
    .order("month", { ascending: false })
    .limit(60);

  const clientNames = (clients ?? []).map((c) => c.name);
  const clientIdToName = new Map((clients ?? []).map((c) => [c.id, c.name]));
  const monthBuckets = new Map<string, Record<string, number | string>>();
  for (const r of (allReports ?? []).slice(0, 40)) {
    const label = `${LUNI_SCURT[r.month - 1]} ${r.year}`;
    const revenue = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0) + Number(r.ecom_revenue);
    const name = clientIdToName.get(r.client_id);
    if (!name) continue;
    if (!monthBuckets.has(label)) monthBuckets.set(label, { label });
    monthBuckets.get(label)![name] = revenue;
  }
  const chartData = Array.from(monthBuckets.values()).reverse().slice(-6);

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>Revenue total luna asta</span>
            <div style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 26, marginTop: 8 }}>
              {totalRevenueThisMonth.toLocaleString("ro-RO")} Lei
            </div>
          </div>
        </div>
        <div className="uppr-card" style={{ borderColor: totalProfitThisMonth >= 0 ? "rgba(74,222,128,.25)" : "rgba(255,107,157,.25)" }}>
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>Profit total portofoliu</span>
            <div style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 26, marginTop: 8, color: totalProfitThisMonth >= 0 ? "#4ADE80" : "#FF6B9D" }}>
              {totalProfitThisMonth.toLocaleString("ro-RO")} Lei
            </div>
            {negativeProfitCount > 0 && (
              <div style={{ marginTop: 8, fontSize: 11.5, color: "#FF6B9D" }}>
                ⚠️ {negativeProfitCount} client{negativeProfitCount === 1 ? "" : "i"} cu profit negativ
              </div>
            )}
          </div>
        </div>
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>Rapoarte lipsă luna asta</span>
            <div style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 700, fontSize: 26, marginTop: 8, color: missingCount > 0 ? "#FF6B9D" : "#4ADE80" }}>
              {missingCount}
            </div>
            {missingCount > 0 && (
              <div style={{ marginTop: 10 }}>
                <CopyMissingButton names={missingNames} />
              </div>
            )}
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

      {daysSinceLastCampaign !== null && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label block mb-2" style={{ color: "var(--uppr-violet-3)" }}>
              📅 Azi
            </span>
            <p style={{ fontSize: 14, margin: 0 }}>
              Ultima campanie trimisă (<strong>{latestNewsletter?.title}</strong>) — acum{" "}
              <strong>{daysSinceLastCampaign} {daysSinceLastCampaign === 1 ? "zi" : "zile"}</strong>.
              {missingCount > 0 && (
                <> {missingCount} client{missingCount === 1 ? "" : "i"} încă {missingCount === 1 ? "așteaptă" : "așteaptă"} raportul lunii curente.</>
              )}
            </p>
          </div>
        </div>
      )}

      {chartData.length > 1 && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
              Revenue pe client, ultimele luni
            </span>
            <AllClientsChart data={chartData} clientNames={clientNames} />
          </div>
        </div>
      )}

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
