"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function ProfitTrendChart({
  data,
}: {
  data: { label: string; profit: number }[];
}) {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <ReferenceLine y={0} stroke="rgba(255,255,255,.2)" />
          <Tooltip
            contentStyle={{
              background: "#160F2E",
              border: "1px solid rgba(168,85,247,.3)",
              borderRadius: 10,
              fontSize: 12.5,
              ...mono,
            }}
            labelStyle={{ color: "#F5F3FF" }}
            formatter={(value) => [`${Number(value).toLocaleString("ro-RO")} Lei`, "Profit"]}
          />
          <Area type="monotone" dataKey="profit" stroke="#4ADE80" strokeWidth={2.5} fill="url(#profitGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
