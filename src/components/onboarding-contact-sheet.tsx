
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
import { X, Phone, CheckCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="space-y-2">
    <p className="text-base text-muted-foreground">{label}</p>
    <div className="text-lg font-semibold text-foreground">{value}</div>
  </div>
);

export const OnboardingContactSheet = ({
  isOpen,
  onClose,
  track,
}: {
  isOpen: boolean;
  onClose: () => void;
  track: any;
}) => {
  if (!track) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className={cn(
          "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-auto md:max-w-3xl md:mx-auto rounded-t-[50px] border-none",
        )}
        overlayClassName="bg-black/20 backdrop-blur-sm"
      >
        <SheetHeader className="p-6">
          <SheetTitle className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://placehold.co/56x56?text=GV" />
                <AvatarFallback>
                  {track.company.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold">{track.company}</h2>
            </div>
            <div className="flex items-center gap-2">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[54px] h-[54px] rounded-full bg-background"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            <DetailItem label="Individual Name" value={track.individualName} />
            <DetailItem label="Email ID" value={track.email} />
            <DetailItem label="Phone Number" value={track.phone} />
            <DetailItem label="Assigned To" value={track.assignedTo} />
            <DetailItem
              label="Auto Email Sent"
              value={
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5 text-green-600"/>
                  <span className="font-semibold text-lg">Sent</span>
                </div>
              }
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Separator className="md:hidden"/>
            <div className="space-y-2">
              <p className="text-base text-muted-foreground">Email Sent</p>
              <Progress value={75} className="h-2.5" />
              <p className="text-xs text-muted-foreground text-right">
                In Progress
              </p>
            </div>
            <Separator />
            <DetailItem label="Current Stages" value={track.currentStage} />
            <DetailItem label="Inactive Since" value={track.inactiveSince} />
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t mt-auto">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full h-14 px-8 text-lg"
          >
            Close
          </Button>
          <a href={`tel:${track.phone}`}>
            <Button className="rounded-full h-14 px-8 text-lg">
              <Phone className="w-5 h-5 mr-2" /> Call
            </Button>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};
