
'use client';

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, Calendar as CalendarIcon, Edit } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

export interface Meeting {
    id: string;
    type: 'client' | 'lead';
    name: string;
    city: string;
    date: string;
    time: string;
    link: string;
    email: string;
    phone: string;
}

interface EditMeetingSheetProps {
    isOpen: boolean;
    onClose: () => void;
    meeting: Meeting | null;
    onMeetingUpdated: (meeting: Meeting) => void;
}

const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
];

const EditMeetingForm = ({ meeting, onMeetingUpdated, onClose }: { meeting: Meeting, onMeetingUpdated: (meeting: Meeting) => void, onClose: () => void }) => {
    const [date, setDate] = useState<Date | undefined>(meeting.date ? new Date(meeting.date) : undefined);
    const [meetingLink, setMeetingLink] = useState(meeting.link);
    const [selectedType, setSelectedType] = useState<'client' | 'lead'>(meeting.type);
    const [members, setMembers] = useState('member1'); // Mock
    const [time, setTime] = useState(meeting.time);
    const [name, setName] = useState(meeting.name);
    const [city, setCity] = useState(meeting.city);
    const [email, setEmail] = useState(meeting.email);
    const [phone, setPhone] = useState(meeting.phone);


    const handleSubmit = () => {
        if (name && selectedType && date && time && meeting) {
            onMeetingUpdated({
                ...meeting,
                name,
                city,
                email,
                phone,
                type: selectedType,
                date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                time,
                link: meetingLink,
            });
            onClose();
        }
    }


    return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        
            <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="meeting-link" className={cn("text-lg font-medium", meetingLink ? 'text-grey-1' : 'text-zinc-900')}>Meeting Link*</Label>
                <Input id="meeting-link" placeholder="Paste meeting link here" className="bg-background rounded-full h-14" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="select-type" className={cn("text-lg font-medium", selectedType ? 'text-grey-1' : 'text-zinc-900')}>Select*</Label>
                <Select value={selectedType} onValueChange={(value: 'client' | 'lead') => setSelectedType(value)}>
                    <SelectTrigger id="select-type" className="h-14 bg-background rounded-full">
                        <SelectValue placeholder="Client / Lead" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                    </SelectContent>
                </Select>
            </div>

             <div className="space-y-2">
                <Label htmlFor="add-members" className={cn("text-lg font-medium", members ? 'text-grey-1' : 'text-zinc-900')}>Add Members*</Label>
                <Select value={members} onValueChange={setMembers}>
                    <SelectTrigger id="add-members" className="h-14 bg-background rounded-full">
                        <SelectValue placeholder="Team Members" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="member1">Member 1</SelectItem>
                        <SelectItem value="member2">Member 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label className={cn("text-lg font-medium", date ? 'text-grey-1' : 'text-zinc-900')}>Date*</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal h-14 bg-background rounded-full",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toLocaleDateString() : <span>Select date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

             <div className="space-y-2">
                <Label className={cn("text-lg font-medium", time ? 'text-grey-1' : 'text-zinc-900')}>Time*</Label>
                <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="h-14 bg-background rounded-full">
                        <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeSlots.map(time => (
                             <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="name" className={cn("text-lg font-medium", name ? 'text-grey-1' : 'text-zinc-900')}>Name*</Label>
                <Input id="name" placeholder="Enter Name" className="bg-background rounded-full h-14" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="city" className={cn("text-lg font-medium", city ? 'text-grey-1' : 'text-zinc-900')}>City*</Label>
                <Input id="city" placeholder="Enter City" className="bg-background rounded-full h-14" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email" className={cn("text-lg font-medium", email ? 'text-grey-1' : 'text-zinc-900')}>Email*</Label>
                <Input id="email" type="email" placeholder="Enter Email" className="bg-background rounded-full h-14" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="phone" className={cn("text-lg font-medium", phone ? 'text-grey-1' : 'text-zinc-900')}>Phone*</Label>
                <Input id="phone" type="tel" placeholder="Enter Phone" className="bg-background rounded-full h-14" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
        
        </div>
        
        <div className="flex justify-end pt-8">
            <Button onClick={handleSubmit} className="px-14 h-12 text-lg rounded-full">
                Save Changes
            </Button>
        </div>
    </div>
    );
};


export function EditMeetingSheet({ isOpen, onClose, meeting, onMeetingUpdated }: EditMeetingSheetProps) {
  const isMobile = useIsMobile();

  if (!meeting) return null;

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? DialogClose : DialogClose;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
          className={cn(
            "bg-white",
            isMobile 
              ? "w-full p-0 rounded-t-[50px]" 
              : "sm:max-w-2xl p-0 rounded-[50px]"
          )}
          {...(isMobile && { side: "bottom" })}
      >
          <DialogOrSheetHeader className="p-6 border-b">
              <DialogOrSheetTitle className="flex items-center text-2xl font-semibold">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Edit className="h-5 w-5 text-gray-600"/>
                  </div>
                  Edit Meeting
                  <div className="flex items-center gap-4 ml-auto">
                      <DialogOrSheetClose asChild>
                        <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                            <X className="h-6 w-6" />
                        </Button>
                      </DialogOrSheetClose>
                  </div>
              </DialogOrSheetTitle>
          </DialogOrSheetHeader>
          <EditMeetingForm meeting={meeting} onMeetingUpdated={onMeetingUpdated} onClose={onClose}/>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}

    