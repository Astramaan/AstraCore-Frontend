
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PersonalDetails } from "@/components/personal-details";
import { ActiveSessionsCard } from "@/components/active-sessions-card";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronLeft } from "lucide-react";
import { useUser } from "@/context/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import { HabiLogo } from "@/components/habi-logo";
import { NotificationPopover } from "@/components/notification-popover";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlatformBottomNav } from "@/components/platform-bottom-nav";

function PlatformProfilePageContent() {
  const router = useRouter();
  const { user, loading, logout } = useUser();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full rounded-[50px]" />
        <Skeleton className="h-64 w-full rounded-[50px]" />
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by a layout or auth guard
    return <p>Please log in to view your profile.</p>;
  }
  
  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="space-y-6">
      <header className="sticky top-2 z-20 px-2 -mx-4 md:-mx-8">
        <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
          <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] px-4 py-4">
            <div className="max-w-[1440px] 2xl:max-w-none mx-auto px-4 2xl:px-10 flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <HabiLogo />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <h1 className="text-2xl md:text-4xl font-bold text-white">
                  My Profile
                </h1>
              </div>
              <div className="flex justify-end items-center gap-4">
                <NotificationPopover userType="organization" />
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
      <PersonalDetails memberId={user.userId} />
      <ActiveSessionsCard />
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={logout}
          className="rounded-full h-[54px] px-10 text-lg bg-card hover:bg-destructive/10 hover:text-destructive w-full"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default function PlatformProfilePage() {
  return (
    <div className="p-4 md:p-8">
      <PlatformProfilePageContent />
      <PlatformBottomNav />
    </div>
  );
}
