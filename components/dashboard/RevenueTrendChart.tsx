"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function RevenueTrendChart({
  data,
}: {
  data: { label: string; campaigns: number; ecommerce: number }[];
}) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#8B84A0", fontSize: 11, fontFamily: "var(--font-mono-label), monospace" }}
            axisLine={{ stroke: "rgba(255,255,255,.1)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#8B84A0", fontSize: 11, fontFamily: "var(--font-mono-label), monospace" }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: "#160F2E",
              border: "1px solid rgba(168,85,247,.3)",
              borderRadius: 10,
              fontSize: 12.5,
              ...mono,
            }}
            labelStyle={{ color: "#F5F3FF" }}
          />
          <Line type="monotone" dataKey="campaigns" name="Campanii (Lei)" stroke="#A855F7" strokeWidth={2.5} dot={{ r: 3, fill: "#A855F7" }} />
          <Line type="monotone" dataKey="ecommerce" name="Ecommerce (Lei)" stroke="#4ADE80" strokeWidth={2.5} dot={{ r: 3, fill: "#4ADE80" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
