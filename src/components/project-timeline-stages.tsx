
'use client';

import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface CustomStage {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    duration: string;
    status: 'ongoing' | 'upcoming' | 'completed' | 'pending';
    type: 'stage' | 'payment';
}


const allStages: CustomStage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'ongoing', type: 'stage' },
    { id: 2, title: "1% Of Over all Quote", subtitle: 'Payment Due', category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'completed', type: 'payment' },
    { id: 3, title: "Project Manager is assigned", subtitle: 'Team Allocation', category: 'Management', image: 'https://placehold.co/100x100.png', duration: '1 Day', status: 'completed', type: 'stage' },
    { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'upcoming', type: 'stage' },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'upcoming', type: 'stage' },
    { id: 6, title: '20% Payment', subtitle: "Milestone Payment", category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'pending', type: 'payment' },
];

const StageCard = ({ stage }: { stage: CustomStage }) => {
    const statusStyles = {
        ongoing: "text-cyan-500 border-cyan-500",
        upcoming: "text-muted-foreground border-gray-300",
        completed: "text-green-600 border-green-600",
        pending: "text-yellow-600 border-yellow-600"
    };
    
    if (stage.type === 'payment') {
        return (
             <div className={cn(
                "rounded-[25px] border p-4 flex items-center gap-4",
                stage.status === 'completed' ? 'bg-green-50' : 'bg-yellow-50'
            )}>
                <div className="relative w-24 h-24 shrink-0">
                    <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-lg object-cover w-full h-full" data-ai-hint="payment invoice" />
                     <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                        {stage.category}
                    </div>
                </div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold text-lg">{stage.title}</p>
                    <p className="text-sm text-muted-foreground">{stage.subtitle}</p>
                </div>
                <div className="text-right">
                    <p className={cn("text-sm font-medium", statusStyles[stage.status])}>{stage.status === 'completed' ? 'Paid' : 'Due'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "rounded-[25px] border p-4 flex items-center gap-4",
            stage.status === 'ongoing' ? 'border-cyan-500' : 'border-stone-200'
        )}>
            <div className="relative w-24 h-24 shrink-0">
                <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-lg object-cover w-full h-full" data-ai-hint="construction work" />
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                    {stage.category}
                </div>
            </div>
            <div className="flex-1 space-y-1">
                <p className="font-semibold text-lg">{stage.title}</p>
                <p className="text-sm text-muted-foreground">{stage.subtitle}</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">{stage.duration}</p>
                <p className={cn("text-sm font-medium capitalize", statusStyles[stage.status])}>{stage.status}</p>
            </div>
        </div>
    );
};

export const ProjectTimelineStages = () => {
    return (
        <Card className="rounded-[50px] p-0 border-none shadow-none bg-transparent">
            <CardContent className="p-0">
                <div className="w-full space-y-4">
                    {allStages.map((stage) => <StageCard key={stage.id} stage={stage} />)}
                </div>
            </CardContent>
        </Card>
    );
};
