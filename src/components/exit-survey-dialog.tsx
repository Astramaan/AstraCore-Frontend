
"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, Phone } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export const ExitSurveyDialog = ({
  isOpen,
  onClose,
  customer,
}: {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
}) => {
  if (!customer) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className={cn(
          "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-auto md:max-w-3xl md:mx-auto rounded-t-[50px] border-none",
        )}
      >
        <SheetHeader className="p-6">
          <SheetTitle className="flex items-center gap-4 text-2xl font-semibold">
            <Avatar className="w-14 h-14">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback>{customer.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            {customer.name}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 w-[54px] h-[54px] rounded-full bg-background"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Individual Name</p>
              <p className="font-semibold text-base md:text-lg">{customer.individualName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Email ID</p>
              <p className="font-semibold text-base md:text-lg">{customer.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-semibold text-base md:text-lg">{customer.phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Assigned To</p>
              <p className="font-semibold text-base md:text-lg">{customer.assignedTo}</p>
            </div>
             <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Auto Email Sent</p>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5"/>
                <span className="font-semibold text-base md:text-lg">Sent</span>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
             <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email Sent</p>
                <div className="relative h-2 w-full bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-2 w-3/4 bg-primary rounded-full"></div>
                </div>
                 <p className="text-xs text-muted-foreground text-right">In Progress</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Reason</p>
              <p className="font-semibold text-base md:text-lg">{customer.reason}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Custom Message</p>
              <p className="text-base md:text-lg">{customer.message}</p>
            </div>
             <Separator />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Filled on</p>
              <p className="font-semibold text-base md:text-lg">{customer.filledOn}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Engagement Status</p>
              <p className="font-semibold text-green-600 text-base md:text-lg">{customer.comeback}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t mt-auto">
          <Button className="rounded-full h-14 px-8 text-lg"><Phone className="w-5 h-5 mr-2"/> Call</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
