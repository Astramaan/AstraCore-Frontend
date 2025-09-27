
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HomeAside } from '@/components/home-aside';
import { TaskDetailsSheet, Task, ReworkInfo } from '@/components/task-details-sheet';
import { ChevronsUpDown, User, MessageCircle, Phone, SlidersHorizontal, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Meeting } from '@/components/meeting-details-sheet';
import { MeetingDetailsSheet } from '@/components/meeting-details-sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ViewUpcomingTasksSheet } from '@/components/view-upcoming-tasks-sheet';
import { AssignTaskSheet } from '@/components/add-task-sheet';
import { AddMemberSheet } from '@/components/add-member-sheet';
import { ViewCompletedTasksSheet } from '@/components/view-completed-tasks-sheet';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ProjectTaskCard, Stage } from '@/components/project-task-card';
import { TaskCard } from '@/components/task-card';


const allStages: Stage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://picsum.photos/seed/design/100/100', duration: '2 Days', status: 'completed', type: 'stage', createdBy: 'Anil Kumar', createdAt: '25 May 2024', description: 'Present the final architectural designs to the client for approval.', priority: 'Low', progress: 100 },
    { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/excavation/100/100', duration: '2 Days', status: 'ongoing', type: 'stage', siteImages: ["https://picsum.photos/seed/site1/150/150", "https://picsum.photos/seed/site2/150/150", "https://picsum.photos/seed/site3/150/150", "https://picsum.photos/seed/site4/150/150"], snagCount: 3, createdBy: 'Site Supervisor', createdAt: new Date().toISOString(), description: 'Begin excavation as per the approved site plan.', priority: 'High', progress: 70 },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/grid/100/100', duration: '2 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), description: 'Mark the grid lines for foundation work.', priority: 'Low', progress: 0 },
    { id: 6, title: 'Foundation Work', subtitle: 'Sub-structure', category: 'Civil', image: 'https://picsum.photos/seed/foundation/100/100', duration: '5 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: '30 May 2024', description: 'Lay the foundation for the structure.', priority: 'High', progress: 0 },
    { id: 7, title: 'Framing', subtitle: 'Super-structure', category: 'Carpentry', image: 'https://picsum.photos/seed/framing/100/100', duration: '7 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: '05 June 2024', description: 'Erect the building frame.', priority: 'Medium', progress: 0 },
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
];

const ProjectSection = ({ project, onStageClick, onOpenCompletedTasks, onOpenUpcomingTasks }: { project: typeof projectsData[0], onStageClick: (stage: Stage) => void, onOpenCompletedTasks: () => void, onOpenUpcomingTasks: () => void }) => {
    const projectTasks = useMemo(() => {
        return project.tasks.filter(task => task.status !== 'completed');
    }, [project.tasks]);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-full px-6 py-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Site Supervisor</p>
                <p className="font-semibold">{project.siteSupervisor}</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="rounded-full" size="icon"><MessageCircle className="h-4 w-4"/></Button>
                 <a href={`tel:${project.siteSupervisorPhone}`} className="flex-1 md:flex-initial">
                  <Button variant="outline" className="rounded-full" size="icon"><Phone className="h-4 w-4"/></Button>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-full py-4 px-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Architect</p>
                <p className="font-semibold">{project.architect}</p>
              </div>
               <div className="flex gap-2 w-full md:w-auto">
                 <Button variant="outline" className="rounded-full" size="icon"><MessageCircle className="h-4 w-4"/></Button>
                 <a href={`tel:${project.architectPhone}`} className="flex-1 md:flex-initial">
                  <Button variant="outline" className="rounded-full w-full" size="icon"><Phone className="h-4 w-4"/></Button>
                </a>
              </div>
            </div>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between">
            <Button
                variant="outline"
                onClick={onOpenCompletedTasks}
                className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1"
            >
                View Project Completed Tasks
            </Button>
            <Button
                variant="outline"
                className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1"
                onClick={onOpenUpcomingTasks}
            >
                Upcoming Stage
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTasks.map((stage) => (
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
    const [isUpcomingTasksSheetOpen, setIsUpcomingTasksSheetOpen] = useState(false);
    const [isCompletedTasksSheetOpen, setIsCompletedTasksSheetOpen] = useState(false);
    const [sourceSheet, setSourceSheet] = useState<'upcoming' | 'completed' | null>(null);


    const handleStageClick = (stage: Stage) => {
        const task: Task = {
            id: stage.id.toString(),
            title: stage.title,
            subtitle: stage.subtitle,
            description: stage.description,
            date: stage.createdAt,
            priority: stage.priority,
            status: stage.status,
            category: stage.category,
            project: selectedProject?.name || 'Unknown Project',
            clientId: selectedProject?.id || 'Unknown',
            attachments: stage.siteImages?.map(img => ({type: 'image', name: 'site-image.png', url: img})) || [],
            isProjectTask: true,
            rework: stage.rework,
        };
        setSelectedTask(task);
        setIsSheetOpen(true);
    };

    const handleSheetClose = () => {
        setIsSheetOpen(false);
        setSelectedTask(null);
        if (sourceSheet === 'upcoming') {
            setIsUpcomingTasksSheetOpen(true);
        } else if (sourceSheet === 'completed') {
            setIsCompletedTasksSheetOpen(true);
        }
        setSourceSheet(null);
    };

    const handleUpcomingTaskClick = (stage: Stage) => {
        setIsUpcomingTasksSheetOpen(false);
        setSourceSheet('upcoming');
        handleStageClick(stage);
    }
    
    const handleCompletedTaskClick = (stage: Stage) => {
        setIsCompletedTasksSheetOpen(false);
        setSourceSheet('completed');
        handleStageClick(stage);
    }

    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);

    const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
        console.log("New task assigned:", newTask);
    };

    const handleUpdateTask = (updatedTask: Task) => {
      setSelectedTask(updatedTask);
      // Here you would typically update the actual data source
       const stageToUpdate = allStages.find(s => s.id.toString() === updatedTask.id);
        if (stageToUpdate) {
            stageToUpdate.status = updatedTask.status as Stage['status'];
            if(updatedTask.rework) {
                stageToUpdate.rework = updatedTask.rework;
            }
        }
    };

    const selectedProject = useMemo(() => projectsData.find(p => p.id === selectedProjectId), [selectedProjectId]);
    const upcomingTasks = useMemo(() => allStages.filter(stage => stage.status === 'upcoming' || stage.status === 'pending'), []);
    const completedTasks = useMemo(() => allStages.filter(stage => stage.status === 'completed'), []);

    const projectTasksChartData = useMemo(() => {
        if (!selectedProject) return [];
        const ongoing = selectedProject.tasks.filter(t => t.status === 'ongoing').length;
        const upcoming = selectedProject.tasks.filter(t => t.status === 'upcoming').length;
        return [
            { name: 'Ongoing', value: ongoing },
            { name: 'Upcoming', value: upcoming },
        ];
    }, [selectedProject]);


    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                 <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <h2 className="text-xl font-medium text-left">Project Stage</h2>
                     <div className="w-full md:w-64">
                         <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                            <SelectTrigger className="rounded-full bg-white h-[54px] px-4 text-lg">
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
                        <ProjectSection 
                            project={selectedProject} 
                            onStageClick={handleStageClick} 
                            onOpenCompletedTasks={() => setIsCompletedTasksSheetOpen(true)}
                            onOpenUpcomingTasks={() => setIsUpcomingTasksSheetOpen(true)}
                        />
                    )}
                </div>
            </main>
            <HomeAside
              meetings={meetings}
              myTasksChartData={[]}
              assignedTasksChartData={[]}
              projectTasksChartData={projectTasksChartData}
              onMeetingClick={handleMeetingClick}
              onAddTask={handleAddTask}
            />
            {selectedTask && (
                <TaskDetailsSheet
                    isOpen={isSheetOpen || !!selectedTask}
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
           <ViewUpcomingTasksSheet 
                isOpen={isUpcomingTasksSheetOpen}
                onClose={() => setIsUpcomingTasksSheetOpen(false)}
                tasks={upcomingTasks}
                onTaskClick={handleUpcomingTaskClick}
            />
            <ViewCompletedTasksSheet
                isOpen={isCompletedTasksSheetOpen}
                onClose={() => setIsCompletedTasksSheetOpen(false)}
                tasks={completedTasks}
                onTaskClick={handleCompletedTaskClick}
            />
        </div>
    );
}
