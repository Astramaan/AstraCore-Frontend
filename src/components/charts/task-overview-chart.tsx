
'use client';

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface TaskOverviewChartProps {
    data: { name: string; value: number }[];
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border rounded-lg shadow-lg">
                <p className="font-bold">{`${payload[0].name}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export function TaskOverviewChart({ data }: TaskOverviewChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={5}
          stroke="hsl(var(--background))"
          strokeWidth={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
            iconType="circle"
            wrapperStyle={{paddingTop: '20px'}}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
