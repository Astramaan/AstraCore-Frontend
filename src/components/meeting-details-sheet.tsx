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
import { X, MoreVertical, Edit, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import GoogleMeetIcon from "./icons/google-meet-icon";

export interface Meeting {
  id: string;
  projectId?: string;
  type: "client" | "lead" | "others";
  title?: string;
  name: string;
  city: string;
  date: string;
  time: string;
  link: string;
  email: string;
  phone: string;
}

interface MeetingDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting | null;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-2 items-start gap-4">
    <p className="text-lg text-muted-foreground font-medium">{label}</p>
    <div className="text-lg text-foreground font-medium">{value}</div>
  </div>
);

const MeetingDetailsContent = ({ meeting }: { meeting: Meeting }) => {
  if (!meeting) return null;
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 space-y-6 overflow-y-auto flex-1 no-scrollbar">
        <div className="space-y-8">
          <DetailRow label="Name" value={meeting.name} />
          <DetailRow
            label={meeting.type === "lead" ? "Lead ID" : "Client ID"}
            value={
              <Badge
                variant="outline"
                className="bg-zinc-100 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-base"
              >
                {meeting.id}
              </Badge>
            }
          />
          <DetailRow label="City" value={meeting.city} />
          <DetailRow
            label="Contact"
            value={`${meeting.email} | ${meeting.phone}`}
          />
          <DetailRow label="Date" value={meeting.date} />
          <DetailRow label="Time" value={meeting.time} />
          <DetailRow
            label="Meeting Link"
            value={
              <a
                href={`https://${meeting.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground font-medium hover:underline"
              >
                <GoogleMeetIcon className="w-6 h-6" />
                Google Meet
              </a>
            }
          />
        </div>
      </div>
      <div className="p-6 mt-auto border-t md:border-0 flex justify-end">
        <Button
          onClick={() => window.open(`https://${meeting.link}`, "_blank")}
          className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full"
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export function MeetingDetailsSheet({
  isOpen,
  onClose,
  meeting,
}: MeetingDetailsSheetProps) {
  const isMobile = useIsMobile();

  if (!meeting) return null;

  const DialogOrSheet = Sheet;
  const DialogOrSheetContent = SheetContent;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent
        side="bottom"
        className={cn(
          "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none",
        )}
      >
        <DialogHeader className="p-6 border-b rounded-t-[50px]">
          <DialogTitle className="flex items-center text-2xl font-semibold">
            Meeting Details
            <div className="flex items-center gap-4 ml-auto">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[54px] h-[54px] rounded-full bg-background hover:bg-muted"
                >
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="text-[18px] flex-1 flex flex-col overflow-hidden">
          <MeetingDetailsContent meeting={meeting} />
        </div>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
