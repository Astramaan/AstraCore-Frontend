

'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MoreVertical } from "lucide-react";
import Image from 'next/image';

const activeProjects = [
    {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "On Going",
        statusColor: "text-lime-600",
        image: "https://placehold.co/270x323"
    },
    {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "Delay",
        statusColor: "text-red-600",
        image: "https://placehold.co/270x323"
    },
    {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "On Going",
        statusColor: "text-lime-600",
        image: "https://placehold.co/270x323"
    },
     {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "Delay",
        statusColor: "text-red-600",
        image: "https://placehold.co/270x323"
    },
];

const completedProjects = [
    {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "Completed",
        statusColor: "text-cyan-500",
        image: "https://placehold.co/270x323"
    },
    {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "Completed",
        statusColor: "text-cyan-500",
        image: "https://placehold.co/270x323"
    },
    {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "Completed",
        statusColor: "text-cyan-500",
        image: "https://placehold.co/270x323"
    },
     {
        id: "CHA2024",
        name: "Charan Project",
        location: "Marathalli, Bengaluru",
        startDate: "21 Sept 2024",
        status: "Completed",
        statusColor: "text-cyan-500",
        image: "https://placehold.co/270x323"
    },
];


const ProjectCard = ({ project }: { project: typeof activeProjects[0] }) => (
    <Card className="rounded-3xl border border-stone-300 w-64 overflow-hidden">
        <CardHeader className="p-0 relative">
            <Image src={project.image} alt={project.name} width={270} height={323} data-ai-hint="building construction" />
            <Badge className="absolute top-4 left-4 bg-slate-50/10 text-white rounded-[50px] border-white backdrop-blur-sm">{project.id}</Badge>
            <Badge className={`absolute top-4 right-4 bg-white rounded-[50px] backdrop-blur-sm ${project.statusColor}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${project.status === 'On Going' ? 'bg-lime-600' : project.status === 'Delay' ? 'bg-red-600' : 'bg-cyan-500'}`} />
                {project.status}
            </Badge>
        </CardHeader>
        <CardContent className="p-4 bg-white">
            <p className="text-lg font-semibold">{project.name}</p>
            <p className="text-base text-gray-600">{project.location}</p>
            <p className="text-base text-gray-600 mt-4">{project.startDate}</p>
        </CardContent>
    </Card>
);

export default function ProjectsPage() {
    return (
        <div className="space-y-8">
             <h1 className="text-2xl font-semibold">Projects</h1>
            
            <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-black font-medium">Active Projects</h2>
                    <Button className="bg-primary/10 text-primary border border-primary rounded-[10px]">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Project
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {activeProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl text-black font-medium mb-4">Completed Projects</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {completedProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
}
