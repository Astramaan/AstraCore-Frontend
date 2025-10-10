
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
import { AddMemberSheet } from '@/components/add-member-sheet';
import { ViewCompletedTasksSheet } from '@/components/view-completed-tasks-sheet';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { StageCard } from '@/components/stage-card';
import type { Stage as TimelineStage } from '@/components/project-task-card';
import { useUser } from '@/context/user-context';

const allStages: TimelineStage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://picsum.photos/seed/design/100/100', status: 'completed', progress: 100, duration: '2 Days', type: 'stage', createdBy: 'Admin', createdAt: '2024-01-01', description: 'Present the final architectural designs to the client for approval.', priority: 'Low' },
    { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/excavation/100/100', status: 'ongoing', siteImages: ["https://picsum.photos/seed/site1/150/150", "https://picsum.photos/seed/site2/150/150", "https://picsum.photos/seed/site3/150/150", "https://picsum.photos/seed/site4/150/150"], progress: 70, duration: '5 Days', type: 'stage', createdBy: 'Admin', createdAt: '2024-01-01', description: 'Begin excavation as per the approved site plan.', priority: 'High' },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/grid/100/100', status: 'upcoming', progress: 0, duration: '2 Days', type: 'stage', createdBy: 'Admin', createdAt: '2024-01-01', description: 'Mark the grid lines for foundation work.', priority: 'Medium' },
    { id: 6, title: 'Foundation Work', subtitle: 'Sub-structure', category: 'Civil', image: 'https://picsum.photos/seed/foundation/100/100', status: 'upcoming', progress: 0, duration: '10 Days', type: 'stage', createdBy: 'Admin', createdAt: '2024-01-01', description: 'Lay the foundation for the structure.', priority: 'High' },
    { id: 7, title: 'Framing', subtitle: 'Super-structure', category: 'Carpentry', image: 'https://picsum.photos/seed/framing/100/100', status: 'upcoming', progress: 0, duration: '15 Days', type: 'stage', createdBy: 'Admin', createdAt: '2024-01-01', description: 'Erect the building frame.', priority: 'Medium' },
];

const projectsData = [
  {
    id: "CHA2024",
    name: "Charan Project",
    siteSupervisor: "Yaswanth",
    siteSupervisorPhone: "9876543210",
    projectManager: "Priya",
    projectManagerPhone: "9876543210",
    architect: "Darshan",
    architectPhone: "1234567890",
    tasks: allStages
  },
  {
    id: "SAT2025",
    name: "Satish Project",
    siteSupervisor: "Priya",
    siteSupervisorPhone: "9876543210",
    projectManager: "Anil",
    projectManagerPhone: "1234567890",
    architect: "Anil",
    architectPhone: "1234567890",
    tasks: allStages.slice(0, 2)
  }
];

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
];

const ProjectSection = ({ project, onStageClick, onOpenCompletedTasks, onOpenUpcomingTasks }: { project: typeof projectsData[0], onStageClick: (stage: TimelineStage) => void, onOpenCompletedTasks: () => void, onOpenUpcomingTasks: () => void }) => {
    const projectTasks = useMemo(() => {
        return project.tasks.filter(task => task.status !== 'completed' && task.category === 'Design');
    }, [project.tasks]);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:justify-between 2xl:flex">
            <div className="bg-card rounded-full px-6 py-4 flex flex-row justify-between items-center gap-4 2xl:w-80">
              <div>
                <p className="text-sm text-muted-foreground">Project Manager</p>
                <p className="font-semibold">{project.projectManager}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full" size="icon"><MessageCircle className="h-4 w-4"/></Button>
                 <a href={`tel:${project.projectManagerPhone}`}>
                  <Button variant="outline" className="rounded-full" size="icon"><Phone className="h-4 w-4"/></Button>
                </a>
              </div>
            </div>
            <div className="bg-card rounded-full py-4 px-6 flex flex-row justify-between items-center gap-4 2xl:w-80">
              <div>
                <p className="text-sm text-muted-foreground">Site Supervisor</p>
                <p className="font-semibold">{project.siteSupervisor}</p>
              </div>
               <div className="flex gap-2">
                 <Button variant="outline" className="rounded-full" size="icon"><MessageCircle className="h-4 w-4"/></Button>
                 <a href={`tel:${project.siteSupervisorPhone}`}>
                  <Button variant="outline" className="rounded-full" size="icon"><Phone className="h-4 w-4"/></Button>
                </a>
              </div>
            </div>
        </div>
        <div className="mt-6 flex flex-row gap-4 justify-between">
            <Button
                variant="outline"
                onClick={onOpenCompletedTasks}
                className="rounded-full bg-card h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-64"
            >
                Completed Stages
            </Button>
            <Button
                variant="outline"
                className="rounded-full bg-card h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-64"
                onClick={onOpenUpcomingTasks}
            >
                Upcoming Stages
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {projectTasks.map((stage) => (
                <StageCard 
                    key={stage.id} 
                    stage={stage} 
                    onCardClick={onStageClick}
                />
            ))}
        </div>
      </div>
    );
  };


export default function ArchitectHome() {
    const { user } = useUser();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);
    const [isUpcomingTasksSheetOpen, setIsUpcomingTasksSheetOpen] = useState(false);
    const [isCompletedTasksSheetOpen, setIsCompletedTasksSheetOpen] = useState(false);
    const [sourceSheet, setSourceSheet] = useState<'upcoming' | 'completed' | null>(null);

    const canAssignTask = user?.role === 'SUPER_ADMIN';

    const handleStageClick = (stage: TimelineStage) => {
        const task: Task = {
            id: stage.id.toString(),
            title: stage.title,
            subtitle: stage.subtitle,
            description: stage.description || '',
            date: stage.createdAt,
            priority: stage.priority || 'Medium',
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

    const handleUpcomingTaskClick = (stage: TimelineStage) => {
        setIsUpcomingTasksSheetOpen(false);
        setSourceSheet('upcoming');
        handleStageClick(stage);
    }
    
    const handleCompletedTaskClick = (stage: TimelineStage) => {
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
            stageToUpdate.status = updatedTask.status as TimelineStage['status'];
            if(updatedTask.rework) {
                stageToUpdate.rework = updatedTask.rework;
            }
        }
    };

    const selectedProject = useMemo(() => projectsData.find(p => p.id === selectedProjectId), [selectedProjectId]);
    const upcomingTasks = useMemo(() => allStages.filter(stage => stage.status === 'upcoming'), []);
    const completedTasks = useMemo(() => allStages.filter(stage => stage.status === 'completed'), []);

    const projectTasksChartData = useMemo(() => {
        if (!selectedProject) return [];
        const ongoing = selectedProject.tasks.filter(t => t.status === 'ongoing').length;
        const upcoming = selectedProject.tasks.filter(t => t.status === 'upcoming').length;
        return [
            { name: 'Ongoing', value: ongoing, fill: 'hsl(var(--primary))' },
            { name: 'Upcoming', value: upcoming, fill: 'hsl(var(--muted))' },
        ];
    }, [selectedProject]);


    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                 <div className="flex flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-medium text-left">Project Stage</h2>
                     <div className="w-64">
                         <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                            <SelectTrigger className="rounded-full bg-card h-[54px] px-4 text-lg">
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
              projectTasksChartData={projectTasksChartData}
              onMeetingClick={handleMeetingClick}
              showAddMemberButton={true}
              onAddTask={(task) => console.log(task)}
              showAddTaskButton={false}
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
