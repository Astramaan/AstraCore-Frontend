
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
import { ProjectTimelineStages, type CustomStage } from './project-timeline-stages';
import { X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const allStages: CustomStage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'completed', type: 'stage' },
    { id: 2, title: "1% Of Over all Quote", subtitle: 'Payment Due', category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'completed', type: 'payment' },
    { 
        id: 4, 
        title: 'Excavation', 
        subtitle: 'Excavation Stage', 
        category: 'Civil', 
        image: 'https://placehold.co/100x100.png', 
        duration: '2 Days', 
        status: 'ongoing', 
        type: 'stage',
        siteImages: [
            "https://placehold.co/150x150.png",
            "https://placehold.co/150x150.png",
            "https://placehold.co/150x150.png",
            "https://placehold.co/150x150.png",
        ]
    },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'upcoming', type: 'stage' },
    { id: 6, title: "20% Payment", subtitle: "Milestone Payment", category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'pending', type: 'payment' },
];

const PaymentsTimeline = () => {
    const paymentStages = allStages.filter(stage => stage.type === 'payment');

    return <ProjectTimelineStages stages={paymentStages} />;
}


export const PaymentsDialog = () => {
    const isMobile = useIsMobile();
    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;

  return (
    <DialogOrSheet>
      <DialogOrSheetTrigger asChild>
        <Button
            variant="link"
            className={cn("text-black text-lg hover:bg-primary/10 hover:text-primary flex-1 h-[54px] rounded-full bg-white", "hover:no-underline")}
        >
            Payments
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent className={cn(
          "p-0 flex flex-col bg-white",
          isMobile ? "w-full h-full" : "max-w-xl h-[90vh] rounded-[50px]"
      )}>
        <DialogOrSheetHeader className="p-4 border-b flex-row items-center">
            <DialogOrSheetTitle className="text-2xl font-semibold">Payments</DialogOrSheetTitle>
             <DialogOrSheetClose asChild>
                <Button variant="ghost" size="icon" className="ml-auto rounded-full bg-background w-[54px] h-[54px]">
                    <X className="h-5 w-5" />
                </Button>
            </DialogOrSheetClose>
        </DialogOrSheetHeader>
         <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
                <PaymentsTimeline />
            </div>
        </ScrollArea>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
};
