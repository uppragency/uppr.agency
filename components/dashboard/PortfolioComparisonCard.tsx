const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

function Bar({ label, value, avg, color }: { label: string; value: number; avg: number; color: string }) {
  const max = Math.max(value, avg, 1) * 1.15;
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span style={{ fontSize: 13, color: "#C4BCDC" }}>{label}</span>
        <span style={{ fontSize: 12.5, ...mono, color, fontWeight: 700 }}>
          {value.toFixed(1)}% <span style={{ color: "#6E6980", fontWeight: 400 }}>vs. {avg.toFixed(1)}% medie</span>
        </span>
      </div>
      <div style={{ position: "relative", height: 10, borderRadius: 999, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
        <div style={{ width: `${(value / max) * 100}%`, height: "100%", borderRadius: 999, background: color }} />
        <div
          style={{
            position: "absolute",
            top: -3,
            left: `${(avg / max) * 100}%`,
            width: 2,
            height: 16,
            background: "#F5F3FF",
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}

export default function PortfolioComparisonCard({
  yourOpenRate,
  yourClickRate,
  avgOpenRate,
  avgClickRate,
}: {
  yourOpenRate: number;
  yourClickRate: number;
  avgOpenRate: number;
  avgClickRate: number;
}) {
  return (
    <div className="uppr-card">
      <div className="uppr-card-inner space-y-5">
        <div>
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Tu vs. media portofoliului UPPR
          </span>
          <p style={{ margin: "6px 0 0", fontSize: 12.5, color: "var(--uppr-muted)" }}>
            Comparație anonimizată — fără date individuale despre alți clienți.
          </p>
        </div>
        <Bar label="Open rate" value={yourOpenRate} avg={avgOpenRate} color="#A855F7" />
        <Bar label="Click rate" value={yourClickRate} avg={avgClickRate} color="#4ADE80" />
      </div>
    </div>
  );
}
