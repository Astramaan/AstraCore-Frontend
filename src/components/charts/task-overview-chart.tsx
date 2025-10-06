
'use client';

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from 'framer-motion';

interface TaskOverviewChartProps {
    data: { name: string; value: number, fill?: string }[];
    title?: React.ReactNode;
}

const COLORS = ["hsl(var(--chart-2))", "hsl(var(--chart-1))", "hsl(var(--muted))"];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border rounded-lg shadow-lg z-10 relative">
                <p className="font-bold">{`${payload[0].name}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const renderLegend = (props: any) => {
    const { payload } = props;
  
    return (
      <div className="flex justify-center items-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

export function TaskOverviewChart({ data, title }: TaskOverviewChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-[200px] relative flex flex-col items-center justify-center">
                 {title && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-3">
                        <div className="text-base font-medium text-center">{title}</div>
                    </div>
                )}
                <p className="text-muted-foreground mt-8">No data</p>
            </div>
        )
    }

  return (
    <div className="w-full h-[200px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
            cornerRadius={40}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 10 }} />
          <Legend 
              content={renderLegend}
              verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
      {title && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-3">
              <div className="text-base font-medium text-center">{title}</div>
          </div>
      )}
    </div>
  );
}
