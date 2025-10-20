
"use client";

import React from "react";
import { UserProvider } from "@/context/user-context";
import { PlatformBottomNav } from "@/components/platform-bottom-nav";
import { HabiLogo } from "./habi-logo";
import { NotificationPopover } from "./notification-popover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TeamIcon from "./icons/team-icon";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useUser } from "@/context/user-context";
import { Button } from "./ui/button";

function PlatformHeader() {
  const { user } = useUser();
  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="sticky top-2 z-20 px-2 -mx-4 md:-mx-8">
      <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
        <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] px-4 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
              <HabiLogo />
              <div className="w-px h-8 bg-border hidden md:block"></div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                Dashboard
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
  );
}

function PlatformLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <PlatformBottomNav />
    </div>
  );
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <PlatformLayoutContent>{children}</PlatformLayoutContent>
    </UserProvider>
  );
}
