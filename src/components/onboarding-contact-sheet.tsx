
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
import { X, Phone, CheckCircle, Mail, User, Briefcase, MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

const DetailItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start gap-2">
    {icon && <div className="mt-1 text-muted-foreground">{icon}</div>}
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-base">{value}</p>
    </div>
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
        className="p-0 m-0 w-full max-w-lg mx-auto flex flex-col bg-card text-card-foreground h-auto rounded-t-[50px] border-none"
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
              <div className="text-right">
                <p className="text-sm text-primary font-medium">Email Sent</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
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
        <div className="p-6 grid grid-cols-2 gap-x-4 gap-y-6">
          <DetailItem label="Individual Name" value={track.individualName} />
          <DetailItem label="Current Stages" value={track.currentStage} />
          <DetailItem label="Email ID" value={track.email} />
          <DetailItem label="Inactive Since" value={track.inactiveSince} />
          <DetailItem label="Phone Number" value={track.phone} />
          <DetailItem label="Auto Email Sent" value={
            <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4"/>
                <span>Sent</span>
            </div>
          } />
          <DetailItem label="Assigned To" value={track.assignedTo} />
        </div>
        <div className="p-6 flex justify-end gap-4 mt-auto border-t">
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
