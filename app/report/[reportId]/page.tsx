import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PrintButton from "@/components/dashboard/PrintButton";

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default async function ReportPrintPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const supabase = await createClient();

  const { data: report } = await supabase
    .from("campaign_reports")
    .select(
      "id, month, year, ecom_sent_emails, ecom_clicks, ecom_conversion_rate, ecom_transactions, ecom_revenue, recommendation_1, recommendation_2, recommendation_3, recommendation_4, newsletters(*), clients(name, domain)"
    )
    .eq("id", reportId)
    .single();

  if (!report) notFound();

  const client = report.clients as unknown as { name: string; domain: string } | null;
  const newsletters = report.newsletters ?? [];
  const campaignRevenue = newsletters.reduce((sum, n) => sum + Number(n.revenue), 0);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 28px", color: "#1a1a1a", background: "#fff", minHeight: "100vh" }}>
      <div className="no-print" style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/dashboard" style={{ fontSize: 13, color: "#7C3AED", fontWeight: 600 }}>
          ← Înapoi la dashboard
        </a>
        <PrintButton />
      </div>

      <div style={{ borderBottom: "3px solid #7C3AED", paddingBottom: 20, marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", letterSpacing: ".08em", textTransform: "uppercase", ...mono }}>
          UPPR Agency · Raport lunar
        </div>
        <h1 style={{ margin: "8px 0 4px", ...heading, fontWeight: 700, fontSize: 30 }}>
          {LUNI[report.month - 1]} {report.year}
        </h1>
        {client && (
          <p style={{ margin: 0, fontSize: 14, color: "#555" }}>
            {client.name} · {client.domain}
          </p>
        )}
      </div>

      <h2 style={{ ...heading, fontSize: 18, fontWeight: 700, margin: "0 0 12px" }}>
        Campanii lunare ({newsletters.length} newsletter{newsletters.length === 1 ? "" : "-e"})
      </h2>
      {newsletters.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28, fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F4F1FA" }}>
              {["Newsletter", "Sent to", "Open rate", "Click rate", "Transactions", "Revenue"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 10px", borderBottom: "2px solid #E4DCF5", fontWeight: 700 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {newsletters.map((n) => (
              <tr key={n.id}>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #eee", fontWeight: 600 }}>{n.title}</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #eee" }}>{n.sent_emails.toLocaleString("ro-RO")}</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #eee" }}>{n.unique_open_rate}%</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #eee" }}>{n.unique_click_rate}%</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #eee" }}>{n.transactions}</td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #eee" }}>{Number(n.revenue).toLocaleString("ro-RO")} Lei</td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: "10px", fontWeight: 700, color: "#7C3AED" }}>Total campanii</td>
              <td colSpan={4} />
              <td style={{ padding: "10px", fontWeight: 700, color: "#7C3AED" }}>
                {campaignRevenue.toLocaleString("ro-RO")} Lei
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p style={{ color: "#777", marginBottom: 28 }}>Niciun newsletter înregistrat.</p>
      )}

      <h2 style={{ ...heading, fontSize: 18, fontWeight: 700, margin: "0 0 12px" }}>
        Ecommerce statistics (total pe lună)
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28, fontSize: 13 }}>
        <tbody>
          {[
            ["Sent emails", report.ecom_sent_emails],
            ["Clicks", report.ecom_clicks],
            ["Conversion rate", `${report.ecom_conversion_rate}%`],
            ["Transactions", report.ecom_transactions],
            ["Revenue", `${report.ecom_revenue} Lei`],
          ].map(([label, value]) => (
            <tr key={label as string}>
              <td style={{ padding: "7px 10px", borderBottom: "1px solid #eee", color: "#555" }}>{label}</td>
              <td style={{ padding: "7px 10px", borderBottom: "1px solid #eee", fontWeight: 700, textAlign: "right" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {[report.recommendation_1, report.recommendation_2, report.recommendation_3, report.recommendation_4].some(Boolean) && (
        <>
          <h2 style={{ ...heading, fontSize: 18, fontWeight: 700, margin: "0 0 12px" }}>Recomandări</h2>
          <ul style={{ paddingLeft: 20, fontSize: 13.5, lineHeight: 1.6, color: "#333" }}>
            {[report.recommendation_1, report.recommendation_2, report.recommendation_3, report.recommendation_4]
              .filter(Boolean)
              .map((r, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {r}
                </li>
              ))}
          </ul>
        </>
      )}

      <p style={{ marginTop: 40, fontSize: 11, color: "#999", ...mono }}>
        Generat de UPPR Agency · uppr.agency
      </p>
    </div>
  );
}
