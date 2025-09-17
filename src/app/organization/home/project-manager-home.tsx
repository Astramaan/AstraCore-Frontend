
'use client';

import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HomeAside } from '@/components/home-aside';
import { TaskDetailsSheet, Task } from '@/components/task-details-sheet';
import { ChevronsUpDown, User, MessageCircle, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Meeting } from '@/components/meeting-details-sheet';
import { MeetingDetailsSheet } from '@/components/meeting-details-sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    description: string;
    priority: 'Low' | 'Medium' | 'High';
}
const allStages: Stage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://picsum.photos/seed/design/100/100', duration: '2 Days', status: 'completed', type: 'stage', createdBy: 'Anil Kumar', createdAt: '25 May 2024', description: 'Present the final architectural designs to the client for approval.', priority: 'Low' },
    { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/excavation/100/100', duration: '2 Days', status: 'ongoing', type: 'stage', siteImages: ["https://picsum.photos/seed/site1/150/150", "https://picsum.photos/seed/site2/150/150", "https://picsum.photos/seed/site3/150/150", "https://picsum.photos/seed/site4/150/150"], snagCount: 3, createdBy: 'Site Supervisor', createdAt: '28 May 2024', description: 'Begin excavation as per the approved site plan.', priority: 'High' },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/grid/100/100', duration: '2 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: '29 May 2024', description: 'Mark the grid lines for foundation work.', priority: 'Low' },
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
  },
  {
    id: "SAT2025",
    name: "Satish Project",
    siteSupervisor: "Priya",
    siteSupervisorPhone: "9876543210",
    architect: "Anil",
    architectPhone: "1234567890",
    tasks: allStages.slice(0, 2)
  }
];

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
];


const ProjectTaskCard = ({ stage, onStageClick }: { stage: Stage, onStageClick: (stage: Stage) => void }) => {
    const priority = stage.status === 'upcoming' ? 'Low' : stage.status === 'ongoing' || stage.status === 'pending' ? 'High' : 'Low';
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "High": "bg-red-500/10 text-red-500",
    }
    
    const { text: statusText, color: statusColor } = useMemo(() => {
        switch (stage.status) {
            case 'completed':
                return { text: 'Completed', color: 'bg-cyan-500/10 text-cyan-500' };
            case 'ongoing':
                return { text: 'In Progress', color: 'bg-blue-100 text-blue-600' };
            case 'upcoming':
            case 'pending':
            default:
                return { text: 'Not Yet', color: 'bg-yellow-100 text-yellow-600' };
        }
    }, [stage.status]);

    const needsApproval = stage.status === 'ongoing';


    return (
        <Card className="w-full h-44 rounded-[40px] flex flex-col justify-between p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onStageClick(stage)}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-zinc-900">{stage.title}</h3>
                    <Badge className={priorityColors[priority]}>{priority}</Badge>
                </div>
                <p className="text-base text-zinc-900 mt-2 truncate">{stage.subtitle}</p>
                <div className="flex justify-between items-center mt-2">
                    <Badge className={cn(statusColor)}>{statusText}</Badge>
                    {needsApproval && <Badge className="bg-orange-100 text-orange-600">Needs Approval</Badge>}
                </div>
            </div>
            <div className="flex justify-end items-center gap-2">
                <Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900">{stage.category}</Badge>
                <p className="text-sm text-muted-foreground">{stage.createdAt}</p>
            </div>
        </Card>
    );
};

const ProjectSection = ({ project, onStageClick }: { project: typeof projectsData[0], onStageClick: (stage: Stage) => void }) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-[50px] p-4 flex justify-between items-center">
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
            <div className="bg-white rounded-[50px] p-4 flex justify-between items-center">
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
      </div>
    );
  };


export default function ProjectManagerHome() {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);

    const handleStageClick = (stage: Stage) => {
        const task: Task = {
            id: stage.id.toString(),
            title: stage.title,
            description: stage.description,
            date: stage.createdAt,
            priority: stage.priority,
            status: stage.status,
            category: stage.category,
            project: selectedProject?.name || 'Unknown Project',
            clientId: selectedProject?.id || 'Unknown',
            attachments: stage.siteImages?.map(img => ({type: 'image', name: 'site-image.png', url: img})) || []
        };
        setSelectedTask(task);
        setIsSheetOpen(true);
    };

    const handleSheetClose = () => {
        setIsSheetOpen(false);
        setSelectedTask(null);
    };

    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);

    const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
        console.log("New task assigned:", newTask);
    };

    const handleUpdateTask = (updatedTask: Task) => {
      setSelectedTask(updatedTask);
      // Here you would update the actual data source
    };

    const selectedProject = useMemo(() => projectsData.find(p => p.id === selectedProjectId), [selectedProjectId]);

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">My Tasks</h2>
                    <div className="w-64">
                         <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                            <SelectTrigger className="rounded-full bg-white h-[54px] px-4">
                                <SelectValue placeholder="Select a Project" />
                            </SelectTrigger>
                            <SelectContent>
                                {projectsData.map(project => (
                                    <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-4">
                    {selectedProject && (
                        <ProjectSection project={selectedProject} onStageClick={handleStageClick} />
                    )}
                </div>
            </main>
            <HomeAside
              meetings={meetings}
              myTasksChartData={[]}
              assignedTasksChartData={[]}
              onMeetingClick={handleMeetingClick}
              onAddTask={handleAddTask}
            />
            {selectedTask && (
                <TaskDetailsSheet
                    isOpen={isSheetOpen}
                    onClose={handleSheetClose}
                    task={selectedTask}
                    onUpdateTask={handleUpdateTask}
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
