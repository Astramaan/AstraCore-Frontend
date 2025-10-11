"use client";

import React from "react";
import {
  Layers,
  GanttChartSquare,
  FolderKanban,
  Calendar,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import type { Task } from "./task-details-sheet";

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-muted-foreground mt-1">
      {icon}
    </div>
    <div>
      <p className="text-base text-muted-foreground font-medium">{label}</p>
      <div className="text-base text-foreground font-semibold mt-1">
        {value}
      </div>
    </div>
  </div>
);

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

export const ProjectTaskDetails = ({ task }: { task: Task }) => {
  const priorityColors: { [key: string]: string } = {
    Low: "bg-cyan-500/10 text-cyan-500",
    Medium: "bg-yellow-500/10 text-yellow-500",
    High: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500",
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DetailRow
        icon={<Layers className="w-5 h-5" />}
        label="Stage"
        value={task.subtitle || ""}
      />
      <DetailRow
        icon={<GanttChartSquare className="w-5 h-5" />}
        label="Phase"
        value={
          <Badge
            variant="outline"
            className="bg-zinc-100 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 text-foreground text-base"
          >
            {task.category}
          </Badge>
        }
      />
      <DetailRow
        icon={<FolderKanban className="w-5 h-5" />}
        label="Project"
        value={`${task.project} (${task.clientId})`}
      />
      <DetailRow
        icon={<Calendar className="w-5 h-5" />}
        label="Due Date"
        value={formatDate(task.date)}
      />
      <DetailRow
        icon={<Star className="w-5 h-5" />}
        label="Priority"
        value={
          <Badge
            className={cn(priorityColors[task.priority], "text-base py-1 px-4")}
          >
            {task.priority}
          </Badge>
        }
      />
      {task.status === "Completed" && task.completedDate && (
        <DetailRow
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="Completed Date"
          value={formatDate(task.completedDate)}
        />
      )}
    </div>
  );
};
