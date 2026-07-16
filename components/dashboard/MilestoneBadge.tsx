const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default function MilestoneBadge({ text, icon = "🎉" }: { text: string; icon?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 12,
        background: "linear-gradient(135deg,rgba(251,191,36,.14),rgba(168,85,247,.1))",
        border: "1px solid rgba(251,191,36,.3)",
        animation: "milestonePulse 2.2s ease-in-out infinite",
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#FBBF24", ...heading }}>{text}</div>
    </div>
  );
}
