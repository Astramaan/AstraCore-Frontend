"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 120000 },
  { name: "Feb", revenue: 150000 },
  { name: "Mar", revenue: 130000 },
  { name: "Apr", revenue: 180000 },
  { name: "May", revenue: 160000 },
  { name: "Jun", revenue: 190000 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(value) => `₹${value / 1000}K`}
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "50px",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [
            `₹${value.toLocaleString()}`,
            "Revenue",
          ]}
          cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
        />
        <Bar
          dataKey="revenue"
          fill="hsl(var(--primary))"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
