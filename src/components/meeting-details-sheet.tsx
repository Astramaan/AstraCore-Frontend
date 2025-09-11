
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, MoreVertical, Edit, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Meeting } from './edit-meeting-sheet';
import GoogleMeetIcon from './icons/google-meet-icon';

interface MeetingDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting | null;
}

const DetailRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="grid grid-cols-2 items-start gap-4">
    <p className="text-lg text-stone-500 font-medium">{label}</p>
    <div className="text-lg text-zinc-900 font-medium">
      {value}
    </div>
  </div>
);

const MeetingDetailsContent = ({ meeting }: { meeting: Meeting }) => {
  if (!meeting) return null;
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 space-y-6 overflow-y-auto flex-1 no-scrollbar">
        <div className="space-y-8">
          <DetailRow label="Name" value={meeting.name} />
          <DetailRow label={meeting.type === 'lead' ? 'Lead ID' : 'Client ID'} value={<Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900 text-base">{meeting.id}</Badge>} />
          <DetailRow label="City" value={meeting.city} />
          <DetailRow label="Contact" value={`${meeting.email} | ${meeting.phone}`} />
          <DetailRow label="Date" value={meeting.date} />
          <DetailRow label="Time" value={meeting.time} />
          <DetailRow label="Meeting Link" value={
            <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline">
                <GoogleMeetIcon className="w-6 h-6" />
                Google Meet
            </a>
          } />
        </div>
      </div>
      <div className="p-6 mt-auto border-t md:border-0 flex justify-end">
        <Button onClick={() => window.open(`https://${meeting.link}`, '_blank')} className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full">
            Join Meeting
        </Button>
      </div>
    </div>
  );
};

export function MeetingDetailsSheet({ isOpen, onClose, meeting }: MeetingDetailsSheetProps) {
  const isMobile = useIsMobile();

  if (!meeting) return null;

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
        className={cn(
          "p-0 m-0 flex flex-col bg-white transition-all md:max-w-2xl md:mx-auto rounded-t-[50px] border-none",
          isMobile ? "h-full" : "h-[90vh]"
        )}
        {...(isMobile ? { side: "bottom" } : {})}
      >
        <DialogHeader className="p-6 border-b bg-white rounded-t-[50px]">
          <DialogTitle className="flex items-center text-2xl font-semibold gilroy-semibold">
            Meeting Details
            <div className="flex items-center gap-4 ml-auto">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] rounded-full bg-gray-100 hover:bg-gray-200">
                  <X className="h-6 w-6"/>
                </Button>
              </SheetClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='font-gilroy-medium text-[18px] flex-1 flex flex-col overflow-hidden'>
          <MeetingDetailsContent meeting={meeting} />
        </div>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
