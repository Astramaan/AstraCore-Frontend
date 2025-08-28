

'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { AssignTaskSheet } from "@/components/assign-task-sheet";
import { AddEmployeeSheet } from "@/components/add-employee-sheet";
import { TaskDetailsSheet, Task } from '@/components/task-details-sheet';


const taskData: Task[] = [
    { id: "TSK001", title: "Product Weekly update", date: "25 May 2024", description: "This week, our team made significant progress on the new feature development, hitting all key milestones. We also addressed several critical bugs and are on track for the upcoming sprint review.", priority: "Low", status: "on hold", category: "Meetings", project: "AstraCore App", clientId: "CL001", attachments: [{ type: 'pdf', name: 'update.pdf', url: '#' }, { type: 'image', name: 'screenshot.png', url: 'https://placehold.co/65x65' }] },
    { id: "TSK002", title: "New Landing Page Design", date: "26 May 2024", description: "Create mockups for the new landing page, focusing on a clean, modern aesthetic and improved user experience. The design should be responsive and optimized for both desktop and mobile devices.", priority: "High", status: "In Progress", category: "Design", project: "Website Redesign", clientId: "CL002", attachments: [{ type: 'image', name: 'moodboard.png', url: 'https://placehold.co/65x65' }] },
    { id: "TSK003", title: "API Integration", date: "27 May 2024", description: "Integrate with the new payment gateway API. This includes implementing authentication, handling payment requests, and processing transaction responses. Ensure robust error handling is in place.", priority: "Medium", status: "Pending", category: "Development", project: "E-commerce Platform", clientId: "CL003", attachments: [] },
    { id: "TSK004", title: "User Testing Feedback", date: "28 May 2024", description: "Review and categorize user feedback from the latest testing session. Identify common themes, prioritize issues, and create actionable tickets for the development team.", priority: "Low", status: "Completed", category: "QA", project: "Mobile App Beta", clientId: "CL004", attachments: [] },
]

const TaskCard = ({ task, onClick }: { task: Task, onClick: () => void }) => {
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "Medium": "bg-yellow-500/10 text-yellow-500",
        "High": "bg-red-500/10 text-red-500",
    }
    return (
        <Card className="w-full md:w-96 h-44 rounded-[40px] flex flex-col justify-between px-6 py-10 cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-zinc-900">{task.title}</h3>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{task.date}</p>
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
                <div className="text-right">
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="text-sm text-muted-foreground">{task.status}</p>
                </div>
            </div>
        </Card>
    )
}

const meetings = [
    { client: "Charan Project", id: "BAL2025", time: "4:00 PM", date: "10 August 2024"},
    { client: "Lead Discussion", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024"},
    { client: "Internal Sync", id: "INT2025", time: "6:00 PM", date: "10 August 2024"},
]

const MeetingCard = ({ meeting }: { meeting: typeof meetings[0] }) => (
    <Card className="w-full h-20 rounded-[50px] py-4 px-6 flex items-center justify-between">
        <div>
            <p className="text-base font-medium">{meeting.client}</p>
            <p className="text-xs text-muted-foreground">{meeting.id.startsWith('LEAD') ? 'LEAD' : 'CLIENT'} ID: {meeting.id}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium">{meeting.time}</p>
            <p className="text-sm text-muted-foreground">{meeting.date}</p>
        </div>
        <div className="flex items-center gap-2">
        </div>
    </Card>
)

export default function OrganizationHomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6">
        <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4">
                    <Button variant="outline" className="rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0">High Priority</Button>
                    <Button variant="outline" className="rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0">
                        In Progress
                        <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">12</Badge>
                    </Button>
                    <Button variant="outline" className="rounded-full text-muted-foreground bg-white h-[54px] flex-shrink-0">Pending</Button>
                </div>
            </div>

            <div className="flex md:hidden flex-wrap items-center gap-4 mb-6">
                <AssignTaskSheet />
                <AddEmployeeSheet />
            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">My Tasks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {taskData.map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-medium mb-4">Assigned Task</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {taskData.slice(0, 2).map(task => <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />)}
                </div>
            </div>
        </main>

        <aside className="w-full md:w-[420px] space-y-6 flex-shrink-0">
            <div className="hidden md:flex flex-wrap lg:flex-nowrap justify-end items-center gap-4">
                 <AssignTaskSheet />
                <AddEmployeeSheet />
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-medium">Meetings</h2>
                    <Link href="/organization/meetings" className="text-sm text-cyan-500 flex items-center gap-1">
                        see all meetings <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="space-y-3">
                    {meetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
                </div>
            </div>
        </aside>
        
        {selectedTask && (
            <TaskDetailsSheet
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                task={selectedTask}
            />
        )}
    </div>
  );
}
