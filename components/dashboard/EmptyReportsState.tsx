const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

export default function EmptyReportsState() {
  return (
    <div className="uppr-card">
      <div className="uppr-card-inner text-center py-16">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ margin: "0 auto 20px" }}>
          <circle cx="60" cy="60" r="56" fill="rgba(168,85,247,.06)" />
          <rect x="30" y="38" width="60" height="44" rx="8" fill="rgba(168,85,247,.12)" stroke="#A855F7" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M30 46 L60 66 L90 46" stroke="#C084FC" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
          <circle cx="82" cy="34" r="10" fill="#160F2E" stroke="#4ADE80" strokeWidth="1.5" />
          <path d="M78 34 L81 37 L87 30" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <h3 style={{ margin: "0 0 8px", ...heading, fontWeight: 600, fontSize: 17, color: "#F5F3FF" }}>
          Încă niciun raport aici
        </h3>
        <p style={{ margin: "0 auto", maxWidth: 320, fontSize: 14, lineHeight: 1.6, color: "var(--uppr-muted)" }}>
          De îndată ce primul tău raport lunar e publicat, apare exact aici — cu toate cifrele, graficele și recomandările.
        </p>
      </div>
    </div>
  );
}
