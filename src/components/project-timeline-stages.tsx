
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Banknote, CheckCircle, CircleDashed, Clock } from 'lucide-react';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface CustomStage {
    id: number;
    name: string;
    type: 'stage' | 'payment';
    status?: 'completed' | 'ongoing' | 'pending';
}

const mockDesignStages: CustomStage[] = [
    { id: 1, name: "1% Of Over all Quote", type: 'payment', status: 'completed' },
    { id: 2, name: "Level 3 lead Converted to Client", type: 'stage', status: 'completed' },
    { id: 3, name: "Project Manager is assigned", type: 'stage', status: 'completed' },
    { id: 4, name: "Soil Testing & Site Visit", type: 'stage', status: 'completed' },
    { id: 5, name: "Mood Board Selection in App", type: 'stage', status: 'ongoing' },
    { id: 6, name: "Architectural Concept Design", type: 'stage', status: 'pending' },
    { id: 7, name: "Layout", type: 'stage', status: 'pending' },
];

const mockConstructionStages: CustomStage[] = [
    { id: 8, name: "20% Payment with Difference Amount of 1 %", type: 'payment', status: 'pending' },
    { id: 9, name: "Construction Started", type: 'stage', status: 'pending' },
    { id: 10, name: "Site Clearence", type: 'stage', status: 'pending' },
];

const StageButton = ({ stage }: { stage: CustomStage }) => {
    const statusIcons = {
        completed: <CheckCircle className="w-5 h-5 text-green" />,
        ongoing: <Clock className="w-5 h-5 text-yellow-500" />,
        pending: <CircleDashed className="w-5 h-5 text-gray-400" />,
    };

    const statusColors = {
        completed: "bg-green-light text-green border-green",
        ongoing: "bg-yellow-100 text-yellow-600 border-yellow-500",
        pending: "bg-gray-100 text-gray-500 border-gray-300",
    }
    
    const isPayment = stage.type === 'payment';

    return (
        <Button
            variant="outline"
            className={cn(
                "w-full h-auto justify-start p-4 rounded-full text-left",
                statusColors[stage.status || 'pending']
            )}
        >
            <div className="flex items-center gap-3 w-full">
                {isPayment ? 
                    <Banknote className={cn("w-5 h-5", statusColors[stage.status || 'pending'])} /> : 
                    statusIcons[stage.status || 'pending']
                }
                <span className="flex-1 whitespace-normal">{stage.name}</span>
            </div>
        </Button>
    )
};


const StageSection = ({ title, stages }: { title: string, stages: CustomStage[] }) => (
    <AccordionItem value={title}>
        <AccordionTrigger className="text-xl font-semibold hover:no-underline">{title}</AccordionTrigger>
        <AccordionContent>
            <div className="space-y-4 pt-4">
                {stages.map((stage) => <StageButton key={stage.id} stage={stage} />)}
            </div>
        </AccordionContent>
    </AccordionItem>
)

export const ProjectTimelineStages = () => {
    return (
        <Card className="rounded-[50px] p-10">
            <CardHeader className="p-0 mb-6">
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>(Stages)</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Accordion type="multiple" defaultValue={["Design", "Construction"]} className="w-full space-y-4">
                   <StageSection title="Design" stages={mockDesignStages} />
                   <StageSection title="Construction" stages={mockConstructionStages} />
                </Accordion>
            </CardContent>
        </Card>
    );
};
