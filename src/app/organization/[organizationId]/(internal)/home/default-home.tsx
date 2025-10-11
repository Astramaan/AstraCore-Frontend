"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeAside } from "@/components/home-aside";
import { TaskDetailsSheet, Task } from "@/components/task-details-sheet";
import { SlidersHorizontal, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Meeting } from "@/components/meeting-details-sheet";
import { MeetingDetailsSheet } from "@/components/meeting-details-sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TaskCard } from "@/components/task-card";
import { AssignTaskSheet } from "@/components/add-task-sheet";
import { AddMemberSheet } from "@/components/add-member-sheet";

// Data for Default Home
const initialTaskData: Task[] = [
  {
    id: "TSK001",
    title: "Product Weekly update",
    date: "25 May 2024",
    description:
      "This week, our team made significant progress on the new feature development, hitting all key milestones. We also addressed several critical bugs and are on track for the upcoming sprint review.",
    priority: "Low",
    status: "In Progress",
    category: "Meetings",
    project: "AstraCore App",
    clientId: "CL001",
    attachments: [
      {
        type: "pdf",
        name: "update.pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        type: "image",
        name: "screenshot.png",
        url: "https://placehold.co/600x400",
      },
    ],
  },
  {
    id: "TSK002",
    title: "New Landing Page Design",
    date: "26 May 2024",
    description:
      "Create mockups for the new landing page, focusing on a clean, modern aesthetic and improved user experience. The design should be responsive and optimized for both desktop and mobile devices.",
    priority: "High",
    status: "In Progress",
    category: "Design",
    project: "Website Redesign",
    clientId: "CL002",
    attachments: [
      {
        type: "image",
        name: "moodboard.png",
        url: "https://placehold.co/800x600",
      },
    ],
  },
  {
    id: "TSK003",
    title: "API Integration",
    date: "27 May 2024",
    description:
      "Integrate with the new payment gateway API. This includes implementing authentication, handling payment requests, and processing transaction responses. Ensure robust error handling is in place.",
    priority: "Low",
    status: "In Progress",
    category: "Development",
    project: "E-commerce Platform",
    clientId: "CL003",
    attachments: [],
  },
  {
    id: "TSK004",
    title: "User Testing Feedback",
    date: new Date().toISOString(),
    description:
      "Review and categorize user feedback from the latest testing session. Identify common themes, prioritize issues, and create actionable tickets for the development team.",
    priority: "Low",
    status: "Pending",
    category: "QA",
    project: "Mobile App Beta",
    clientId: "CL004",
    attachments: [],
  },
];
const assignedTasksData: Task[] = [
  {
    id: "TSK005",
    title: "Database Migration",
    date: "30 May 2024",
    description:
      "Plan and execute the migration of the user database from the legacy system to the new cloud infrastructure. Ensure data integrity and minimal downtime.",
    priority: "High",
    status: "In Progress",
    category: "Backend",
    project: "Infrastructure Upgrade",
    clientId: "CL005",
    attachments: [],
    isAssigned: true,
  },
  {
    id: "TSK006",
    title: "Onboarding Tutorial",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    description:
      "Create an interactive tutorial for new users to guide them through the main features of the application. Include tooltips and guided steps.",
    priority: "Medium",
    status: "Pending",
    category: "UX",
    project: "AstraCore App",
    clientId: "CL001",
    attachments: [],
    isAssigned: true,
  },
];

const meetings: Meeting[] = [
  {
    type: "client",
    name: "Charan Project",
    city: "Mysuru",
    id: "BAL2025",
    time: "4:00 PM",
    date: "10 August 2024",
    link: "https://meet.google.com/abc-xyz",
    email: "admin@abc.com",
    phone: "1234567890",
  },
  {
    type: "lead",
    name: "Lead Discussion",
    city: "Bengaluru",
    id: "LEAD2025",
    time: "5:00 PM",
    date: "10 August 2024",
    link: "https://meet.google.com/def-uvw",
    email: "lead@example.com",
    phone: "0987654321",
  },
];

type FilterType =
  | "High Priority"
  | "In Progress"
  | "Pending"
  | "Completed"
  | null;

export default function DefaultHomePage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const inProgressCount = useMemo(
    () =>
      initialTaskData.filter((t) => t.status === "In Progress").length +
      assignedTasksData.filter((t) => t.status === "In Progress").length,
    [],
  );

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setSelectedTask(null);
  };

  const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);

  const handleAddTask = (
    newTask: Omit<Task, "id" | "attachments" | "status">,
  ) => {
    console.log("New task assigned:", newTask);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setSelectedTask(updatedTask);
    // Here you would typically update the actual data source
  };

  const applyFilters = (tasks: Task[]) => {
    if (activeFilter) {
      return tasks.filter((task) => {
        if (activeFilter === "High Priority") return task.priority === "High";
        return task.status === activeFilter;
      });
    }
    return tasks.filter((task) => task.status !== "Completed");
  };

  const filteredMyTasks = useMemo(
    () => applyFilters(initialTaskData),
    [activeFilter],
  );
  const filteredAssignedTasks = useMemo(
    () => applyFilters(assignedTasksData),
    [activeFilter],
  );

  const myTasksChartData = useMemo(() => {
    const inProgress = initialTaskData.filter(
      (t) => t.status === "In Progress",
    ).length;
    const pending = initialTaskData.filter(
      (t) => t.status === "Pending",
    ).length;
    return [
      { name: "In-Progress", value: inProgress, fill: "hsl(var(--primary))" },
      { name: "Pending", value: pending, fill: "hsl(var(--muted))" },
    ];
  }, []);

  const assignedTasksChartData = useMemo(() => {
    const inProgress = assignedTasksData.filter(
      (t) => t.status === "In Progress",
    ).length;
    const pending = assignedTasksData.filter(
      (t) => t.status === "Pending",
    ).length;
    return [
      { name: "In-Progress", value: inProgress, fill: "hsl(var(--primary))" },
      { name: "Pending", value: pending, fill: "hsl(var(--muted))" },
    ];
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <main className="flex-1 space-y-6">
        <div>
          <div className="flex lg:hidden justify-between items-center w-full mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full bg-card h-[54px] flex-shrink-0 text-lg font-medium"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => handleFilterClick(null)}
                  className={cn(!activeFilter && "bg-accent")}
                >
                  All (exclude completed)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {["High Priority", "In Progress", "Pending", "Completed"].map(
                  (option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => handleFilterClick(option as FilterType)}
                    >
                      <div className="w-4 mr-2">
                        {activeFilter === option && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                      {option}
                      {option === "In Progress" && (
                        <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">
                          {inProgressCount}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-4">
              <AssignTaskSheet onTaskAssigned={handleAddTask} />
              <AddMemberSheet />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 overflow-x-auto -mx-4 px-4 w-full lg:w-auto">
            {["High Priority", "In Progress", "Pending", "Completed"].map(
              (filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  className={cn(
                    "rounded-full bg-card h-[54px] flex-shrink-0 text-lg font-medium",
                    activeFilter === (filter as FilterType)
                      ? "bg-primary text-primary-foreground hover:bg-primary"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                  onClick={() => handleFilterClick(filter as FilterType)}
                >
                  {filter}
                  {filter === "In Progress" && (
                    <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">
                      {inProgressCount}
                    </Badge>
                  )}
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-medium">My Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mt-4">
            {filteredMyTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleTaskClick(task)}
              />
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">Assigned Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredAssignedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleTaskClick(task)}
              />
            ))}
          </div>
        </div>
      </main>
      <HomeAside
        meetings={meetings}
        myTasksChartData={myTasksChartData}
        assignedTasksChartData={assignedTasksChartData}
        onMeetingClick={handleMeetingClick}
        onAddTask={handleAddTask}
        showAddMemberButton={true}
        showAddTaskButton={true}
      />
      {selectedTask && (
        <TaskDetailsSheet
          isOpen={isSheetOpen}
          onClose={handleSheetClose}
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
        />
      )}
      {selectedMeeting && (
        <MeetingDetailsSheet
          isOpen={!!selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
          meeting={selectedMeeting}
        />
      )}
    </div>
  );
}
