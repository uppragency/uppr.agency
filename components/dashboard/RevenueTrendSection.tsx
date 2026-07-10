"use client";

import { useState } from "react";
import RevenueTrendChart from "./RevenueTrendChart";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

type Point = { label: string; campaigns: number; ecommerce: number };

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 13px",
        borderRadius: 999,
        border: `1px solid ${active ? "rgba(168,85,247,.4)" : "rgba(255,255,255,.1)"}`,
        background: active ? "rgba(168,85,247,.15)" : "transparent",
        color: active ? "#F5F3FF" : "#8B84A0",
        fontWeight: 600,
        fontSize: 12,
        cursor: "pointer",
        ...mono,
      }}
    >
      {children}
    </button>
  );
}

export default function RevenueTrendSection({ data }: { data: Point[] }) {
  const [range, setRange] = useState<3 | 6 | 12 | "all">("all");

  const filtered = range === "all" ? data : data.slice(-range);

  return (
    <div className="uppr-card">
      <div className="uppr-card-inner">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <span className="uppr-label" style={{ color: "var(--uppr-violet-3)" }}>
            Trend revenue
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <FilterBtn active={range === 3} onClick={() => setRange(3)}>3 luni</FilterBtn>
            <FilterBtn active={range === 6} onClick={() => setRange(6)}>6 luni</FilterBtn>
            <FilterBtn active={range === 12} onClick={() => setRange(12)}>12 luni</FilterBtn>
            <FilterBtn active={range === "all"} onClick={() => setRange("all")}>Tot</FilterBtn>
          </div>
        </div>
        <RevenueTrendChart data={filtered} />
      </div>
    </div>
  );
}
