
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
  BarChart2,
  Info,
  ArrowUp,
  Package,
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
import { FeatureCard } from "@/components/feature-card";

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

const materials = [
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
];

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
                <Button
                  variant="outline"
                  className="rounded-full h-12 px-4 text-sm hidden sm:flex"
                >
                  <Users className="mr-2 h-4 w-4" /> Employee Management
                </Button>
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
            className="w-full md:w-auto h-14 rounded-full text-lg bg-card"
          >
            <Download className="mr-2 h-5 w-5" /> Export
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          <div className="space-y-6">
            <Card className="rounded-[50px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Feature Usage &amp; Retention</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px] rounded-full">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-muted-foreground mb-4">
                    Feature Usage Over Time
                  </h3>
                  <div className="h-48 relative">
                    <SubscriptionChart />
                    <div className="absolute top-0 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" />
                      +24.4%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FeatureCard
                    title="Create Project"
                    subtitle="Top Most Used"
                    usage={200}
                    retention={98}
                  />
                  <FeatureCard
                    title="Export Data"
                    subtitle="Top Least Used"
                    usage={35}
                    retention={85}
                  />
                  <FeatureCard
                    title="AI Chat"
                    subtitle="Recently Added"
                    usage={120}
                    retention={92}
                  />
                </div>

                <div>
                  <h3 className="text-muted-foreground mb-4">
                    Retention Rate
                  </h3>
                  <div className="h-48 relative">
                    <SubscriptionChart />
                    <div className="absolute top-0 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" />
                      +24.4%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[50px]">
              <CardHeader>
                <CardTitle>Construction Trends &amp; Seasonality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-7 text-[9px] font-extrabold text-center bg-primary text-white rounded-t-lg">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div key={day} className="py-1 min-w-[40px]">
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
                  </div>
                  <div className="flex flex-row md:flex-col gap-4 justify-around">
                    <Card className="p-4 rounded-3xl text-center bg-background">
                      <p className="text-sm text-muted-foreground">Month</p>
                      <p className="text-3xl font-bold flex items-center justify-center gap-1">
                        76
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      </p>
                      <p className="text-sm">June</p>
                      <p className="text-xs text-muted-foreground">
                        Most Active
                      </p>
                      <Separator className="my-4" />
                      <p className="text-3xl font-bold flex items-center justify-center gap-1">
                        0<ArrowUp className="h-4 w-4 text-red-500 rotate-180" />
                      </p>
                      <p className="text-sm">March</p>
                      <p className="text-xs text-muted-foreground">
                        Least Active
                      </p>
                    </Card>
                    <Card className="p-4 rounded-3xl text-center bg-background">
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="text-3xl font-bold flex items-center justify-center gap-1">
                        76
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      </p>
                      <p className="text-sm">Electronic City</p>
                      <p className="text-xs text-muted-foreground">
                        Highest Projects
                      </p>
                      <Separator className="my-4" />
                      <p className="text-3xl font-bold flex items-center justify-center gap-1">
                        02
                        <ArrowUp className="h-4 w-4 text-red-500 rotate-180" />
                      </p>
                      <p className="text-sm">Marathahalli</p>
                      <p className="text-xs text-muted-foreground">
                        Lowest Projects
                      </p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6 lg:w-[400px]">
            <Card className="rounded-[50px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Stage Completion Times</CardTitle>
                  <Select defaultValue="company-name">
                    <SelectTrigger className="w-[180px] rounded-full">
                      <SelectValue placeholder="Company Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company-name">
                        Company Name
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Handover", time: 25 },
                  { label: "IDK", time: 15 },
                  { label: "Foundation", time: 10 },
                  { label: "Site Clearance", time: 5 },
                ].map((item, index) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{item.label}</Label>
                      <span>{item.time} days</span>
                    </div>
                    <Progress value={(item.time / 30) * 100} className="h-2" />
                  </div>
                ))}
                <div className="text-center pt-2">
                  <Button variant="link" className="text-primary">
                    Next Stages <Info className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[50px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Package />
                    Material Purchase
                  </CardTitle>
                  <Button variant="link" className="text-primary text-xs">
                    see full list
                  </Button>
                </div>
                <Select defaultValue="electronic-city">
                  <SelectTrigger className="w-full rounded-full">
                    <SelectValue placeholder="Electronic City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronic-city">
                      Electronic City
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 font-semibold text-muted-foreground text-sm">
                    <span>Materials</span>
                    <span className="text-center">Company</span>
                    <span className="text-right">Price</span>
                  </div>
                  {materials.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 items-center text-sm"
                    >
                      <span>{item.material}</span>
                      <span className="text-center">{item.company}</span>
                      <span className="text-right">{item.price}</span>
                    </div>
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
