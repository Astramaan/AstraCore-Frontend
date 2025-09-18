
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, Calendar, TrendingUp, SlidersHorizontal, Check } from 'lucide-react';
import { MeetingDetailsSheet, type Meeting } from '@/components/meeting-details-sheet';
import { LeadDetailsSheet, type Lead } from '@/components/lead-details-sheet';
import { HomeAside } from '@/components/home-aside';
import { AssignTaskSheet } from '@/components/assign-task-sheet';
import { TaskDetailsSheet, Task } from '@/components/task-details-sheet';
import { AddMemberSheet } from '@/components/add-member-sheet';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import RedirectionArrowIcon from '@/components/icons/redirection-arrow-icon';
import GoogleMeetIcon from '@/components/icons/google-meet-icon';

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
];

const initialTaskData: Task[] = [
    { id: "TSK001", title: "Follow up with Platinum Partners", date: "25 May 2024", description: "Follow up call with Rajesh Singh regarding the new proposal.", priority: "High", status: "Pending", category: "Sales", project: "Platinum Lead", clientId: "PLATINUMHYD789", attachments: [] },
    { id: "TSK002", title: "Prepare quote for Golden Ventures", date: "26 May 2024", description: "Prepare a detailed quote for the construction project for Golden Ventures.", priority: "High", status: "In Progress", category: "Sales", project: "Golden Lead", clientId: "GOLDMYS7890", attachments: [] },
];
const assignedTasksData: Task[] = [];


const SalesStatCard = ({ title, value, icon, change }: { title: string, value: string, icon: React.ReactNode, change: string }) => (
    <Card className="rounded-[40px]">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-4xl font-bold">{value}</p>
            <p className="text-sm text-green-500">{change}</p>
        </CardContent>
    </Card>
);

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


export default function SalesHome() {
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [taskData, setTaskData] = useState<Task[]>(initialTaskData);
    const [assignedTasks, setAssignedTasks] = useState<Task[]>(assignedTasksData);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>(null);
    
    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);
    const handleLeadClick = (lead: Lead) => setSelectedLead(lead);

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

    const applyFilters = (tasks: Task[]) => {
        if (activeFilter) {
            return tasks.filter(task => {
                if (activeFilter === 'High Priority') return task.priority === 'High';
                return task.status === activeFilter;
            });
        }
        return tasks.filter(task => task.status !== 'Completed');
    };

    const filteredMyTasks = useMemo(() => applyFilters(taskData), [taskData, activeFilter]);
    const filteredAssignedTasks = useMemo(() => applyFilters(assignedTasks), [assignedTasks, activeFilter]);
    const inProgressCount = useMemo(() => {
        const myTasksInProgress = taskData.filter(t => t.status === 'In Progress').length;
        const assignedTasksInProgress = assignedTasks.filter(t => t.status === 'In Progress').length;
        return myTasksInProgress + assignedTasksInProgress;
    }, [taskData, assignedTasks]);

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

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SalesStatCard title="New Leads" value="32" icon={<Users className="w-5 h-5"/>} change="+5 this week" />
                    <SalesStatCard title="Meetings Scheduled" value="12" icon={<Calendar className="w-5 h-5"/>} change="+2 this week" />
                    <SalesStatCard title="Conversion Rate" value="25%" icon={<TrendingUp className="w-5 h-5"/>} change="+1.5% this month" />
                </div>
                
                 <div className="flex justify-between items-center">
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
                    <h2 className="text-xl font-medium mb-4">My Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                myTasksChartData={myTasksChartData}
                assignedTasksChartData={assignedTasksChartData}
                onMeetingClick={handleMeetingClick}
                onAddTask={handleAddTask}
            />

            {selectedMeeting && (
                <MeetingDetailsSheet
                    isOpen={!!selectedMeeting}
                    onClose={() => setSelectedMeeting(null)}
                    meeting={selectedMeeting}
                />
            )}

            {selectedLead && (
                 <LeadDetailsSheet
                    isOpen={!!selectedLead}
                    onClose={() => setSelectedLead(null)}
                    lead={selectedLead}
                    onDelete={() => {}}
                />
            )}

             {selectedTask && (
                <TaskDetailsSheet
                    isOpen={!!selectedTask}
                    onClose={() => setSelectedTask(null)}
                    task={selectedTask}
                    onUpdateTask={handleTaskUpdate}
                />
            )}
        </div>
    )
}
