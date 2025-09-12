

'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MoreVertical, ShieldAlert } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { AddProjectSheet } from "@/components/add-project-sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getProjects, Project } from "@/lib/data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteProject } from "@/app/actions";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";


const ProjectListItem = ({ project, onEdit, onDelete, isFirst = false, isLast = false }: { project: Project, onEdit: (project: Project) => void, onDelete: (project: Project) => void, isFirst?: boolean, isLast?: boolean }) => (
    <div className="flex flex-col group">
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4 cursor-pointer hover:bg-hover-bg px-2 -mx-2",
            isFirst && "hover:rounded-tl-[25px] hover:rounded-tr-[25px]",
            isLast && "hover:rounded-bl-[25px] hover:rounded-br-[25px]",
        )}>
            <Link href={`/organization/projects/${project.id}`} className="flex items-center gap-4 flex-1">
                <Avatar className="w-14 h-14 shrink-0">
                    <AvatarImage src={project.image} data-ai-hint="abstract building" />
                    <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="text-xl font-semibold text-black">{project.name}</p>
                    <p className="text-lg"><span className="text-grey-2">Location: </span><span className="text-black">{project.city}</span></p>
                </div>
            </Link>
            
            <Separator orientation="vertical" className="h-14 hidden md:block" />
            
            <div className="flex-1 md:pl-0 pl-16">
                 <div className="flex flex-col gap-2">
                    <p className="text-lg"><span className="text-grey-2">Contact: </span><span className="text-black">{project.contact}</span></p>
                    <p className="text-lg"><span className="text-grey-2">Client ID: </span><span className="text-zinc-900">{project.id}</span></p>
                </div>
            </div>
            
            <Separator orientation="vertical" className="h-14 hidden md:block" />

            <div className="flex-1 md:pl-0 pl-16">
                <div className="flex flex-col gap-2">
                    <p className="text-lg"><span className="text-grey-2">Started Date: </span><span className="text-zinc-900">{project.startDate}</span></p>
                    <p className="text-lg"><span className="text-grey-2">Status: </span><span className={project.statusColor}>{project.status}</span></p>
                </div>
            </div>

            <div className="ml-auto self-center" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onEdit(project)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onDelete(project)} className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        {!isLast && <Separator />}
    </div>
);


export default function ProjectsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [activeProjects, setActiveProjects] = useState<Project[]>([]);
    const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const { toast } = useToast();

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
    
    const handleDeleteClick = (project: Project) => {
        setProjectToDelete(project);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (projectToDelete) {
            const result = await deleteProject(projectToDelete.id);
            if (result.success) {
                setActiveProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
                setCompletedProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
                toast({
                    title: 'Success',
                    description: result.message,
                });
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: result.message,
                });
            }
            setIsDeleteDialogOpen(false);
            setProjectToDelete(null);
        }
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
        
        const wasActive = activeProjects.some(p => p.id === updatedProject.id);
        const isCompleted = updatedProject.status === 'Completed';

        if (wasActive && isCompleted) {
            setActiveProjects(prev => prev.filter(p => p.id !== updatedProject.id));
            setCompletedProjects(prev => [...prev, updatedProject].sort((a,b) => a.name.localeCompare(b.name)));
        } else if (!wasActive && !isCompleted) {
            setCompletedProjects(prev => prev.filter(p => p.id !== updatedProject.id));
            setActiveProjects(prev => [...prev, updatedProject].sort((a,b) => a.name.localeCompare(b.name)));
        } else if (wasActive && !isCompleted) {
            setActiveProjects(updateList);
        } else { // !wasActive && isCompleted
            setCompletedProjects(updateList);
        }
    };
    
    return (
        <div className="space-y-8">
            
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
                <Card className="rounded-t-[50px] md:rounded-[50px]">
                    <CardContent className="p-4 md:p-6">
                        {activeProjects.map((project, index) => (
                            <ProjectListItem 
                                key={project.id} 
                                project={project} 
                                onEdit={handleEdit} 
                                onDelete={handleDeleteClick} 
                                isFirst={index === 0}
                                isLast={index === activeProjects.length - 1} 
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-xl text-black font-medium mb-4">Completed Projects</h2>
                 <Card className="rounded-t-[50px] md:rounded-[50px]">
                    <CardContent className="p-4 md:p-6">
                        {completedProjects.map((project, index) => (
                            <ProjectListItem 
                                key={project.id} 
                                project={project} 
                                onEdit={handleEdit} 
                                onDelete={handleDeleteClick} 
                                isFirst={index === 0}
                                isLast={index === completedProjects.length - 1} 
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>
             <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="max-w-md rounded-[50px]">
                    <AlertDialogHeader className="items-center text-center">
                        <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                            <div className="w-full h-full bg-red-600/5 rounded-full" />
                            <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                            <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-semibold">Confirm Project Deletion?</AlertDialogTitle>
                        <AlertDialogDescription className="text-lg text-grey-2">
                           Deleting project "{projectToDelete?.name}" will permanently remove it. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="w-40 h-14 px-10 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
