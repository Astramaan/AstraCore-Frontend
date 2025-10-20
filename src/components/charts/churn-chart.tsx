"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded-lg shadow-lg">
        <p className="font-bold text-lg mb-2">{label}</p>
        <p style={{ color: "hsl(var(--destructive))" }}>
          {`Unsubscribed: ${payload[0].value}`}
        </p>
      </div>
    );
  }

  return null;
};

export function ChurnChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--destructive))"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--destructive))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
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
          content={<CustomTooltip />}
          cursor={{ stroke: "hsl(var(--destructive))", strokeWidth: 1 }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          fill="url(#colorChurn)"
          dot={{
            r: 6,
            stroke: "hsl(var(--destructive))",
            strokeWidth: 2,
            fill: "white",
          }}
          activeDot={{
            r: 8,
            stroke: "hsl(var(--destructive))",
            strokeWidth: 2,
            fill: "white",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
