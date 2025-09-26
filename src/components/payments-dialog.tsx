

'use client';

import React, { useState } from 'react';
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
import { X, MessageSquare, UserX } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/context/user-context';

const allStages: CustomStage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'completed', type: 'stage', createdBy: 'Anil Kumar', createdAt: new Date().toISOString(), description: 'Design presentation details', priority: 'Low' },
    { id: 2, title: "1% Of Over all Quote", subtitle: 'Payment Due', category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'completed', type: 'payment', createdBy: 'Anil Kumar', createdAt: new Date().toISOString(), description: 'Payment details', priority: 'High' },
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
        ],
        createdBy: 'Yaswanth',
        createdAt: new Date().toISOString(),
        description: 'Excavation details',
        priority: 'High'
    },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: new Date().toISOString(), description: 'Grid marking details', priority: 'Medium' },
    { id: 6, title: "20% Payment", subtitle: "Milestone Payment", category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'pending', type: 'payment', createdBy: 'System', createdAt: new Date().toISOString(), description: '20% milestone payment', priority: 'High' },
];

const PaymentsTimeline = () => {
    const [stages, setStages] = useState(allStages.filter(stage => stage.type === 'payment'));

    const handlePayment = (stageId: number) => {
        setStages(currentStages => 
            currentStages.map(stage => 
                stage.id === stageId ? { ...stage, status: 'completed', progress: 100 } : stage
            )
        );
    };

    return <ProjectTimelineStages stages={stages} onPayment={handlePayment} />;
}

export const PaymentsDialog = ({ children }: { children?: React.ReactNode }) => {
    const { user } = useUser();

    const DialogOrSheet = Sheet;
    const DialogOrSheetTrigger = SheetTrigger;
    const DialogOrSheetContent = SheetContent;
    const DialogOrSheetHeader = SheetHeader;
    const DialogOrSheetTitle = SheetTitle;
    const DialogOrSheetClose = SheetClose;

    return (
        <DialogOrSheet>
          <DialogOrSheetTrigger asChild>
            {children}
          </DialogOrSheetTrigger>
          <DialogOrSheetContent
            side="bottom"
            className={cn(
                "p-0 flex flex-col bg-white transition-all m-0 border-none",
                "w-full h-full md:h-[90vh] md:w-full md:max-w-xl md:mx-auto md:bottom-0 rounded-t-[50px]"
            )}
            overlayClassName="bg-black/20 backdrop-blur-sm"
          >
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
