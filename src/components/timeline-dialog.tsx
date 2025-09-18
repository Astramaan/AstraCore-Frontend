
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import { ProjectTimelineStages } from './project-timeline-stages';
import { X, MessageSquare, UserX } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/context/user-context';

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
                <Button className="rounded-full h-[54px] px-4 py-2 bg-background hover:bg-black/10 text-black">
                    <MessageSquare className="w-4 h-4 mr-2"/>
                    Chat
                </Button>
                <Button variant="destructive" className="rounded-full h-[54px] px-4 py-2 bg-background hover:bg-destructive/10 text-destructive">
                     <UserX className="w-4 h-4 mr-2"/>
                    Remove
                </Button>
            </div>
        </div>
        <Separator/>
    </div>
)


export const TimelineDialog = () => {
    const isMobile = useIsMobile();
    const { user } = useUser();

    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;

    const visibleTeamMembers = projectTeam.filter(member => {
        if (user?.team === 'Project Manager') {
            return member.role !== 'Project Manager';
        }
        return true;
    });

  return (
    <DialogOrSheet>
      <DialogOrSheetTrigger asChild>
        <Button
            variant="link"
            className={cn("text-black text-lg hover:bg-primary/10 hover:text-primary flex-1 h-[54px] rounded-full bg-white", "hover:no-underline")}
        >
            Timeline
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent className={cn(
          "p-0 flex flex-col bg-white",
          isMobile ? "w-full h-full" : "max-w-xl h-[90vh] rounded-[50px]"
      )}>
        <DialogOrSheetHeader className="p-4 border-b flex-row items-center">
            <DialogOrSheetTitle className="text-2xl font-semibold">Project Timeline</DialogOrSheetTitle>
             <DialogOrSheetClose asChild>
                <Button variant="ghost" size="icon" className="ml-auto rounded-full bg-background w-[54px] h-[54px]">
                    <X className="h-5 w-5" />
                </Button>
            </DialogOrSheetClose>
        </DialogOrSheetHeader>
         <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
                {(user?.roleType === 'superAdmin' || user?.team === 'Project Manager') && (
                    <Card className="border-none shadow-none">
                        <CardHeader className="p-0">
                            <CardTitle>Team</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-4">
                            {visibleTeamMembers.map(member => <TeamMemberCard key={member.role} member={member} />)}
                        </CardContent>
                    </Card>
                )}
                <ProjectTimelineStages />
            </div>
        </ScrollArea>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
};
