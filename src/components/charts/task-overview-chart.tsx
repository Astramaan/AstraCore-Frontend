
'use client';

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface TaskOverviewChartProps {
    data: { name: string; value: number }[];
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

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

const renderLegend = (props: any) => {
    const { payload } = props;
  
    return (
      <div className="flex flex-col gap-2">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
            <span className="text-sm text-muted-foreground">{entry.payload.value}</span>
          </div>
        ))}
      </div>
    );
  };

export function TaskOverviewChart({ data }: TaskOverviewChartProps) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={60}
          innerRadius={40}
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
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{paddingLeft: '20px'}}
            formatter={(value, entry) => (
                 <span className="text-muted-foreground">{value} <span className="font-semibold text-foreground">{entry.payload?.value}</span></span>
            )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
