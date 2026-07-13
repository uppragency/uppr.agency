const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function PaidVsEarnedBars({
  totalPaid,
  totalEarned,
}: {
  totalPaid: number;
  totalEarned: number;
}) {
  const max = Math.max(totalPaid, totalEarned, 1);
  const paidPct = Math.max(4, (totalPaid / max) * 100);
  const earnedPct = Math.max(4, (totalEarned / max) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div className="flex justify-between mb-1.5">
          <span style={{ fontSize: 12.5, color: "#A29DB8" }}>Ce ai plătit (total)</span>
          <span style={{ fontSize: 13, fontWeight: 700, ...mono, color: "#FF6B9D" }} className="uppr-money">
            {totalPaid.toLocaleString("ro-RO")} Lei
          </span>
        </div>
        <div style={{ height: 14, borderRadius: 999, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
          <div style={{ width: `${paidPct}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#FF4D8D,#FF6B9D)" }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1.5">
          <span style={{ fontSize: 12.5, color: "#A29DB8" }}>Ce ai câștigat (total)</span>
          <span style={{ fontSize: 13, fontWeight: 700, ...mono, color: "#4ADE80" }} className="uppr-money">
            {totalEarned.toLocaleString("ro-RO")} Lei
          </span>
        </div>
        <div style={{ height: 14, borderRadius: 999, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
          <div style={{ width: `${earnedPct}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#22C55E,#4ADE80)" }} />
        </div>
      </div>
    </div>
  );
}
