
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle, X, Plus, Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import type { Meeting } from './edit-meeting-sheet';
import { Switch } from './ui/switch';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { createMeeting } from '@/app/actions';
import { useToast } from './ui/use-toast';

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


const CreateMeetingForm = ({ onMeetingCreated, onClose }: { onMeetingCreated: (meeting: Omit<Meeting, 'id'>) => void, onClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = React.useState<Date>();
    const [meetingLink, setMeetingLink] = React.useState('');
    const [selectedType, setSelectedType] = React.useState<'client' | 'lead' | ''>('');
    const [members, setMembers] = React.useState<string[]>([]);
    const [time, setTime] = React.useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isManual, setIsManual] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [comboboxOpen, setComboboxOpen] = useState(false);
    const [memberComboboxOpen, setMemberComboboxOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();


    useEffect(() => {
        if (!selectedId) {
            if (!isManual) {
                setName('');
                setCity('');
                setEmail('');
                setPhone('');
                setSelectedType('');
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


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!title || !name || !selectedType || !date || !time) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill all required fields.',
            });
            return;
        }

        const meetingData = {
            title,
            name,
            city,
            email,
            phone,
            type: selectedType,
            date: date.toISOString(),
            time,
            link: meetingLink,
            members,
        };

        startTransition(async () => {
            const result = await createMeeting(meetingData);
            if (result.success) {
                onMeetingCreated({
                    ...meetingData,
                    date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                });
                onClose();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: result.message || 'Failed to create meeting.',
                });
            }
        });
    }
    
    const toggleMember = (memberId: string) => {
        setMembers(prev => 
            prev.includes(memberId) 
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    }


    return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
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
                    <Label htmlFor="add-members" className={cn("text-lg font-medium", members.length > 0 ? 'text-grey-1' : 'text-zinc-900')}>Add Members*</Label>
                    <Popover open={memberComboboxOpen} onOpenChange={setMemberComboboxOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={memberComboboxOpen}
                                className="w-full justify-between h-auto min-h-14 bg-background rounded-full flex-wrap px-4 py-2"
                            >
                                <div className="flex gap-1 flex-wrap items-center">
                                    {members.length > 0
                                        ? members.map(memberId => (
                                            <Badge key={memberId} variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20" onClick={(e) => { e.stopPropagation(); toggleMember(memberId); }}>
                                                {mockMembers.find((member) => member.id === memberId)?.name}
                                                <X className="h-3 w-3"/>
                                            </Badge>
                                        ))
                                        : <span className="text-muted-foreground font-normal">Select team members...</span>
                                    }
                                </div>
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
                                                value={member.name}
                                                onSelect={() => toggleMember(member.id)}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        members.includes(member.id) ? "opacity-100" : "opacity-0"
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
                    <Select onValueChange={setTime}>
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
                            <p className="text-lg font-medium text-zinc-900">{name || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-grey-1">City</p>
                            <p className="text-lg font-medium text-zinc-900">{city || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-grey-1">Email</p>
                            <p className="text-lg font-medium text-zinc-900">{email || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-grey-1">Phone</p>
                            <p className="text-lg font-medium text-zinc-900">{phone || '-'}</p>
                        </div>
                    </>
                )}
            
            </div>
        </ScrollArea>
        
        <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
            <Button type="submit" className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create'}
            </Button>
        </div>
    </form>
    );
};


export function CreateMeetingSheet({ onMeetingCreated }: { onMeetingCreated: (meeting: Omit<Meeting, 'id'>) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-full h-[54px] w-[54px] p-0 md:w-auto md:px-6 bg-primary/10 text-primary hover:bg-primary/20 border border-primary text-lg font-medium shrink-0">
            <PlusCircle className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Create</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
          side="bottom"
          className={cn(
            "p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
          )}
      >
          <SheetHeader className="p-6 border-b bg-white rounded-t-[50px]">
              <SheetTitle className="flex items-center text-2xl font-semibold">
                  <div className="w-[54px] h-[54px] rounded-full border border-stone-300 flex items-center justify-center mr-3">
                    <Plus className="h-6 w-6 text-black"/>
                  </div>
                  Create New Meeting
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
            <CreateMeetingForm onMeetingCreated={onMeetingCreated} onClose={handleClose}/>
          </div>
      </SheetContent>
    </Sheet>
  );
}
