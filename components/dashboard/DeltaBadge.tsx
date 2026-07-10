const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function DeltaBadge({ current, previous }: { current: number; previous: number | null }) {
  if (previous === null || previous === 0) return null;

  const pct = ((current - previous) / previous) * 100;
  const isPositive = pct >= 0;
  const rounded = Math.abs(pct) < 0.1 ? 0 : Math.round(pct * 10) / 10;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontSize: 11.5,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 999,
        color: isPositive ? "#4ADE80" : "#FF6B9D",
        background: isPositive ? "rgba(74,222,128,.12)" : "rgba(255,107,157,.12)",
        ...mono,
      }}
    >
      {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}{rounded}%
    </span>
  );
}
