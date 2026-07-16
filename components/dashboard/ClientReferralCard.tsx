const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default function ClientReferralCard() {
  return (
    <div
      style={{
        borderRadius: 20,
        padding: 1,
        background: "linear-gradient(150deg,rgba(168,85,247,.5),rgba(255,255,255,.04))",
      }}
    >
      <div style={{ background: "linear-gradient(165deg,#1D0F3D,#0B0817)", borderRadius: 19, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <span className="uppr-label" style={{ ...mono, color: "#D6C6FA", fontSize: 11.5 }}>
            RECOMANDĂ UPPR
          </span>
          <p style={{ margin: "6px 0 0", ...heading, fontWeight: 600, fontSize: 15.5, color: "#F5F3FF" }}>
            Cunoști un business care ar avea nevoie de retention marketing?
          </p>
        </div>
        <a href="/referral-program" target="_blank" className="uppr-btn-primary" style={{ padding: "11px 20px", fontSize: 13.5, textDecoration: "none", flex: "none" }}>
          Vezi programul de recomandare →
        </a>
      </div>
    </div>
  );
}
