

'use client';

import React, { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ArrowRight, SlidersHorizontal, Check, Calendar } from "lucide-react";
import Link from 'next/link';
import { AssignTaskSheet } from "@/components/assign-task-sheet";
import { AddEmployeeSheet } from "@/components/add-employee-sheet";
import { TaskDetailsSheet, Task } from '@/components/task-details-sheet';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { TaskOverviewChart } from '@/components/charts/task-overview-chart';


const initialTaskData: Task[] = [
    { id: "TSK001", title: "Product Weekly update", date: "25 May 2024", description: "This week, our team made significant progress on the new feature development, hitting all key milestones. We also addressed several critical bugs and are on track for the upcoming sprint review.", priority: "Low", status: "In Progress", category: "Meetings", project: "AstraCore App", clientId: "CL001", attachments: [{ type: 'pdf', name: 'update.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }, { type: 'image', name: 'screenshot.png', url: 'https://placehold.co/600x400' }] },
    { id: "TSK002", title: "New Landing Page Design", date: "26 May 2024", description: "Create mockups for the new landing page, focusing on a clean, modern aesthetic and improved user experience. The design should be responsive and optimized for both desktop and mobile devices.", priority: "High", status: "In Progress", category: "Design", project: "Website Redesign", clientId: "CL002", attachments: [{ type: 'image', name: 'moodboard.png', url: 'https://placehold.co/800x600' }] },
    { id: "TSK003", title: "API Integration", date: "27 May 2024", description: "Integrate with the new payment gateway API. This includes implementing authentication, handling payment requests, and processing transaction responses. Ensure robust error handling is in place.", priority: "Low", status: "In Progress", category: "Development", project: "E-commerce Platform", clientId: "CL003", attachments: [] },
    { id: "TSK004", title: "User Testing Feedback", date: "28 May 2024", description: "Review and categorize user feedback from the latest testing session. Identify common themes, prioritize issues, and create actionable tickets for the development team.", priority: "Low", status: "In Progress", category: "QA", project: "Mobile App Beta", clientId: "CL004", attachments: [] },
]

const assignedTasksData: Task[] = [
    { id: "TSK005", title: "Database Migration", date: "30 May 2024", description: "Plan and execute the migration of the user database from the legacy system to the new cloud infrastructure. Ensure data integrity and minimal downtime.", priority: "High", status: "In Progress", category: "Backend", project: "Infrastructure Upgrade", clientId: "CL005", attachments: [] },
    { id: "TSK006", title: "Onboarding Tutorial", date: "01 June 2024", description: "Create an interactive tutorial for new users to guide them through the main features of the application. Include tooltips and guided steps.", priority: "Medium", status: "Pending", category: "UX", project: "AstraCore App", clientId: "CL001", attachments: [] },
];

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
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{task.date}</p>
                </div>
            </div>
        </Card>
    )
}

const meetings = [
    { client: "Charan Project", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz" },
    { client: "Lead Discussion", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw" },
    { client: "Internal Sync", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst" },
]

const MeetingCard = ({ meeting }: { meeting: typeof meetings[0] }) => (
    <a href={meeting.link} target="_blank" rel="noopener noreferrer">
        <Card className="w-full h-20 rounded-[50px] py-4 px-6 flex items-center justify-between cursor-pointer hover:bg-muted/50">
            <div className="flex-1">
                <p className="text-base font-medium">{meeting.client}</p>
                <p className="text-xs text-muted-foreground">{meeting.id.startsWith('LEAD') ? 'LEAD' : 'CLIENT'} ID: {meeting.id}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium">{meeting.time}</p>
                <p className="text-sm text-muted-foreground">{meeting.date}</p>
            </div>
            <div className="flex items-center gap-2 pl-4">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
        </Card>
    </a>
)

type FilterType = "High Priority" | "In Progress" | "Pending" | "Completed" | null;
const filterOptions: FilterType[] = ["High Priority", "In Progress", "Pending", "Completed"];

export default function OrganizationHomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [taskData, setTaskData] = useState<Task[]>(initialTaskData);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  
  const handleFilterClick = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null); // Deselect if clicking the same filter
    } else {
      setActiveFilter(filter);
    }
  };

  const filteredTasks = useMemo(() => {
    let tasks = taskData;
    if (activeFilter) {
        tasks = tasks.filter(task => {
            if (activeFilter === 'High Priority') {
                return task.priority === 'High';
            }
            if (activeFilter === 'In Progress') {
                return task.status === 'In Progress';
            }
            if (activeFilter === 'Pending') {
                return task.status === 'Pending';
            }
            if (activeFilter === 'Completed') {
                return task.status === 'Completed';
            }
            return true;
        });
    } else {
        tasks = tasks.filter(task => task.status !== 'Completed');
    }
    return tasks;
  }, [activeFilter, taskData]);
  
  const inProgressCount = useMemo(() => taskData.filter(t => t.status === 'In Progress').length, [taskData]);
  const myTasksCount = filteredTasks.length;
  const assignedTasksCount = assignedTasksData.length;
  const taskChartData = [
      { name: "My Tasks", value: myTasksCount },
      { name: "Assigned Tasks", value: assignedTasksCount },
  ];

  const handleTaskUpdate = (updatedTask: Task) => {
    setTaskData(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(updatedTask);
  };
  
  const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
    const fullTask: Task = {
        ...newTask,
        id: `TSK${String(taskData.length + 1).padStart(3, '0')}`,
        status: 'Pending',
        attachments: [] // Assuming no attachments for now from this form
    };
    setTaskData(prevTasks => [fullTask, ...prevTasks]);
  };


  return (
    <div className="flex flex-col md:flex-row gap-6">
        <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
                 {/* Desktop Filters */}
                <div className="hidden md:flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4">
                    <Button 
                        variant="outline" 
                        className={cn(
                            "rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0 text-lg font-medium",
                            activeFilter === 'High Priority' ? "bg-primary text-white hover:bg-primary" : "hover:bg-primary/10 hover:text-primary"
                        )}
                        onClick={() => handleFilterClick('High Priority')}
                    >
                        High Priority
                    </Button>
                    <Button 
                        variant="outline" 
                        className={cn(
                            "rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0 text-lg font-medium",
                            activeFilter === 'In Progress' ? "bg-primary text-white hover:bg-primary" : "hover:bg-primary/10 hover:text-primary"
                        )}
                        onClick={() => handleFilterClick('In Progress')}
                    >
                        In Progress
                        <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">{inProgressCount}</Badge>
                    </Button>
                    <Button 
                        variant="outline" 
                        className={cn(
                            "rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0 text-lg font-medium",
                            activeFilter === 'Pending' ? "bg-primary text-white hover:bg-primary" : "hover:bg-primary/10 hover:text-primary"
                        )}
                        onClick={() => handleFilterClick('Pending')}
                    >
                        Pending
                    </Button>
                    <Button 
                        variant="outline" 
                        className={cn(
                            "rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0 text-lg font-medium",
                            activeFilter === 'Completed' ? "bg-primary text-white hover:bg-primary" : "hover:bg-primary/10 hover:text-primary"
                        )}
                        onClick={() => handleFilterClick('Completed')}
                    >
                        Completed
                    </Button>
                </div>

                {/* Mobile Filter Dropdown & Actions */}
                <div className="flex md:hidden justify-between items-center w-full">
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
                            {filterOptions.map(option => (
                                <DropdownMenuItem key={option} onClick={() => handleFilterClick(option)} >
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
                    </div>
                </div>

            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">My Tasks</h2>
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

        <aside className="w-full md:w-[420px] space-y-6 flex-shrink-0">
            <div className="hidden md:flex flex-wrap lg:flex-nowrap justify-end items-center gap-4">
                 <AssignTaskSheet onTaskAssigned={handleAddTask} />
                <AddEmployeeSheet />
            </div>

            <Card className="rounded-[50px]">
                <CardHeader>
                    <CardTitle className="text-xl">Task Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <TaskOverviewChart data={taskChartData}/>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-medium">Meetings</h2>
                    <Link href="/organization/meetings" className="text-sm text-cyan-500">
                        see all meetings
                    </Link>
                </div>
                <div className="space-y-6">
                    {meetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
                </div>
            </div>
        </aside>
        
        {selectedTask && (
            <TaskDetailsSheet
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                task={selectedTask}
                onUpdateTask={handleTaskUpdate}
            />
        )}
    </div>
  );
}
