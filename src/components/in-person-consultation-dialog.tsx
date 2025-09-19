
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';
import { useToast } from './ui/use-toast';

interface InPersonConsultationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
];

export function InPersonConsultationDialog({ isOpen, onOpenChange }: InPersonConsultationDialogProps) {
    const [view, setView] = useState<'initial' | 'office' | 'home'>('initial');
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState('');
    const { toast } = useToast();

    const handleClose = () => {
        onOpenChange(false);
        // Reset state after a short delay to allow animation to finish
        setTimeout(() => {
            setView('initial');
            setDate(undefined);
            setTime('');
        }, 300);
    }
    
    const handleConfirm = () => {
        if (!date || !time) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select a date and time.',
            });
            return;
        }
        console.log({
            type: view,
            date,
            time
        });
        toast({
            title: 'Booking Confirmed!',
            description: `Your ${view === 'office' ? 'office visit' : 'home visit'} is scheduled for ${date.toLocaleDateString()} at ${time}.`,
        });
        handleClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-card rounded-[50px] p-10 mx-4">
                <DialogHeader>
                    <DialogTitle className="sr-only">In-Person Consultation</DialogTitle>
                     <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-6 w-6">
                           <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>
                </DialogHeader>

                {view === 'initial' && (
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-center w-full">
                            <Button className="w-full h-[54px] rounded-full text-lg text-primary-foreground leading-tight" onClick={() => setView('office')}>
                                Visit Our Office
                            </Button>
                            <p className="text-stone-400 text-sm mt-2">Meet with a Project specialist at our office.</p>
                        </div>
                        <div className="text-center w-full">
                            <Button className="w-full h-[54px] rounded-full text-lg text-primary-foreground leading-tight" onClick={() => setView('home')}>
                                Home Visit
                            </Button>
                            <p className="text-stone-400 text-sm mt-2">A project specialist will visit your location. </p>
                        </div>
                    </div>
                )}
                
                {view === 'office' && (
                    <div className="space-y-6">
                        <h3 className="text-center text-xl font-medium">Schedule Office Visit</h3>
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

                        <Select onValueChange={setTime}>
                            <SelectTrigger className="h-14 bg-background rounded-full">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map(slot => (
                                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {date && time && (
                            <div className="text-center p-4 bg-primary/10 rounded-xl">
                                <p className="font-semibold">You've selected:</p>
                                <p>{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {time}</p>
                            </div>
                        )}
                        
                        <div className="flex justify-between gap-4">
                            <Button variant="outline" className="w-full rounded-full h-14" onClick={() => setView('initial')}>Back</Button>
                            <Button className="w-full rounded-full h-14" onClick={handleConfirm}>Confirm</Button>
                        </div>
                    </div>
                )}
                
                {view === 'home' && (
                     <div className="space-y-6">
                        <h3 className="text-center text-xl font-medium">Schedule Home Visit</h3>
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

                        <Select onValueChange={setTime}>
                            <SelectTrigger className="h-14 bg-background rounded-full">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map(slot => (
                                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        {date && time && (
                            <div className="text-center p-4 bg-primary/10 rounded-xl">
                                <p className="font-semibold">You've selected:</p>
                                <p>{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {time}</p>
                            </div>
                        )}

                        <div className="flex justify-between gap-4">
                            <Button variant="outline" className="w-full rounded-full h-14" onClick={() => setView('initial')}>Back</Button>
                            <Button className="w-full rounded-full h-14" onClick={handleConfirm}>Confirm</Button>
                        </div>
                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}
