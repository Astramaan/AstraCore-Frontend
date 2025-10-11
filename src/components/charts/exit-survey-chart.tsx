"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Pricing too high", value: 40 },
  { name: "Missing features", value: 29 },
  { name: "Switched to another platform", value: 31 },
  { name: "Technical issues or bugs", value: 33 },
  { name: "No longer needed", value: 5 },
];

const COLORS = [
  "hsl(var(--accent-color-01))",
  "hsl(var(--accent-color-02))",
  "hsl(var(--accent-color-03))",
  "hsl(var(--accent-color-04))",
  "hsl(var(--accent-color-05))",
];

export function ExitSurveyChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          stroke="hsl(var(--background))"
          strokeWidth={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
