import {
  ArrowUpRight,
  Calendar as CalendarIcon,
  ChevronRight,
  Bell,
  Users,
  Plus,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HandCoinsIcon from "@/components/icons/hand-coins-icon";
import OnboardingIcon from "@/components/icons/onboarding-icon";
import SupportIcon from "@/components/icons/support-icon";
import InvitationStatusIcon from "@/components/icons/invitation-status-icon";

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
        <div
          className={cn(
            "p-2.5 rounded-3xl",
            "bg-accent-color-01 dark:bg-opacity-20",
          )}
        >
          {icon}
        </div>
        <p className="text-base font-medium">{text}</p>
      </CardContent>
    </Card>
  </Link>
);

export default function PlatformDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="bg-background min-h-screen p-4 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div className="hidden md:flex justify-start items-center gap-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
        <div className="hidden md:flex justify-between items-center gap-4">
          <Button variant="ghost" size="icon" className="bg-card rounded-full">
            <Bell className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="h-14 px-10 rounded-full bg-card text-lg"
          >
            <Users className="mr-2 h-6 w-6" />
            Employee Management
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-base font-medium text-muted-foreground mb-2">
              Filter
            </p>
            <Tabs defaultValue="month" className="w-[200px]">
              <TabsList className="rounded-[50px] p-1 h-14">
                <TabsTrigger
                  value="month"
                  className="w-[90px] h-11 rounded-[50px] text-lg"
                >
                  Month
                </TabsTrigger>
                <TabsTrigger
                  value="year"
                  className="w-[90px] h-11 rounded-[50px] text-lg"
                >
                  Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <p className="text-base font-medium text-muted-foreground mb-2">
              Select Month
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[200px] h-14 rounded-[50px] justify-start text-left font-normal text-lg bg-card",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <p className="text-lg font-medium mb-2">Active Customers</p>
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
        <Card>
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
        <Card>
          <CardHeader className="flex flex-row justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-3.5 rounded-full border">
                <HandCoinsIcon className="h-6 w-6" />
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

        <Card>
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
                69 <ArrowUpRight className="h-6 w-6 text-green-500" />
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            <ChurnChart />
          </CardContent>
        </Card>

        <Card>
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
              icon={<Users className="h-6 w-6" />}
              bgColor="bg-accent-color-01/30"
              text="Lead Management"
              href="#"
            />
            <QuickLink
              icon={<Users className="h-6 w-6" />}
              bgColor="bg-accent-color-02/30"
              text="Payment Attempts"
              href="#"
            />
            <QuickLink
              icon={<OnboardingIcon className="h-6 w-6" />}
              bgColor="bg-accent-color-03/30"
              text="Onboarding Status"
              href="#"
            />
            <QuickLink
              icon={<InvitationStatusIcon className="h-6 w-6" />}
              bgColor="bg-accent-color-05/30"
              text="Invitation Status"
              href="#"
            />
          </CardContent>
        </Card>
      </div>
      <Card>
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
              <div key={index}>
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.reason}
                        {customer.comeback && (
                          <span className="text-green-500 ml-2">
                            ({customer.comeback})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    <SupportIcon className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                </div>
                {index < churnedCustomers.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
