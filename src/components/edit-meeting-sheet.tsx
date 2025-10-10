'use client';

import React, { useState, useEffect, useTransition } from 'react';
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
import { X, Calendar as CalendarIcon, Edit, Check, ChevronsUpDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { ScrollArea } from './ui/scroll-area';
import { updateMeeting } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';

export interface Meeting {
    id: string;
    projectId?: string;
    type: 'client' | 'lead' | 'others';
    title?: string;
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

const mockClients = [
    { id: 'CHA2024', name: "Charan Project", city: "Mysuru", email: "admin@abc.com", phone: "+91 1234567890" },
    { id: 'DEL2024', name: "Delta Project", city: "Bengaluru", email: "contact@delta.com", phone: "+91 9876543210" },
    { id: 'GAM2024', name: "Gamma Project", city: "Chennai", email: "support@gamma.co", phone: "+91 8765432109" },
];

const mockLeads = [
    { id: 'LEAD2024', name: "Alpha Lead", city: "Hyderabad", email: "sales@alpha.io", phone: "+91 7654321098" },
    { id: 'LEAD2024-2', name: "Beta Lead", city: "Mumbai", email: "info@betaleads.com", phone: "+91 6543210987" },
];

const allContacts = [...mockClients.map(c => ({...c, type: 'client' as const})), ...mockLeads.map(l => ({...l, type: 'lead' as const}))];

const mockMembers = [
    { id: 'balaji', name: 'Balaji Naik' },
    { id: 'anil', name: 'Anil Kumar' },
    { id: 'yaswanth', name: 'Yaswanth' },
];

const EditMeetingForm = ({ meeting, onMeetingUpdated, onClose }: { meeting: Meeting, onMeetingUpdated: (meeting: Meeting) => void, onClose: () => void }) => {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const [title, setTitle] = useState(meeting.title || '');
    const [date, setDate] = useState<Date | undefined>(meeting.date ? new Date(meeting.date.replace(/(\d+)(st|nd|rd|th)/, '$1')) : undefined);
    const [meetingLink, setMeetingLink] = useState(meeting.link);
    const [selectedType, setSelectedType] = useState<'client' | 'lead' | 'others'>(meeting.type);
    const [participants, setParticipants] = useState(['member1']); // Mock
    const [time, setTime] = useState(meeting.time);
    const [name, setName] = useState(meeting.name);
    const [city, setCity] = useState(meeting.city);
    const [email, setEmail] = useState(meeting.email);
    const [phone, setPhone] = useState(meeting.phone);
    const [selectedId, setSelectedId] = useState(meeting.id);
    const [comboboxOpen, setComboboxOpen] = useState(false);
    const [memberComboboxOpen, setMemberComboboxOpen] = useState(false);

    useEffect(() => {
        const contact = allContacts.find(c => c.id === selectedId);
        if (contact) {
            setName(contact.name);
            setCity(contact.city);
            setEmail(contact.email);
            setPhone(contact.phone);
            setSelectedType(contact.type);
        }
    }, [selectedId]);


    const handleSubmit = () => {
        if (title && name && selectedType && date && time && meeting) {

            const combinedDateTime = new Date(date);
            const [timeValue, period] = time.split(' ');
            let [hours, minutes] = timeValue.split(':').map(Number);
            if (period === 'PM' && hours < 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            combinedDateTime.setHours(hours, minutes, 0, 0);

            const updatedMeetingData = {
                ...meeting,
                projectId: meeting.projectId || selectedId,
                meetingId: meeting.id,
                title,
                name,
                city,
                email,
                phone,
                type: selectedType,
                date: combinedDateTime.toISOString(),
                time,
                link: meetingLink,
                startTime: combinedDateTime.toISOString(),
                 targetType: {
                    type: selectedType,
                    id: selectedId
                },
                 participants: participants.map(pId => ({
                    userId: pId,
                    participantRole: 'MEMBER'
                })),
                manualDetails: {
                    name, email, phoneNumber: phone, location: city, type: selectedType
                }
            };
            
            startTransition(async () => {
                const result = await updateMeeting(updatedMeetingData);
                if (result.success) {
                    onMeetingUpdated({ ...updatedMeetingData, date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) });
                    onClose();
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: result.message || 'Failed to update meeting.',
                    });
                }
            });
        }
    }


    return (
    <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-6 no-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="title" className={cn("text-lg font-medium", title ? 'text-grey-1' : 'text-zinc-900')}>Title*</Label>
                    <Input id="title" placeholder="Enter meeting title" className="bg-background rounded-full h-14" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
            
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="meeting-link" className={cn("text-lg font-medium", meetingLink ? 'text-grey-1' : 'text-zinc-900')}>Meeting Link*</Label>
                    <Input id="meeting-link" placeholder="Paste meeting link here" className="bg-background rounded-full h-14" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="add-members" className={cn("text-lg font-medium", participants.length > 0 ? 'text-grey-1' : 'text-zinc-900')}>Add Members*</Label>
                    <Popover open={memberComboboxOpen} onOpenChange={setMemberComboboxOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={memberComboboxOpen}
                                className="w-full justify-between h-14 bg-background rounded-full"
                            >
                                {participants.length > 0
                                    ? `${participants.length} member(s) selected`
                                    : "Select a team member..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput placeholder="Search team member..." />
                                <CommandList>
                                    <CommandEmpty>No member found.</CommandEmpty>
                                    <CommandGroup>
                                        {mockMembers.map((member) => (
                                            <CommandItem
                                                key={member.id}
                                                value={member.id}
                                                onSelect={() => {
                                                    const newParticipants = participants.includes(member.id)
                                                        ? participants.filter(p => p !== member.id)
                                                        : [...participants, member.id];
                                                    setParticipants(newParticipants);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        participants.includes(member.id) ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {member.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
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
                    <Label htmlFor="client-lead-id" className={cn("text-lg font-medium", selectedId ? 'text-grey-1' : 'text-zinc-900')}>Client/Lead*</Label>
                    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={comboboxOpen}
                                className="w-full justify-between h-14 bg-background rounded-full"
                            >
                                {selectedId
                                    ? allContacts.find((contact) => contact.id === selectedId)?.name
                                    : "Select Client or Lead..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput placeholder="Search client or lead..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup>
                                        {allContacts.map((contact) => (
                                            <CommandItem
                                                key={contact.id}
                                                value={contact.id}
                                                onSelect={(currentValue) => {
                                                    setSelectedId(currentValue === selectedId ? "" : currentValue)
                                                    setComboboxOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedId === contact.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {contact.name} ({contact.id})
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                
                {selectedId && (
                    <>
                        <div className="space-y-1">
                            <p className="text-sm text-grey-1">Name</p>
                            <p className="text-lg font-medium text-zinc-900">{name || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-grey-1">Phone</p>
                            <p className="text-lg font-medium text-zinc-900">{phone || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-grey-1">Email</p>
                            <p className="text-lg font-medium text-zinc-900">{email || '-'}</p>
                        </div>
                    </>
                )}
            
            </div>
        </ScrollArea>
        <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
            <Button onClick={handleSubmit} className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
    </div>
    );
};


export function EditMeetingSheet({ isOpen, onClose, meeting, onMeetingUpdated }: EditMeetingSheetProps) {
  if (!meeting) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
          side="bottom"
          className={cn(
            "p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
          )}
      >
          <SheetHeader className="p-6 border-b bg-white rounded-t-[50px]">
              <SheetTitle className="flex items-center text-2xl font-semibold">
                  <div className="w-[54px] h-[54px] rounded-full border border-stone-300 flex items-center justify-center mr-3">
                    <Edit className="h-6 w-6 text-black"/>
                  </div>
                  Edit Meeting
                  <div className="flex items-center gap-4 ml-auto">
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                            <X className="h-6 w-6" />
                        </Button>
                      </SheetClose>
                  </div>
              </SheetTitle>
          </SheetHeader>
          <div className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
            <EditMeetingForm meeting={meeting} onMeetingUpdated={onMeetingUpdated} onClose={onClose}/>
          </div>
      </SheetContent>
    </Sheet>
  );
}
