"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GanttChartSquare, Settings, Users, HandCoins, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabiLogo } from "./habi-logo";
import OrganizationIcon from "./icons/organization-icon";

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


const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 p-3 rounded-md",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-zinc-600 hover:bg-zinc-100",
        )}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </Link>
    </li>
  );
};

export function PlatformSidebar() {
  return (
    <div className="h-full flex flex-col p-4 space-y-4 bg-white">
      <div className="p-4">
        <Link href="/platform/dashboard">
          <HabiLogo />
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
