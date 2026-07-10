import { createClient } from "@/lib/supabase/server";
import RevenueTrendChart from "@/components/dashboard/RevenueTrendChart";
import NewsletterEngagementChart from "@/components/dashboard/NewsletterEngagementChart";

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];
const LUNI_SCURT = [
  "Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec",
];

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
      <dt className="text-sm" style={{ color: "var(--uppr-muted)" }}>{label}</dt>
      <dd style={{ fontFamily: "var(--font-mono-label), monospace", fontWeight: 700, fontSize: "14px" }}>{value}</dd>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();

  // RLS ("Clients view own reports") filtrează automat după client_id
  // pe baza profilului userului autentificat — nu e nevoie de filtru manual aici.
  const { data: reports } = await supabase
    .from("campaign_reports")
    .select("*, newsletters(*)")
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

      {trendData.length > 1 && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
              Trend revenue — toate lunile
            </span>
            <RevenueTrendChart data={trendData} />
          </div>
        </div>
      )}

      {reports?.map((report) => {
        const newsletters = report.newsletters ?? [];
        const campaignRevenue = newsletters.reduce((sum, n) => sum + Number(n.revenue), 0);
        const engagementData = newsletters.map((n) => ({
          title: n.title.length > 14 ? n.title.slice(0, 14) + "…" : n.title,
          openRate: Number(n.unique_open_rate),
          clickRate: Number(n.unique_click_rate),
        }));

        return (
          <section key={report.id} className="uppr-card">
            <div className="uppr-card-inner space-y-6">
              <h2
                style={{
                  fontFamily: "var(--font-heading), sans-serif",
                  fontWeight: 600,
                  fontSize: "22px",
                }}
              >
                {LUNI[report.month - 1]} {report.year}
              </h2>

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
                      <NewsletterEngagementChart data={engagementData} />
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
                </span>
                <dl>
                  <StatRow label="Sent emails" value={report.ecom_sent_emails} />
                  <StatRow label="Clicks" value={report.ecom_clicks} />
                  <StatRow label="Conversion rate" value={`${report.ecom_conversion_rate}%`} />
                  <StatRow label="Transactions" value={report.ecom_transactions} />
                  <StatRow label="Revenue" value={`${report.ecom_revenue} Lei`} />
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
