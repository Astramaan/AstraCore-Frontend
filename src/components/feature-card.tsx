
"use client";

import { ArrowUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  usage: number;
  retention: number;
}

export const FeatureCard = ({
  title,
  subtitle,
  usage,
  retention,
}: FeatureCardProps) => {
  return (
    <Card className="border shadow-none bg-card p-4 rounded-2xl">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="p-0 mt-4 space-y-2">
        <div className="flex items-center gap-1">
          <span className="font-bold text-2xl">{usage}</span>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </div>
        <p className="text-xs text-muted-foreground">Feature Usage</p>

        <div className="flex items-center gap-1">
          <span className="font-bold text-2xl">{retention}%</span>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </div>
        <p className="text-xs text-muted-foreground">Retention Rate</p>
      </CardContent>
    </Card>
  );
};
