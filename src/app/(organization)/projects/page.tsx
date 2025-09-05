

'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MoreVertical } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { AddProjectSheet } from "@/components/add-project-sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getProjects, Project } from "@/lib/data";


const ProjectListItem = ({ project, onEdit, isLast = false }: { project: Project, onEdit: (project: Project) => void, isLast?: boolean }) => (
     <div className="flex flex-col">
        <div className="flex justify-between items-center py-4">
            <Link href={`/organization/projects/${project.id}`} className="flex items-center gap-4 flex-1 cursor-pointer group w-full">
                <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-14 h-14">
                        <AvatarImage src={project.image} data-ai-hint="abstract building" />
                        <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-44">
                        <p className="text-xl font-semibold text-black group-hover:text-primary">{project.name}</p>
                        <p className="text-lg"><span className="text-grey-1">City: </span><span className="text-black">{project.city}</span></p>
                    </div>
                </div>
                 <div className="w-px h-14 bg-stone-300/0 md:bg-stone-300" />
                <div className="hidden md:flex flex-col gap-2 w-96">
                    <p className="text-lg"><span className="text-grey-2">Contact: </span><span className="text-black">{project.contact}</span></p>
                    <p className="text-lg"><span className="text-grey-2">Client ID: </span><span className="text-zinc-900">{project.id}</span></p>
                </div>
                 <div className="w-px h-14 bg-stone-300/0 md:bg-stone-300" />
                <div className="h-12 flex-col justify-between items-end hidden md:inline-flex">
                     <p className="text-lg"><span className="text-grey-2">Started Date: </span><span className="text-zinc-900">{project.startDate}</span></p>
                     <p className="text-lg"><span className="text-grey-2">Status: </span><span className={project.statusColor}>{project.status}</span></p>
                </div>
            </Link>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="w-6 h-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => onEdit(project)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        {!isLast && <div className="h-px bg-stone-300" />}
    </div>
);


export default function ProjectsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [activeProjects, setActiveProjects] = useState<Project[]>([]);
    const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getProjects();
            setActiveProjects(projects.filter(p => p.status !== 'Completed'));
            setCompletedProjects(projects.filter(p => p.status === 'Completed'));
        };
        fetchProjects();
    }, []);

    const handleEdit = (project: Project) => {
        setProjectToEdit(project);
    };

    const handleProjectAdded = (newProject: Project) => {
        // This is a simplified handler. You might want to refetch or update state more intelligently
        if (newProject.status === 'Completed') {
            setCompletedProjects(prev => [...prev, newProject]);
        } else {
            setActiveProjects(prev => [...prev, newProject]);
        }
    };

    const handleProjectUpdated = (updatedProject: Project) => {
        const updateList = (list: Project[]) => list.map(p => p.id === updatedProject.id ? updatedProject : p);
        setActiveProjects(updateList);
        setCompletedProjects(updateList);
        // Also need to handle moving between lists if status changes
        const wasActive = activeProjects.some(p => p.id === updatedProject.id);
        const isCompleted = updatedProject.status === 'Completed';

        if (wasActive && isCompleted) {
            setActiveProjects(prev => prev.filter(p => p.id !== updatedProject.id));
            setCompletedProjects(prev => [...prev, updatedProject]);
        } else if (!wasActive && !isCompleted) {
            setCompletedProjects(prev => prev.filter(p => p.id !== updatedProject.id));
            setActiveProjects(prev => [...prev, updatedProject]);
        }
    };
    
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-medium">Projects</h2>
            
            <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-black font-medium">Active Projects</h2>
                    <AddProjectSheet 
                        onProjectAdded={handleProjectAdded} 
                        projectToEdit={projectToEdit}
                        onProjectUpdated={handleProjectUpdated}
                        onOpenChange={(isOpen) => !isOpen && setProjectToEdit(null)}
                    />
                </div>
                <Card className="rounded-[50px]">
                    <CardContent className="p-4 md:p-6">
                        {activeProjects.map((project, index) => (
                            <ProjectListItem key={project.id} project={project} onEdit={handleEdit} isLast={index === activeProjects.length - 1} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-xl text-black font-medium mb-4">Completed Projects</h2>
                 <Card className="rounded-[50px]">
                    <CardContent className="p-4 md:p-6">
                        {completedProjects.map((project, index) => (
                            <ProjectListItem key={project.id} project={project} onEdit={handleEdit} isLast={index === completedProjects.length - 1} />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
