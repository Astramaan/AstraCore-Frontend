
"use client";

import React, { useState, useMemo } from "react";
import {
  Bell,
  Search,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { HabiLogo } from "@/components/habi-logo";
import { PlatformBottomNav } from "@/components/platform-bottom-nav";
import { useUser } from "@/context/user-context";
import { NotificationPopover } from "@/components/notification-popover";
import { Input } from "@/components/ui/input";
import { OrganizationCard } from "@/components/organization-card";

const organizations = [
    {
        id: "1",
        name: "Golden Ventures",
        city: "Mysuru",
        contact: { email: "admin@abc.com", phone: "+91 1234567890" },
        projects: "3 Active",
        plan: "Individual",
        validity: "26 May 2025 - 25 May 2026",
        logo: "https://placehold.co/59x59?text=GV",
    },
    {
        id: "2",
        name: "Tesseract",
        city: "Mumbai",
        contact: { email: "admin@abc.com", phone: "+91 1234567890" },
        projects: "8 Active",
        plan: "Studio",
        validity: "26 May 2025 - 25 May 2026",
        logo: "https://placehold.co/59x59?text=T",
    },
    {
        id: "3",
        name: "Prestige Group",
        city: "Bengaluru",
        contact: { email: "admin@abc.com", phone: "+91 1234567890" },
        projects: "12 Active",
        plan: "Individual",
        validity: "26 May 2025 - 25 May 2026",
        logo: "https://placehold.co/59x59?text=PG",
    },
    {
        id: "4",
        name: "Buildahome",
        city: "Bengaluru",
        contact: { email: "admin@abc.com", phone: "+91 1234567890" },
        projects: "9 Active",
        plan: "Enterprises",
        validity: "26 May 2025 - 25 May 2026",
        logo: "https://placehold.co/59x59?text=B",
    },
];


export default function OrganizationManagementPage() {
  const { user } = useUser();
  const userName = user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOrganizations = useMemo(() => {
    if (!searchTerm) {
      return organizations;
    }
    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);


  return (
    <div className="bg-background min-h-screen p-4 md:p-8 pt-6 flex flex-col">
       <div className="sticky top-2 z-20 -mx-4 md:-mx-8">
        <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
          <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] px-4 py-4">
            <div className="max-w-[1440px] 2xl:max-w-none mx-auto px-4 2xl:px-10 flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <HabiLogo />
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white whitespace-nowrap">
                  Organization management
                </h2>
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
                    <div className="text-base text-white/80 whitespace-nowrap">
                      Super Admin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow space-y-6 mt-6">
        <div className="flex justify-between items-end">
            <h2 className="text-2xl font-semibold">Active Customers</h2>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search active customers" className="pl-12 h-14 rounded-full text-lg w-72 bg-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Button className="h-14 px-10 rounded-full text-lg">
                    <Plus className="mr-2"/>
                    Invite
                </Button>
            </div>
        </div>
        <Card className="rounded-[50px]">
            <CardContent className="p-6">
                {filteredOrganizations.map(org => (
                    <OrganizationCard key={org.id} organization={org} />
                ))}
            </CardContent>
        </Card>
      </main>
      <PlatformBottomNav />
    </div>
  );
}
