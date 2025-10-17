
"use client";

import {
  ArrowUpRight,
  Calendar as CalendarIcon,
  ChevronRight,
  Users,
  Plus,
  CircleDollarSign,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionChart } from "@/components/charts/subscription-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ChurnChart } from "@/components/charts/churn-chart";
import { ExitSurveyChart } from "@/components/charts/exit-survey-chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NotificationPopover } from "@/components/notification-popover";
import { HabiLogo } from "@/components/habi-logo";
import { useUser } from "@/context/user-context";
import TeamIcon from "@/components/icons/team-icon";
import { PlatformBottomNav } from "@/components/platform-bottom-nav";

const churnedCustomers = [
  {
    name: "Brick & Bolt",
    reason: "Pricing too high",
    comeback: "Possible Comeback",
    avatar: "https://placehold.co/40x40",
  },
  {
    name: "Powerplay",
    reason: "Missing Features - Need some features...",
    comeback: "",
    avatar: "https://placehold.co/40x40",
  },
  {
    name: "Harish mane",
    reason: "Technical issues or bugs",
    comeback: "",
    avatar: "https://placehold.co/40x40",
  },
];

const QuickLink = ({
  icon,
  bgColor,
  text,
  href,
}: {
  icon: React.ReactNode;
  bgColor: string;
  text: string;
  href: string;
}) => (
  <Link href={href}>
    <Card
      className={cn(
        "rounded-2xl hover:shadow-lg transition-shadow",
        bgColor,
      )}
    >
      <CardContent className="p-4 flex items-center gap-2">
        <div className="p-2.5 rounded-xl bg-white dark:bg-black/20">
          {icon}
        </div>
        <p className="text-base font-medium text-foreground">{text}</p>
      </CardContent>
    </Card>
  </Link>
);

export default function PlatformDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toLocaleString("default", { month: "long" }),
  );
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString(),
  );

  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString(),
  );

  return (
    <div className="bg-background min-h-screen p-4 md:p-8 pt-6 space-y-6">
      <header className="sticky top-2 z-20 px-2">
        <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
          <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] px-4 py-2">
            <div className="max-w-[1440px] 2xl:max-w-none mx-auto px-4 2xl:px-10 flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <HabiLogo />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <h1 className="text-2xl md:text-4xl font-bold text-white">
                  Dashboard
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
                      <TeamIcon
                        className={cn(
                          "mr-2 h-6 w-6",
                          "text-white group-hover:text-primary dark:group-hover:text-primary",
                        )}
                      />
                      <span
                        className={cn(
                          "text-white group-hover:text-primary dark:group-hover:text-primary",
                        )}
                      >
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

      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-base font-medium text-muted-foreground mb-2">
              Filter
            </p>
            <Tabs
              defaultValue="month"
              className="w-auto md:w-[200px]"
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="rounded-[50px] p-1 h-14 bg-card">
                <TabsTrigger
                  value="month"
                  className="w-[90px] h-11 rounded-[50px] text-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Month
                </TabsTrigger>
                <TabsTrigger
                  value="year"
                  className="w-[90px] h-11 rounded-[50px] text-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <p className="text-base font-medium text-muted-foreground mb-2">
              Select {activeTab === "month" ? "Month" : "Year"}
            </p>
            {activeTab === "month" ? (
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full md:w-[200px] h-14 rounded-[50px] text-lg bg-card">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select month" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-[200px] h-14 rounded-[50px] text-lg bg-card">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select year" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div>
          <p className="text-lg font-medium text-foreground mb-2">
            Active Customers
          </p>
          <div className="flex justify-start items-center gap-4">
            <div className="flex items-center">
              <div className="flex -space-x-4">
                {[...Array(5)].map((_, i) => (
                  <Avatar
                    key={i}
                    className="w-12 h-12 border-4 border-background"
                  >
                    <AvatarImage src={`https://placehold.co/50x50?text=${i}`} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                ))}
                <Avatar className="w-12 h-12 border-4 border-background bg-primary text-primary-foreground flex items-center justify-center">
                  <span className="text-base font-medium">+6</span>
                </Avatar>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 bg-card rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
            <Button
              variant="outline"
              className="h-14 px-10 bg-card rounded-full text-lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Invite
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-[50px]">
          <CardHeader className="flex flex-row justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-3.5 rounded-full border">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Subscriptions Analytics</CardTitle>
                <CardDescription>Monthly active Subscriptions</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold flex items-center">
                200 <ArrowUpRight className="h-6 w-6 text-green-500" />
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <SubscriptionChart />
          </CardContent>
        </Card>
        <Card className="rounded-[50px]">
          <CardHeader className="flex flex-row justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-3.5 rounded-full border">
                <CircleDollarSign className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Revenue (MRR/ARR)</CardTitle>
                <CardDescription>Monthly Recurring Revenue</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold flex items-center">
                1.90L <ArrowUpRight className="h-6 w-6 text-green-500" />
              </p>
              <Badge className="bg-primary/20 text-primary">+24.4%</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="rounded-[50px]">
          <CardHeader className="flex flex-row justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-3.5 rounded-full border">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Subscriptions Churn</CardTitle>
                <CardDescription>Unsubscribed Users</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold flex items-center">
                69 <ArrowUpRight className="h-6 w-6 text-red-500" />
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <ChurnChart />
          </CardContent>
        </Card>

        <Card className="rounded-[50px]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-3.5 rounded-full border">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Quick Links</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <QuickLink
              icon={<Users className="h-6 w-6 text-foreground" />}
              bgColor="bg-accent-color-01/30"
              text="Lead Management"
              href="#"
            />
            <QuickLink
              icon={<CircleDollarSign className="h-6 w-6 text-foreground" />}
              bgColor="bg-accent-color-02/30"
              text="Payment Attempts"
              href="#"
            />
            <QuickLink
              icon={<ClipboardList className="h-6 w-6 text-foreground" />}
              bgColor="bg-accent-color-03/30"
              text="Onboarding Status"
              href="#"
            />
            <QuickLink
              icon={
                <ClipboardList className="h-6 w-6 text-foreground" />
              }
              bgColor="bg-accent-color-05/30"
              text="Invitation Status"
              href="#"
            />
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-[50px]">
        <CardHeader className="flex flex-row justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-3.5 rounded-full border">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Exit Survey</CardTitle>
            </div>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Total Response</p>
            <p className="text-4xl font-bold">129</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <ExitSurveyChart />
          </div>
          <div>
            {churnedCustomers.map((customer, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-32 inline-flex flex-col justify-start items-start gap-1">
                      <p className="font-medium">{customer.name}</p>
                      <div className="flex gap-2">
                        <p className="text-sm text-muted-foreground truncate">
                          {customer.reason}
                        </p>
                        {customer.comeback && (
                          <p className="text-sm text-green-600">
                            ({customer.comeback})
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                </div>
                {index < churnedCustomers.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <PlatformBottomNav />
    </div>
  );

    