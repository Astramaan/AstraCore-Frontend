
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  HandCoins,
  MessagesSquare,
} from "lucide-react";
import OrganizationIcon from "./icons/organization-icon";


const navItems = [
  { href: "/platform/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/platform/onboarding", icon: Users, label: "Onboarding" },
  {
    href: "/platform/subscription-management",
    icon: HandCoins,
    label: "Subscription",
  },
  {
    href: "/platform/organization-management",
    icon: OrganizationIcon,
    label: "Organization",
  },
  { href: "/platform/all-projects", icon: MessagesSquare, label: "Tasks" },
];

export const PlatformBottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-4 flex justify-center">
      <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0 w-full md:w-auto max-w-lg">
        <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] p-2 md:p-4">
          <div className="flex items-center justify-around md:justify-center md:gap-4">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  title={item.label}
                  className="flex-shrink-0 group"
                >
                  <div className="relative">
                    <div
                      className={cn(
                        "flex flex-row items-center justify-center gap-1.5 transition-all duration-300 ease-in-out",
                        "rounded-full h-[54px] md:h-14",
                        isActive
                          ? "bg-primary text-white dark:text-black px-4"
                          : "bg-black/20 dark:bg-black/30 text-white w-[54px] md:w-14 hover:bg-primary/10",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-6 h-6 shrink-0",
                          !isActive && "group-hover:text-primary",
                        )}
                      />
                      {isActive && (
                        <span
                          className={cn(
                            "text-xs md:text-base font-medium whitespace-nowrap",
                          )}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

    