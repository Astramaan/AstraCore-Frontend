"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, GanttChartSquare, Settings } from "lucide-react";
import OrganizationIcon from "./icons/organization-icon";
import { HabiLogo } from "./habi-logo";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, HandCoins, MessagesSquare } from "lucide-react";

const navItems = [
  { href: "/platform/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/platform/onboarding", icon: Users, label: "Onboarding Ma.." },
  {
    href: "/platform/subscription-management",
    icon: HandCoins,
    label: "Subscription Ma..",
  },
  {
    href: "/platform/organizations",
    icon: OrganizationIcon,
    label: "Organization Ma..",
  },
  { href: "/platform/all-projects", icon: MessagesSquare, label: "Tasks" },
];

export const PlatformBottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="relative w-full bg-neutral-900/20 rounded-t-[50px] backdrop-blur-[5px] p-2">
        <div className="w-[1227px] mx-auto flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                href={item.href}
                key={item.label}
                title={item.label}
                className="flex-shrink-0"
              >
                <div
                  className={cn(
                    "flex flex-col items-center justify-center text-center gap-1 p-2 rounded-lg transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-gray-500 hover:text-primary",
                  )}
                >
                  <div
                    className={`p-4 rounded-full ${isActive ? "bg-primary" : "bg-white"}`}
                  >
                    <item.icon
                      className={`h-6 w-6 ${isActive ? "text-white" : "text-black"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${isActive ? "text-primary" : "text-gray-600"}`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
