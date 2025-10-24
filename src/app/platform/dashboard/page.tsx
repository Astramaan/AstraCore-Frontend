
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
  HandCoins,
  ArrowRight,
  Minimize,
  Maximize,
  Zap,
  ClipboardCheck,
  CreditCard,
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
import { InviteOrganizationSheet } from "@/components/invite-organization-sheet";
import { OrganizationManagementSheet } from "@/components/organization-management-sheet";
import { ExitSurveySheet } from "@/components/exit-survey-dialog";

const churnedCustomers = [
  {
    name: "Golden ventures",
    reason: "Pricing too high",
    comeback: "Possible Comeback",
    avatar: "https://placehold.co/40x40",
    individualName: "Balaji Naik",
    email: "balaji@habi.one",
    phone: "9380032186",
    assignedTo: "Balaji Naik",
    filledOn: "02 May 2025",
    message: "The tool is good, but it's too expensive for us. A cheaper or more flexible plan would have helped.",
  },
  {
    name: "Powerplay",
    reason: "Missing Features - Need some features...",
    comeback: "",
    avatar: "https://placehold.co/40x40",
    individualName: "Anil Kumar",
    email: "anil@powerplay.com",
    phone: "9876543210",
    assignedTo: "Anil Kumar",
    filledOn: "01 May 2025",
    message: "The platform lacks some critical features we need for our workflow.",
  },
  {
    name: "Harish mane",
    reason: "Technical issues or bugs",
    comeback: "",
    avatar: "https://placehold.co/40x40",
    individualName: "Harish Mane",
    email: "harish@mane.com",
    phone: "8765432109",
    assignedTo: "Priya B",
    filledOn: "28 April 2025",
    message: "We experienced too many technical glitches which disrupted our work.",
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
        "rounded-2xl hover:shadow-lg transition-shadow bg-background dark:bg-card",
      )}
    >
      <CardContent className="p-4 flex items-center gap-2">
        <div
          className={cn("p-2.5 rounded-full flex items-center justify-center", bgColor)}
        >
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
  const [maximizedCard, setMaximizedCard] = useState<string | null>(null);
  const [isOrgSheetOpen, setIsOrgSheetOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

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

  const toggleMaximize = (cardId: string) => {
    setMaximizedCard(maximizedCard === cardId ? null : cardId);
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-8 pt-6 space-y-6">
      <header className="sticky top-2 z-20 px-2 -mx-4 md:-mx-8">
        <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
          <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] px-4 py-4">
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
                    <div className="text-base text-white/80 whitespace-nowrap">Super Admin</div>
                  </div>
                </Link>
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
                    <AvatarImage src={`https://placehold.co/50x50?text=${'i'}`} />
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
                onClick={() => setIsOrgSheetOpen(true)}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
            <InviteOrganizationSheet />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(!maximizedCard || maximizedCard === "subscriptions") && (
          <Card className={cn("rounded-[50px]", maximizedCard === 'subscriptions' && 'lg:col-span-2')}>
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
        )}
        {(!maximizedCard || maximizedCard === "revenue") && (
          <Card className={cn("rounded-[50px]", maximizedCard === 'revenue' && 'lg:col-span-2')}>
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
        )}

        {(!maximizedCard || maximizedCard === "churn") && (
          <Card className={cn("rounded-[50px]", maximizedCard === 'churn' && 'lg:col-span-2')}>
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
        )}

        {(!maximizedCard || maximizedCard === "quick-links") && (
          <Card className={cn("rounded-[50px]", maximizedCard === 'quick-links' && 'lg:col-span-2')}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-3.5 rounded-full border">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Quick Links</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickLink
                icon={<Users className="h-6 w-6 text-green-600" />}
                bgColor="bg-green-100 dark:bg-green-900/50"
                text="Lead Management"
                href="/organization/habi123/leads"
              />
              <QuickLink
                icon={<CreditCard className="h-6 w-6 text-indigo-600" />}
                bgColor="bg-indigo-100 dark:bg-indigo-900/50"
                text="Payment Attempts"
                href="#"
              />
              <QuickLink
                icon={<ClipboardList className="h-6 w-6 text-purple-600" />}
                bgColor="bg-purple-100 dark:bg-purple-900/50"
                text="Onboarding Status"
                href="/platform/onboarding"
              />
              <QuickLink
                icon={
                  <ClipboardCheck className="h-6 w-6 text-pink-600" />
                }
                bgColor="bg-pink-100 dark:bg-pink-900/50"
                text="Invitation Status"
                href="#"
              />
            </CardContent>
          </Card>
        )}
      </div>
      <Card className={cn("rounded-[50px]", maximizedCard === "exit-survey" && "lg:col-span-2")}>
        <CardHeader className="flex flex-row justify-between items-start">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full border" onClick={() => setIsOrgSheetOpen(true)}>
              <ArrowRight className="w-5 h-5 -rotate-180" />
            </Button>
            <CardTitle>Exit Survey</CardTitle>
          </div>
          <div className="text-right flex items-center gap-4">
            <div className="flex items-center gap-2">
                <p className="text-muted-foreground">Total Response</p>
                <p className="text-2xl font-bold">129</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border w-[54px] h-[54px] bg-background"
              onClick={() => toggleMaximize("exit-survey")}
            >
              {maximizedCard === 'exit-survey' ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-0">
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
                    <div className="inline-flex flex-col justify-start items-start">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {customer.reason}
                        {customer.comeback && (
                          <span className="text-green-600 ml-1">
                            ({customer.comeback})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full h-14" onClick={() => setSelectedCustomer(customer)}>
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
      <OrganizationManagementSheet
        isOpen={isOrgSheetOpen}
        onOpenChange={setIsOrgSheetOpen}
      />
      <ExitSurveySheet
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </div>
  );
}
