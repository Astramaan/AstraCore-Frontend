"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { GanttChartSquare } from "lucide-react";

export const ProjectStageToggleCard = () => {
  const [isProjectStageEnabled, setIsProjectStageEnabled] = useState(true);

  return (
    <Card className="rounded-[50px]">
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
            <GanttChartSquare className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold">
              Project Stage
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-center justify-between p-4 bg-background rounded-full">
          <Label
            htmlFor="project-stage-toggle"
            className="text-lg text-foreground font-medium"
          >
            Show Project Stage
          </Label>
          <Switch
            id="project-stage-toggle"
            checked={isProjectStageEnabled}
            onCheckedChange={setIsProjectStageEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};
