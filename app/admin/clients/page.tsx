import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { computeProfit, computeMargin } from "@/lib/profit";

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, domain")
    .order("name");

  const clientsWithMargin = await Promise.all(
    (clients ?? []).map(async (client) => {
      const { data: latestReport } = await supabase
        .from("campaign_reports")
        .select("ecom_revenue, cost_themarketer, cost_invoice, newsletters(revenue)")
        .eq("client_id", client.id)
        .order("year", { ascending: false })
        .order("month", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!latestReport) return { ...client, margin: null, profit: null };

      const campaignRevenue = (latestReport.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
      const totalRevenue = campaignRevenue + Number(latestReport.ecom_revenue);
      const profit = computeProfit(totalRevenue, Number(latestReport.cost_themarketer), Number(latestReport.cost_invoice));
      const margin = computeMargin(profit, totalRevenue);
      return { ...client, margin, profit };
    })
  );

  const sorted =
    sort === "margin"
      ? [...clientsWithMargin].sort((a, b) => (b.margin ?? -Infinity) - (a.margin ?? -Infinity))
      : clientsWithMargin;

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
            Clienți
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link
            href="/admin/clients"
            className="uppr-btn-secondary"
            style={{ padding: "8px 14px", fontSize: 12.5, minHeight: "auto", opacity: sort === "margin" ? 0.6 : 1 }}
          >
            Nume
          </Link>
          <Link
            href="/admin/clients?sort=margin"
            className="uppr-btn-secondary"
            style={{ padding: "8px 14px", fontSize: 12.5, minHeight: "auto", opacity: sort === "margin" ? 1 : 0.6 }}
          >
            Marjă (desc.)
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {sorted.map((client) => (
          <Link key={client.id} href={`/admin/clients/${client.id}`} className="uppr-card block">
            <div className="uppr-card-inner">
              <div className="flex items-center justify-between">
                <p style={{ fontFamily: "var(--font-heading), sans-serif", fontWeight: 600, fontSize: "19px" }}>
                  {client.name}
                </p>
                {client.margin !== null && (
                  <span
                    className="uppr-badge"
                    style={{
                      color: client.margin >= 0 ? "#4ADE80" : "#FF6B9D",
                      background: client.margin >= 0 ? "rgba(74,222,128,.12)" : "rgba(255,107,157,.12)",
                    }}
                  >
                    {client.margin.toFixed(1)}% marjă
                  </span>
                )}
              </div>
              <p className="text-sm mt-1" style={{ color: "var(--uppr-muted)", fontFamily: "var(--font-mono-label), monospace" }}>
                {client.domain}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
