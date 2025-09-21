

'use client';

import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';

export interface CustomStage {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    duration: string;
    status: 'ongoing' | 'upcoming' | 'completed' | 'pending';
    type: 'stage' | 'payment';
    siteImages?: string[];
}


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

const StageCard = ({ stage }: { stage: CustomStage }) => {
    const statusStyles = {
        ongoing: "text-cyan-500 border-cyan-500",
        upcoming: "text-muted-foreground border-gray-300",
        completed: "text-green-600 border-green-600",
        pending: "text-yellow-600 border-yellow-600"
    };
    
    const showApprovalUI = stage.status === 'ongoing' && stage.siteImages && stage.siteImages.length > 0;
    const isPaymentDue = stage.type === 'payment' && stage.status === 'pending';

    return (
        <Card className={cn(
            "rounded-[24px] p-4 bg-white hover:shadow-md transition-shadow",
            isPaymentDue && 'bg-yellow-50'
        )}>
            <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 shrink-0">
                    <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-[25px] object-cover w-full h-full" data-ai-hint="construction work" />
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
                    <p className={cn(
                        "text-base font-medium capitalize", 
                        statusStyles[stage.status]
                    )}>
                        {stage.type === 'payment' 
                            ? (stage.status === 'completed' ? 'Paid' : 'Due')
                            : stage.status
                        }
                    </p>
                </div>
            </div>
            {showApprovalUI && (
                <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                        {stage.siteImages?.map((img, index) => (
                            <Image key={index} src={img} width={100} height={100} alt={`Site image ${'index + 1'}`} className="rounded-[15px] object-cover aspect-square" data-ai-hint="construction site photo" />
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg">Reject</Button>
                        <Button className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg">Complete</Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export const ProjectTimelineStages = ({ stages }: { stages?: CustomStage[] }) => {
    const displayStages = stages || allStages;
    return (
        <Card className="rounded-[50px] p-0 border-none shadow-none bg-transparent">
            <CardContent className="p-0">
                <div className="w-full space-y-4">
                    {displayStages.map((stage) => <StageCard key={stage.id} stage={stage} />)}
                </div>
            </CardContent>
        </Card>
    );
};
