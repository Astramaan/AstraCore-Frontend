
'use client';

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
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Calendar as CalendarIcon, UploadCloud, X, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


const AssignTaskForm = () => {
    const [date, setDate] = React.useState<Date>();

    return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="task-title" className="text-zinc-900 font-medium">Task Title*</Label>
                <Input id="task-title" placeholder="Write a task name" className="bg-background rounded-lg h-12" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" className="text-zinc-900 font-medium">Description</Label>
                <Textarea id="description" placeholder="What is this task about?" className="h-32 bg-background rounded-lg"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="members" className="text-zinc-900 font-medium">Members*</Label>
                 <Select>
                    <SelectTrigger className="h-12 bg-background rounded-lg">
                        <SelectValue placeholder="Add members" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="member1">Balaji Naik</SelectItem>
                        <SelectItem value="member2">Anil Kumar</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex gap-2 mt-2">
                    <Avatar className="w-8 h-8"><AvatarImage src="https://placehold.co/32x32" data-ai-hint="person portrait" /></Avatar>
                    <Avatar className="w-8 h-8"><AvatarImage src="https://placehold.co/32x32" data-ai-hint="person portrait" /></Avatar>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-zinc-900 font-medium">Due Date*</Label>
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
                <Label htmlFor="type" className="text-zinc-900 font-medium">Type</Label>
                <Select>
                    <SelectTrigger id="type" className="h-12 bg-background rounded-lg">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="meetings">Meetings</SelectItem>
                        <SelectItem value="kt">KT</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-4">
                <p className="text-base font-medium mb-2 text-zinc-900">Priority</p>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="rounded-full bg-primary text-primary-foreground border-primary px-6">High</Button>
                    <Button variant="outline" className="rounded-full bg-background border-stone-300 px-6">Low</Button>
                </div>
            </div>
             <div className="space-y-2">
                <Label className="text-zinc-900 font-medium">Attach Files</Label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-background">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <UploadCloud className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
                </div>
            </div>
        </div>
        </div>
        
        <div className="flex justify-end pt-8">
            <Button className="px-14 h-12 text-lg rounded-full">
                Assign
            </Button>
        </div>
    </div>
    );
};


export function AssignTaskSheet() {
  const isMobile = useIsMobile();

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
  const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;

  return (
    <DialogOrSheet>
      <DialogOrSheetTrigger asChild>
        <Button className="flex-1 md:flex-none rounded-full h-[54px]">
            <PlusCircle className="w-4 h-4 mr-2"/>
            Assign task
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent 
          className={cn(
            isMobile 
              ? "w-full p-0 rounded-t-3xl" 
              : "sm:max-w-4xl p-0 rounded-[2rem]"
          )}
          {...(isMobile && { side: "bottom" })}
      >
          <DialogOrSheetHeader className="p-6 border-b">
              <DialogOrSheetTitle className="flex items-center text-xl font-medium">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Plus className="h-5 w-5 text-gray-600"/>
                  </div>
                  Assign task
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
          <AssignTaskForm />
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
