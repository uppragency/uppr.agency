export default function SiteBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 55% at 50% -8%,rgba(124,58,237,.35),transparent 60%),radial-gradient(ellipse 60% 45% at 88% 18%,rgba(168,85,247,.18),transparent 55%),radial-gradient(ellipse 70% 50% at 8% 82%,rgba(88,28,235,.16),transparent 55%)",
        }}
      />
      <div className="uppr-bg-blob-1" />
      <div className="uppr-bg-blob-2" />
      <div className="uppr-bg-grid" />
    </div>
  );
}
