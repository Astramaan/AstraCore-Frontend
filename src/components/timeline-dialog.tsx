
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
import { X, MessageSquare, UserX } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

const projectTeam = [
    {
        name: 'Priya',
        role: 'Project Manager',
    },
    {
        name: 'Yaswanth',
        role: 'Site Supervisor',
    },
    {
        name: 'Darshan',
        role: 'Architect',
    }
];

const TeamMemberCard = ({ member }: { member: typeof projectTeam[0] }) => (
    <div>
        <div className="flex justify-between items-center py-3">
            <div>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-base font-medium">{member.name}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-lg text-primary border-primary bg-primary/10 hover:bg-primary/20 h-auto px-4 py-2">
                    <MessageSquare className="w-4 h-4 mr-2"/>
                    Chat
                </Button>
                <Button variant="outline" className="rounded-lg text-destructive border-destructive bg-destructive/10 hover:bg-destructive/20 h-auto px-4 py-2">
                     <UserX className="w-4 h-4 mr-2"/>
                    Remove
                </Button>
            </div>
        </div>
        <Separator/>
    </div>
)


export const TimelineDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            variant="link"
            className={cn("text-black text-lg hover:bg-primary/10 hover:text-primary flex-1 h-[54px] rounded-full bg-white", "hover:no-underline")}
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
         <div className="grid md:grid-cols-[1.5fr_auto_1fr] flex-1 overflow-hidden">
             <ScrollArea className="flex-1">
                <div className="p-6">
                     <ProjectTimelineStages />
                </div>
            </ScrollArea>
            <Separator orientation="vertical" />
            <ScrollArea>
                <div className="p-6">
                    <Card className="border-none shadow-none">
                        <CardHeader className="p-0">
                            <CardTitle>Project Team</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-4">
                            {projectTeam.map(member => <TeamMemberCard key={member.role} member={member} />)}
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
         </div>
      </DialogContent>
    </Dialog>
  );
};
