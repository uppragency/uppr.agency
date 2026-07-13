"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const COLORS = ["#A855F7", "#4ADE80", "#FDBA74", "#60A5FA", "#F472B6", "#C084FC", "#34D399"];

export default function AllClientsChart({
  data,
  clientNames,
}: {
  data: Record<string, number | string>[];
  clientNames: string[];
}) {
  return (
    <div style={{ width: "100%", height: 300 }}>
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
            width={55}
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
            formatter={(value) => `${Number(value).toLocaleString("ro-RO")} Lei`}
          />
          <Legend wrapperStyle={{ fontSize: 12, ...mono }} />
          {clientNames.map((name, i) => (
            <Line key={name} type="monotone" dataKey={name} stroke={COLORS[i % COLORS.length]} strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
