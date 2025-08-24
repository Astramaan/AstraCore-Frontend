
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle, CalendarIcon, ChevronDown, UploadCloud, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AssignTaskSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex-1 md:flex-none rounded-full h-[54px]">
            <PlusCircle className="w-4 h-4 mr-2"/>
            Assign task
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[604px] p-0">
        <SheetHeader className="p-6 bg-yellow-500/10">
          <SheetTitle className="flex items-center justify-between">
            Assign task
            {/* The SheetClose is automatically added, but if needed, can be custom styled */}
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="relative">
            <Label htmlFor="task-title" className="absolute -top-2.5 left-2.5 bg-white px-1 text-sm text-zinc-900">Task Title*</Label>
            <Input id="task-title" placeholder="Write a task name" />
          </div>
          <div className="relative">
            <Label htmlFor="description" className="absolute -top-2.5 left-2.5 bg-white px-1 text-sm text-zinc-900">Description</Label>
            <Textarea id="description" placeholder="What is this task about?" className="h-24"/>
          </div>
          <div className="relative">
            <Label htmlFor="members" className="absolute -top-2.5 left-2.5 bg-white px-1 text-sm text-zinc-900">Members*</Label>
            <div className="relative">
              <Input id="members" placeholder="Add members" className="pr-10"/>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
             <div className="flex gap-2 mt-2">
                <Avatar className="w-8 h-8"><AvatarImage src="https://placehold.co/32x32" data-ai-hint="person portrait" /></Avatar>
                <Avatar className="w-8 h-8"><AvatarImage src="https://placehold.co/32x32" data-ai-hint="person portrait" /></Avatar>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="relative">
                <Label htmlFor="due-date" className="absolute -top-2.5 left-2.5 bg-white px-1 text-sm text-zinc-900">Due Date*</Label>
                <div className="relative">
                    <Input id="due-date" placeholder="Select date"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>
             <div className="relative">
                <Label htmlFor="type" className="absolute -top-2.5 left-2.5 bg-white px-1 text-sm text-zinc-900">Type</Label>
                <div className="relative">
                    <Input id="type" placeholder="Select type"/>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>
          </div>
          <div className="relative">
            <Label className="absolute -top-2.5 left-2.5 bg-white px-1 text-sm text-zinc-900">Attach Files</Label>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <UploadCloud className="w-6 h-6 text-gray-500" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
            </div>
          </div>

           <div>
              <p className="text-base font-medium mb-2">Priority</p>
              <RadioGroup defaultValue="high" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="border border-stone-300 rounded-lg px-5 py-2.5">High</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="border border-stone-300 rounded-lg px-5 py-2.5">Low</Label>
                </div>
              </RadioGroup>
          </div>

          <div className="flex justify-end">
            <Button className="px-14 py-2.5 h-auto text-lg rounded-[10px]">
                Assign
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
