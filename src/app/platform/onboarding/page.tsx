
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
      { name: "Subscription Preview", completed: false, isCurrent: true },
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

const OnboardingTrack = ({ track }: { track: (typeof onboardingTracks)[0] }) => (
  <div className="flex items-center gap-4 py-4">
    <div className="relative w-24 h-32 bg-gradient-to-r from-white/0 to-emerald-200/50 dark:to-emerald-900/50 rounded-l-3xl flex items-center justify-center shrink-0">
      <p className="text-4xl font-bold text-gray-400 dark:text-gray-600">
        {track.id}
      </p>
    </div>

    <div className="flex-1 flex flex-col gap-4 w-full">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-2.5">
          <p className="text-lg font-semibold text-foreground">
            {track.company}
          </p>
          <p className="text-lg text-muted-foreground">{track.plan}</p>
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
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
      <div className="flex items-center gap-4">
        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-green-500 transition-all duration-500"
            style={{ width: `${track.progress}%` }}
            aria-hidden="true"
          />
          <div className="relative flex justify-between">
            {track.stages.map((stage, index) => (
              <Button
                key={index}
                className={cn(
                  "h-14 rounded-full min-w-max px-4 text-base",
                  stage.completed
                    ? "bg-green-500 text-white"
                    : stage.isCurrent
                      ? "bg-card text-primary border border-primary"
                      : "bg-card text-muted-foreground border border-border",
                )}
              >
                {stage.completed && <Check className="mr-2" size={20} />}
                {stage.name}
              </Button>
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
}: {
  title: string;
  timing: string;
  sent: number;
  openRate: string;
  lastSent: string;
  isPaused?: boolean;
}) => (
  <Card className="rounded-[50px]">
    <CardContent className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start gap-6">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-primary rounded-full">
            <Mail className="text-white" />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{timing}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-14 px-4 bg-background dark:bg-card rounded-l-[50px] flex items-center">
            <span className="text-muted-foreground text-lg">Sent: </span>
            <span className="text-foreground text-lg font-medium ml-1">{sent}</span>
          </div>
          <div className="h-14 px-4 bg-background dark:bg-card rounded-r-[50px] border-l border-border flex items-center">
            <span className="text-muted-foreground text-lg">Open Rate: </span>
            <span className="text-foreground text-lg font-medium ml-1">{openRate}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-6">
        <div className="h-14 px-4 bg-background dark:bg-card rounded-[50px] flex items-center">
          <span className="text-muted-foreground text-sm">Last sent</span>
          <span className="text-foreground text-lg font-medium ml-2">{lastSent}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-14 px-10 rounded-[50px] bg-background"
          >
            Preview
          </Button>
          <Button
            variant="outline"
            className="h-14 px-10 rounded-[50px] bg-background"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className={cn(
              "h-14 px-10 rounded-[50px]",
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
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) => (
  <div className="flex items-center gap-2">
    <div className="w-24 text-right text-muted-foreground">{label}</div>
    <div className="flex-1 bg-muted rounded-md h-5 relative">
       <div
        className="h-5 rounded-md"
        style={{
          background: color,
          width: `${(value / total) * 100}%`,
        }}
      />
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
    <div className="bg-background min-h-screen p-4 md:p-8 pt-6 space-y-6">
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
                        Employee Management
                      </span>
                    </Button>
                  </div>
                </Link>
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <div className="flex justify-start items-center gap-2">
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
                    <div className="text-base text-white/80 whitespace-nowrap">Super Admin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                 <div className="text-muted-foreground text-lg">1-3 of 2,958</div>
                 <Button variant="ghost" size="icon" className="rounded-full bg-background"><ChevronRight className="transform -rotate-180"/></Button>
                 <Button variant="ghost" size="icon" className="rounded-full bg-background"><ChevronRight/></Button>
               </div>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {onboardingTracks.map((track) => (
                <div key={track.id}>
                  <OnboardingTrack track={track} />
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="rounded-[50px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                  <Mail className="h-6 w-6"/>
                </div>
                <CardTitle>Email Automation</CardTitle>
              </div>
              <Button
                variant="outline"
                className="p-3.5 rounded-full bg-background"
              >
                <Plus className="h-6 w-6"/>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <EmailAutomationCard
                title="Welcome Email"
                timing="Post subscription – 5 min"
                sent={124}
                openRate="76%"
                lastSent="21 Apr 2025"
              />
              <EmailAutomationCard
                title="Account Setup Reminder"
                timing="Client setup incomplete – 24hrs."
                sent={124}
                openRate="76%"
                lastSent="21 Apr 2025"
              />
              <EmailAutomationCard
                title="Product Walkthrough"
                timing="Product Walkthrough – 8hrs."
                sent={124}
                openRate="06%"
                lastSent="21 Apr 2025"
                isPaused
              />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="rounded-[50px]">
            <CardHeader>
              <CardTitle>Onboard Analytics</CardTitle>
              <CardDescription>Drop-off Rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnalyticsBar
                label="Step 1"
                value={1000}
                total={1000}
                color="hsl(var(--chart-1))"
              />
              <AnalyticsBar
                label="Step 2"
                value={800}
                total={1000}
                color="hsl(var(--chart-2))"
              />
              <AnalyticsBar
                label="Step 3"
                value={600}
                total={1000}
                color="hsl(var(--chart-3))"
              />
              <AnalyticsBar
                label="Step 4"
                value={400}
                total={1000}
                color="hsl(var(--chart-4))"
              />
              <AnalyticsBar
                label="Step 5"
                value={200}
                total={1000}
                color="hsl(var(--chart-5))"
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <PlatformBottomNav />
    </div>
  );
}

    