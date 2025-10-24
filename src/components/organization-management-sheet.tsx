
"use client";

import React, { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, X } from "lucide-react";
import { OrganizationCard } from "@/components/organization-card";
import { InviteOrganizationSheet } from "./invite-organization-sheet";
import { ScrollArea } from "./ui/scroll-area";
import OrganizationIcon from "./icons/organization-icon";

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

interface OrganizationManagementSheetProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function OrganizationManagementSheet({ isOpen, onOpenChange }: OrganizationManagementSheetProps) {
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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom"
        className="p-0 m-0 w-full max-w-5xl mx-auto flex flex-col bg-card text-card-foreground h-[90vh] rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-[54px] h-[54px] p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border flex justify-center items-center">
                    <OrganizationIcon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold">Organization management</h2>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="w-[54px] h-[54px] rounded-full bg-background"><X className="h-6 w-6" /></Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <h2 className="text-2xl font-semibold">Active Customers</h2>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search active customers" className="pl-12 h-14 rounded-full text-lg w-full bg-background" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <InviteOrganizationSheet />
                </div>
            </div>
        </div>
        <ScrollArea className="flex-1 px-6">
            {filteredOrganizations.map(org => (
                <OrganizationCard key={org.id} organization={org} />
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
