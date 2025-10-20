"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 150 },
  { name: "Feb", value: 100 },
  { name: "Mar", value: 120 },
  { name: "Apr", value: 80 },
  { name: "May", value: 190 },
  { name: "Jun", value: 69 },
];

export function ChurnChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
          domain={[0, 200]}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
          contentStyle={{
            borderRadius: "50px",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [
            `${value}`,
            "Unsubscribed",
          ]}
        />
        <Bar
          yAxisId="left"
          dataKey="value"
          fill="hsl(var(--destructive))"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
