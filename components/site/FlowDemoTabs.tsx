"use client";

import { useState } from "react";
import FlowDemoPlayer from "@/components/site/FlowDemoPlayer";
import { FLOW_DEMOS } from "@/lib/flow-demos";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function FlowDemoTabs() {
  const [active, setActive] = useState(FLOW_DEMOS[0].key);
  const current = FLOW_DEMOS.find((f) => f.key === active)!;

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
        {FLOW_DEMOS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              borderRadius: 999,
              border: `1px solid ${active === f.key ? "rgba(168,85,247,.5)" : "rgba(255,255,255,.1)"}`,
              background: active === f.key ? "rgba(168,85,247,.18)" : "transparent",
              color: active === f.key ? "#F5F3FF" : "#8B84A0",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              ...mono,
            }}
          >
            <span>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      <FlowDemoPlayer key={current.key} steps={current.steps} flowName={current.flowName} />
    </div>
  );
}
