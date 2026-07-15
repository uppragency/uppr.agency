const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

type Newsletter = {
  sent_emails: number;
  unique_open_rate: number;
  unique_click_rate: number;
  transactions: number;
};

function buildBars(count: number, decayPattern: number[]): number[] {
  return decayPattern.slice(0, count);
}

export default function CampaignFunnel({ newsletters }: { newsletters: Newsletter[] }) {
  const sent = newsletters.reduce((sum, n) => sum + n.sent_emails, 0);
  const opened = newsletters.reduce((sum, n) => sum + n.sent_emails * (n.unique_open_rate / 100), 0);
  const clicked = newsletters.reduce((sum, n) => sum + n.sent_emails * (n.unique_click_rate / 100), 0);
  const converted = newsletters.reduce((sum, n) => sum + n.transactions, 0);

  if (sent === 0) return null;

  const steps = [
    { key: "sent", label: "Trimise", value: sent, pct: 100, color: "#60A5FA" },
    { key: "opened", label: "Deschise", value: Math.round(opened), pct: (opened / sent) * 100, color: "#A855F7" },
    { key: "clicked", label: "Click-uri", value: Math.round(clicked), pct: (clicked / sent) * 100, color: "#C084FC" },
    { key: "converted", label: "Conversii", value: converted, pct: (converted / sent) * 100, color: "#4ADE80" },
  ];

  // simulare vizuală de decay progresiv pentru mini-bare (8 bare per etapă,
  // descrescătoare proporțional cu pct-ul etapei) — pur decorativ, nu date reale suplimentare
  const barCount = 8;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(140px,100%),1fr))",
          gap: 0,
        }}
      >
        {steps.map((s, i) => (
          <div
            key={s.key}
            style={{
              padding: "0 18px",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,.07)" : undefined,
            }}
          >
            <div style={{ ...heading, fontWeight: 700, fontSize: 24 }}>
              {s.value.toLocaleString("ro-RO")}
            </div>
            <div style={{ fontSize: 11, color: "#8B84A0", ...mono, textTransform: "uppercase", letterSpacing: ".03em", margin: "3px 0 10px" }}>
              {s.label}
            </div>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 22 }}>
              {buildBars(barCount, Array.from({ length: barCount }, (_, bi) => Math.max(4, s.pct - bi * (s.pct / (barCount + 2))))).map((h, bi) => (
                <div
                  key={bi}
                  style={{
                    flex: 1,
                    height: `${Math.max(4, h)}%`,
                    borderRadius: 2,
                    background: s.color,
                    opacity: 0.35 + (0.65 * (barCount - bi)) / barCount,
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#6E6980", marginTop: 8, ...mono }}>{s.pct.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
