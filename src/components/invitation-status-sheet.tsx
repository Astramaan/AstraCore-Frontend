
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
import { SlidersHorizontal, ChevronLeft, ChevronRight, MoreVertical, X, ClipboardCheck } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Invitation {
  id: number;
  fullName: string;
  organization: string;
  contact: string;
  status: 'Joined' | 'Pending' | 'Expired';
  city: string;
  date: string;
}

const mockInvitations: Invitation[] = [
  { id: 1, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Joined", city: "Bengaluru", date: "26 May 2025" },
  { id: 2, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Pending", city: "Bengaluru", date: "26 May 2025" },
  { id: 3, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Pending", city: "Bengaluru", date: "26 May 2025" },
  { id: 4, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Pending", city: "Bengaluru", date: "26 May 2025" },
  { id: 5, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Joined", city: "Bengaluru", date: "26 May 2025" },
  { id: 6, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Joined", city: "Bengaluru", date: "26 May 2025" },
  { id: 7, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Expired", city: "Bengaluru", date: "26 May 2025" },
  { id: 8, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Expired", city: "Bengaluru", date: "26 May 2025" },
  { id: 9, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Joined", city: "Bengaluru", date: "26 May 2025" },
  { id: 10, fullName: "Balaji Naik", organization: "Golden Ventures", contact: "admin@abc.com | +91 1234567890", status: "Expired", city: "Bengaluru", date: "26 May 2025" },
];


const InvitationItem = ({ invitation }: { invitation: Invitation }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Joined':
        return 'text-green-600';
      case 'Pending':
        return 'text-orange-500';
      case 'Expired':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_auto] items-center gap-4 p-4">
        <div className="flex flex-col">
          <p className="text-base md:text-lg">
            <span className="text-muted-foreground">Full Name: </span>
            <span className="font-medium text-foreground">{invitation.fullName}</span>
          </p>
          <p className="text-base md:text-lg">
            <span className="text-muted-foreground">Organization: </span>
            <span className="font-medium text-foreground">{invitation.organization}</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-base md:text-lg">
            <span className="text-muted-foreground">Contact: </span>
            <span className="font-medium text-foreground">{invitation.contact}</span>
          </p>
          <p className="text-base md:text-lg">
            <span className="text-muted-foreground">Status: </span>
            <span className={cn("font-medium", getStatusClass(invitation.status))}>{invitation.status}</span>
          </p>
        </div>
        <div className="flex md:flex-col md:text-right">
             <p className="text-base md:text-lg mr-4 md:mr-0">
                <span className="text-muted-foreground">City: </span>
                <span className="font-medium text-foreground">{invitation.city}</span>
            </p>
            <p className="text-base md:text-lg">
                <span className="text-muted-foreground">Date: </span>
                <span className="font-medium text-foreground">{invitation.date}</span>
            </p>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Resend</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Revoke</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </div>
  );
};


export const InvitationStatusSheet = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalItems = 2958;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="p-0 m-0 w-full max-w-7xl mx-auto flex flex-col bg-card text-card-foreground h-[90vh] rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-[54px] h-[54px] p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-border flex justify-center items-center">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold">Invitation Status</h2>
            </div>
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems}`}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <ChevronRight />
                </Button>
              </div>
              <Button variant="outline" className="h-12 rounded-full px-4 text-base md:text-lg"><SlidersHorizontal className="mr-2 h-4 w-4" /> Filter</Button>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] rounded-full bg-background"><X className="h-6 w-6" /></Button>
              </SheetClose>
            </div>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-0 md:p-6">
            {mockInvitations.map((invitation) => (
              <InvitationItem key={invitation.id} invitation={invitation} />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
