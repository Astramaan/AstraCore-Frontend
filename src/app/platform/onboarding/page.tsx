
"use client";

import React from "react";
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
  <div className="self-stretch h-32 relative inline-flex justify-center items-center gap-4">
    <div className="size- relative flex justify-start items-center gap-2.5">
      <div className="w-24 h-32 bg-gradient-to-r from-white/0 to-emerald-200 rounded-bl-3xl" />
      <div className="left-[38px] top-[37px] absolute justify-start text-gray-400 text-4xl font-bold">
        {track.id}
      </div>
    </div>
    <div className="h-24 inline-flex flex-col justify-center items-center gap-4">
      <div className="w-[1115px] inline-flex justify-center items-start gap-2.5">
        <div className="size- flex justify-start items-center gap-2.5">
          <div className="justify-start text-black text-lg font-semibold">
            {track.company}
          </div>
          <div className="justify-start text-gray-500 text-lg font-medium">
            {track.plan}
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center gap-24">
          <div className="size- flex justify-start items-center gap-4">
            {track.status && (
              <div className="text-right justify-start text-red-600 text-lg font-medium">
                {track.status}
              </div>
            )}
            <div className="text-right justify-start text-gray-500 text-lg font-semibold">
              {track.stagesCompleted} Completed Stages
            </div>
          </div>
          <div className="text-center justify-start text-gray-500 text-lg font-medium">
            {track.date}
          </div>
        </div>
      </div>
      <div className="h-14 relative inline-flex justify-center items-start gap-6">
        <div className="w-[921px] h-0 left-0 top-[29px] absolute outline-dashed outline-gray-200"></div>
        <div className="w-4 h-0 left-[171px] top-[29px] absolute outline outline-[5px] outline-offset-[-2.50px] outline-Green"></div>
        <div className="w-4 h-0 left-[398px] top-[29px] absolute outline outline-[5px] outline-offset-[-2.50px]"></div>
        <div className="w-4 h-0 left-[569px] top-[29px] absolute outline outline-[5px] outline-offset-[-2.50px]"></div>
        <div className="w-4 h-0 left-[731px] top-[29px] absolute outline outline-[5px] outline-offset-[-2.50px]"></div>
        <div className="Stages size- flex justify-start items-center gap-3.5">
          {track.stages.map((stage, index) => (
            <Button
              key={index}
              className={cn(
                "h-14 rounded-[50px]",
                stage.completed
                  ? "bg-green-500 text-white"
                  : stage.isCurrent
                    ? "bg-white text-primary-color outline outline-primary-color"
                    : "bg-white text-gray-500 outline outline-gray-200",
              )}
            >
              {stage.completed && (
                <Check className="mr-2" width={20} height={20} />
              )}
              {stage.name}
            </Button>
          ))}
        </div>
        <Button className="h-14 px-10 py-3.5 bg-background rounded-[50px]">
          <Phone className="mr-2" width={20} height={20} /> Contact
        </Button>
      </div>
      <div className="w-[1229px] h-0 left-0 top-[124px] absolute outline outline-1 outline-stone-300/0"></div>
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
  <Card className="self-stretch flex flex-col justify-start items-start gap-4">
    <div className="self-stretch inline-flex justify-start items-center gap-6">
      <div className="size- flex justify-start items-center gap-2">
        <div className="p-2.5 bg-primary-color rounded-full">
          <Mail className="text-white" />
        </div>
        <div className="size- inline-flex flex-col justify-start items-start gap-1">
          <div className="justify-start text-black text-lg font-medium">
            {title}
          </div>
          <div className="justify-start text-gray-500 text-sm font-medium">
            {timing}
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div className="h-14 p-3.5 bg-white rounded-[50px] flex justify-end items-center gap-2">
          <div className="justify-start">
            <span className="text-gray-500 text-lg font-medium">Sent: </span>
            <span className="text-black text-lg font-medium">{sent}</span>
          </div>
        </div>
        <div className="h-14 p-3.5 bg-white rounded-[50px] flex justify-end items-center gap-2">
          <div className="justify-start">
            <span className="text-gray-500 text-lg font-medium">
              Open Rate:{" "}
            </span>
            <span className="text-black text-lg font-medium">{openRate}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-center gap-6 flex-wrap content-center">
      <div className="flex-1 flex justify-between items-center">
        <div className="h-14 p-3.5 bg-white rounded-[50px] flex justify-end items-center gap-2">
          <div className="justify-start">
            <span className="text-gray-500 text-sm font-medium">
              Last sent
              <br />
            </span>
            <span className="text-black text-lg font-medium">{lastSent}</span>
          </div>
        </div>
        <div className="size- flex justify-start items-center gap-2">
          <Button
            variant="outline"
            className="h-14 px-10 py-3.5 bg-background rounded-[50px]"
          >
            Preview
          </Button>
          <Button
            variant="outline"
            className="h-14 px-10 py-3.5 bg-background rounded-[50px]"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className={cn(
              "h-14 px-10 py-3.5 rounded-[50px]",
              isPaused
                ? "bg-primary-10/10 text-primary-color border-primary-color"
                : "bg-secondary-10/10 text-black border-secondary-color",
            )}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
        </div>
      </div>
    </div>
    <div className="w-[580px] h-0 outline outline-1 outline-stone-300/0"></div>
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
    <div className="w-[88px] text-right text-gray-500">{label}</div>
    <div className="w-96 h-5 rounded-md" style={{ background: color }}>
      <div
        className="h-5 bg-gradient-to-r from-red-600/0 to-red-600 rounded-md"
        style={{ width: `${(1 - value / total) * 100}%`, float: "right" }}
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
      <header className="sticky top-2 z-20 px-2">
        <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
          <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] px-4 py-2">
            <div className="max-w-[1440px] 2xl:max-w-none mx-auto px-4 2xl:px-10 flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <HabiLogo />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <h1 className="text-[32px] font-semibold text-white">
                  Onboarding Management
                </h1>
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
                      <span className={cn("text-white")}>
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
                    <div className="text-base text-white/80">Super Admin</div>
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
            <CardHeader>
              <CardTitle>Onboard Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {onboardingTracks.map((track) => (
                <OnboardingTrack key={track.id} track={track} />
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="rounded-[50px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-3.5 rounded-full outline outline-1 outline-gray-300">
                  <Mail />
                </div>
                <CardTitle>Email Automation</CardTitle>
              </div>
              <Button
                variant="outline"
                className="p-3.5 rounded-full bg-background"
              >
                <Plus />
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
                color="#e0f2f1"
              />
              <AnalyticsBar
                label="Step 2"
                value={800}
                total={1000}
                color="#e0f2f1"
              />
              <AnalyticsBar
                label="Step 3"
                value={600}
                total={1000}
                color="#e0f2f1"
              />
              <AnalyticsBar
                label="Step 4"
                value={400}
                total={1000}
                color="#e0f2f1"
              />
              <AnalyticsBar
                label="Step 5"
                value={200}
                total={1000}
                color="#e0f2f1"
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <PlatformBottomNav />
    </div>
  );
}

    