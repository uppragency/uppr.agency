"use client";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function MonthTimeline({
  months,
}: {
  months: { id: string; label: string }[];
}) {
  if (months.length < 2) return null;

  function jumpTo(id: string) {
    document.getElementById(`month-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        padding: "4px 2px 10px",
        scrollbarWidth: "thin",
      }}
    >
      {months.map((m) => (
        <button
          key={m.id}
          onClick={() => jumpTo(m.id)}
          style={{
            flex: "none",
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,.1)",
            background: "rgba(255,255,255,.03)",
            color: "#A29DB8",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
            ...mono,
            whiteSpace: "nowrap",
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(168,85,247,.15)";
            e.currentTarget.style.color = "#F5F3FF";
            e.currentTarget.style.borderColor = "rgba(168,85,247,.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.03)";
            e.currentTarget.style.color = "#A29DB8";
            e.currentTarget.style.borderColor = "rgba(255,255,255,.1)";
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
