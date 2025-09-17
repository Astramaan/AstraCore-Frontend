
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    siteSupervisorPhone: "9876543210",
    architect: "Darshan",
    architectPhone: "1234567890",
    tasks: allStages
  }
];

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
];


const ProjectTaskCard = ({ stage, onStageClick }: { stage: Stage, onStageClick: (stage: Stage) => void }) => {
    const priority = stage.status === 'ongoing' ? 'High' : 'Low';
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "High": "bg-red-500/10 text-red-500",
    }

    return (
        <Card className="w-full h-44 rounded-[40px] flex flex-col justify-between p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onStageClick(stage)}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-zinc-900">{stage.title}</h3>
                    <Badge className={priorityColors[priority]}>{priority}</Badge>
                </div>
                <p className="text-base text-zinc-900 mt-2 truncate">{stage.subtitle}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://placehold.co/25x25" data-ai-hint="person portrait" /></Avatar>
                        <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://placehold.co/25x25" data-ai-hint="person portrait" /></Avatar>
                    </div>
                     <Badge variant="outline" className="ml-4 bg-zinc-100 border-zinc-100 text-zinc-900">{stage.category}</Badge>
                </div>
                <div className="text-right flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{stage.createdAt}</p>
                </div>
            </div>
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
            <div className="bg-white rounded-[30px] p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Site Supervisor</p>
                <p className="font-semibold">{project.siteSupervisor}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full"><MessageCircle className="h-4 w-4 mr-2"/>Chat</Button>
                 <a href={`tel:${project.siteSupervisorPhone}`}>
                  <Button variant="outline" className="rounded-full"><Phone className="h-4 w-4 mr-2"/>Call</Button>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-[30px] p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Architect</p>
                <p className="font-semibold">{project.architect}</p>
              </div>
               <div className="flex gap-2">
                 <Button variant="outline" className="rounded-full"><MessageCircle className="h-4 w-4 mr-2"/>Chat</Button>
                 <a href={`tel:${project.architectPhone}`}>
                  <Button variant="outline" className="rounded-full"><Phone className="h-4 w-4 mr-2"/>Call</Button>
                </a>
              </div>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.tasks.map((stage) => (
                <ProjectTaskCard key={stage.id} stage={stage} onStageClick={onStageClick} />
            ))}
           </div>
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
