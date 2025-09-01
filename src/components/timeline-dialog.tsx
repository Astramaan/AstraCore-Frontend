
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { ProjectTimelineStages } from './project-timeline-stages';
import { X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export const TimelineDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            variant="link"
            className="text-cyan-500"
        >
            Timeline
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white">
        <DialogHeader className="p-4 border-b flex-row items-center">
            <DialogTitle className="text-2xl font-semibold">Project Timeline</DialogTitle>
             <DialogClose asChild>
                <Button variant="ghost" size="icon" className="ml-auto rounded-full">
                    <X className="h-5 w-5" />
                </Button>
            </DialogClose>
        </DialogHeader>
         <ScrollArea className="flex-1">
            <div className="p-6">
                 <ProjectTimelineStages />
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
