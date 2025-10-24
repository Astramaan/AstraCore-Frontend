
"use client";

import React, { useState } from "react";
import {
  Bell,
  HandCoins,
  Plus,
  Users,
  CircleDollarSign,
  ClipboardList,
  UserCheck,
  UserX,
  CreditCard,
  Mail,
  Edit,
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
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plans = {
  monthly: [
    {
      name: "Individual",
      price: "₹499/month",
      description:
        "For freelancers, architects, interior designers, and site managers",
      features: ["Internal version", "Client version"],
      iconBg: "bg-fuchsia-100 dark:bg-fuchsia-900/50",
      iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
      headerBg: "bg-gradient-to-br from-purple-200 to-purple-50",
      Icon: Users,
      basePlan: true,
    },
    {
      name: "Studio",
      price: "₹1499/month",
      description: "2–10 member teams, firms, small consultancies",
      features: [
        "Internal version",
        "Client version",
        "Site Surveillance System",
        "AR/VR Experience Tool",
      ],
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      iconColor: "text-indigo-700 dark:text-indigo-300",
      headerBg: "bg-gradient-to-br from-indigo-200 to-indigo-50",
      Icon: Users,
      basePlan: true,
    },
    {
      name: "Enterprises",
      price: "Custom Pricing",
      description: "Large-scale builders, construction firms, franchise teams",
      features: [
        "Internal version",
        "Client version",
        "Site Surveillance System",
        "AR/VR Experience Tool",
        "Shram",
        "Curing system",
      ],
      iconBg: "bg-red-100 dark:bg-red-900/50",
      iconColor: "text-red-700 dark:text-red-300",
      headerBg: "bg-gradient-to-br from-rose-200 to-rose-50",
      Icon: Users,
      basePlan: true,
    },
  ],
  yearly: [
    {
      name: "Individual",
      price: "₹4,999/year",
      description:
        "For freelancers, architects, interior designers, and site managers",
      features: ["Internal version", "Client version"],
      iconBg: "bg-fuchsia-100 dark:bg-fuchsia-900/50",
      iconColor: "text-fuchsia-700 dark:text-fuchsia-300",
      headerBg: "bg-gradient-to-br from-purple-200 to-purple-50",
      Icon: Users,
      basePlan: true,
    },
    {
      name: "Studio",
      price: "₹14,999/year",
      description: "2–10 member teams, firms, small consultancies",
      features: [
        "Internal version",
        "Client version",
        "Site Surveillance System",
        "AR/VR Experience Tool",
      ],
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      iconColor: "text-indigo-700 dark:text-indigo-300",
      headerBg: "bg-gradient-to-br from-indigo-200 to-indigo-50",
      Icon: Users,
      basePlan: true,
    },
    {
      name: "Enterprises",
      price: "Custom Pricing",
      description: "Large-scale builders, construction firms, franchise teams",
      features: [
        "Internal version",
        "Client version",
        "Site Surveillance System",
        "AR/VR Experience Tool",
        "Shram",
        "Curing system",
      ],
      iconBg: "bg-red-100 dark:bg-red-900/50",
      iconColor: "text-red-700 dark:text-red-300",
      headerBg: "bg-gradient-to-br from-rose-200 to-rose-50",
      Icon: Users,
      basePlan: true,
    },
  ],
};

const allFeatures = [
  "Internal version",
  "Client version",
  "Site Surveillance System",
  "AR/VR Experience Tool",
  "Shram",
  "Curing system",
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
        "rounded-[25px] hover:bg-accent transition-colors bg-background border-0",
      )}
    >
      <CardContent className="p-4 flex items-center gap-2">
        <div className={cn("p-2.5 rounded-full", bgColor)}>
          {icon}
        </div>
        <p className="text-base font-medium text-foreground">{text}</p>
      </CardContent>
    </Card>
  </Link>
);

const SubscriptionCard = ({ plan }: { plan: (typeof plans.monthly)[0] }) => {
  return (
    <div className="relative">
      <Card className="rounded-[50px] squircle overflow-hidden flex flex-col h-full bg-card dark:bg-card shadow-none">
        <div className={cn("p-8 pb-12 text-center", plan.headerBg)}>
          <div className="flex justify-center mb-4">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center bg-white",
              )}
            >
              <Mail className={cn("w-8 h-8", plan.iconColor)} />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-black">{plan.name}</h3>
          <p className="text-lg text-black/60">{plan.price}</p>
          {plan.basePlan && (
            <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">
              Base Plan
            </div>
          )}
        </div>
        <div className="bg-card dark:bg-card flex-1 flex flex-col p-8 pt-6 -mt-6 rounded-t-[30px]">
          <p className="text-sm text-muted-foreground flex-grow text-center h-12">
            {plan.description}
          </p>
          <ul className="space-y-4 my-8 text-left">
            {allFeatures.map((feature) => {
              const isIncluded = plan.features.includes(feature);
              return (
                <li key={feature} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      isIncluded
                        ? "bg-green-100"
                        : "bg-gray-200 dark:bg-zinc-700",
                    )}
                  >
                    {isIncluded ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <div className="w-2.5 h-0.5 bg-gray-400 dark:bg-zinc-500" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-base",
                      isIncluded
                        ? "text-foreground"
                        : "text-muted-foreground line-through",
                    )}
                  >
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
          <Button
            variant="outline"
            className="w-full h-14 rounded-full text-lg mt-auto bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 border-0"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default function SubscriptionManagementPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

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
                <h2 className="text-xl md:text-2xl lg:text-[32px] lg:leading-[40px] font-semibold text-white whitespace-nowrap">
                  Subscription Management
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold">Subscription Plans</h2>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Tabs
              defaultValue="monthly"
              onValueChange={(value) =>
                setActiveTab(value as "monthly" | "yearly")
              }
              className="w-auto"
            >
              <TabsList className="rounded-full p-1 h-14 bg-card">
                <TabsTrigger
                  value="monthly"
                  className="w-[90px] h-11 rounded-full text-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="w-[90px] h-11 rounded-full text-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              className="h-14 px-6 rounded-full squircle text-lg bg-card text-foreground hover:bg-card/90"
            >
              Draft
            </Button>
            <Button className="h-14 px-6 rounded-full squircle text-lg">
              <Plus className="mr-2 h-5 w-5" />
              Create new plan
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans[activeTab].map((plan) => (
            <SubscriptionCard key={plan.name} plan={plan} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="rounded-[50px] squircle lg:col-span-2 flex items-center justify-center">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                <QuickLink
                  icon={<UserCheck className="h-6 w-6 text-green-700" />}
                  bgColor="bg-green-100"
                  text="Active Customers"
                  href="#"
                />
                <QuickLink
                  icon={<CreditCard className="h-6 w-6 text-indigo-700" />}
                  bgColor="bg-indigo-100"
                  text="Payment Attempts"
                  href="#"
                />
                <QuickLink
                  icon={<UserX className="h-6 w-6 text-red-700" />}
                  bgColor="bg-red-100"
                  text="Expired Customers"
                  href="#"
                />
                <QuickLink
                  icon={<ClipboardList className="h-6 w-6 text-purple-700" />}
                  bgColor="bg-purple-100"
                  text="Invoices"
                  href="#"
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col">
            <Card className="rounded-[50px] squircle p-8 flex flex-col flex-1">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-3.5 rounded-full border">
                    <HandCoins className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>Discounts</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col justify-between">
                <p className="text-base text-muted-foreground">
                  Current Active Discounts: 03
                </p>
                <Button
                  variant="outline"
                  className="w-full mt-6 h-14 rounded-full text-lg squircle"
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <PlatformBottomNav />
    </div>
  );
}
