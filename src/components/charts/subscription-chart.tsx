"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 130 },
  { name: "Apr", value: 180 },
  { name: "May", value: 160 },
  { name: "Jun", value: 200 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded-lg shadow-lg">
        <p className="font-bold text-lg mb-2">{label}</p>
        <p style={{ color: payload[0].color }}>
          {`Value: ${payload[0].value}`}
        </p>
      </div>
    );
  }

  return null;
};

export function SubscriptionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
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
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
          domain={[0, 250]}
        />
        <Tooltip
          content={<CustomTooltip />}
          contentStyle={{
            borderRadius: "10px",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
