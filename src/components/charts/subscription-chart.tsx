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
  { name: "Jan", value: 50 },
  { name: "Feb", value: 100 },
  { name: "Mar", value: 100 },
  { name: "Apr", value: 150 },
  { name: "May", value: 110 },
  { name: "Jun", value: 200 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded-lg shadow-lg">
        <p className="font-bold text-lg mb-2">{label}</p>
        <p style={{ color: "hsl(var(--primary))" }}>
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
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
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
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
          domain={[50, 200]}
        />
        <Tooltip
          content={<CustomTooltip />}
          contentStyle={{
            borderRadius: "10px",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#colorValue)"
          dot={{
            r: 6,
            stroke: "hsl(var(--primary))",
            strokeWidth: 2,
            fill: "white",
          }}
          activeDot={{
            r: 8,
            stroke: "hsl(var(--primary))",
            strokeWidth: 2,
            fill: "white",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
