
'use client';

import React, { useState, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface Stage {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    duration: string;
    status: 'ongoing' | 'upcoming' | 'completed' | 'pending';
    type: 'stage' | 'payment';
    siteImages?: string[];
    snagCount?: number;
    createdBy: string;
    createdAt: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
}

const UpcomingTaskCard = ({ stage, onClick }: { stage: Stage, onClick: (stage: Stage) => void }) => {
    const priority = stage.priority;
   const priorityColors: { [key: string]: string } = {
       "Low": "bg-cyan-500/10 text-cyan-500",
       "Medium": "bg-yellow-500/10 text-yellow-500",
       "High": "bg-red-500/10 text-red-500",
   };
   
   const { text: statusText, color: statusColor } = useMemo(() => {
       switch (stage.status) {
           case 'completed':
               return { text: 'Completed', color: 'bg-green-100 text-green-700' };
           case 'ongoing':
               return { text: 'In Progress', color: 'bg-blue-100 text-blue-600' };
           case 'upcoming':
           case 'pending':
           default:
               return { text: 'Upcoming', color: 'bg-yellow-100 text-yellow-600' };
       }
   }, [stage.status]);

   const formattedDate = new Date(stage.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).replace(/ /g, ' ');

   return (
       <Card className="w-full h-44 rounded-[40px] flex flex-col justify-between p-6 cursor-pointer hover:shadow-lg transition-shadow bg-background" onClick={() => onClick(stage)}>
           <div>
               <div className="flex justify-between items-start">
                   <h3 className="text-lg font-medium text-zinc-900">{stage.title}</h3>
                   <Badge className={cn("capitalize", priorityColors[priority])}>{priority}</Badge>
               </div>
               <p className="text-base text-zinc-900 mt-2 truncate">{stage.subtitle}</p>
                <div className="flex justify-between items-center mt-2">
                   <Badge className={cn("capitalize", statusColor)}>{statusText}</Badge>
               </div>
           </div>
           <div className="flex justify-between items-center mt-auto">
                <Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900">{stage.category}</Badge>
               <p className="text-sm text-muted-foreground">Due: {formattedDate}</p>
           </div>
       </Card>
   )
}

interface ViewUpcomingTasksSheetProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Stage[];
  onTaskClick: (task: Stage) => void;
}

export function ViewUpcomingTasksSheet({ isOpen, onClose, tasks, onTaskClick }: ViewUpcomingTasksSheetProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);
  
  const handleTaskClickAndClose = (task: Stage) => {
    onTaskClick(task);
    onClose();
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="flex justify-between items-center">
            <span className="text-2xl font-semibold">Upcoming Tasks</span>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </SheetTitle>
           <div className="relative pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-0.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search upcoming tasks..."
              className="pl-12 h-14 rounded-full bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
             {filteredTasks.length > 0 ? (
                 filteredTasks.map((task, index) => (
                    <UpcomingTaskCard key={`${task.id}-${index}`} stage={task} onClick={handleTaskClickAndClose} />
                ))
             ) : (
                <p className="text-muted-foreground col-span-full text-center py-10">No upcoming tasks match your search.</p>
             )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
