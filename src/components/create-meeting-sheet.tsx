
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle, X, Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

const CreateMeetingForm = () => {
    const [date, setDate] = React.useState<Date>();

    return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        
            <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="meeting-link" className="text-lg font-medium text-zinc-900">Meeting Link*</Label>
                <Input id="meeting-link" placeholder="Paste meeting link here" className="bg-background rounded-lg h-12" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="select-type" className="text-lg font-medium text-zinc-900">Select*</Label>
                <Select>
                    <SelectTrigger id="select-type" className="h-12 bg-background rounded-lg">
                        <SelectValue placeholder="Client / Lead" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                    </SelectContent>
                </Select>
            </div>

             <div className="space-y-2">
                <Label htmlFor="add-members" className="text-lg font-medium text-zinc-900">Add Members*</Label>
                <Select>
                    <SelectTrigger id="add-members" className="h-12 bg-background rounded-lg">
                        <SelectValue placeholder="Team Members" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="member1">Member 1</SelectItem>
                        <SelectItem value="member2">Member 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label className="text-lg font-medium text-zinc-900">Date*</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal h-12 bg-background rounded-lg",
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
                <Label className="text-lg font-medium text-zinc-900">Time*</Label>
                <div className="relative">
                    <Input id="time" placeholder="Select time" className="h-12 bg-background rounded-lg pr-10" />
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>
        
        </div>
        
        <div className="flex justify-end pt-8">
            <Button className="px-14 h-12 text-lg rounded-full">
                Create
            </Button>
        </div>
    </div>
    );
};


export function CreateMeetingSheet() {
  const isMobile = useIsMobile();

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
  const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

  return (
    <DialogOrSheet>
      <DialogOrSheetTrigger asChild>
        <Button className="rounded-full h-[54px] bg-primary/10 text-primary hover:bg-primary/20 border border-primary text-lg font-medium">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent 
          className={cn(
            isMobile 
              ? "w-full p-0 rounded-t-[50px]" 
              : "sm:max-w-2xl p-0 rounded-[50px]"
          )}
          {...(isMobile && { side: "bottom" })}
      >
          <DialogOrSheetHeader className="p-6 border-b">
              <DialogOrSheetTitle className="flex items-center text-2xl font-semibold">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Plus className="h-5 w-5 text-gray-600"/>
                  </div>
                  Create New Meeting
                  <div className="flex items-center gap-4 ml-auto">
                      <DialogOrSheetClose asChild>
                          <Button variant="ghost" className="rounded-full text-sm font-normal h-auto px-4 py-2 bg-gray-100 hover:bg-gray-200">
                              <X className="h-4 w-4 mr-1"/>
                              Close
                          </Button>
                      </DialogOrSheetClose>
                  </div>
              </DialogOrSheetTitle>
          </DialogOrSheetHeader>
          <CreateMeetingForm />
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
