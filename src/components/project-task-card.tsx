
'use client';

import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import type { ReworkInfo } from '@/components/task-details-sheet';
import Image from 'next/image';
import { Progress } from './ui/progress';

// This should be kept in sync with the one in project-manager-home.tsx
export interface Stage {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    duration: string;
    status: 'ongoing' | 'upcoming' | 'completed' | 'pending' | 'Rework';
    type: 'stage' | 'payment';
    siteImages?: string[];
    snagCount?: number;
    createdBy: string;
    createdAt: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    progress?: number;
    rework?: ReworkInfo;
}

const statusColors = {
  ongoing: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  upcoming: 'bg-gray-100 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-800',
  Rework: 'bg-red-100 text-red-700',
}

const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // If date is invalid, return the original string or a placeholder
            return dateString;
        }
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
        return dateString;
    }
}


export const ProjectTaskCard = ({ stage, onStageClick }: { stage: Stage, onStageClick: (stage: Stage) => void }) => {
    
    return (
        <Card className="rounded-[24px] bg-white dark:bg-card transition-shadow p-4 cursor-pointer hover:shadow-lg" onClick={() => onStageClick(stage)}>
            <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 shrink-0">
                    <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-[24px] object-cover w-full h-full" data-ai-hint="construction work" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[24px] flex items-end justify-center p-2">
                        <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                        <span className="text-white text-sm font-semibold">{stage.category}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-1 w-full text-left">
                    <div className="flex justify-between items-start">
                        <h3 className="text-black text-base font-semibold">{stage.title}</h3>
                        <Badge className={cn('capitalize', statusColors[stage.status])}>{stage.status}</Badge>
                    </div>
                    <p className="text-sm">{stage.subtitle}</p>
                    <div className="pt-2">
                        <Progress value={stage.progress || 0} className="h-2" />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-black text-xs font-normal">{stage.progress || 0}%</span>
                            <span className="text-grey-1 text-xs">{formatDate(stage.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
};

    
