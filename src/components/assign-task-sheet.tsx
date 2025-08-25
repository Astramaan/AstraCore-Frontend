
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle, CalendarIcon, ChevronDown, UploadCloud, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";

const AssignTaskForm = () => (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="task-title" className="text-zinc-900">Task Title*</Label>
                <Input id="task-title" placeholder="Write a task name" className="bg-background rounded-lg h-12" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" className="text-zinc-900">Description</Label>
                <Textarea id="description" placeholder="What is this task about?" className="h-24 bg-background rounded-lg"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="members" className="text-zinc-900">Members*</Label>
                <div className="relative">
                    <Input id="members" placeholder="Add members" className="pr-10 bg-background rounded-lg h-12"/>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex gap-2 mt-2">
                    <Avatar className="w-8 h-8"><AvatarImage src="https://placehold.co/32x32" data-ai-hint="person portrait" /></Avatar>
                    <Avatar className="w-8 h-8"><AvatarImage src="https://placehold.co/32x32" data-ai-hint="person portrait" /></Avatar>
                </div>
            </div>
        </div>
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="due-date" className="text-zinc-900">Due Date*</Label>
                    <div className="relative">
                        <Input id="due-date" placeholder="Select date" className="bg-background rounded-lg h-12"/>
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type" className="text-zinc-900">Type</Label>
                    <div className="relative">
                        <Input id="type" placeholder="Select type" className="bg-background rounded-lg h-12"/>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label className="text-zinc-900">Attach Files</Label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-background">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <UploadCloud className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
                </div>
            </div>
                <div className="space-y-2">
                <p className="text-base font-medium mb-2 text-zinc-900">Priority</p>
                <RadioGroup defaultValue="high" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" className="peer hidden" />
                        <Label htmlFor="high" className="border border-stone-300 rounded-full px-5 py-2.5 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary">High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" className="peer hidden" />
                        <Label htmlFor="low" className="border border-stone-300 rounded-full px-5 py-2.5 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary">Low</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
        </div>
        
        <div className="flex justify-end pt-4">
        <Button className="px-14 py-2.5 h-auto text-lg rounded-full">
            Assign
        </Button>
        </div>
    </div>
);


export function AssignTaskSheet() {
  const isMobile = useIsMobile();

  if(isMobile) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="flex-1 md:flex-none rounded-full h-[54px]">
                    <PlusCircle className="w-4 h-4 mr-2"/>
                    Assign task
                </Button>
            </SheetTrigger>
            <SheetContent 
                side="bottom" 
                className="w-full p-0 rounded-t-3xl"
            >
                <SheetHeader className="p-6 bg-yellow-500/10">
                <SheetTitle className="flex items-center justify-between text-xl font-medium">
                    Assign task
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <X className="h-5 w-5"/>
                        </Button>
                    </SheetClose>
                </SheetTitle>
                </SheetHeader>
                <AssignTaskForm />
            </SheetContent>
        </Sheet>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 md:flex-none rounded-full h-[54px]">
            <PlusCircle className="w-4 h-4 mr-2"/>
            Assign task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0">
          <DialogHeader className="p-6 bg-yellow-500/10">
              <DialogTitle className="flex items-center justify-between text-xl font-medium">
                  Assign task
                  <DialogClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                          <X className="h-5 w-5"/>
                      </Button>
                  </DialogClose>
              </DialogTitle>
          </DialogHeader>
          <AssignTaskForm />
      </DialogContent>
    </Dialog>
  );
}
