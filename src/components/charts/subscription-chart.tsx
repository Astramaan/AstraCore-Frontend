
"use client"

import * as React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: 'Jan', subscriptions: 120 },
  { name: 'Feb', subscriptions: 150 },
  { name: 'Mar', subscriptions: 130 },
  { name: 'Apr', subscriptions: 180 },
  { name: 'May', subscriptions: 160 },
  { name: 'Jun', subscriptions: 200 },
];

export function SubscriptionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false}/>
        <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} domain={[0, 200]}/>
        <Tooltip 
             contentStyle={{
                borderRadius: '50px',
                border: 'none',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
             }}
             formatter={(value: number) => [value, "Subscriptions"]}
        />
        <Area type="monotone" dataKey="subscriptions" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
