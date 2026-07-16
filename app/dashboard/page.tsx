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
import StatSummaryBar, { type StatSummaryItem } from "@/components/dashboard/StatSummaryBar";
import CampaignFunnel from "@/components/dashboard/CampaignFunnel";
import MonthTimeline from "@/components/dashboard/MonthTimeline";
import FocusModeToggle from "@/components/dashboard/FocusModeToggle";
import EmptyReportsState from "@/components/dashboard/EmptyReportsState";
import PortfolioComparisonCard from "@/components/dashboard/PortfolioComparisonCard";
import ClientReferralCard from "@/components/dashboard/ClientReferralCard";
import MilestoneBadge from "@/components/dashboard/MilestoneBadge";
import { computeProfit, computeMargin } from "@/lib/profit";
import { getPortfolioAverages } from "@/lib/portfolio-stats";

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
  searchParams: Promise<{ q?: string; focus?: string }>;
}) {
  const { q, focus } = await searchParams;
  const searchTerm = (q ?? "").trim().toLowerCase();

  const supabase = await createClient();
  const profile = await getCurrentProfile();

  let setupCost = 0;
  let clientName = "";
  let targetMarginPct: number | null = null;
  let clientCreatedAt: string | null = null;
  if (profile?.clientId) {
    const { data: clientRow } = await supabase
      .from("clients")
      .select("setup_cost, name, target_margin_pct, created_at")
      .eq("id", profile.clientId)
      .single();
    setupCost = clientRow?.setup_cost ?? 0;
    clientName = clientRow?.name ?? "";
    targetMarginPct = clientRow?.target_margin_pct ?? null;
    clientCreatedAt = clientRow?.created_at ?? null;
  }

  // RLS ("Clients view own published reports") filtrează automat după
  // client_id și status='published' — nu e nevoie de filtru manual aici.
  const { data: reports } = await supabase
    .from("campaign_reports")
    .select(
      "id, client_id, month, year, ecom_sent_emails, ecom_clicks, ecom_conversion_rate, ecom_transactions, ecom_revenue, cost_themarketer, cost_invoice, tags, recommendation_1, recommendation_2, recommendation_3, recommendation_4, status, created_at, updated_at, newsletters(*)"
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

  // bara de sumar de sus — cifrele lunii celei mai recente, cu sparkline din
  // istoric și comparație vs. luna anterioară (toate calculate din date reale)
  function pctDelta(current: number, previous: number | null | undefined): number | null {
    if (previous === null || previous === undefined || previous === 0) return null;
    return ((current - previous) / previous) * 100;
  }

  let summaryStats: StatSummaryItem[] | null = null;
  if (reports?.[0]) {
    const latest = reports[0];
    const prevForBar = reports[1];

    const latestCampaignRevenue = (latest.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
    const latestTotalRevenue = latestCampaignRevenue + Number(latest.ecom_revenue);
    const latestProfit = computeProfit(latestTotalRevenue, Number(latest.cost_themarketer), Number(latest.cost_invoice));
    const latestMargin = computeMargin(latestProfit, latestTotalRevenue);
    const latestNewsletterCount = (latest.newsletters ?? []).length;

    let prevTotalRevenue: number | null = null;
    let prevProfit: number | null = null;
    let prevNewsletterCount: number | null = null;
    if (prevForBar) {
      const prevCampaignRevenue2 = (prevForBar.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
      prevTotalRevenue = prevCampaignRevenue2 + Number(prevForBar.ecom_revenue);
      prevProfit = computeProfit(prevTotalRevenue, Number(prevForBar.cost_themarketer), Number(prevForBar.cost_invoice));
      prevNewsletterCount = (prevForBar.newsletters ?? []).length;
    }

    const revenueSparkline = chronological.slice(-7).map((r) => {
      const cr = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
      return cr + Number(r.ecom_revenue);
    });
    const profitSparkline = profitTrendData.slice(-7).map((d) => Math.max(0, d.profit));
    const newsletterCountSparkline = chronological.slice(-7).map((r) => (r.newsletters ?? []).length);

    summaryStats = [
      {
        key: "revenue",
        icon: "💰",
        iconColor: "#4ADE80",
        iconBg: "rgba(74,222,128,.14)",
        label: "Revenue total",
        value: `${latestTotalRevenue.toLocaleString("ro-RO")} Lei`,
        isMoney: true,
        delta: pctDelta(latestTotalRevenue, prevTotalRevenue),
        sparkline: revenueSparkline,
      },
      {
        key: "profit",
        icon: "✦",
        iconColor: "#C084FC",
        iconBg: "rgba(168,85,247,.16)",
        label: "Profit net",
        value: `${latestProfit.toLocaleString("ro-RO")} Lei`,
        isMoney: true,
        delta: pctDelta(latestProfit, prevProfit),
        sparkline: profitSparkline,
      },
      {
        key: "margin",
        icon: "◐",
        iconColor: "#FDBA74",
        iconBg: "rgba(253,186,116,.16)",
        label: "Marjă",
        value: latestMargin !== null ? `${latestMargin.toFixed(1)}%` : "—",
        isMoney: true,
        delta: null,
        sparkline: profitSparkline,
      },
      {
        key: "newsletters",
        icon: "✉",
        iconColor: "#60A5FA",
        iconBg: "rgba(96,165,250,.16)",
        label: "Newsletter-e trimise",
        value: String(latestNewsletterCount),
        delta: pctDelta(latestNewsletterCount, prevNewsletterCount),
        sparkline: newsletterCountSparkline,
      },
    ];
  }

  // filtrare după search: ascund newsletter-ele care nu se potrivesc, și
  // lunile care rămân fără niciun newsletter potrivit (doar când se caută ceva)
  let visibleReports = (reports ?? [])
    .map((r) => {
      if (!searchTerm) return r;
      const filteredNewsletters = (r.newsletters ?? []).filter((n) =>
        n.title.toLowerCase().includes(searchTerm)
      );
      return { ...r, newsletters: filteredNewsletters };
    })
    .filter((r) => !searchTerm || (r.newsletters ?? []).length > 0);

  // mod focus — arată o singură lună, dacă e selectată
  if (focus) {
    visibleReports = visibleReports.filter((r) => r.id === focus);
  }

  const monthOptions = (reports ?? []).map((r) => ({
    id: r.id,
    label: `${LUNI_SCURT[r.month - 1]} ${r.year}`,
  }));

  // milestone-uri celebrate automat: X luni de colaborare + praguri de
  // revenue cumulat, calculate din date reale, atașate lunii unde apar
  const MILESTONE_MONTHS = [6, 12, 18, 24, 36, 48];
  const REVENUE_MILESTONES = [50000, 100000, 250000, 500000, 1000000];
  const milestonesByReportId = new Map<string, string[]>();

  if (clientCreatedAt && chronological.length) {
    const startDate = new Date(clientCreatedAt);
    for (const r of chronological) {
      const reportDate = new Date(r.year, r.month - 1, 1);
      const monthsSinceStart =
        (reportDate.getFullYear() - startDate.getFullYear()) * 12 + (reportDate.getMonth() - startDate.getMonth());
      if (MILESTONE_MONTHS.includes(monthsSinceStart)) {
        const list = milestonesByReportId.get(r.id) ?? [];
        list.push(`${monthsSinceStart} luni de colaborare cu UPPR! 🎉`);
        milestonesByReportId.set(r.id, list);
      }
    }
  }

  let cumulativeRevenueForMilestones = 0;
  let nextRevenueMilestoneIdx = 0;
  for (const r of chronological) {
    const cr = (r.newsletters ?? []).reduce((s, n) => s + Number(n.revenue), 0);
    cumulativeRevenueForMilestones += cr + Number(r.ecom_revenue);
    while (
      nextRevenueMilestoneIdx < REVENUE_MILESTONES.length &&
      cumulativeRevenueForMilestones >= REVENUE_MILESTONES[nextRevenueMilestoneIdx]
    ) {
      const threshold = REVENUE_MILESTONES[nextRevenueMilestoneIdx];
      const list = milestonesByReportId.get(r.id) ?? [];
      list.push(`Ați depășit ${threshold.toLocaleString("ro-RO")} Lei revenue cumulat!`);
      milestonesByReportId.set(r.id, list);
      nextRevenueMilestoneIdx++;
    }
  }

  // comparație anonimizată vs. media portofoliului
  const portfolioAverages = !searchTerm && !focus ? await getPortfolioAverages() : null;
  const latestReportForComparison = reports?.[0];
  const latestNewslettersForComparison = latestReportForComparison?.newsletters ?? [];
  const yourAvgOpenRate =
    latestNewslettersForComparison.length > 0
      ? latestNewslettersForComparison.reduce((s, n) => s + Number(n.unique_open_rate), 0) / latestNewslettersForComparison.length
      : null;
  const yourAvgClickRate =
    latestNewslettersForComparison.length > 0
      ? latestNewslettersForComparison.reduce((s, n) => s + Number(n.unique_click_rate), 0) / latestNewslettersForComparison.length
      : null;

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

      {summaryStats && !searchTerm && <StatSummaryBar stats={summaryStats} />}

      {(daysUntilNextReport !== null || emailCostPerClick !== null) && (
        <div className="grid lg:grid-cols-2 gap-6">
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
        </div>
      )}

      {!reports?.length && <EmptyReportsState />}

      {!!reports?.length && (
        <>
          <MonthTimeline months={monthOptions} />
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <SearchBox />
              {searchTerm && (
                <span className="text-sm" style={{ color: "var(--uppr-muted)" }}>
                  {visibleReports.length} {visibleReports.length === 1 ? "lună găsită" : "luni găsite"} pentru &quot;{searchTerm}&quot;
                </span>
              )}
            </div>
            <FocusModeToggle months={monthOptions} />
          </div>
        </>
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

      {!searchTerm && !focus && portfolioAverages && yourAvgOpenRate !== null && yourAvgClickRate !== null && (
        <PortfolioComparisonCard
          yourOpenRate={yourAvgOpenRate}
          yourClickRate={yourAvgClickRate}
          avgOpenRate={portfolioAverages.avgOpenRate}
          avgClickRate={portfolioAverages.avgClickRate}
        />
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
          <section key={report.id} id={`month-${report.id}`} className="uppr-card" style={{ scrollMarginTop: 100 }}>
            <div className="uppr-card-inner space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2
                    style={{
                      fontFamily: "var(--font-heading), sans-serif",
                      fontWeight: 600,
                      fontSize: "22px",
                    }}
                  >
                    {LUNI[report.month - 1]} {report.year}
                  </h2>
                  {report.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="uppr-badge"
                      style={{ color: "#C4BCDC", background: "rgba(255,255,255,.06)", fontSize: 11 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/report/${report.id}`}
                  target="_blank"
                  className="uppr-btn-secondary"
                  style={{ padding: "8px 16px", fontSize: 13, minHeight: "auto" }}
                >
                  Descarcă PDF
                </Link>
              </div>

              {(milestonesByReportId.get(report.id) ?? []).map((m) => (
                <MilestoneBadge key={m} text={m} />
              ))}

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
                    <div style={{ overflowX: "auto", marginBottom: 24 }}>
                      <CampaignFunnel newsletters={newsletters} />
                    </div>

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
                  {targetMarginPct !== null && margin !== null && margin >= targetMarginPct && (
                    <div
                      className="uppr-target-reached"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 10,
                        padding: "8px 14px",
                        borderRadius: 999,
                        background: "rgba(74,222,128,.1)",
                        border: "1px solid rgba(74,222,128,.3)",
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#4ADE80",
                        width: "fit-content",
                      }}
                    >
                      🎯 Target de marjă ({targetMarginPct}%) atins!
                    </div>
                  )}
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

      {!searchTerm && !focus && <ClientReferralCard />}
    </div>
  );
}
