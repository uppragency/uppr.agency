import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DuplicateReportButton from "@/components/admin/DuplicateReportButton";

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
    .select("id, name, domain")
    .eq("id", clientId)
    .single();

  if (!client) notFound();

  const { data: reports } = await supabase
    .from("campaign_reports")
    .select("id, month, year, ecom_revenue, status, newsletters(revenue)")
    .eq("client_id", clientId)
    .order("year", { ascending: false })
    .order("month", { ascending: false });

  const reportsWithTotals = reports?.map((r) => ({
    ...r,
    campaignRevenue: (r.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0),
    newsletterCount: (r.newsletters ?? []).length,
  }));

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
            {client.name}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--uppr-muted)", fontFamily: "var(--font-mono-label), monospace" }}>
            {client.domain}
          </p>
        </div>
        <Link href={`/admin/clients/${clientId}/new-report`} className="uppr-btn-primary">
          + Raport lunar
        </Link>
      </div>

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
                  <td colSpan={6} className="text-center py-10" style={{ color: "var(--uppr-muted)" }}>
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
