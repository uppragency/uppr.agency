import ReportForm from "../report-form";

export default async function NewReportPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
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
          Raport lunar nou
        </h1>
      </div>
      <ReportForm clientId={clientId} />
    </div>
  );
}
