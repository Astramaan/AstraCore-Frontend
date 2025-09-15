

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal, Check, ChevronDown } from "lucide-react";
import { AssignTaskSheet } from "@/components/assign-task-sheet";
import { AddMemberSheet } from "@/components/add-member-sheet";
import { TaskDetailsSheet, Task } from '@/components/task-details-sheet';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MeetingDetailsSheet, type Meeting } from '@/components/meeting-details-sheet';
import { HomeAside } from '@/components/home-aside';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { SnagDetailsSheet, Snag } from '@/components/snag-details-sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, User, MessageCircle, Phone } from 'lucide-react';

// Data for Default Home
const initialTaskData: Task[] = [
    { id: "TSK001", title: "Product Weekly update", date: "25 May 2024", description: "This week, our team made significant progress on the new feature development, hitting all key milestones. We also addressed several critical bugs and are on track for the upcoming sprint review.", priority: "Low", status: "In Progress", category: "Meetings", project: "AstraCore App", clientId: "CL001", attachments: [{ type: 'pdf', name: 'update.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }, { type: 'image', name: 'screenshot.png', url: 'https://placehold.co/600x400' }] },
    { id: "TSK002", title: "New Landing Page Design", date: "26 May 2024", description: "Create mockups for the new landing page, focusing on a clean, modern aesthetic and improved user experience. The design should be responsive and optimized for both desktop and mobile devices.", priority: "High", status: "In Progress", category: "Design", project: "Website Redesign", clientId: "CL002", attachments: [{ type: 'image', name: 'moodboard.png', url: 'https://placehold.co/800x600' }] },
    { id: "TSK003", title: "API Integration", date: "27 May 2024", description: "Integrate with the new payment gateway API. This includes implementing authentication, handling payment requests, and processing transaction responses. Ensure robust error handling is in place.", priority: "Low", status: "In Progress", category: "Development", project: "E-commerce Platform", clientId: "CL003", attachments: [] },
    { id: "TSK004", title: "User Testing Feedback", date: "28 May 2024", description: "Review and categorize user feedback from the latest testing session. Identify common themes, prioritize issues, and create actionable tickets for the development team.", priority: "Low", status: "Pending", category: "QA", project: "Mobile App Beta", clientId: "CL004", attachments: [] },
];
const assignedTasksData: Task[] = [
    { id: "TSK005", title: "Database Migration", date: "30 May 2024", description: "Plan and execute the migration of the user database from the legacy system to the new cloud infrastructure. Ensure data integrity and minimal downtime.", priority: "High", status: "In Progress", category: "Backend", project: "Infrastructure Upgrade", clientId: "CL005", attachments: [] },
    { id: "TSK006", title: "Onboarding Tutorial", date: "01 June 2024", description: "Create an interactive tutorial for new users to guide them through the main features of the application. Include tooltips and guided steps.", priority: "Medium", status: "Pending", category: "UX", project: "AstraCore App", clientId: "CL001", attachments: [] },
];

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

// Common Data
const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
];

type FilterType = "High Priority" | "In Progress" | "Pending" | "Completed" | null;

const TaskCard = ({ task, onClick }: { task: Task, onClick: () => void }) => {
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "Medium": "bg-yellow-500/10 text-yellow-500",
        "High": "bg-red-500/10 text-red-500",
    }
    return (
        <Card className="w-full h-44 rounded-[40px] flex flex-col justify-between p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-zinc-900">{task.title}</h3>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                </div>
                <p className="text-base text-zinc-900 mt-2 truncate">{task.description}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://placehold.co/25x25" data-ai-hint="person portrait" /></Avatar>
                        <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://placehold.co/25x25" data-ai-hint="person portrait" /></Avatar>
                    </div>
                     <Badge variant="outline" className="ml-4 bg-zinc-100 border-zinc-100 text-zinc-900">{task.category}</Badge>
                </div>
                <div className="text-right flex items-center gap-2">
                    
                    <p className="text-sm text-muted-foreground">{task.date}</p>
                </div>
            </div>
        </Card>
    )
};

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

  const OrganizationHomePageContent = () => {
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
  
    const [taskData, setTaskData] = useState<Task[]>(initialTaskData);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>(null);
    const [selectedProject, setSelectedProject] = useState<string>('all');
    
    // State for PM Home
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
  
    // Common handlers and memos
    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);
    const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
      const fullTask: Task = {
          ...newTask,
          id: `TSK${String(taskData.length + 1).padStart(3, '0')}`,
          status: 'Pending',
          attachments: []
      };
      setTaskData(prevTasks => [fullTask, ...prevTasks]);
    };
    const myTasksChartData = useMemo(() => {
      const statusCounts = taskData.reduce((acc, task) => {
          if(task.status !== 'Completed') {
              acc[task.status] = (acc[task.status] || 0) + 1;
          }
          return acc;
      }, {} as Record<string, number>);
      return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
    }, [taskData]);
  
    const assignedTasksChartData = useMemo(() => {
      const statusCounts = assignedTasksData.reduce((acc, task) => {
          if(task.status !== 'Completed') {
              acc[task.status] = (acc[task.status] || 0) + 1;
          }
          return acc;
      }, {} as Record<string, number>);
      return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
    }, []);
  
    // Handlers for Default Home
    const handleFilterClick = (filter: FilterType) => {
      setActiveFilter(activeFilter === filter ? null : filter);
    };
    const handleTaskUpdate = (updatedTask: Task) => {
      setTaskData(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      setSelectedTask(updatedTask);
    };
    const projectNames = useMemo(() => [...new Set(taskData.map(task => task.project))], [taskData]);
    const filteredTasks = useMemo(() => {
      let tasks = taskData;
      if (activeFilter) {
          tasks = tasks.filter(task => {
              if (activeFilter === 'High Priority') return task.priority === 'High';
              if (activeFilter === 'In Progress') return task.status === 'In Progress';
              if (activeFilter === 'Pending') return task.status === 'Pending';
              if (activeFilter === 'Completed') return task.status === 'Completed';
              return true;
          });
      } else {
          tasks = tasks.filter(task => task.status !== 'Completed');
      }
      if (selectedProject !== 'all') {
          tasks = tasks.filter(task => task.project === selectedProject);
      }
      return tasks;
    }, [activeFilter, taskData, selectedProject]);
    const inProgressCount = useMemo(() => taskData.filter(t => t.status === 'In Progress').length, [taskData]);
    const canFilterProjects = userRole === 'Project Manager' || userRole === 'Architect' || userRole === 'Site Supervisor';
  
  
    // Handlers for PM Home
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
  
    const renderDefaultHome = () => (
      <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
               {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4">
                  {['High Priority', 'In Progress', 'Pending', 'Completed'].map(filter => (
                       <Button 
                          key={filter}
                          variant="outline" 
                          className={cn(
                              "rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0 text-lg font-medium",
                              activeFilter === filter ? "bg-primary text-white hover:bg-primary" : "hover:bg-primary/10 hover:text-primary"
                          )}
                          onClick={() => handleFilterClick(filter as FilterType)}
                      >
                          {filter}
                          {filter === 'In Progress' && <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">{inProgressCount}</Badge>}
                      </Button>
                  ))}
              </div>
  
              {/* Mobile/Tablet Filter Dropdown & Actions */}
              <div className="flex lg:hidden justify-between items-center w-full">
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
                      <AssignTaskSheet onTaskAssigned={handleAddTask} />
                      <AddMemberSheet />
                  </div>
              </div>
          </div>
  
          <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">My Tasks</h2>
                {canFilterProjects && (
                  <div className="w-48">
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger className="rounded-full bg-white">
                        <SelectValue placeholder="All Projects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        {projectNames.map(name => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
              </div>
          </div>
          <div className="mt-8">
              <h2 className="text-xl font-medium mb-4">Assigned Task</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {assignedTasksData.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
              </div>
          </div>
      </main>
    );
  
    const renderProjectManagerHome = () => (
      <main className="flex-1 space-y-6">
        <h2 className="text-xl font-medium">My Tasks</h2>
        <div className="space-y-4">
          {projectsData.map((project) => (
            <ProjectSection key={project.id} project={project} onStageClick={handleStageClick} />
          ))}
        </div>
      </main>
    );
  
    return (
      <div className="flex flex-col lg:flex-row gap-6">
          {userRole === 'Project Manager' ? renderProjectManagerHome() : renderDefaultHome()}
          
          <HomeAside
              meetings={meetings}
              myTasksChartData={myTasksChartData}
              assignedTasksChartData={assignedTasksChartData}
              onMeetingClick={handleMeetingClick}
              onAddTask={handleAddTask}
          />
          
          {/* Modals and Sheets */}
          {selectedTask && (
              <TaskDetailsSheet
                  isOpen={!!selectedTask}
                  onClose={() => setSelectedTask(null)}
                  task={selectedTask}
                  onUpdateTask={handleTaskUpdate}
              />
          )}
          {selectedMeeting && (
              <MeetingDetailsSheet
                  isOpen={!!selectedMeeting}
                  onClose={() => setSelectedMeeting(null)}
                  meeting={selectedMeeting}
              />
          )}
          {dummySnag && userRole === 'Project Manager' && (
               <SnagDetailsSheet
                  isOpen={isSheetOpen}
                  onClose={handleSheetClose}
                  snag={dummySnag}
                  onDelete={() => console.log('delete')}
                  onUpdate={(snag) => console.log('update', snag)}
              />
          )}
      </div>
    );
  }

  export default function OrganizationHomePage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <OrganizationHomePageContent />
      </Suspense>
    );
  }
