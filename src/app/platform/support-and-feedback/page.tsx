
"use client";

import React from "react";
import {
  Bell,
  MoreVertical,
  Search,
  ShieldAlert,
  MessageSquare,
  BarChart2,
  PieChart,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const reportedIssues = [
  {
    id: "#1001",
    reportedBy: "Balaji Naik",
    reportedOn: "05 June 2025, 12:00 AM",
    title: "Login Button",
    summary: "Login Button is not working sometime",
    status: "Open",
    priority: "High",
    assignedTo: "Priya B",
  },
  {
    id: "#1002",
    reportedBy: "Anil Kumar",
    reportedOn: "04 June 2025, 11:00 PM",
    title: "Dashboard Glitch",
    summary: "Analytics charts not loading data",
    status: "In Progress",
    priority: "Medium",
    assignedTo: "Developer Team",
  },
  {
    id: "#1003",
    reportedBy: "Balaji Naik",
    reportedOn: "05 June 2025, 12:00 AM",
    title: "Login Button",
    summary: "Login Button is not working sometime",
    status: "Open",
    priority: "High",
    assignedTo: "Priya B",
  },
  {
    id: "#1004",
    reportedBy: "Balaji Naik",
    reportedOn: "05 June 2025, 12:00 AM",
    title: "Login Button",
    summary: "Login Button is not working sometime",
    status: "Open",
    priority: "High",
    assignedTo: "Priya B",
  },
];

const mostReported = [
  {
    category: "Server Issue",
    total: 120,
    issues: [
      { title: "“Server Down”", count: 50 },
      { title: "“Server Timeout”", count: 40 },
      { title: "“Connection error”", count: 30 },
    ],
  },
  {
    category: "Drone Issue",
    total: 80,
    issues: [
      { title: "“Drone malfunction”", count: 50 },
      { title: "“Drone issue”", count: 40 },
      { title: "“Drone”", count: 30 },
    ],
  },
  {
    category: "Server Issue",
    total: 76,
    issues: [
      { title: "“Server Down”", count: 50 },
      { title: "“Server Timeout”", count: 40 },
      { title: "“Connection error”", count: 30 },
    ],
  },
];

const supportTeam = [
  {
    name: "Rahul",
    company: "Golden Ventures",
    avatar: "https://placehold.co/54x54",
    isOnline: true,
  },
  {
    name: "Anil Kumar",
    company: "Brick & Bolt",
    avatar: "https://placehold.co/54x54",
    isOnline: true,
  },
  {
    name: "Dhanush",
    company: "Powerplay",
    avatar: "https://placehold.co/54x54",
    isOnline: true,
  },
];

const ReportedIssueItem = ({ issue }: { issue: (typeof reportedIssues)[0] }) => (
  <div className="flex flex-col">
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_auto_1.5fr_auto_1fr_auto] items-start gap-4 p-4">
      {/* Issue Details */}
      <div className="flex flex-col gap-2">
        <p className="text-base">
          <span className="text-muted-foreground">Issue ID:</span>{" "}
          <span className="font-medium text-foreground">{issue.id}</span>
        </p>
        <p className="text-base">
          <span className="text-muted-foreground">Reported By:</span>{" "}
          <span className="font-medium text-foreground">
            {issue.reportedBy}
          </span>
        </p>
        <p className="text-base">
          <span className="text-muted-foreground">Reported on:</span>{" "}
          <span className="font-medium text-foreground">
            {issue.reportedOn}
          </span>
        </p>
      </div>

      <Separator orientation="vertical" className="hidden md:block h-14 mx-4" />

      {/* Title/Summary */}
      <div className="flex flex-col gap-2">
        <p className="text-base">
          <span className="text-muted-foreground">Title:</span>{" "}
          <span className="font-medium text-foreground">{issue.title}</span>
        </p>
        <p className="text-base">
          <span className="text-muted-foreground">Summary:</span>{" "}
          <span className="font-medium text-foreground">{issue.summary}</span>
        </p>
      </div>

      <Separator orientation="vertical" className="hidden md:block h-14 mx-4" />

      {/* Status Details */}
      <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right text-base">
        <p>
          <span className="text-muted-foreground">Status:</span>{" "}
          <span className="font-medium text-red-500">{issue.status}</span>
        </p>
        <p>
          <span className="text-muted-foreground">Priority:</span>{" "}
          <span className="font-medium text-foreground">{issue.priority}</span>
        </p>
        <p>
          <span className="text-muted-foreground">Assigned To:</span>{" "}
          <span className="font-medium text-foreground">
            {issue.assignedTo}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="justify-self-end">
        <Button variant="ghost" size="icon" className="ml-4">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </div>
    <Separator />
  </div>
);

const MostReportedCard = ({ data }: { data: (typeof mostReported)[0] }) => (
    <div className="space-y-4">
        <div className="flex flex-col items-start gap-2">
            <p className="text-lg text-red-500 font-medium">{data.category}</p>
            <div className="flex items-center gap-2">
                <p className="text-4xl font-bold">{data.total}</p>
                <p className="text-base text-muted-foreground">Reports</p>
            </div>
        </div>
        <div className="space-y-2">
            {data.issues.map((issue, index) => (
                <div key={index} className="flex justify-between items-center text-lg pb-2 border-b">
                    <p className="text-foreground">{issue.title}</p>
                    <p className="font-medium">{issue.count}</p>
                </div>
            ))}
        </div>
    </div>
);

const SupportMemberCard = ({ member }: { member: (typeof supportTeam)[0] }) => (
    <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex items-center gap-2">
            <Avatar className="w-14 h-14 relative">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                {member.isOnline && <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"/>}
            </Avatar>
            <div>
                <p className="text-lg font-medium">{member.name}</p>
                <p className="text-base text-muted-foreground">{member.company}</p>
            </div>
        </div>
        <Button className="h-14 px-10 rounded-full bg-background text-foreground hover:bg-muted">Chat</Button>
    </div>
);

const CustomerFeedbackCard = () => (
    <Card className="rounded-[50px]">
        <CardHeader>
            <div className="flex items-center gap-2">
                <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                    <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle>Customer Feedback</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Recent Feedback</p>
                <div className="flex justify-between items-center">
                    <p className="font-medium">How would you rate our customer support experience?</p>
                    <p className="text-sm text-muted-foreground">Total: 169</p>
                </div>
                <p className="text-sm text-primary">25 New feedbacks from users</p>
            </div>
             <Separator />
             <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className="font-medium">How would you rate our customer support experience?</p>
                    <p className="text-sm text-muted-foreground">Total: 169</p>
                </div>
                <p className="text-sm text-primary">25 New feedbacks from users</p>
            </div>
            <div className="flex gap-4 pt-4">
                <Button className="flex-1 rounded-full h-14">Create New feedback</Button>
                <Button variant="outline" className="flex-1 rounded-full h-14">View all</Button>
            </div>
        </CardContent>
    </Card>
);

export default function SupportAndFeedbackPage() {
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <HabiLogo />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                  Support & Feedback
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
        <Card className="rounded-[50px]">
            <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <CardTitle>Reported Issues</CardTitle>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search Reported issues" className="pl-12 h-14 rounded-full bg-background" />
                    </div>
                    <Button variant="outline" className="h-14 rounded-full px-10">Sort by</Button>
                </div>
            </CardHeader>
            <CardContent>
                {reportedIssues.map((issue, index) => <ReportedIssueItem key={index} issue={issue} />)}
            </CardContent>
        </Card>
        
        <Card className="rounded-[50px]">
            <CardHeader>
                <div className="flex items-center gap-2">
                     <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                        <BarChart2 className="h-6 w-6" />
                    </div>
                    <CardTitle>Most Reported Issues</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mostReported.map((item, index) => <MostReportedCard key={index} data={item} />)}
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-[50px]">
                <CardHeader>
                     <div className="flex items-center gap-2">
                         <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <CardTitle>Live Chat Support</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {supportTeam.map((member, index) => <SupportMemberCard key={index} member={member} />)}
                </CardContent>
            </Card>

            <CustomerFeedbackCard />
        </div>

      </main>
      <PlatformBottomNav />
    </div>
  );
}
