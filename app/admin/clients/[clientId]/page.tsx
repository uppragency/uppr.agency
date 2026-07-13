import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DuplicateReportButton from "@/components/admin/DuplicateReportButton";
import OnboardingChecklist from "@/components/admin/OnboardingChecklist";
import ClientFinancialSettings from "@/components/admin/ClientFinancialSettings";
import ClientNotes from "@/components/admin/ClientNotes";
import ArchiveClientButton from "@/components/admin/ArchiveClientButton";
import { computeProfit, computeMargin } from "@/lib/profit";

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

export default async function ClientReportsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, domain, onboarding_account_created, onboarding_first_report, onboarding_welcome_sent, setup_cost, target_margin_pct, archived")
    .eq("id", clientId)
    .single();

  if (!client) notFound();

  const { data: notes } = await supabase
    .from("client_notes")
    .select("id, note, admin_email, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  const { data: reports } = await supabase
    .from("campaign_reports")
    .select("id, month, year, ecom_revenue, cost_themarketer, cost_invoice, status, newsletters(revenue)")
    .eq("client_id", clientId)
    .order("year", { ascending: false })
    .order("month", { ascending: false });

  const reportsWithTotals = reports?.map((r) => {
    const campaignRevenue = (r.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0);
    const totalRevenue = campaignRevenue + Number(r.ecom_revenue);
    const profit = computeProfit(totalRevenue, Number(r.cost_themarketer), Number(r.cost_invoice));
    const margin = computeMargin(profit, totalRevenue);
    return {
      ...r,
      campaignRevenue,
      newsletterCount: (r.newsletters ?? []).length,
      totalRevenue,
      profit,
      margin,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="uppr-label" style={{ color: "#A855F7" }}>
            [ RAPOARTE ]
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
            {client.name} {client.archived && <span className="uppr-badge uppr-badge-draft" style={{ marginLeft: 8, verticalAlign: "middle" }}>Arhivat</span>}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--uppr-muted)", fontFamily: "var(--font-mono-label), monospace" }}>
            {client.domain}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ArchiveClientButton clientId={clientId} archived={client.archived} />
          <Link href={`/admin/clients/${clientId}/new-report`} className="uppr-btn-primary">
            + Raport lunar
          </Link>
        </div>
      </div>

      <OnboardingChecklist
        clientId={clientId}
        initial={{
          onboarding_account_created: client.onboarding_account_created,
          onboarding_first_report: client.onboarding_first_report,
          onboarding_welcome_sent: client.onboarding_welcome_sent,
        }}
      />

      <ClientFinancialSettings
        clientId={clientId}
        initialSetupCost={client.setup_cost}
        initialTargetMargin={client.target_margin_pct}
      />

      <ClientNotes clientId={clientId} notes={notes ?? []} />

      {reportsWithTotals?.some((r) => r.profit < 0) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            borderRadius: 12,
            background: "rgba(255,107,157,.08)",
            border: "1px solid rgba(255,107,157,.25)",
          }}
        >
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span style={{ fontSize: 13.5, color: "#FF6B9D" }}>
            Cel puțin o lună are profit negativ pentru acest client — verifică costurile vs. revenue.
          </span>
        </div>
      )}

      <div className="uppr-card">
        <div className="uppr-card-inner" style={{ padding: 0 }}>
          <table className="uppr-table">
            <thead>
              <tr>
                <th>Lună</th>
                <th>Status</th>
                <th>Newsletter-e</th>
                <th>Revenue campanii</th>
                <th>Revenue ecommerce</th>
                <th>Profit</th>
                <th>Marjă</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reportsWithTotals?.map((report) => (
                <tr key={report.id}>
                  <td style={{ fontWeight: 600 }}>
                    {LUNI[report.month - 1]} {report.year}
                  </td>
                  <td>
                    <span className={report.status === "published" ? "uppr-badge uppr-badge-live" : "uppr-badge uppr-badge-draft"}>
                      {report.status === "published" ? "Publicat" : "Draft"}
                    </span>
                  </td>
                  <td>{report.newsletterCount}</td>
                  <td>{report.campaignRevenue.toLocaleString("ro-RO")} Lei</td>
                  <td>{report.ecom_revenue} Lei</td>
                  <td style={{ color: report.profit >= 0 ? "#4ADE80" : "#FF6B9D", fontWeight: 600 }}>
                    {report.profit.toLocaleString("ro-RO")} Lei
                  </td>
                  <td style={{ color: report.profit >= 0 ? "#4ADE80" : "#FF6B9D", fontWeight: 600 }}>
                    {report.margin !== null ? `${report.margin.toFixed(1)}%` : "—"}
                  </td>
                  <td style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <Link
                      href={`/admin/clients/${clientId}/${report.id}`}
                      className="text-sm font-semibold"
                      style={{ color: "var(--uppr-violet-3)" }}
                    >
                      Editează →
                    </Link>
                    <DuplicateReportButton reportId={report.id} clientId={clientId} />
                  </td>
                </tr>
              ))}
              {!reportsWithTotals?.length && (
                <tr>
                  <td colSpan={8} className="text-center py-10" style={{ color: "var(--uppr-muted)" }}>
                    Niciun raport încă.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
