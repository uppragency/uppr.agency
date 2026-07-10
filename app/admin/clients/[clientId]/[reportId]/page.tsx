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
    </div>
  );
}
