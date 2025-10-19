
"use client";

import React, { useState } from "react";
import {
  Bell,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  PieChart,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HabiLogo } from "@/components/habi-logo";
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
import { SubscriptionChart } from "@/components/charts/subscription-chart";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const FeatureCard = ({
  title,
  subtitle,
  usage,
  retention,
  color,
}: {
  title: string;
  subtitle: string;
  usage: number;
  retention: number;
  color: string;
}) => (
  <Card className="border-0 shadow-none bg-transparent">
    <CardHeader className="p-0">
      <div
        className={cn(
          "h-[5px] rounded-t-lg",
          color === "individual" && "bg-purple-500",
          color === "studio" && "bg-blue-500",
          color === "enterprises" && "bg-red-500",
        )}
      ></div>
      <CardTitle className="text-lg font-semibold pt-2">{title}</CardTitle>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </CardHeader>
    <CardContent className="p-0 mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Feature Usage</span>
        <span className="font-bold text-2xl">{usage}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Retention Rate</span>
        <span className="font-bold text-2xl">{retention}%</span>
      </div>
    </CardContent>
  </Card>
);

const CalendarCell = ({
  day,
  isWeekend,
  isEmpty,
  bgColor,
}: {
  day: number | string;
  isWeekend?: boolean;
  isEmpty?: boolean;
  bgColor?: string;
}) => (
  <div
    className={cn(
      "p-1 text-[10px] font-bold text-center outline outline-1 outline-stone-300/25",
      isWeekend && "bg-background",
      isEmpty && "opacity-0",
      bgColor,
    )}
  >
    {day}
  </div>
);

export default function ProductAnalyticsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("7D");

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <HabiLogo />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                  Product Analytics
                </h1>
              </div>
              <div className="flex justify-end items-center gap-2 sm:gap-4">
                <NotificationPopover userType="organization" />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <div className="flex justify-start items-center gap-2">
                  <Avatar className="w-12 h-12 md:w-14 md:h-14">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow space-y-6 mt-6 pb-28 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex items-end gap-4 md:gap-6">
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Tabs
                defaultValue="7D"
                className="w-auto"
                onValueChange={(value) => setActiveTab(value)}
              >
                <TabsList className="rounded-[50px] p-1 h-14 bg-card">
                  {["7D", "14D", "30D"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="w-12 h-11 rounded-full text-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <Label>Select Month</Label>
              <Select defaultValue="april-2025">
                <SelectTrigger className="w-full md:w-[200px] h-14 rounded-[50px] text-lg bg-card">
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
          <Button
            variant="outline"
            className="w-full md:w-auto h-14 rounded-full text-lg"
          >
            <Download className="mr-2 h-5 w-5" /> Export
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          <div className="space-y-6">
            <Card className="rounded-[50px]">
              <CardHeader>
                <CardTitle>Feature Usage Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <SubscriptionChart />
              </CardContent>
            </Card>

            <Card className="rounded-[50px]">
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x">
                <FeatureCard
                  title="Create Project"
                  subtitle="Top Most Used"
                  usage={200}
                  retention={98}
                  color="individual"
                />
                <FeatureCard
                  title="Create Project"
                  subtitle="Top Least Used"
                  usage={200}
                  retention={98}
                  color="studio"
                />
                <FeatureCard
                  title="Create Project"
                  subtitle="Recently Added"
                  usage={200}
                  retention={98}
                  color="enterprises"
                />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6 lg:w-[400px]">
            <Card className="rounded-[50px]">
              <CardHeader>
                <CardTitle>Stage Completion Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Handover", time: 25 },
                    { label: "IDK", time: 20 },
                    { label: "Foundation", time: 15 },
                    { label: "Site Clearance", time: 8 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <Label>{item.label}</Label>
                      <Progress value={item.time} max={30} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          <Card className="rounded-[50px]">
            <CardHeader>
              <CardTitle>Retention Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <SubscriptionChart />
            </CardContent>
          </Card>
          <div className="space-y-6 lg:w-[400px]">
            <Card className="rounded-[50px]">
              <CardHeader>
                <CardTitle>Construction Trends & Seasonality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 text-[9px] font-extrabold text-center bg-primary text-white rounded-t-lg">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className="py-1">
                        {day.toUpperCase()}
                      </div>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7">
                  {[...Array(3)].map((_, i) => (
                    <CalendarCell key={`empty-${i}`} day="" isEmpty />
                  ))}
                  {[...Array(31)].map((_, i) => (
                    <CalendarCell
                      key={i}
                      day={i + 1}
                      bgColor={
                        i + 1 > 5 && i + 1 < 25 ? "bg-green-100" : undefined
                      }
                    />
                  ))}
                  {[...Array(1)].map((_, i) => (
                    <CalendarCell key={`empty-end-${i}`} day="" isEmpty />
                  ))}
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
