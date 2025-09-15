
'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HomeAside } from '@/components/home-aside';
import { SnagDetailsSheet, Snag } from '@/components/snag-details-sheet';
import type { Meeting } from '@/components/meeting-details-sheet';
import { MeetingDetailsSheet } from '@/components/meeting-details-sheet';
import type { Task } from '@/components/task-details-sheet';

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
}


const allStages: Stage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'completed', type: 'stage', createdBy: 'Anil Kumar', createdAt: '25 May 2024' },
    { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'ongoing', type: 'stage', siteImages: ["https://placehold.co/150x150.png", "https://placehold.co/150x150.png", "https://placehold.co/150x150.png", "https://placehold.co/150x150.png"], snagCount: 3, createdBy: 'Site Supervisor', createdAt: '28 May 2024' },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: '29 May 2024' },
];

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
]

const StageCard = ({ stage, onStageClick }: { stage: Stage, onStageClick: (stage: Stage) => void }) => {
    const statusStyles = {
        ongoing: "text-cyan-500 border-cyan-500",
        upcoming: "text-muted-foreground border-gray-300",
        completed: "text-green-600 border-green-600",
        pending: "text-yellow-600 border-yellow-600"
    };

    return (
        <Card className={cn(
            "rounded-[25px] border p-4 cursor-pointer",
            stage.status === 'ongoing' ? 'border-cyan-500' : 'border-stone-200'
        )} onClick={() => onStageClick(stage)}>
            <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 shrink-0">
                    <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-[25px] object-cover w-full h-full" data-ai-hint="construction work" />
                    <Badge className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white border-transparent">
                        {stage.category}
                    </Badge>
                </div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold text-lg">{stage.title}</p>
                    <p className="text-sm text-muted-foreground">{stage.subtitle}</p>
                    {stage.snagCount && stage.snagCount > 0 && <Badge variant="destructive">{stage.snagCount} Snags</Badge>}
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">{stage.duration}</p>
                    <p className={cn("text-base font-medium capitalize", statusStyles[stage.status])}>{stage.status}</p>
                </div>
            </div>
        </Card>
    );
};

export function ProjectManagerHome() {
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

    const handleStageClick = (stage: Stage) => {
        setSelectedStage(stage);
        setIsSheetOpen(true);
    };

    const handleSheetClose = () => {
        setIsSheetOpen(false);
        setSelectedStage(null);
    }
    
     const handleMeetingClick = (meeting: Meeting) => {
      setSelectedMeeting(meeting);
  }

    const dummySnag: Snag | null = selectedStage ? {
        id: `snag-${selectedStage.id}`,
        title: selectedStage.title,
        description: `Details about the stage: ${selectedStage.subtitle}`,
        createdBy: selectedStage.createdBy,
        createdAt: selectedStage.createdAt,
        status: 'Open',
        subStatus: '',
        statusColor: 'text-red-500',
        images: selectedStage.siteImages || [],
        projectId: 'CHA2024',
        projectName: 'Charan Project'
    } : null;

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                <h2 className="text-xl font-medium">My Tasks</h2>
                <div className="space-y-4">
                    {allStages.map((stage) => (
                        <StageCard key={stage.id} stage={stage} onStageClick={handleStageClick} />
                    ))}
                </div>
            </main>
            <HomeAside
                meetings={meetings}
                myTasksChartData={[]}
                assignedTasksChartData={[]}
                onMeetingClick={handleMeetingClick}
                onAddTask={(task: Omit<Task, 'id' | 'attachments'>) => { console.log('Add task', task) }}
            />
            {dummySnag && (
                 <SnagDetailsSheet
                    isOpen={isSheetOpen}
                    onClose={handleSheetClose}
                    snag={dummySnag}
                    onDelete={() => console.log('delete')}
                    onUpdate={(snag) => console.log('update', snag)}
                />
            )}
             {selectedMeeting && (
                <MeetingDetailsSheet
                    isOpen={!!selectedMeeting}
                    onClose={() => setSelectedMeeting(null)}
                    meeting={selectedMeeting}
                />
            )}
        </div>
    );
}
