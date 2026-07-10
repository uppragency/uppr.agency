import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import RevenueTrendSection from "@/components/dashboard/RevenueTrendSection";
import NewsletterEngagementChart from "@/components/dashboard/NewsletterEngagementChart";
import RevenueDonutChart from "@/components/dashboard/RevenueDonutChart";
import DeltaBadge from "@/components/dashboard/DeltaBadge";

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];
const LUNI_SCURT = [
  "Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec",
];
const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

function StatRow({
  label,
  value,
  current,
  previous,
}: {
  label: string;
  value: string | number;
  current?: number;
  previous?: number | null;
}) {
  return (
    <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
      <dt className="text-sm" style={{ color: "var(--uppr-muted)" }}>{label}</dt>
      <dd style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ ...mono, fontWeight: 700, fontSize: 14 }}>{value}</span>
        {current !== undefined && <DeltaBadge current={current} previous={previous ?? null} />}
      </dd>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();

  // RLS ("Clients view own published reports") filtrează automat după
  // client_id și status='published' — nu e nevoie de filtru manual aici.
  const { data: reports } = await supabase
    .from("campaign_reports")
    .select(
      "id, client_id, month, year, ecom_sent_emails, ecom_clicks, ecom_conversion_rate, ecom_transactions, ecom_revenue, recommendation_1, recommendation_2, recommendation_3, recommendation_4, status, created_at, updated_at, newsletters(*)"
    )
    .order("year", { ascending: false })
    .order("month", { ascending: false });

  const chronological = [...(reports ?? [])].sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month
  );

  const trendData = chronological.map((r) => ({
    label: `${LUNI_SCURT[r.month - 1]} ${r.year}`,
    campaigns: (r.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0),
    ecommerce: Number(r.ecom_revenue),
  }));

  return (
    <div className="space-y-8">
      <div>
        <span className="uppr-label" style={{ color: "#A855F7" }}>
          [ CAMPANIILE TALE ]
        </span>
        <h1
          className="mt-2"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 3.5vw, 34px)",
            letterSpacing: "-.02em",
          }}
        >
          Rapoarte <span className="grad-text">lunare</span>
        </h1>
      </div>

      {!reports?.length && (
        <div className="uppr-card">
          <div className="uppr-card-inner text-center py-12">
            <p style={{ color: "var(--uppr-muted)" }}>Niciun raport disponibil momentan.</p>
          </div>
        </div>
      )}

      {trendData.length > 1 && <RevenueTrendSection data={trendData} />}

      {reports?.map((report, idx) => {
        const newsletters = report.newsletters ?? [];
        const campaignRevenue = newsletters.reduce((sum, n) => sum + Number(n.revenue), 0);
        const engagementData = newsletters.map((n) => ({
          title: n.title.length > 14 ? n.title.slice(0, 14) + "…" : n.title,
          openRate: Number(n.unique_open_rate),
          clickRate: Number(n.unique_click_rate),
        }));
        const donutData = newsletters.map((n) => ({ name: n.title, value: Number(n.revenue) }));
        const bestNewsletter = newsletters.length
          ? newsletters.reduce((best, n) => (Number(n.revenue) > Number(best.revenue) ? n : best))
          : null;

        // rapoartele sunt sortate descrescător (cel curent + cele anterioare);
        // cel de la index+1 e luna imediat anterioară, pentru comparație
        const previous = reports[idx + 1];
        const prevCampaignRevenue = previous
          ? (previous.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0)
          : null;

        return (
          <section key={report.id} className="uppr-card">
            <div className="uppr-card-inner space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2
                  style={{
                    fontFamily: "var(--font-heading), sans-serif",
                    fontWeight: 600,
                    fontSize: "22px",
                  }}
                >
                  {LUNI[report.month - 1]} {report.year}
                </h2>
                <Link
                  href={`/report/${report.id}`}
                  target="_blank"
                  className="uppr-btn-secondary"
                  style={{ padding: "8px 16px", fontSize: 13, minHeight: "auto" }}
                >
                  Descarcă PDF
                </Link>
              </div>

              {bestNewsletter && newsletters.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg,rgba(251,191,36,.1),rgba(168,85,247,.08))",
                    border: "1px solid rgba(251,191,36,.25)",
                  }}
                >
                  <span style={{ fontSize: 20 }}>🏆</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#FBBF24", ...mono, textTransform: "uppercase", letterSpacing: ".04em" }}>
                      Cel mai performant newsletter
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>
                      {bestNewsletter.title} — {Number(bestNewsletter.revenue).toLocaleString("ro-RO")} Lei
                    </div>
                  </div>
                </div>
              )}

              <div>
                <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
                  Campanii lunare — {newsletters.length} newsletter{newsletters.length === 1 ? "" : "-e"}
                </span>

                {newsletters.length > 0 ? (
                  <>
                    <div style={{ overflowX: "auto", marginBottom: 20 }}>
                      <table className="uppr-table" style={{ minWidth: 560 }}>
                        <thead>
                          <tr>
                            <th>Newsletter</th>
                            <th>Sent to</th>
                            <th>Open rate</th>
                            <th>Click rate</th>
                            <th>Transactions</th>
                            <th>Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsletters.map((n) => (
                            <tr key={n.id}>
                              <td style={{ fontWeight: 600 }}>{n.title}</td>
                              <td>{n.sent_emails.toLocaleString("ro-RO")}</td>
                              <td>{n.unique_open_rate}%</td>
                              <td>{n.unique_click_rate}%</td>
                              <td>{n.transactions}</td>
                              <td>{Number(n.revenue).toLocaleString("ro-RO")} Lei</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td style={{ fontWeight: 700, color: "var(--uppr-violet-3)" }}>Total campanii</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td style={{ fontWeight: 700, color: "var(--uppr-violet-3)" }}>
                              {campaignRevenue.toLocaleString("ro-RO")} Lei
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {newsletters.length > 1 && (
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <span className="uppr-label block mb-2" style={{ fontSize: 10.5, color: "var(--uppr-muted)" }}>
                            Engagement per newsletter
                          </span>
                          <NewsletterEngagementChart data={engagementData} />
                        </div>
                        <div>
                          <span className="uppr-label block mb-2" style={{ fontSize: 10.5, color: "var(--uppr-muted)" }}>
                            Distribuție revenue
                          </span>
                          <RevenueDonutChart data={donutData} />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm" style={{ color: "var(--uppr-muted)" }}>
                    Niciun newsletter înregistrat pentru luna aceasta.
                  </p>
                )}
              </div>

              <div>
                <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
                  Ecommerce statistics (total pe lună)
                  {previous && (
                    <span style={{ fontWeight: 400, color: "var(--uppr-muted)", textTransform: "none", letterSpacing: 0, marginLeft: 8 }}>
                      · vs. {LUNI[previous.month - 1]}
                    </span>
                  )}
                </span>
                <dl>
                  <StatRow label="Sent emails" value={report.ecom_sent_emails} current={report.ecom_sent_emails} previous={previous?.ecom_sent_emails} />
                  <StatRow label="Clicks" value={report.ecom_clicks} current={report.ecom_clicks} previous={previous?.ecom_clicks} />
                  <StatRow label="Conversion rate" value={`${report.ecom_conversion_rate}%`} current={report.ecom_conversion_rate} previous={previous?.ecom_conversion_rate} />
                  <StatRow label="Transactions" value={report.ecom_transactions} current={report.ecom_transactions} previous={previous?.ecom_transactions} />
                  <StatRow label="Revenue" value={`${report.ecom_revenue} Lei`} current={Number(report.ecom_revenue)} previous={previous ? Number(previous.ecom_revenue) : null} />
                  <StatRow label="Revenue campanii" value={`${campaignRevenue.toLocaleString("ro-RO")} Lei`} current={campaignRevenue} previous={prevCampaignRevenue} />
                </dl>
              </div>

              {[
                report.recommendation_1,
                report.recommendation_2,
                report.recommendation_3,
                report.recommendation_4,
              ].some(Boolean) && (
                <div>
                  <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
                    Recomandări
                  </span>
                  <ul className="space-y-2">
                    {[
                      report.recommendation_1,
                      report.recommendation_2,
                      report.recommendation_3,
                      report.recommendation_4,
                    ]
                      .filter(Boolean)
                      .map((r, i) => (
                        <li key={i} className="text-sm flex gap-2" style={{ color: "var(--uppr-fg)" }}>
                          <span style={{ color: "var(--uppr-violet-3)" }}>→</span>
                          {r}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
