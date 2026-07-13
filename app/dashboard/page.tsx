import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import RevenueTrendSection from "@/components/dashboard/RevenueTrendSection";
import NewsletterEngagementChart from "@/components/dashboard/NewsletterEngagementChart";
import RevenueDonutChart from "@/components/dashboard/RevenueDonutChart";
import ProfitTrendChart from "@/components/dashboard/ProfitTrendChart";
import PaidVsEarnedBars from "@/components/dashboard/PaidVsEarnedBars";
import DeltaBadge from "@/components/dashboard/DeltaBadge";
import NewReportBadge from "@/components/dashboard/NewReportBadge";
import SearchBox from "@/components/dashboard/SearchBox";
import PresentationModeToggle from "@/components/dashboard/PresentationModeToggle";
import { computeProfit, computeMargin } from "@/lib/profit";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bună dimineața";
  if (hour < 18) return "Bună ziua";
  return "Bună seara";
}

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
  isMoney,
}: {
  label: string;
  value: string | number;
  current?: number;
  previous?: number | null;
  isMoney?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
      <dt className="text-sm" style={{ color: "var(--uppr-muted)" }}>{label}</dt>
      <dd style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className={isMoney ? "uppr-money" : undefined} style={{ ...mono, fontWeight: 700, fontSize: 14 }}>{value}</span>
        {current !== undefined && <DeltaBadge current={current} previous={previous ?? null} />}
      </dd>
    </div>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const searchTerm = (q ?? "").trim().toLowerCase();

  const supabase = await createClient();
  const profile = await getCurrentProfile();

  let setupCost = 0;
  let clientName = "";
  if (profile?.clientId) {
    const { data: clientRow } = await supabase
      .from("clients")
      .select("setup_cost, name")
      .eq("id", profile.clientId)
      .single();
    setupCost = clientRow?.setup_cost ?? 0;
    clientName = clientRow?.name ?? "";
  }

  // RLS ("Clients view own published reports") filtrează automat după
  // client_id și status='published' — nu e nevoie de filtru manual aici.
  const { data: reports } = await supabase
    .from("campaign_reports")
    .select(
      "id, client_id, month, year, ecom_sent_emails, ecom_clicks, ecom_conversion_rate, ecom_transactions, ecom_revenue, cost_themarketer, cost_invoice, recommendation_1, recommendation_2, recommendation_3, recommendation_4, status, created_at, updated_at, newsletters(*)"
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

  // profit lunar + profit cumulat, folosit pentru grafic și break-even
  let cumulativeProfit = 0;
  let breakEvenLabel: string | null = null;
  const profitTrendData = chronological.map((r) => {
    const campaignRevenue = (r.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0);
    const totalRevenue = campaignRevenue + Number(r.ecom_revenue);
    const profit = computeProfit(totalRevenue, Number(r.cost_themarketer), Number(r.cost_invoice));
    const wasBelowSetup = cumulativeProfit < setupCost;
    cumulativeProfit += profit;
    if (wasBelowSetup && cumulativeProfit >= setupCost && setupCost > 0 && !breakEvenLabel) {
      breakEvenLabel = `${LUNI_SCURT[r.month - 1]} ${r.year}`;
    }
    return { label: `${LUNI_SCURT[r.month - 1]} ${r.year}`, profit };
  });

  const totalPaid = chronological.reduce((sum, r) => sum + Number(r.cost_themarketer) + Number(r.cost_invoice), 0) + setupCost;
  const totalEarned = chronological.reduce((sum, r) => {
    const campaignRevenue = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
    return sum + campaignRevenue + Number(r.ecom_revenue);
  }, 0);

  // prima lună cu profit pozitiv, pentru mesajul de felicitare
  let firstPositiveProfitMonthId: string | null = null;
  let runningProfit = 0;
  let seenPositive = false;
  for (const r of chronological) {
    const campaignRevenue = (r.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0);
    const totalRevenue = campaignRevenue + Number(r.ecom_revenue);
    const profit = computeProfit(totalRevenue, Number(r.cost_themarketer), Number(r.cost_invoice));
    runningProfit += profit;
    if (!seenPositive && profit > 0) {
      firstPositiveProfitMonthId = r.id;
      seenPositive = true;
    }
  }

  const latestUpdatedAt = reports?.length
    ? reports.reduce((latest, r) => (r.updated_at > latest ? r.updated_at : latest), reports[0].updated_at)
    : null;

  // progres estimativ spre următorul raport — presupunem cadență lunară,
  // pornind de la data ultimului raport publicat
  let daysUntilNextReport: number | null = null;
  let nextReportProgressPct = 0;
  if (reports?.[0]) {
    const lastReportDate = new Date(reports[0].created_at);
    const nextExpected = new Date(lastReportDate);
    nextExpected.setDate(nextExpected.getDate() + 30);
    const now = new Date();
    const totalMs = nextExpected.getTime() - lastReportDate.getTime();
    const elapsedMs = now.getTime() - lastReportDate.getTime();
    daysUntilNextReport = Math.max(0, Math.ceil((nextExpected.getTime() - now.getTime()) / 86400000));
    nextReportProgressPct = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
  }

  // cost per click implicit al email-ului, comparat cu un cost tipic de ads
  const totalClicksAllTime = chronological.reduce((sum, r) => sum + r.ecom_clicks, 0);
  const emailCostPerClick = totalClicksAllTime > 0 ? totalPaid / totalClicksAllTime : null;
  const TYPICAL_AD_CPC = 2.5; // Lei, reper ilustrativ pentru comparație

  // filtrare după search: ascund newsletter-ele care nu se potrivesc, și
  // lunile care rămân fără niciun newsletter potrivit (doar când se caută ceva)
  const visibleReports = (reports ?? [])
    .map((r) => {
      if (!searchTerm) return r;
      const filteredNewsletters = (r.newsletters ?? []).filter((n) =>
        n.title.toLowerCase().includes(searchTerm)
      );
      return { ...r, newsletters: filteredNewsletters };
    })
    .filter((r) => !searchTerm || (r.newsletters ?? []).length > 0);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
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
            {getGreeting()}{clientName ? `, ${clientName}` : ""} — <span className="grad-text">rapoartele tale</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <PresentationModeToggle />
          <NewReportBadge latestUpdatedAt={latestUpdatedAt} />
        </div>
      </div>

      {daysUntilNextReport !== null && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="uppr-label" style={{ color: "var(--uppr-muted)" }}>
                Următorul raport
              </span>
              <span className="text-sm" style={{ ...mono, color: "var(--uppr-fg)" }}>
                {daysUntilNextReport === 0 ? "gata în curând" : `~${daysUntilNextReport} zile`}
              </span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
              <div
                style={{
                  width: `${nextReportProgressPct}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: "linear-gradient(90deg,#7C3AED,#A855F7)",
                  transition: "width .3s",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {emailCostPerClick !== null && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
              Cost per click — email vs. ads
            </span>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--uppr-muted)" }}>Prin email (implicit)</div>
                <div className="uppr-money" style={{ ...mono, fontWeight: 700, fontSize: 20, color: "#4ADE80" }}>
                  {emailCostPerClick.toFixed(2)} Lei
                </div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--uppr-muted)" }}>Cost tipic ads (reper)</div>
                <div style={{ ...mono, fontWeight: 700, fontSize: 20, color: "#8B84A0" }}>
                  ~{TYPICAL_AD_CPC.toFixed(2)} Lei
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!reports?.length && (
        <div className="uppr-card">
          <div className="uppr-card-inner text-center py-12">
            <p style={{ color: "var(--uppr-muted)" }}>Niciun raport disponibil momentan.</p>
          </div>
        </div>
      )}

      {!!reports?.length && (
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBox />
          {searchTerm && (
            <span className="text-sm" style={{ color: "var(--uppr-muted)" }}>
              {visibleReports.length} {visibleReports.length === 1 ? "lună găsită" : "luni găsite"} pentru &quot;{searchTerm}&quot;
            </span>
          )}
        </div>
      )}

      {!searchTerm && trendData.length > 1 && <RevenueTrendSection data={trendData} />}

      {!searchTerm && profitTrendData.length > 1 && (
        <div className="uppr-card">
          <div className="uppr-card-inner">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <span className="uppr-label" style={{ color: "#4ADE80" }}>
                💰 Profit net în timp
              </span>
              {breakEvenLabel && (
                <span
                  className="uppr-badge"
                  style={{ color: "#4ADE80", background: "rgba(74,222,128,.12)" }}
                >
                  Cost de setup recuperat în {breakEvenLabel}
                </span>
              )}
            </div>
            <ProfitTrendChart data={profitTrendData} />
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.06)" }}>
              <span className="uppr-label block mb-3" style={{ fontSize: 10.5, color: "var(--uppr-muted)" }}>
                Total, de la începutul colaborării
              </span>
              <PaidVsEarnedBars totalPaid={totalPaid} totalEarned={totalEarned} />
            </div>
          </div>
        </div>
      )}

      {visibleReports.map((report) => {
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

        // luna imediat anterioară (MoM) — rapoartele complete (nefiltrate) sunt
        // sortate descrescător, deci indexul +1 e luna precedentă
        const fullIndex = (reports ?? []).findIndex((r) => r.id === report.id);
        const previous = (reports ?? [])[fullIndex + 1];
        const prevCampaignRevenue = previous
          ? (previous.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0)
          : null;

        // aceeași lună, anul trecut (YoY)
        const sameMonthLastYear = (reports ?? []).find(
          (r) => r.month === report.month && r.year === report.year - 1
        );
        const yoyEcomRevenue = sameMonthLastYear ? Number(sameMonthLastYear.ecom_revenue) : null;
        const yoyCampaignRevenue = sameMonthLastYear
          ? (sameMonthLastYear.newsletters ?? []).reduce((sum, n) => sum + Number(n.revenue), 0)
          : null;

        const totalRevenue = campaignRevenue + Number(report.ecom_revenue);
        const profit = computeProfit(totalRevenue, Number(report.cost_themarketer), Number(report.cost_invoice));
        const margin = computeMargin(profit, totalRevenue);
        const prevTotalRevenue = previous
          ? (previous.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0) + Number(previous.ecom_revenue)
          : null;
        const prevProfit = previous
          ? computeProfit(prevTotalRevenue!, Number(previous.cost_themarketer), Number(previous.cost_invoice))
          : null;
        const isFirstProfitableMonth = report.id === firstPositiveProfitMonthId;

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

              {isFirstProfitableMonth && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg,rgba(74,222,128,.12),rgba(168,85,247,.08))",
                    border: "1px solid rgba(74,222,128,.3)",
                  }}
                >
                  <span style={{ fontSize: 20 }}>🎉</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#4ADE80" }}>
                    Prima lună profitabilă din colaborare!
                  </div>
                </div>
              )}

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
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }} className="uppr-money">
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
                              <td className="uppr-money">{Number(n.revenue).toLocaleString("ro-RO")} Lei</td>
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
                            <td style={{ fontWeight: 700, color: "var(--uppr-violet-3)" }} className="uppr-money">
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
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
                    Ecommerce statistics (total pe lună)
                  </span>
                  {previous && (
                    <span className="text-xs" style={{ color: "var(--uppr-muted)" }}>
                      · vs. {LUNI[previous.month - 1]}
                    </span>
                  )}
                  {sameMonthLastYear && (
                    <span
                      className="text-xs"
                      style={{ color: "var(--uppr-muted)", ...mono, padding: "2px 8px", borderRadius: 999, background: "rgba(255,255,255,.04)" }}
                    >
                      vs. {LUNI[report.month - 1]} {report.year - 1}: {(yoyCampaignRevenue! + yoyEcomRevenue!).toLocaleString("ro-RO")} Lei
                    </span>
                  )}
                </div>
                <dl>
                  <StatRow label="Sent emails" value={report.ecom_sent_emails} current={report.ecom_sent_emails} previous={previous?.ecom_sent_emails} />
                  <StatRow label="Clicks" value={report.ecom_clicks} current={report.ecom_clicks} previous={previous?.ecom_clicks} />
                  <StatRow label="Conversion rate" value={`${report.ecom_conversion_rate}%`} current={report.ecom_conversion_rate} previous={previous?.ecom_conversion_rate} />
                  <StatRow label="Transactions" value={report.ecom_transactions} current={report.ecom_transactions} previous={previous?.ecom_transactions} />
                  <StatRow label="Revenue" value={`${report.ecom_revenue} Lei`} current={Number(report.ecom_revenue)} previous={previous ? Number(previous.ecom_revenue) : null} isMoney />
                  <StatRow label="Revenue campanii" value={`${campaignRevenue.toLocaleString("ro-RO")} Lei`} current={campaignRevenue} previous={prevCampaignRevenue} isMoney />
                  <StatRow
                    label="Profit net"
                    value={`${profit.toLocaleString("ro-RO")} Lei`}
                    current={profit}
                    previous={prevProfit}
                    isMoney
                  />
                  <StatRow label="Marjă" value={margin !== null ? `${margin.toFixed(1)}%` : "—"} isMoney />
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
