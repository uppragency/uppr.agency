"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function NewsletterEngagementChart({
  data,
}: {
  data: { title: string; openRate: number; clickRate: number }[];
}) {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
          <XAxis
            dataKey="title"
            tick={{ fill: "#8B84A0", fontSize: 10.5, fontFamily: "var(--font-mono-label), monospace" }}
            axisLine={{ stroke: "rgba(255,255,255,.1)" }}
            tickLine={false}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={50}
          />
          <YAxis
            tick={{ fill: "#8B84A0", fontSize: 11, fontFamily: "var(--font-mono-label), monospace" }}
            axisLine={false}
            tickLine={false}
            width={40}
            unit="%"
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
          <Legend wrapperStyle={{ fontSize: 12, ...mono }} />
          <Bar dataKey="openRate" name="Open rate %" fill="#A855F7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="clickRate" name="Click rate %" fill="#4ADE80" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
