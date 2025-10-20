
"use client";

import React, { useState, useMemo } from "react";
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
import { LineChart } from "@/components/charts/line-chart";

const materials = [
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
  { material: "Steel", company: "Tata", price: "₹xxx" },
];

const mockProjects = [
  { city: "Bengaluru", area: "Electronic City", createdAt: "2024-06-05" },
  { city: "Bengaluru", area: "Electronic City", createdAt: "2024-06-06" },
  { city: "Bengaluru", area: "Electronic City", createdAt: "2024-06-07" },
  { city: "Bengaluru", area: "Electronic City", createdAt: "2024-06-08" },
  { city: "Bengaluru", area: "Electronic City", createdAt: "2024-06-09" },
  { city: "Bengaluru", area: "Marathahalli", createdAt: "2024-06-10" },
  { city: "Mumbai", area: "Andheri", createdAt: "2024-06-15" },
  { city: "Bengaluru", area: "Electronic City", createdAt: "2024-06-20" },
  { city: "Bengaluru", area: "Marathahalli", createdAt: "2024-06-21" },
  { city: "Mumbai", area: "Andheri", createdAt: "2024-06-25" },
  { city: "Mumbai", area: "Bandra", createdAt: "2024-06-28" },
];

export default function ProductAnalyticsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("7D");

  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1)); // June 2024

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  const firstDay = getFirstDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const projectsByDate = useMemo(() => {
    return mockProjects.reduce(
      (acc, project) => {
        if (
          selectedArea === "all" ||
          `${project.area}, ${project.city}` === selectedArea
        ) {
          const date = project.createdAt;
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [selectedArea]);

  const calendarDays = Array.from({ length: firstDay }, (_, i) => (
    <div key={`empty-${i}`} className="h-16 p-1 text-xs" />
  ));

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const projectCount = projectsByDate[dateStr] || 0;
    const isWeekend =
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay() %
        6 ===
      0;
    calendarDays.push(
      <div
        key={day}
        className={cn(
          "h-16 p-1 text-xs border-r border-b",
          (firstDay + day - 1) % 7 === 6 && "border-r-0",
          day > daysInMonth - 7 && "border-b-0",
          projectCount > 0 && "bg-green-200",
          projectCount > 2 && "bg-green-500",
          day > 0 && day <= 31 ? "text-black" : "text-gray-400",
          isWeekend && day > 0 && day <= 31 && "text-red-500",
        )}
      >
        {day > 0 && day <= 31 ? day : ""}
      </div>,
    );
  }

  const uniqueAreas = useMemo(() => {
    const areas = new Set(
      mockProjects.map((p) => `${p.area}, ${p.city}`),
    );
    return Array.from(areas);
  }, []);

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
              <Select defaultValue="june-2024">
                <SelectTrigger className="w-full md:w-[200px] h-14 rounded-[50px] text-lg bg-card">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select month" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="june-2024">June 2024</SelectItem>
                  <SelectItem value="may-2024">May 2024</SelectItem>
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
                    <LineChart />
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
                    color="hsl(var(--chart-1))"
                  />
                  <FeatureCard
                    title="Export Data"
                    subtitle="Top Least Used"
                    usage={35}
                    retention={85}
                    color="hsl(var(--chart-2))"
                  />
                  <FeatureCard
                    title="AI Chat"
                    subtitle="Recently Added"
                    usage={120}
                    retention={92}
                    color="hsl(var(--chart-3))"
                  />
                </div>

                <div>
                  <h3 className="text-muted-foreground mb-4">
                    Retention Rate
                  </h3>
                  <div className="h-48 relative">
                    <LineChart />
                    <div className="absolute top-0 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" />
                      +24.4%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:w-[400px]">
            <Card className="rounded-[50px] p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                      <Clock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <CardTitle>Stage Completion Times</CardTitle>
                  </div>
                   <Select defaultValue="company-name">
                    <SelectTrigger className="w-full rounded-full h-14 bg-background">
                      <SelectValue placeholder="Company Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company-name">Company Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <div className="space-y-4 pt-4">
                  {[
                    { label: "Handover", time: 28 },
                    { label: "IDK", time: 18 },
                    { label: "Foundation", time: 15 },
                    { label: "Site Clearance", time: 5 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[1fr_auto] items-center gap-2"
                    >
                      <div className="w-full h-8 bg-accent/30 rounded-full">
                        <div
                          className="h-8 bg-accent rounded-full flex items-center px-2"
                          style={{ width: `${(item.time / 30) * 100}%` }}
                        >
                          <span className="text-sm font-medium text-accent-foreground whitespace-nowrap">
                            {item.label}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground w-8 text-right">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full pt-2">
                  <div className="grid grid-cols-7 text-xs text-muted-foreground text-center">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                    <span>25</span>
                    <span>30</span>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <Button variant="link" className="text-primary gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Next Stages
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[50px] p-6">
              <CardHeader className="p-0">
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="flex items-center gap-2 whitespace-nowrap">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                      <Package />
                    </div>
                    Material Purchase
                  </CardTitle>
                  <Button variant="link" className="text-primary text-xs">
                    see full list
                  </Button>
                </div>
                <Select defaultValue="electronic-city">
                  <SelectTrigger className="w-full rounded-full h-14 bg-background">
                    <SelectValue placeholder="Electronic City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronic-city">
                      Electronic City
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-3 font-semibold text-muted-foreground text-sm px-2">
                    <span>Materials</span>
                    <span className="text-center">Company</span>
                    <span className="text-right">Price</span>
                  </div>
                  {materials.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 items-center text-sm px-2 py-1"
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

        <Card className="rounded-[50px]">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Construction Trends &amp; Seasonality</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    Project creation heat map <Info className="w-3 h-3" />
                  </CardDescription>
                </div>
              </div>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="w-full md:w-[200px] rounded-full h-12">
                  <SelectValue placeholder="Select Area &amp; City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {uniqueAreas.map(area => (
                     <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 text-center text-xs font-bold text-white bg-primary rounded-t-xl">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className="p-2">
                        {day}
                      </div>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7 border-l border-r border-b rounded-b-xl">
                  {calendarDays}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 justify-around">
                <Card className="p-4 rounded-3xl text-center bg-background flex-1">
                  <p className="text-sm text-muted-foreground">Month</p>
                  <p className="text-3xl font-bold flex items-center justify-center gap-1">
                    76
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  </p>
                  <p className="text-sm">June</p>
                  <p className="text-xs text-muted-foreground">
                    Most Active Month
                  </p>
                  <Separator className="my-4" />
                  <p className="text-3xl font-bold flex items-center justify-center gap-1">
                    0<ArrowUp className="h-4 w-4 text-red-500 rotate-180" />
                  </p>
                  <p className="text-sm">March</p>
                  <p className="text-xs text-muted-foreground">
                    Least Active Month
                  </p>
                </Card>
                <Card className="p-4 rounded-3xl text-center bg-background flex-1">
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="text-3xl font-bold flex items-center justify-center gap-1">
                    76
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  </p>
                  <p className="text-sm">Electronic City</p>
                  <p className="text-xs text-muted-foreground">
                    Area with Highest Projects
                  </p>
                  <Separator className="my-4" />
                  <p className="text-3xl font-bold flex items-center justify-center gap-1">
                    02
                    <ArrowUp className="h-4 w-4 text-red-500 rotate-180" />
                  </p>
                  <p className="text-sm">Marathahalli</p>
                  <p className="text-xs text-muted-foreground">
                    Area with Lowest Projects
                  </p>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <PlatformBottomNav />
    </div>
  );
}
