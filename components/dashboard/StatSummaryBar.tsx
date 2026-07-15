const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

type Stat = {
  key: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  isMoney?: boolean;
  delta: number | null; // procent, null = fără comparație disponibilă
  sparkline: number[]; // valori brute, se normalizează intern
  sparklineColor: string;
};

function Sparkline({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 20, marginTop: 6 }}>
      {values.map((v, i) => {
        const pct = Math.max(6, (v / max) * 100);
        const isLast = i === values.length - 1;
        return (
          <div
            key={i}
            style={{
              width: 4,
              height: `${pct}%`,
              borderRadius: "2px 2px 0 0",
              background: isLast ? color : `${color}55`,
              flex: "none",
            }}
          />
        );
      })}
    </div>
  );
}

export default function StatSummaryBar({ stats }: { stats: Stat[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.08)",
        background: "linear-gradient(165deg,#130C24,#0A0718)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.key}
          style={{
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,.06)" : undefined,
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              background: s.iconBg,
              color: s.iconColor,
            }}
          >
            {s.icon}
          </div>
          <div style={{ fontSize: 11.5, color: "#8B84A0", ...mono, textTransform: "uppercase", letterSpacing: ".03em" }}>
            {s.label}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span
              className={s.isMoney ? "uppr-money" : undefined}
              style={{ ...heading, fontWeight: 700, fontSize: 21, letterSpacing: "-.01em" }}
            >
              {s.value}
            </span>
            {s.delta !== null && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  ...mono,
                  padding: "2px 7px",
                  borderRadius: 999,
                  color: s.delta >= 0 ? "#4ADE80" : "#FF6B9D",
                  background: s.delta >= 0 ? "rgba(74,222,128,.12)" : "rgba(255,107,157,.12)",
                }}
              >
                {s.delta >= 0 ? "▲" : "▼"} {Math.abs(s.delta).toFixed(0)}%
              </span>
            )}
          </div>
          <Sparkline values={s.sparkline} color={s.sparklineColor} />
        </div>
      ))}
    </div>
  );
}

export type { Stat as StatSummaryItem };
