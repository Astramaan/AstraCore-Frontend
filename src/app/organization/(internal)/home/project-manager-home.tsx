
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

// Data for Default Home
const initialTaskData: Task[] = [
    { id: "TSK001", title: "Product Weekly update", date: "25 May 2024", description: "This week, our team made significant progress on the new feature development, hitting all key milestones. We also addressed several critical bugs and are on track for the upcoming sprint review.", priority: "Low", status: "In Progress", category: "Meetings", project: "AstraCore App", clientId: "CL001", attachments: [{ type: 'pdf', name: 'update.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }, { type: 'image', name: 'screenshot.png', url: 'https://placehold.co/600x400' }] },
    { id: "TSK002", title: "New Landing Page Design", date: "26 May 2024", description: "Create mockups for the new landing page, focusing on a clean, modern aesthetic and improved user experience. The design should be responsive and optimized for both desktop and mobile devices.", priority: "High", status: "In Progress", category: "Design", project: "Website Redesign", clientId: "CL002", attachments: [{ type: 'image', name: 'moodboard.png', url: 'https://placehold.co/800x600' }] },
    { id: "TSK003", title: "API Integration", date: "27 May 2024", description: "Integrate with the new payment gateway API. This includes implementing authentication, handling payment requests, and processing transaction responses. Ensure robust error handling is in place.", priority: "Low", status: "In Progress", category: "Development", project: "E-commerce Platform", clientId: "CL003", attachments: [] },
    { id: "TSK004", title: "User Testing Feedback", date: new Date().toISOString(), description: "Review and categorize user feedback from the latest testing session. Identify common themes, prioritize issues, and create actionable tickets for the development team.", priority: "Low", status: "Pending", category: "QA", project: "Mobile App Beta", clientId: "CL004", attachments: [] },
];
const assignedTasksData: Task[] = [
    { id: "TSK005", title: "Database Migration", date: "30 May 2024", description: "Plan and execute the migration of the user database from the legacy system to the new cloud infrastructure. Ensure data integrity and minimal downtime.", priority: "High", status: "In Progress", category: "Backend", project: "Infrastructure Upgrade", clientId: "CL005", attachments: [], isAssigned: true },
    { id: "TSK006", title: "Onboarding Tutorial", date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), description: "Create an interactive tutorial for new users to guide them through the main features of the application. Include tooltips and guided steps.", priority: "Medium", status: "Pending", category: "UX", project: "AstraCore App", clientId: "CL001", attachments: [], isAssigned: true },
];


type FilterType = "High Priority" | "In Progress" | "Pending" | "Completed" | null;


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
                View Project Upcoming Tasks
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
    const [activeFilter, setActiveFilter] = useState<FilterType>(null);
    const inProgressCount = useMemo(() => projectsData.flatMap(p => p.tasks).filter(t => t.status === 'ongoing').length, []);
    const [isUpcomingTasksSheetOpen, setIsUpcomingTasksSheetOpen] = useState(false);
    const [isCompletedTasksSheetOpen, setIsCompletedTasksSheetOpen] = useState(false);
    const [sourceSheet, setSourceSheet] = useState<'upcoming' | 'completed' | null>(null);


    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(activeFilter === filter ? null : filter);
    };

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
            { name: 'Ongoing', value: ongoing, fill: 'hsl(var(--primary))' },
            { name: 'Upcoming', value: upcoming, fill: 'hsl(var(--muted))' },
        ];
    }, [selectedProject]);


    const applyFilters = (tasks: Task[]) => {
        if (activeFilter) {
            return tasks.filter(task => {
                if (activeFilter === 'High Priority') return task.priority === 'High';
                return task.status === activeFilter;
            });
        }
        return tasks.filter(task => task.status !== 'Completed');
    };

    const filteredMyTasks = useMemo(() => applyFilters(initialTaskData), [activeFilter]);
    const filteredAssignedTasks = useMemo(() => applyFilters(assignedTasksData), [activeFilter]);

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                 <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <h2 className="text-xl font-medium text-left">Project Task</h2>
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
                
                <div className="mt-8 space-y-4">
                    
                    <div className="flex lg:hidden justify-between items-center w-full mb-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="rounded-full bg-white h-[54px] flex-shrink-0 text-lg font-medium">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => handleFilterClick(null)} className={cn(!activeFilter && "bg-accent")}>
                                    All (exclude completed)
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {['High Priority', 'In Progress', 'Pending', 'Completed'].map(option => (
                                    <DropdownMenuItem key={option} onClick={() => handleFilterClick(option as FilterType)} >
                                        <div className="w-4 mr-2">
                                        {activeFilter === option && <Check className="h-4 w-4" />}
                                        </div>
                                        {option}
                                        {option === 'In Progress' && <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">{inProgressCount}</Badge>}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <div className="flex items-center gap-4">
                            <AddMemberSheet />
                        </div>
                    </div>
                   
                    <div>
                         <div className="hidden lg:flex items-center gap-4 overflow-x-auto -mx-4 px-4 w-full lg:w-auto">
                            {['High Priority', 'In Progress', 'Pending', 'Completed'].map(filter => (
                                <Button
                                    key={filter}
                                    variant="outline"
                                    className={cn(
                                        "rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0 text-lg font-medium",
                                        activeFilter === filter as FilterType ? "bg-primary text-white hover:bg-primary" : "hover:bg-primary/10 hover:text-primary"
                                    )}
                                    onClick={() => handleFilterClick(filter as FilterType)}
                                >
                                    {filter}
                                    {filter === 'In Progress' && <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">{inProgressCount}</Badge>}
                                </Button>
                            ))}
                        </div>
                        <h2 className="text-xl font-medium text-left pt-4">My Task</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {filteredMyTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-medium mb-4">Assigned Task</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredAssignedTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                    </div>
                </div>
            </main>
            <HomeAside
              meetings={meetings}
              myTasksChartData={[]}
              assignedTasksChartData={[]}
              projectTasksChartData={projectTasksChartData}
              onMeetingClick={handleMeetingClick}
              showAddMemberButton={true}
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
