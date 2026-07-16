const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default function PopupPreviewDemo() {
  return (
    <div
      style={{
        borderRadius: 20,
        padding: 1,
        background: "linear-gradient(160deg,rgba(168,85,247,.5),rgba(255,255,255,.04))",
      }}
    >
      <div
        style={{
          background: "linear-gradient(165deg,#100A1E,#0B0817)",
          borderRadius: 19,
          padding: "clamp(24px,4vw,40px)",
          position: "relative",
          minHeight: 320,
          overflow: "hidden",
        }}
      >
        {/* fundal - simulare site */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, opacity: 0.35 }}>
          <div style={{ width: 90, height: 12, borderRadius: 4, background: "#8B84A0" }} />
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 40, height: 10, borderRadius: 4, background: "#8B84A0" }} />
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, opacity: 0.25 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 90, borderRadius: 10, background: "rgba(255,255,255,.06)" }} />
          ))}
        </div>

        {/* popup */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "min(320px, 88%)",
            background: "#fff",
            borderRadius: 16,
            padding: "28px 24px",
            boxShadow: "0 30px 70px rgba(0,0,0,.5)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 14,
              width: 20,
              height: 20,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#9aa0a6",
              cursor: "default",
            }}
          >
            ✕
          </div>
          <span style={{ fontSize: 28 }}>🎁</span>
          <h3 style={{ margin: "10px 0 6px", ...heading, fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
            Get 15% off your first order
          </h3>
          <p style={{ margin: "0 0 16px", fontSize: 12.5, color: "#666", lineHeight: 1.5 }}>
            Join the list — new arrivals, restocks, and offers before anyone else.
          </p>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 13,
              color: "#999",
              textAlign: "left",
              marginBottom: 10,
            }}
          >
            your@email.com
          </div>
          <div
            style={{
              background: "linear-gradient(135deg,#7C3AED,#A855F7)",
              borderRadius: 8,
              padding: "11px 12px",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Get my code →
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 10.5, color: "#aaa" }}>No spam. Unsubscribe anytime.</p>
        </div>

        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center" }}>
          <span style={{ fontSize: 10.5, color: "#6E6980", ...mono, textTransform: "uppercase", letterSpacing: ".04em" }}>
            Triggered after 15s on-site, or on exit-intent
          </span>
        </div>
      </div>
    </div>
  );
}
