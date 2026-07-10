"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#A855F7", "#4ADE80", "#FDBA74", "#60A5FA", "#F472B6", "#C084FC", "#34D399"];
const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;

export default function RevenueDonutChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#0A0718" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#160F2E",
              border: "1px solid rgba(168,85,247,.3)",
              borderRadius: 10,
              fontSize: 12.5,
              ...mono,
            }}
            formatter={(value) => `${Number(value).toLocaleString("ro-RO")} Lei`}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ fontSize: 12, ...mono, color: "#A29DB8" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
