
'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HomeAside } from '@/components/home-aside';
import { SnagDetailsSheet, Snag } from '@/components/snag-details-sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, User, MessageCircle, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Meeting } from '@/components/meeting-details-sheet';
import type { Task } from '@/components/task-details-sheet';
import { MeetingDetailsSheet } from '@/components/meeting-details-sheet';

// Data for Project Manager Home
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
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://picsum.photos/seed/design/100/100', duration: '2 Days', status: 'completed', type: 'stage', createdBy: 'Anil Kumar', createdAt: '25 May 2024' },
    { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/excavation/100/100', duration: '2 Days', status: 'ongoing', type: 'stage', siteImages: ["https://picsum.photos/seed/site1/150/150", "https://picsum.photos/seed/site2/150/150", "https://picsum.photos/seed/site3/150/150", "https://picsum.photos/seed/site4/150/150"], snagCount: 3, createdBy: 'Site Supervisor', createdAt: '28 May 2024' },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/grid/100/100', duration: '2 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: '29 May 2024' },
];

const projectsData = [
  {
    id: "CHA2024",
    name: "Charan Project",
    siteSupervisor: "Yaswanth",
    architect: "Darshan",
    tasks: allStages
  }
];

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
];


const ProjectTaskCard = ({ stage, onStageClick }: { stage: Stage, onStageClick: (stage: Stage) => void }) => {
    const statusStyles = {
        ongoing: "text-cyan-500 border-cyan-500",
        upcoming: "text-muted-foreground border-gray-300",
        completed: "text-green-600 border-green-600",
        pending: "text-yellow-600 border-yellow-600"
    };

    const showApprovalUI = stage.status === 'ongoing' && stage.siteImages && stage.siteImages.length > 0;

    return (
        <Card className={cn(
            "rounded-[25px] border p-4 cursor-pointer",
            stage.status === 'ongoing' ? 'border-cyan-500' : 'border-stone-200'
        )} onClick={() => onStageClick(stage)}>
            <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 shrink-0">
                     <Image src={stage.image} alt="Task image" width={96} height={96} className="rounded-2xl object-cover" data-ai-hint="construction work" />
                    <Badge className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white border-transparent">{stage.category}</Badge>
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
             {showApprovalUI && (
                <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                        {stage.siteImages?.map((img, index) => (
                            <Image key={index} src={img} width={100} height={100} alt={`Site image ${index + 1}`} className="rounded-[15px] object-cover aspect-square" data-ai-hint="construction site photo" />
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

const ProjectSection = ({ project, onStageClick }: { project: typeof projectsData[0], onStageClick: (stage: Stage) => void }) => {
    return (
      <Collapsible defaultOpen={true}>
        <div className="bg-zinc-100 rounded-[30px] p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-100 rounded-[20px] p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Site Supervisor</p>
                <p className="font-semibold">{project.siteSupervisor}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><MessageCircle className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon" className="rounded-full text-destructive"><User className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="bg-zinc-100 rounded-[20px] p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Architect</p>
                <p className="font-semibold">{project.architect}</p>
              </div>
               <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><Phone className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon" className="rounded-full text-destructive"><User className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
          {project.tasks.map((stage) => (
            <ProjectTaskCard key={stage.id} stage={stage} onStageClick={onStageClick} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  };


export default function ProjectManagerHome() {
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
    };

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

    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);

    const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
        // This is a placeholder. In a real app, you'd update your state.
        console.log("New task assigned:", newTask);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                <h2 className="text-xl font-medium">My Tasks</h2>
                <div className="space-y-4">
                    {projectsData.map((project) => (
                        <ProjectSection key={project.id} project={project} onStageClick={handleStageClick} />
                    ))}
                </div>
            </main>
            <HomeAside
              meetings={meetings}
              myTasksChartData={[]}
              assignedTasksChartData={[]}
              onMeetingClick={handleMeetingClick}
              onAddTask={handleAddTask}
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

