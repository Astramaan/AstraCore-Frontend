
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
import {
  X,
  User,
  Info,
  Link as LinkIcon,
  Calendar,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import GoogleMeetIcon from "./icons/google-meet-icon";
import { ScrollArea } from "./ui/scroll-area";

export interface Meeting {
  id: string;
  projectId?: string;
  type: "client" | "lead" | "others";
  title?: string;
  description?: string;
  name: string;
  city: string;
  date: string;
  time: string;
  link: string;
  email: string;
  phone: string;
  participants?: { userId: string; name: string }[];
}

interface MeetingDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting | null;
}

const DetailRow = ({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex items-start gap-4", className)}>
    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-muted-foreground mt-1">
      {icon}
    </div>
    <div>
      <p className="text-base text-muted-foreground font-medium">{label}</p>
      <div className="text-base text-foreground font-semibold mt-1">
        {value}
      </div>
    </div>
  </div>
);

const MeetingDetailsContent = ({ meeting }: { meeting: Meeting }) => {
  if (!meeting) return null;

  const attendeeType =
    meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6 no-scrollbar">
        <div className="space-y-6">
          <DetailRow
            label={`${attendeeType} Name`}
            value={meeting.name}
            icon={<User className="w-5 h-5" />}
          />
          {meeting.description && (
            <DetailRow
              label="Description"
              value={meeting.description}
              icon={<Info className="w-5 h-5" />}
            />
          )}
          <DetailRow
            label="Date"
            value={meeting.date}
            icon={<Calendar className="w-5 h-5" />}
          />
          <DetailRow
            label="Time"
            value={meeting.time}
            icon={<Clock className="w-5 h-5" />}
          />
          <DetailRow
            label="Meeting Link"
            value={
              <a
                href={
                  meeting.link.startsWith("http")
                    ? meeting.link
                    : `https://${meeting.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <GoogleMeetIcon className="w-6 h-6" />
                <span>Join Google Meet</span>
              </a>
            }
            icon={<LinkIcon className="w-5 h-5" />}
          />

          {meeting.participants && meeting.participants.length > 0 && (
            <div className="space-y-2">
              <p className="text-base text-muted-foreground font-medium ml-12">
                Attendees
              </p>
              <div className="ml-12 space-y-1">
                {meeting.participants.map((p) => (
                  <Badge key={p.userId} variant="secondary">
                    {p.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
        <Button
          onClick={() =>
            window.open(
              meeting.link.startsWith("http")
                ? meeting.link
                : `https://${meeting.link}`,
              "_blank",
            )
          }
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
  if (!meeting) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className={cn(
          "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-xl md:mx-auto rounded-t-[50px] border-none",
        )}
      >
        <SheetHeader className="p-6 border-b rounded-t-[50px]">
          <SheetTitle className="flex items-center justify-between text-2xl font-semibold">
            {meeting.title || "Meeting Details"}
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-[54px] h-[54px] rounded-full bg-background hover:bg-muted"
              >
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="text-[18px] flex-1 flex flex-col overflow-hidden">
          <MeetingDetailsContent meeting={meeting} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
