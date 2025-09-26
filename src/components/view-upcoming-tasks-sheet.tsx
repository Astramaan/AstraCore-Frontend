
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


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
    progress?: number;
}

const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return "Invalid Date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const UpcomingTaskCard = ({ stage, onClick }: { stage: Stage, onClick: (stage: Stage) => void }) => {
    return (
        <Card className="w-full rounded-[24px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white" onClick={() => onClick(stage)}>
            <div className="relative w-full h-32">
                <Image src={stage.image} layout="fill" objectFit="cover" alt={stage.title} data-ai-hint="construction site" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-4 text-white">
                    <h3 className="font-semibold text-base">{stage.title}</h3>
                    <p className="text-xs opacity-80">{stage.subtitle}</p>
                </div>
                <Badge className="absolute top-2 right-2 bg-background/80 text-foreground hover:bg-background">
                    {stage.category}
                </Badge>
            </div>
            <div className="p-4 space-y-2">
                 <Progress value={0} className="h-2" />
                <div className="flex justify-between items-center text-xs">
                    <span className="font-medium">0%</span>
                    <span className="text-muted-foreground">{formatDate(stage.createdAt)}</span>
                </div>
            </div>
        </Card>
    );
};

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
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="flex justify-between items-center">
            <span className="text-2xl font-semibold">Project Upcoming Tasks</span>
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
