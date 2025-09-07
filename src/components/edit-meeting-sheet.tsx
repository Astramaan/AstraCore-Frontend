
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
import { X, Calendar as CalendarIcon, Edit, Check, ChevronsUpDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Switch } from './ui/switch';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';


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
    const [date, setDate] = useState<Date | undefined>(meeting.date ? new Date(meeting.date.replace(/(\d+)(st|nd|rd|th)/, '$1')) : undefined);
    const [meetingLink, setMeetingLink] = useState(meeting.link);
    const [selectedType, setSelectedType] = useState<'client' | 'lead'>(meeting.type);
    const [members, setMembers] = useState('member1'); // Mock
    const [time, setTime] = useState(meeting.time);
    const [name, setName] = useState(meeting.name);
    const [city, setCity] = useState(meeting.city);
    const [email, setEmail] = useState(meeting.email);
    const [phone, setPhone] = useState(meeting.phone);
    const [isManual, setIsManual] = useState(true); // Default to manual for editing
    const [selectedId, setSelectedId] = useState(meeting.id);
    const [comboboxOpen, setComboboxOpen] = useState(false);
    const [memberComboboxOpen, setMemberComboboxOpen] = useState(false);


    useEffect(() => {
        if (!selectedId) {
            if (!isManual) {
                setName('');
                setCity('');
                setEmail('');
                setPhone('');
            }
            return;
        };

        const contact = allContacts.find(c => c.id === selectedId);
        if (contact) {
            setName(contact.name);
            setCity(contact.city);
            setEmail(contact.email);
            setPhone(contact.phone);
            setSelectedType(contact.type);
        }
    }, [selectedId, isManual]);


    const handleSubmit = () => {
        if (name && selectedType && date && time && meeting) {
            onMeetingUpdated({
                ...meeting,
                name,
                city,
                email,
                phone,
                type: selectedType,
                date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/(\d+),/, (match, day) => {
                    const suffixes = ["th", "st", "nd", "rd"];
                    const v = day % 100;
                    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
                }),
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
                <Label htmlFor="add-members" className={cn("text-lg font-medium", members ? 'text-grey-1' : 'text-zinc-900')}>Add Members*</Label>
                 <Popover open={memberComboboxOpen} onOpenChange={setMemberComboboxOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={memberComboboxOpen}
                            className="w-full justify-between h-14 bg-background rounded-full"
                        >
                            {members
                                ? mockMembers.find((member) => member.id === members)?.name
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
                                            onSelect={(currentValue) => {
                                                setMembers(currentValue === members ? "" : currentValue)
                                                setMemberComboboxOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    members === member.id ? "opacity-100" : "opacity-0"
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
                <Label htmlFor="client-lead-id" className={cn("text-lg font-medium", selectedId ? 'text-grey-1' : 'text-zinc-900')}>Client/Lead ID*</Label>
                <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={comboboxOpen}
                            className="w-full justify-between h-14 bg-background rounded-full"
                            disabled={isManual}
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


             <div className="sm:col-span-2 space-y-4">
                <div className="flex items-center justify-end gap-2">
                    <Label htmlFor="manual-switch" className="text-sm">Enter Details Manually</Label>
                    <Switch id="manual-switch" checked={isManual} onCheckedChange={(checked) => {
                        setIsManual(checked);
                        if (checked) setSelectedId('');
                    }} />
                </div>
            </div>
            
            {(isManual) && (
                <>
                     <div className="space-y-2">
                        <Label htmlFor="type-select" className={cn("text-lg font-medium", selectedType ? 'text-grey-1' : 'text-zinc-900')}>Type*</Label>
                        <Select value={selectedType} onValueChange={(value: 'client' | 'lead') => setSelectedType(value)}>
                            <SelectTrigger id="type-select" className="h-14 bg-background rounded-full">
                                <SelectValue placeholder="Client / Lead" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="client">Client</SelectItem>
                                <SelectItem value="lead">Lead</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div />
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
                </>
            )}
            
            {!isManual && selectedId && (
                 <>
                    <div className="space-y-1">
                        <p className="text-sm text-grey-1">Name</p>
                        <p className="text-lg font-medium text-zinc-900">{name}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm text-grey-1">City</p>
                        <p className="text-lg font-medium text-zinc-900">{city}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm text-grey-1">Email</p>
                        <p className="text-lg font-medium text-zinc-900">{email}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-grey-1">Phone</p>
                        <p className="text-lg font-medium text-zinc-900">{phone}</p>
                    </div>
                </>
            )}
        
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
                  <div className="w-[54px] h-[54px] rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Edit className="h-6 w-6 text-gray-600"/>
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
