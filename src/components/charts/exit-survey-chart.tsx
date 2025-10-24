
"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Pricing too high", value: 40 },
  { name: "Missing features", value: 29 },
  { name: "Switched to another platform", value: 31 },
  { name: "Technical issues or bugs", value: 33 },
  { name: "No longer needed / Project complete", value: 5 },
];

const COLORS = [
  "hsl(var(--accent-color-01))",
  "hsl(var(--accent-color-02))",
  "hsl(var(--accent-color-03))",
  "hsl(var(--accent-color-04))",
  "hsl(var(--accent-color-05))",
];

const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

export function ExitSurveyChart() {
  return (
    <div className="w-full h-full flex items-center justify-center p-0 m-0">
      <div className="w-1/2 relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="hsl(var(--background))"
              strokeWidth={5}
              paddingAngle={5}
              cornerRadius={10}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-4xl font-bold text-foreground">{totalValue}</p>
        </div>
      </div>
      <div className="w-1/2 space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
            <span className="font-semibold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
