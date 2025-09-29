

'use client';

import React, { useState, useMemo } from 'react';
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
import { StageCard, TimelineStage as Stage } from '@/components/stage-card';
import { SnagListSheet, Snag } from '@/components/snag-list-sheet';
import { AddSnagSheet } from '@/components/add-snag-sheet';
import { useUser } from '@/context/user-context';

const allStages: Stage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://picsum.photos/seed/design/100/100', date: '25 May 2024', status: 'completed', progress: 100 },
    { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/excavation/100/100', date: new Date().toISOString(), status: 'On Going', siteImages: ["https://picsum.photos/seed/site1/150/150", "https://picsum.photos/seed/site2/150/150", "https://picsum.photos/seed/site3/150/150", "https://picsum.photos/seed/site4/150/150"], progress: 70 },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://picsum.photos/seed/grid/100/100', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), status: 'Yet To Begin', progress: 0 },
    { id: 6, title: 'Foundation Work', subtitle: 'Sub-structure', category: 'Civil', image: 'https://picsum.photos/seed/foundation/100/100', date: '30 May 2024', status: 'Yet To Begin', progress: 0 },
    { id: 7, title: 'Framing', subtitle: 'Super-structure', category: 'Carpentry', image: 'https://picsum.photos/seed/framing/100/100', date: '05 June 2024', status: 'Yet To Begin', progress: 0 },
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

const ProjectSection = ({ project, onStageClick, onOpenCompletedTasks, onOpenUpcomingTasks }: { project: typeof projectsData[0], onStageClick: (stage: Stage) => void, onOpenCompletedTasks: () => void, onOpenUpcomingTasks: () => void }) => {
    const projectTasks = useMemo(() => {
        return project.tasks.filter(task => task.status !== 'completed');
    }, [project.tasks]);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-full px-6 py-4 flex flex-row justify-between items-center gap-4">
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
            <div className="bg-white rounded-full py-4 px-6 flex flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Architect</p>
                <p className="font-semibold">{project.architect}</p>
              </div>
               <div className="flex gap-2">
                 <Button variant="outline" className="rounded-full" size="icon"><MessageCircle className="h-4 w-4"/></Button>
                 <a href={`tel:${project.architectPhone}`}>
                  <Button variant="outline" className="rounded-full" size="icon"><Phone className="h-4 w-4"/></Button>
                </a>
              </div>
            </div>
        </div>
        <div className="mt-6 flex flex-row gap-4 justify-between">
            <Button
                variant="outline"
                onClick={onOpenCompletedTasks}
                className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-64"
            >
                Completed Stages
            </Button>
            <Button
                variant="outline"
                className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-64"
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


export default function SiteSupervisorHome() {
    const { user } = useUser();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);
    const [isUpcomingTasksSheetOpen, setIsUpcomingTasksSheetOpen] = useState(false);
    const [isCompletedTasksSheetOpen, setIsCompletedTasksSheetOpen] = useState(false);
    const [isSnagListSheetOpen, setIsSnagListSheetOpen] = useState(false);
    const [isAddSnagSheetOpen, setIsAddSnagSheetOpen] = useState(false);

    const canAssignTask = user?.roleType === 'superAdmin';

    const handleStageClick = (stage: Stage) => {
        const task: Task = {
            id: stage.id.toString(),
            title: stage.title,
            subtitle: stage.subtitle,
            description: stage.description || '',
            date: stage.date,
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
    };

    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);

    const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
        console.log("New task assigned:", newTask);
    };

    const handleUpdateTask = (updatedTask: Task) => {
      setSelectedTask(updatedTask);
      const stageToUpdate = allStages.find(s => s.id.toString() === updatedTask.id);
        if (stageToUpdate) {
            stageToUpdate.status = updatedTask.status as Stage['status'];
            if(updatedTask.rework) {
                stageToUpdate.rework = updatedTask.rework;
            }
        }
    };

    const selectedProject = useMemo(() => projectsData.find(p => p.id === selectedProjectId), [selectedProjectId]);
    const upcomingTasks = useMemo(() => allStages.filter(stage => stage.status === 'Yet To Begin' || stage.status === 'pending'), []);
    const completedTasks = useMemo(() => allStages.filter(stage => stage.status === 'completed'), []);

    const projectTasksChartData = useMemo(() => {
        if (!selectedProject) return [];
        const ongoing = selectedProject.tasks.filter(t => t.status === 'On Going').length;
        const upcoming = selectedProject.tasks.filter(t => t.status === 'Yet To Begin').length;
        return [
            { name: 'Ongoing', value: ongoing, fill: 'hsl(var(--primary))'},
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
              projectTasksChartData={projectTasksChartData}
              onMeetingClick={handleMeetingClick}
              onAddTask={canAssignTask ? handleAddTask : undefined}
              showAddMemberButton={canAssignTask}
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
                onTaskClick={handleStageClick}
            />
            <ViewCompletedTasksSheet
                isOpen={isCompletedTasksSheetOpen}
                onClose={() => setIsCompletedTasksSheetOpen(false)}
                tasks={completedTasks}
                onTaskClick={handleStageClick}
            />
            <SnagListSheet 
                isOpen={isSnagListSheetOpen}
                onClose={() => setIsSnagListSheetOpen(false)}
                snags={[]}
                projectId={selectedProjectId}
            />
        </div>
    );
}

    

    
    

    
