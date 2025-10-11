"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";

interface ProjectTimelineChartProps {
  data: { name: string; value: number; fill: string }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background text-popover-foreground p-2 border rounded-lg shadow-lg">
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
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function ProjectTimelineChart({ data }: ProjectTimelineChartProps) {
  if (!data || data.length === 0) {
    return <p>No data available for chart.</p>;
  }

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
    >
      <Card className="rounded-[50px] w-full bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
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
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 10 }}
                />
                <Legend content={renderLegend} verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -translate-y-3">
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-sm text-muted-foreground">Total Stages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
