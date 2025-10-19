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
  { name: "Jan", Individual: 120, Studio: 90, Enterprises: 150 },
  { name: "Feb", Individual: 150, Studio: 110, Enterprises: 130 },
  { name: "Mar", Individual: 130, Studio: 140, Enterprises: 160 },
  { name: "Apr", Individual: 180, Studio: 130, Enterprises: 140 },
  { name: "May", Individual: 160, Studio: 190, Enterprises: 120 },
  { name: "Jun", Individual: 200, Studio: 150, Enterprises: 170 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded-lg shadow-lg">
        <p className="font-bold text-lg mb-2">{label}</p>
        {payload.map((pld: any) => (
          <p key={pld.dataKey} style={{ color: pld.color }}>
            {`${pld.name}: ${pld.value}`}
          </p>
        ))}
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
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
          }}
        />
        <Line
          type="monotone"
          dataKey="Individual"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Studio"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Enterprises"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
