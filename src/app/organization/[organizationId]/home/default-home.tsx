
'use client';

import React, { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SlidersHorizontal, Check, ChevronDown } from "lucide-react";
import { AssignTaskSheet } from "@/components/assign-task-sheet";
import { AddMemberSheet } from "@/components/add-member-sheet";
import { TaskDetailsSheet, Task } from '@/components/task-details-sheet';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MeetingDetailsSheet, type Meeting } from '@/components/meeting-details-sheet';
import { HomeAside } from '@/components/home-aside';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/context/user-context';


// Data for Default Home
const initialTaskData: Task[] = [
    { id: "TSK001", title: "Product Weekly update", date: "25 May 2024", description: "This week, our team made significant progress on the new feature development, hitting all key milestones. We also addressed several critical bugs and are on track for the upcoming sprint review.", priority: "Low", status: "In Progress", category: "Meetings", project: "AstraCore App", clientId: "CL001", attachments: [{ type: 'pdf', name: 'update.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }, { type: 'image', name: 'screenshot.png', url: 'https://placehold.co/600x400' }] },
    { id: "TSK002", title: "New Landing Page Design", date: "26 May 2024", description: "Create mockups for the new landing page, focusing on a clean, modern aesthetic and improved user experience. The design should be responsive and optimized for both desktop and mobile devices.", priority: "High", status: "In Progress", category: "Design", project: "Website Redesign", clientId: "CL002", attachments: [{ type: 'image', name: 'moodboard.png', url: 'https://placehold.co/800x600' }] },
    { id: "TSK003", title: "API Integration", date: "27 May 2024", description: "Integrate with the new payment gateway API. This includes implementing authentication, handling payment requests, and processing transaction responses. Ensure robust error handling is in place.", priority: "Low", status: "In Progress", category: "Development", project: "E-commerce Platform", clientId: "CL003", attachments: [] },
    { id: "TSK004", title: "User Testing Feedback", date: "28 May 2024", description: "Review and categorize user feedback from the latest testing session. Identify common themes, prioritize issues, and create actionable tickets for the development team.", priority: "Low", status: "Pending", category: "QA", project: "Mobile App Beta", clientId: "CL004", attachments: [] },
];
const assignedTasksData: Task[] = [
    { id: "TSK005", title: "Database Migration", date: "30 May 2024", description: "Plan and execute the migration of the user database from the legacy system to the new cloud infrastructure. Ensure data integrity and minimal downtime.", priority: "High", status: "In Progress", category: "Backend", project: "Infrastructure Upgrade", clientId: "CL005", attachments: [], isAssigned: true },
    { id: "TSK006", title: "Onboarding Tutorial", date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), description: "Create an interactive tutorial for new users to guide them through the main features of the application. Include tooltips and guided steps.", priority: "Medium", status: "Pending", category: "UX", project: "AstraCore App", clientId: "CL001", attachments: [], isAssigned: true },
    { id: "TSK007", title: "Finalize Marketing Copy", date: new Date().toISOString(), description: "Final review of all marketing copy for the new campaign before launch.", priority: "High", status: "Pending", category: "Marketing", project: "AstraCore App", clientId: "CL001", attachments: [], isAssigned: true },

];

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
];

type FilterType = "High Priority" | "In Progress" | "Pending" | "Completed" | null;

const getDateColor = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'text-red-500'; // Today
    } else if (diffDays === 1) {
        return 'text-orange-500'; // Tomorrow
    } else {
        return 'text-muted-foreground'; // Default
    }
};

const TaskCard = ({ task, onClick }: { task: Task, onClick: () => void }) => {
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "Medium": "bg-yellow-500/10 text-yellow-500",
        "High": "bg-red-500/10 text-red-500",
    }
    const formattedDate = new Date(task.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).replace(/ /g, ' ');
    const dateColor = getDateColor(task.date);

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
                    <p className={cn("text-sm", dateColor)}>Due: {formattedDate}</p>
                </div>
            </div>
        </Card>
    )
};


export default function DefaultHomePage() {
    const { user } = useUser();
    
    const [taskData, setTaskData] = useState<Task[]>(initialTaskData);
    const [assignedTasks, setAssignedTasks] = useState<Task[]>(assignedTasksData);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>(null);
    const [selectedProject, setSelectedProject] = useState<string>('all');
  
    // Common handlers and memos
    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);
    const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
      const fullTask: Task = {
          ...newTask,
          id: `TSK${String(taskData.length + assignedTasks.length + 1).padStart(3, '0')}`,
          status: 'Pending',
          attachments: [],
          isAssigned: true,
      };
      setAssignedTasks(prevTasks => [fullTask, ...prevTasks]);
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
        const statusCounts = assignedTasks.reduce((acc, task) => {
            if(task.status !== 'Completed') {
                acc[task.status] = (acc[task.status] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
      }, [assignedTasks]);
  
    // Handlers for Default Home
    const handleFilterClick = (filter: FilterType) => {
      setActiveFilter(activeFilter === filter ? null : filter);
    };
    const handleTaskUpdate = (updatedTask: Task) => {
      if (updatedTask.isAssigned) {
          setAssignedTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      } else {
          setTaskData(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      }
      setSelectedTask(updatedTask);
    };

    const projectNames = useMemo(() => [...new Set(taskData.filter(t => t.isProjectTask).map(task => task.project))], [taskData]);
    
    const applyFilters = (tasks: Task[]) => {
        if (activeFilter) {
            return tasks.filter(task => {
                if (activeFilter === 'High Priority') return task.priority === 'High';
                return task.status === activeFilter;
            });
        }
        return tasks.filter(task => task.status !== 'Completed');
    };

    const filteredMyTasks = useMemo(() => applyFilters(taskData.filter(t => !t.isProjectTask && !t.isAssigned)), [taskData, activeFilter]);
    const filteredAssignedTasks = useMemo(() => applyFilters(assignedTasks), [assignedTasks, activeFilter]);
    
    const projectTasks = useMemo(() => {
        let tasks = taskData.filter(t => t.isProjectTask);
        if (selectedProject !== 'all') {
            tasks = tasks.filter(task => task.project === selectedProject);
        }
        return applyFilters(tasks);
    }, [taskData, selectedProject, activeFilter]);

    const inProgressCount = useMemo(() => {
        const myTasksInProgress = taskData.filter(t => !t.isProjectTask && !t.isAssigned && t.status === 'In Progress').length;
        const assignedTasksInProgress = assignedTasks.filter(t => t.status === 'In Progress').length;
        return myTasksInProgress + assignedTasksInProgress;
    }, [taskData, assignedTasks]);
    
    const canFilterProjects = user?.team === 'Project Manager' || user?.team === 'Architect' || user?.team === 'Site Supervisor';
  
    return (
        <div className="flex flex-col lg:flex-row gap-6">
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

                <div className="space-y-8">
                    {user?.roleType === 'superAdmin' ? (
                        <>
                            <div>
                                <h2 className="text-xl font-medium">My Task</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    {filteredMyTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-medium mb-4">Assigned Task</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredAssignedTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                             <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-medium">Project Task</h2>
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
                                    {projectTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                                </div>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-xl font-medium mb-4">Assigned Task</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredAssignedTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <HomeAside
                meetings={meetings}
                myTasksChartData={myTasksChartData}
                assignedTasksChartData={assignedTasksChartData}
                onMeetingClick={handleMeetingClick}
                onAddTask={handleAddTask}
            />
            
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
        </div>
    );
}

