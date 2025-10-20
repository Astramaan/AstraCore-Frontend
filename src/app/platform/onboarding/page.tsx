
"use client";

import React, { useState } from "react";
import {
  Bell,
  Mail,
  ChevronRight,
  Plus,
  Phone,
  BarChart2,
  Check,
  Info,
  Calendar as CalendarIcon,
  ArrowUp,
  Maximize,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { HabiLogo } from "@/components/habi-logo";
import { Separator } from "@/components/ui/separator";
import { PlatformBottomNav } from "@/components/platform-bottom-nav";
import { useUser } from "@/context/user-context";
import { NotificationPopover } from "@/components/notification-popover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TeamIcon from "@/components/icons/team-icon";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const onboardingTracks = [
  {
    id: 1,
    company: "Golden ventures",
    plan: "Free Trail",
    status: "Follow-up Required",
    stagesCompleted: "1/6",
    date: "20 Aug 2025",
    progress: 16.6,
    stages: [
      { name: "Account Setup", completed: true },
      { name: "Subscription Preview", completed: false, isCurrent: true, needsFollowUp: true },
      { name: "Walkthrough", completed: false },
      { name: "First Project", completed: false },
      { name: "Smart Nudges", completed: false },
    ],
  },
  {
    id: 2,
    company: "Golden ventures",
    plan: "Free Trail",
    status: null,
    stagesCompleted: "2/6",
    date: "20 Aug 2025",
    progress: 33.2,
    stages: [
      { name: "Account Setup", completed: true },
      { name: "Subscription Preview", completed: true },
      { name: "Walkthrough", completed: false, isCurrent: true },
      { name: "First Project", completed: false },
      { name: "Smart Nudges", completed: false },
    ],
  },
  {
    id: 3,
    company: "Golden ventures",
    plan: "Free Trail",
    status: null,
    stagesCompleted: "4/6",
    date: "20 Aug 2025",
    progress: 66.6,
    stages: [
      { name: "Account Setup", completed: true },
      { name: "Subscription Preview", completed: true },
      { name: "Walkthrough", completed: true },
      { name: "First Project", completed: true },
      { name: "Smart Nudges", completed: false, isCurrent: true },
    ],
  },
];

const emailAutomations = [
  {
    title: "Welcome Email",
    timing: "Post subscription – 5 min",
    sent: 124,
    openRate: "76%",
    lastSent: "21 Apr 2025",
    isPaused: false,
    color: "bg-teal-400",
  },
  {
    title: "Account Setup Reminder",
    timing: "Client setup incomplete – 24hrs.",
    sent: 124,
    openRate: "76%",
    lastSent: "21 Apr 2025",
    isPaused: false,
    color: "bg-teal-400",
  },
  {
    title: "Account Setup Reminder",
    timing: "Client setup incomplete – 24hrs.",
    sent: 124,
    openRate: "76%",
    lastSent: "21 Apr 2025",
    isPaused: false,
    color: "bg-teal-400",
  },
  {
    title: "Product Walkthrough",
    timing: "Product Walkthrough – 8hrs.",
    sent: 124,
    openRate: "06%",
    lastSent: "21 Apr 2025",
    isPaused: true,
    color: "bg-amber-400",
  },
];

const OnboardingTrack = ({ track }: { track: (typeof onboardingTracks)[0] }) => (
  <div className="flex items-center gap-4 py-4">
    <div className="relative w-24 h-32 bg-gradient-to-br from-emerald-200/50 to-white/0 dark:from-emerald-900/50 dark:to-transparent rounded-l-3xl flex items-center justify-center shrink-0">
      <p className="text-4xl font-bold text-gray-400 dark:text-gray-600">
        {track.id}
      </p>
    </div>

    <div className="flex-1 flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4">
        <div className="flex items-center gap-2.5">
          <p className="text-lg font-semibold text-foreground">
            {track.company}
          </p>
          <p className="text-lg text-muted-foreground">{track.plan}</p>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-4 lg:gap-8 w-full md:w-auto">
          {track.status && (
            <p className="text-lg font-medium text-red-600">{track.status}</p>
          )}
          <p className="text-lg font-semibold text-muted-foreground hidden sm:block">
            {track.stagesCompleted} Completed Stages
          </p>
          <p className="text-lg text-muted-foreground hidden md:block">
            {track.date}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        <div className="flex-1 relative">
          <div className="flex flex-wrap items-center gap-2">
            {track.stages.map((stage, index) => (
              <React.Fragment key={index}>
                <Button
                  className={cn(
                    "h-14 rounded-full min-w-max px-4 text-base",
                    stage.completed
                      ? "bg-green-500 text-white hover:bg-green-500/90"
                      : stage.isCurrent
                        ? stage.needsFollowUp
                          ? "bg-card text-destructive border border-destructive"
                          : "bg-card text-primary border border-primary"
                        : "bg-card text-muted-foreground border border-border",
                  )}
                >
                  {stage.completed && <Check className="mr-2" size={20} />}
                  {stage.name}
                </Button>
                {index < track.stages.length - 1 && (
                  <Separator
                    className={cn(
                      "w-4 h-px",
                      stage.completed ? "bg-green-500" : "bg-border",
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Button className="h-14 px-6 rounded-full bg-background hover:bg-muted text-foreground">
          <Phone className="mr-2" size={20} /> Contact
        </Button>
      </div>
    </div>
  </div>
);

const EmailAutomationCard = ({
  title,
  timing,
  sent,
  openRate,
  lastSent,
  isPaused,
  color,
}: {
  title: string;
  timing: string;
  sent: number;
  openRate: string;
  lastSent: string;
  isPaused?: boolean;
  color: string;
}) => (
  <Card className="p-0 overflow-hidden bg-transparent shadow-none border-none">
    <CardContent className="px-6 py-4 flex flex-col gap-4">
      <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
        <div className={cn("w-4 h-4 rounded-full mt-1.5", color)}></div>
        <div className="flex flex-col">
          <p className="text-lg font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{timing}</p>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <span>
            Sent:{" "}
            <span className="font-semibold text-foreground">{sent}</span>
          </span>
          <span>
            Open Rate:{" "}
            <span className="font-semibold text-foreground">{openRate}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pl-8">
        <div>
          <p className="text-sm text-muted-foreground">Last sent</p>
          <p className="text-base font-medium text-foreground">{lastSent}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <Button
            variant="outline"
            className="h-12 px-8 rounded-full bg-background text-foreground text-base"
          >
            Preview
          </Button>
          <Button
            variant="outline"
            className="h-12 px-8 rounded-full bg-background text-foreground text-base"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className={cn(
              "h-12 px-8 rounded-full text-base",
              isPaused
                ? "bg-primary/10 text-primary border-primary"
                : "bg-secondary/10 text-foreground border-secondary",
            )}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AnalyticsBar = ({
  label,
  step,
  completed,
  total,
}: {
  label: string;
  step: string;
  completed: number;
  total: number;
}) => {
  const completedPercentage = (completed / total) * 100;
  const droppedPercentage = 100 - completedPercentage;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">
          {label} - <span className="font-medium text-foreground">{step}</span>
        </p>
        <p className="text-muted-foreground">
          Total: <span className="font-medium text-foreground">{total}</span>
        </p>
      </div>
      <div className="flex w-full h-3 rounded-full overflow-hidden bg-muted">
        <div
          className="bg-green-500"
          style={{ width: `${completedPercentage}%` }}
        />
        <div
          className="bg-red-500"
          style={{ width: `${droppedPercentage}%` }}
        />
      </div>
    </div>
  );
};

const DropOffCircle = ({ percentage }: { percentage: number }) => (
  <div className="relative w-40 h-40">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-gray-200 dark:text-gray-700"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
      />
      <circle
        className="text-red-500"
        strokeWidth="10"
        strokeDasharray="282.743338823"
        strokeDashoffset={282.743338823 - (percentage / 100) * 282.743338823}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-3xl font-bold">{percentage}%</span>
      <ArrowUp className="w-4 h-4 text-red-500" />
    </div>
  </div>
);

export default function OnboardingPage() {
  const { user } = useUser();
  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bg-background min-h-screen p-4 md:p-8 pt-6 flex flex-col">
      <header className="sticky top-2 z-20 px-2 -mx-4 md:-mx-8">
        <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
          <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] px-4 py-4">
            <div className="max-w-[1440px] 2xl:max-w-none mx-auto px-4 2xl:px-10 flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <HabiLogo />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <h2 className="text-[32px] font-semibold text-white whitespace-nowrap">
                  Onboarding Management
                </h2>
              </div>
              <div className="flex justify-end items-center gap-4">
                <NotificationPopover userType="organization" />
                <Link href="/platform/teams">
                  <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                    <Button
                      className={cn(
                        "group rounded-full h-[54px] px-4 lg:px-10 text-base lg:text-lg font-medium flex items-center bg-black/20 dark:bg-black/30 backdrop-blur-sm hover:bg-primary/10 dark:hover:bg-primary/20",
                        "text-white",
                      )}
                    >
                      <TeamIcon className={cn("mr-2 h-6 w-6", "text-white")} />
                      <span className={cn("text-white whitespace-nowrap")}>
                        Team Management
                      </span>
                    </Button>
                  </div>
                </Link>
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <Link href="/platform/profile" className="flex justify-start items-center gap-2">
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src="https://placehold.co/55x55"
                      alt={userName}
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:inline-flex flex-col justify-start items-start gap-1">
                    <div className="text-lg font-medium text-white">
                      {userName}
                    </div>
                    <div className="text-base text-white/80 whitespace-nowrap">
                      Super Admin
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow space-y-6 mt-6">
        <div className="lg:col-span-2">
          <Card className="rounded-[50px]">
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                  <Bell className="h-6 w-6" />
                </div>
                <CardTitle>Onboard Tracking</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-muted-foreground text-lg">
                  1-3 of 2,958
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background"
                >
                  <ChevronRight className="transform -rotate-180" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background"
                >
                  <ChevronRight />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border"
                  >
                    <Maximize className="w-5 h-5" />
                  </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-0 px-6 pb-6">
              {onboardingTracks.map((track, index) => (
                <React.Fragment key={track.id}>
                  <OnboardingTrack track={track} />
                  {index < onboardingTracks.length - 1 && (
                    <Separator className="my-0" />
                  )}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="rounded-[50px]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                    <Mail className="h-6 w-6" />
                  </div>
                  <CardTitle>Email Automation</CardTitle>
                </div>
                <Button
                  variant="outline"
                  className="p-3.5 rounded-full bg-background"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 flex flex-col">
                {emailAutomations.map((automation, index) => (
                  <React.Fragment key={index}>
                    <EmailAutomationCard {...automation} />
                    {index < emailAutomations.length - 1 && (
                      <Separator className="my-0 mx-6 w-auto" />
                    )}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8 flex flex-col">
            <Card className="rounded-[50px] p-6 flex-grow">
              <CardHeader className="p-0 mb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                      <BarChart2 className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>Onboard Analytics</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        Drop-off Rates <Info className="w-3 h-3" />
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <Tabs defaultValue="month" className="w-auto">
                        <TabsList className="rounded-[50px] p-1 h-12 bg-background">
                          <TabsTrigger
                            value="month"
                            className="w-[90px] h-10 rounded-[50px] text-base data-[state=active]:bg-primary data-[state=active]:text-white"
                          >
                            Month
                          </TabsTrigger>
                          <TabsTrigger
                            value="year"
                            className="w-[90px] h-10 rounded-[50px] text-base data-[state=active]:bg-primary data-[state=active]:text-white"
                          >
                            Year
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Select defaultValue="april-2025">
                        <SelectTrigger className="w-full sm:w-auto h-12 rounded-full text-base bg-background">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select month" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="april-2025">April 2025</SelectItem>
                          <SelectItem value="may-2025">May 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <AnalyticsBar
                  label="Step 1"
                  step="Account Setup"
                  completed={800}
                  total={1000}
                />
                <AnalyticsBar
                  label="Step 2"
                  step="Subscription preview"
                  completed={600}
                  total={1000}
                />
                <AnalyticsBar
                  label="Step 3"
                  step="Walkthrough"
                  completed={400}
                  total={1000}
                />
                <AnalyticsBar
                  label="Step 4"
                  step="First project"
                  completed={300}
                  total={1000}
                />
                <AnalyticsBar
                  label="Step 5"
                  step="Smart nudges"
                  completed={200}
                  total={1000}
                />

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                  <DropOffCircle percentage={80} />
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-lg font-semibold">Most Drop</h4>
                    <p className="text-lg text-muted-foreground">
                      Step 1 (Account Setup)
                    </p>
                    <p className="text-sm text-green-500">+5% from March</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Suggestion: Consider reducing fields or auto-filling from
                      past entries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <PlatformBottomNav />
    </div>
  );
}
