"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  DotProps,
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
    const isIncrease =
      payload[0].payload.index > 0
        ? payload[0].value > data[payload[0].payload.index - 1].value
        : false;
    const color = isIncrease
      ? "hsl(var(--destructive))"
      : "hsl(var(--primary))";

    return (
      <div className="bg-background p-2 border rounded-lg shadow-lg">
        <p className="font-bold text-lg mb-2">{label}</p>
        <p style={{ color }}>{`Unsubscribed: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

interface CustomizedDotProps extends DotProps {
  index?: number;
}

const CustomizedDot: React.FC<CustomizedDotProps> = (props) => {
  const { cx, cy, stroke, payload, value, index } = props;

  if (index === undefined) return null;

  const isIncrease = index > 0 ? value > data[index - 1].value : false;
  const color = isIncrease
    ? "hsl(var(--destructive))"
    : "hsl(var(--primary))";

  return <circle cx={cx} cy={cy} r={6} stroke={color} strokeWidth={2} fill="white" />;
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
          <linearGradient id="colorChurnUp" x1="0" y1="0" x2="0" y2="1">
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
          <linearGradient id="colorChurnDown" x1="0" y1="0" x2="0" y2="1">
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
          yAxisId="left"
          orientation="left"
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
          domain={[0, 200]}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="value"
          stroke="url(#line-gradient)"
          strokeWidth={2}
          fill="url(#colorChurnDown)"
          dot={<CustomizedDot />}
          activeDot={(props) => <CustomizedDot {...props} />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
