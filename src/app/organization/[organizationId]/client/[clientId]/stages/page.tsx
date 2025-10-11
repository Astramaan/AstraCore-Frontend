"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClientHeader } from "@/components/client-header";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PdfIcon from "@/components/icons/pdf-icon";
import { ViewUpcomingTasksSheet } from "@/components/view-upcoming-tasks-sheet";
import { ViewCompletedTasksSheet } from "@/components/view-completed-tasks-sheet";
import { StageCard, TimelineStage as StageType } from "@/components/stage-card";
import { useUser } from "@/context/user-context";
import { RaiseIssueSheet } from "@/components/raise-issue-sheet";

interface TimelineStage {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  status: "On Going" | "Yet To Begin" | "completed";
  progress: number;
  category: string;
  image: string;
  siteImages?: string[];
  approvalDate?: string;
  documents?: { name: string; url: string }[];
}

export default function ClientStagesPage() {
  const { user } = useUser();
  const [isUpcomingTasksSheetOpen, setIsUpcomingTasksSheetOpen] =
    useState(false);
  const [isCompletedTasksSheetOpen, setIsCompletedTasksSheetOpen] =
    useState(false);
  const [openStageId, setOpenStageId] = useState<number | null>(null);
  const [isRaiseIssueSheetOpen, setIsRaiseIssueSheetOpen] = useState(false);
  const [stageForIssue, setStageForIssue] = useState<TimelineStage | null>(
    null,
  );

  const [allStages, setAllStages] = useState<TimelineStage[]>([
    {
      id: 1,
      title: "Soil Testing",
      subtitle: "initial stage",
      date: "25 May 2024 - 26 May 2024",
      status: "completed",
      progress: 100,
      category: "Civil",
      image: "https://picsum.photos/seed/soil/100/100",
      siteImages: ["https://picsum.photos/seed/soil1/150/150"],
      approvalDate: new Date(
        new Date().setDate(new Date().getDate() - 2),
      ).toISOString(),
      documents: [{ name: "Soil Test Report.pdf", url: "#" }],
    },
    {
      id: 2,
      title: "Slabs",
      subtitle: "initial stage",
      date: "25 May 2024 - 26 May 2024",
      status: "On Going",
      progress: 70,
      category: "Structure",
      image: "https://picsum.photos/seed/slabs/100/100",
      documents: [
        { name: "Structural Drawing.pdf", url: "#" },
        { name: "Beam Layout.pdf", url: "#" },
      ],
    },
    {
      id: 3,
      title: "Foundation",
      subtitle: "initial stage",
      date: "25 May 2024 - 26 May 2024",
      status: "Yet To Begin",
      progress: 0,
      category: "Civil",
      image: "https://picsum.photos/seed/foundation/100/100",
    },
    {
      id: 4,
      title: "IDK",
      subtitle: "initial stage",
      date: "25 May 2024 - 26 May 2024",
      status: "Yet To Begin",
      progress: 0,
      category: "Design",
      image: "https://picsum.photos/seed/idk/100/100",
    },
    {
      id: 5,
      title: "Stage 06",
      subtitle: "initial stage",
      date: "25 May 2024 - 26 May 2024",
      status: "Yet To Begin",
      progress: 0,
      category: "MEP",
      image: "https://picsum.photos/seed/stage6/100/100",
    },
    {
      id: 6,
      title: "Stage IDK",
      subtitle: "initial stage",
      date: "25 May 2024 - 26 May 2024",
      status: "Yet To Begin",
      progress: 0,
      category: "Finishing",
      image: "https://picsum.photos/seed/stageidk/100/100",
    },
  ]);

  const timeline = useMemo(
    () => allStages.filter((stage) => stage.status !== "completed"),
    [allStages],
  );

  const recentlyCompletedTasks = useMemo(() => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return allStages.filter((stage) => {
      if (stage.status === "completed" && stage.approvalDate) {
        const approvalDate = new Date(stage.approvalDate);
        return approvalDate > twentyFourHoursAgo;
      }
      return false;
    });
  }, [allStages]);

  const completedTasks = useMemo(() => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return allStages.filter(
      (stage) =>
        stage.status === "completed" &&
        (!stage.approvalDate ||
          new Date(stage.approvalDate) <= twentyFourHoursAgo),
    );
  }, [allStages]);

  const upcomingTasks = useMemo(
    () => allStages.filter((stage) => stage.status === "Yet To Begin"),
    [allStages],
  );

  const handleReopenTask = (stageToReopen: TimelineStage) => {
    setAllStages((currentTimeline) =>
      currentTimeline.map((stage) =>
        stage.title === stageToReopen.title
          ? { ...stage, status: "On Going", progress: 50 }
          : stage,
      ),
    );
  };

  const handleToggleStage = (stageId: number) => {
    setOpenStageId((prevId) => (prevId === stageId ? null : stageId));
  };

  const handleRaiseIssue = (stage: StageType) => {
    setStageForIssue(stage as TimelineStage);
    setIsRaiseIssueSheetOpen(true);
  };

  const handleIssueSubmit = (issueInfo: any) => {
    console.log("Issue submitted for stage:", stageForIssue?.title, issueInfo);
    setIsRaiseIssueSheetOpen(false);
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4">
        <ClientHeader />
      </header>
      <main className="p-4 md:p-8 space-y-6 pb-32">
        <div className="flex flex-row gap-4 justify-between">
          <Button
            variant="outline"
            onClick={() => setIsCompletedTasksSheetOpen(true)}
            className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1"
          >
            View Completed Tasks
          </Button>
          <Button
            variant="outline"
            className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1"
            onClick={() => setIsUpcomingTasksSheetOpen(true)}
          >
            View Upcoming Tasks
          </Button>
        </div>
        <div className="relative pb-4">
          {recentlyCompletedTasks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Recently Completed</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recentlyCompletedTasks.map((stage, index) => (
                  <StageCard
                    key={index}
                    stage={stage as StageType}
                    onCardClick={() => handleRaiseIssue(stage as StageType)}
                  />
                ))}
              </div>
              <Separator className="my-8" />
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {timeline.map((stage, index) => (
              <StageCard
                key={index}
                stage={stage as StageType}
                onCardClick={() => handleRaiseIssue(stage as StageType)}
              />
            ))}
          </div>
        </div>
      </main>
      <ViewUpcomingTasksSheet
        isOpen={isUpcomingTasksSheetOpen}
        onClose={() => setIsUpcomingTasksSheetOpen(false)}
        tasks={upcomingTasks as any}
        onTaskClick={(task) => console.log("task clicked", task)}
      />
      <ViewCompletedTasksSheet
        isOpen={isCompletedTasksSheetOpen}
        onClose={() => setIsCompletedTasksSheetOpen(false)}
        tasks={completedTasks as any}
        onTaskClick={(task) => console.log("task clicked", task)}
      />
      {stageForIssue && (
        <RaiseIssueSheet
          isOpen={isRaiseIssueSheetOpen}
          onClose={() => setIsRaiseIssueSheetOpen(false)}
          stageTitle={stageForIssue.title}
          onSubmit={handleIssueSubmit}
        />
      )}
    </div>
  );
}
