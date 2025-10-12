
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const ProjectTimelineGantt = () => {
  return (
    <Card className="rounded-[50px]">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>Gantt View</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-10">
          Gantt Chart will be displayed here.
        </div>
      </CardContent>
    </Card>
  );
};
