import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ReportForm from "../report-form";

export default async function EditReportPage({
  params,
}: {
  params: Promise<{ clientId: string; reportId: string }>;
}) {
  const { clientId, reportId } = await params;
  const supabase = await createClient();
  const { data: report } = await supabase
    .from("campaign_reports")
    .select("*")
    .eq("id", reportId)
    .single();

  if (!report) notFound();

  const { data: newsletters } = await supabase
    .from("newsletters")
    .select("*")
    .eq("report_id", reportId)
    .order("created_at", { ascending: true });

  const { data: auditEntries } = await supabase
    .from("audit_log")
    .select("*")
    .eq("report_id", reportId)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-6">
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
          Editează raport lunar
        </h1>
      </div>
      <ReportForm clientId={clientId} report={report} newsletters={newsletters ?? []} />

      {!!auditEntries?.length && (
        <div className="max-w-2xl">
          <div className="uppr-card">
            <div className="uppr-card-inner">
              <span className="uppr-label block mb-3" style={{ color: "var(--uppr-muted)" }}>
                Istoric modificări
              </span>
              <div className="space-y-2">
                {auditEntries.map((entry) => (
                  <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12.5, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <span style={{ color: "var(--uppr-fg)" }}>
                      {entry.action} — {entry.admin_email}
                      {entry.details && <span style={{ color: "var(--uppr-muted)" }}> · {entry.details}</span>}
                    </span>
                    <span style={{ color: "var(--uppr-muted)", flex: "none", fontFamily: "var(--font-mono-label), monospace" }}>
                      {new Date(entry.created_at).toLocaleString("ro-RO")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
