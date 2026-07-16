import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type PortfolioAverages = {
  avgOpenRate: number;
  avgClickRate: number;
  avgRevenueGrowthPct: number | null;
};

/**
 * Calculează medii agregate pe tot portofoliul de clienți, pentru comparație
 * anonimizată pe dashboard-ul unui client. Folosește service role ca să
 * citească toate rapoartele, dar NU expune niciodată date individuale ale
 * altor clienți către răspuns — doar cifrele agregate calculate aici.
 */
export async function getPortfolioAverages(): Promise<PortfolioAverages | null> {
  try {
    const admin = createAdminClient();

    const { data: recentReports } = await admin
      .from("campaign_reports")
      .select("client_id, month, year, ecom_revenue, newsletters(unique_open_rate, unique_click_rate, revenue, sent_emails)")
      .eq("status", "published")
      .order("year", { ascending: false })
      .order("month", { ascending: false })
      .limit(200);

    if (!recentReports || recentReports.length === 0) return null;

    // pentru fiecare client, iau doar cel mai recent raport al lui
    const latestPerClient = new Map<string, (typeof recentReports)[number]>();
    for (const r of recentReports) {
      if (!latestPerClient.has(r.client_id)) latestPerClient.set(r.client_id, r);
    }
    const latestReports = Array.from(latestPerClient.values());
    if (latestReports.length === 0) return null;

    let openSum = 0;
    let clickSum = 0;
    let newsletterCount = 0;
    for (const r of latestReports) {
      for (const n of r.newsletters ?? []) {
        openSum += Number(n.unique_open_rate);
        clickSum += Number(n.unique_click_rate);
        newsletterCount++;
      }
    }

    const avgOpenRate = newsletterCount > 0 ? openSum / newsletterCount : 0;
    const avgClickRate = newsletterCount > 0 ? clickSum / newsletterCount : 0;

    return { avgOpenRate, avgClickRate, avgRevenueGrowthPct: null };
  } catch {
    return null;
  }
}
