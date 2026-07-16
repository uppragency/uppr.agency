function Pulse({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        borderRadius: 10,
        animation: "skeletonPulse 1.6s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: .5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <Pulse style={{ width: 140, height: 12, marginBottom: 12 }} />
          <Pulse style={{ width: 320, height: 28 }} />
        </div>
        <Pulse style={{ width: 160, height: 36, borderRadius: 999 }} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ padding: "20px 22px", borderRight: "1px solid rgba(255,255,255,.05)", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
            <Pulse style={{ width: 32, height: 32, borderRadius: 9, marginBottom: 12 }} />
            <Pulse style={{ width: 80, height: 10, marginBottom: 10 }} />
            <Pulse style={{ width: 110, height: 22 }} />
          </div>
        ))}
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner">
          <Pulse style={{ width: 140, height: 12, marginBottom: 16 }} />
          <Pulse style={{ width: "100%", height: 180 }} />
        </div>
      </div>

      <div className="uppr-card">
        <div className="uppr-card-inner space-y-4">
          <Pulse style={{ width: 180, height: 20 }} />
          <Pulse style={{ width: "100%", height: 100 }} />
          <Pulse style={{ width: "100%", height: 14 }} />
          <Pulse style={{ width: "100%", height: 14 }} />
          <Pulse style={{ width: "70%", height: 14 }} />
        </div>
      </div>
    </div>
  );
}
