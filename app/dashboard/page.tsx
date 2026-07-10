import { createClient } from "@/lib/supabase/server";

const LUNI = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
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
    .select("*")
    .order("year", { ascending: false })
    .order("month", { ascending: false });

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

      {reports?.map((report) => (
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

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
                  Campanii lunare
                </span>
                <dl>
                  <StatRow label="Sent emails" value={report.sent_emails} />
                  <StatRow label="Unique open rate" value={`${report.unique_open_rate}%`} />
                  <StatRow label="Unique click rate" value={`${report.unique_click_rate}%`} />
                  <StatRow label="Transactions" value={report.transactions} />
                  <StatRow label="Revenue" value={`${report.revenue} Lei`} />
                </dl>
              </div>

              <div>
                <span className="uppr-label block mb-3" style={{ color: "var(--uppr-violet-3)" }}>
                  Ecommerce statistics
                </span>
                <dl>
                  <StatRow label="Sent emails" value={report.ecom_sent_emails} />
                  <StatRow label="Clicks" value={report.ecom_clicks} />
                  <StatRow label="Conversion rate" value={`${report.ecom_conversion_rate}%`} />
                  <StatRow label="Transactions" value={report.ecom_transactions} />
                  <StatRow label="Revenue" value={`${report.ecom_revenue} Lei`} />
                </dl>
              </div>
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
      ))}
    </div>
  );
}
