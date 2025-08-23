
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Plus, PlusCircle, Video, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Link from 'next/link';


const taskData = [
    { title: "Product Weekly update", date: "25 May 2024", description: "This week, our team ma...", priority: "Low", status: "on hold", category: "Meetings" },
    { title: "New Landing Page Design", date: "26 May 2024", description: "Create mockups for the new...", priority: "High", status: "In Progress", category: "Design" },
    { title: "API Integration", date: "27 May 2024", description: "Integrate with the new paym...", priority: "Medium", status: "Pending", category: "Development" },
    { title: "User Testing Feedback", date: "28 May 2024", description: "Review and categorize user...", priority: "Low", status: "Completed", category: "QA" },
]

const TaskCard = ({ task }: { task: typeof taskData[0] }) => {
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "Medium": "bg-yellow-500/10 text-yellow-500",
        "High": "bg-red-500/10 text-red-500",
    }
    return (
        <Card className="w-full md:w-96 h-44 rounded-2xl border-[0.5px] border-stone-300 flex flex-col justify-between p-4">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-zinc-900">{task.title}</h3>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                </div>
                <p className="text-sm text-stone-500">{task.date}</p>
                <p className="text-base text-zinc-900 mt-2">{task.description}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://placehold.co/25x25" data-ai-hint="person portrait" /></Avatar>
                        <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://placehold.co/25x25" data-ai-hint="person portrait" /></Avatar>
                    </div>
                     <Badge variant="outline" className="ml-4 bg-zinc-100 border-zinc-100 text-zinc-900">{task.category}</Badge>
                </div>
                <p className="text-sm text-stone-500">{task.status}</p>
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
    <Card className="w-full h-20 rounded-[10px] p-4 flex items-center justify-between">
        <div>
            <p className="text-base font-medium">{meeting.client}</p>
            <p className="text-xs text-stone-500">{meeting.id.startsWith('LEAD') ? 'LEAD' : 'CLIENT'} ID: {meeting.id}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium">{meeting.time}</p>
            <p className="text-sm text-stone-500">{meeting.date}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Video className="w-5 h-5 text-sky-500" /></Button>
            <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
        </div>
    </Card>
)

const overviewData = [
  { name: "In Progress", value: 400, color: "hsl(var(--primary))" },
  { name: "Pending", value: 300, color: "hsl(var(--secondary))" },
  { name: "On Hold", value: 200, color: "hsl(var(--muted))" },
];


const TaskOverviewChart = ({title}: {title: string}) => (
    <Card className="w-96 h-96 rounded-2xl border-[0.5px] border-stone-300">
        <CardHeader>
            <CardTitle className="text-xl font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={overviewData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} >
                         {overviewData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </CardContent>
        <div className="flex justify-center items-center gap-4 -mt-4">
            {overviewData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}}/>
                    <span className="text-sm">{item.name}</span>
                </div>
            ))}
        </div>
    </Card>
)


export default function OrganizationHomePage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="rounded-full text-muted-foreground bg-white h-[54px] border-none shadow-sm">High Priority</Button>
                    <Button variant="outline" className="rounded-full text-muted-foreground bg-white h-[54px] border-none shadow-sm">
                        In Progress
                        <Badge className="ml-2 bg-orange-300 text-zinc-900 rounded-full w-5 h-5 justify-center p-0">12</Badge>
                    </Button>
                    <Button variant="outline" className="rounded-full text-muted-foreground bg-white h-[54px] border-none shadow-sm">Pending</Button>
                </div>
                 <div className="flex items-center gap-4">
                    <Button className="w-32 rounded-[10px]">
                        <PlusCircle className="w-4 h-4 mr-2"/>
                        Assign task
                    </Button>
                    <Button variant="outline" className="w-40 rounded-[10px] border-primary text-primary hover:bg-primary/10 hover:text-primary">
                        <Plus className="w-4 h-4 mr-2"/>
                        Add Employee
                    </Button>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">My Task</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {taskData.map(task => <TaskCard key={task.title} task={task} />)}
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-medium mb-4">Assigned Task</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {taskData.slice(0, 2).map(task => <TaskCard key={task.title} task={task} />)}
                </div>
            </div>
        </div>

        <aside className="w-full lg:w-96 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Meetings</h2>
                 <Link href="#" className="text-sm text-cyan-500 flex items-center gap-1">
                    see all meetings <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="space-y-3">
                {meetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
            </div>
            
            <TaskOverviewChart title="Tasks Overview" />
            <TaskOverviewChart title="Assigned Tasks Overview" />

        </aside>
    </div>
  );
}
