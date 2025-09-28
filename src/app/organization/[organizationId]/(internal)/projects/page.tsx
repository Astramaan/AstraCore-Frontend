
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MoreVertical, ShieldAlert, Search } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { CreateProjectSheet } from "@/components/create-project-sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getProjects, type Project } from "@/app/actions";
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
import { AvatarWithProgress } from "@/components/avatar-with-progress";
import { useParams } from 'next/navigation';
import { useUser } from "@/context/user-context";
import { Input } from "@/components/ui/input";

// The Project type for the frontend, adapted from the backend response
export interface FrontendProject {
    id: string;
    name: string;
    city: string;
    contact: string;
    startDate: string;
    status: string;
    statusColor: string;
    image: string;
    progress: number;
    projectType: 'New Construction' | 'Renovation' | 'Interior Design';
}


const ProjectListItem = ({ project, onEdit, onDelete, isFirst = false, isLast = false, organizationId, canManage }: { project: FrontendProject, onEdit: (project: FrontendProject) => void, onDelete: (project: FrontendProject) => void, isFirst?: boolean, isLast?: boolean, organizationId: string, canManage: boolean }) => (
    <div className="flex flex-col group">
        {/* Mobile & Tablet View */}
        <div className="lg:hidden p-6 md:p-10 gap-4">
            <div className="flex items-start justify-between gap-4">
                <Link href={`/organization/${organizationId}/projects/${project.id}`} className="flex items-center gap-4 w-full">
                    <AvatarWithProgress value={project.progress}>
                        <Avatar className="w-14 h-14 shrink-0">
                            <AvatarImage src={project.image} data-ai-hint="abstract building" />
                            <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </AvatarWithProgress>
                    <div className="flex-1">
                        <p className="text-xl font-semibold text-black">{project.name}</p>
                         <p className="text-lg">
                            <span className="text-grey-2">Name: </span>
                            <span className="text-black">{project.name} ({project.id})</span>
                        </p>
                    </div>
                </Link>
                {canManage && (
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
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
                )}
            </div>
            <div className="space-y-2 mt-4 ml-18 grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                    <span className="text-grey-2 text-base">Contact: </span> 
                    <p className="text-black font-medium text-base break-words">{project.contact.split(' | ')[0]}<br />{project.contact.split(' | ')[1]}</p>
                </div>
                 <div className="text-right">
                    <span className="text-grey-2 text-base">Project Type: </span> 
                    <p className="zinc-900 font-medium text-base">{project.projectType}</p>
                </div>
                 <div>
                    <span className="text-grey-2 text-base">Started Date: </span> 
                    <p className="text-zinc-900 font-medium text-base">{project.startDate}</p>
                </div>
                 <div className="text-right">
                    <span className="text-grey-2 text-base">Status: </span> 
                    <p className={cn(project.statusColor, 'font-medium text-base')}>{project.status}</p>
                </div>
            </div>
        </div>

        {/* Desktop View */}
        <Link href={`/organization/${organizationId}/projects/${project.id}`} className="hidden lg:block">
            <div
            className={cn(
                "grid lg:grid-cols-[1.2fr_auto_1.5fr_auto_1fr] items-stretch py-6 gap-x-6 cursor-pointer hover:bg-hover-bg px-4",
                isFirst && "hover:rounded-t-[30px]",
                isLast && "hover:rounded-b-[30px]"
            )}
            >
            {/* Project avatar + name */}
            <div className="flex items-center gap-4 w-full">
                 <AvatarWithProgress value={project.progress}>
                    <Avatar className="w-14 h-14 shrink-0">
                        <AvatarImage src={project.image} data-ai-hint="abstract building" />
                        <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </AvatarWithProgress>
                <div className="flex-1">
                <p className="text-xl font-semibold text-black">{project.name}</p>
                 <p className="text-lg">
                    <span className="text-grey-2">Name: </span>
                    <span className="text-black">{project.name} ({project.id})</span>
                </p>
                </div>
            </div>

            {/* Full height separator */}
            <Separator orientation="vertical" className="self-stretch" />

            {/* Contact + Client ID */}
            <div className="flex flex-col justify-center gap-2">
                <p className="text-lg break-all">
                <span className="text-grey-2">Contact: </span>
                <span className="text-black">{project.contact}</span>
                </p>
                <p className="text-lg">
                <span className="text-grey-2">Project Type: </span>
                <span className="zinc-900">{project.projectType}</span>
                </p>
            </div>

            {/* Full height separator */}
            <Separator orientation="vertical" className="self-stretch" />

            {/* Dates + Status + Actions */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                <p className="text-lg">
                    <span className="text-grey-2">Started Date: </span> 
                    <span className="text-zinc-900">{project.startDate}</span>
                </p>
                <p className="text-lg">
                    <span className="text-grey-2">Status: </span>
                    <span className={project.statusColor}>{project.status}</span>
                </p>
                </div>

                {/* Actions Menu */}
                {canManage && (
                    <div
                    className="self-center"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onEdit(project)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onDelete(project)} className="text-red-500">
                            Delete
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                )}
            </div>
            </div>
        </Link>
        {!isLast && <Separator />}
    </div>
);


export default function ProjectsPage() {
    const params = useParams();
    const { user } = useUser();
    const organizationId = params.organizationId as string || 'habi123';
    const [allProjects, setAllProjects] = useState<FrontendProject[]>([]);
    const [projectToEdit, setProjectToEdit] = useState<FrontendProject | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<FrontendProject | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        const fetchProjects = async () => {
            const result = await getProjects();
            if (result.success && result.data) {
                const formattedProjects = result.data.map((p: any) => ({
                    id: p.projectId,
                    name: p.personalDetails.name,
                    city: p.projectDetails.state,
                    contact: "N/A", // Not available in the response
                    startDate: new Date(p.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                    status: p.projectStatus,
                    statusColor: p.projectStatus === "In Progress" ? "text-green-600" : "text-red-600",
                    image: "https://placehold.co/59x59",
                    progress: 50, // Placeholder
                    projectType: 'New Construction', // Placeholder
                }));
                setAllProjects(formattedProjects);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: result.message || 'Failed to fetch projects'
                });
            }
        };
        fetchProjects();
    }, [toast]);

    const filteredProjects = allProjects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const activeProjects = filteredProjects.filter(p => p.status !== 'Completed');
    const completedProjects = filteredProjects.filter(p => p.status === 'Completed');

    const handleEdit = (project: FrontendProject) => {
        setProjectToEdit(project);
    };
    
    const handleDeleteClick = (project: FrontendProject) => {
        setProjectToDelete(project);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (projectToDelete) {
            const result = await deleteProject(projectToDelete.id);
            if (result.success) {
                setAllProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
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


    const handleProjectAdded = (newProject: FrontendProject) => {
        setAllProjects(prev => [...prev, newProject]);
    };

    const handleProjectUpdated = (updatedProject: FrontendProject) => {
        setAllProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const canCreateProject = user?.roleType === 'superAdmin' || user?.team === 'Project Manager';
    const canManageProjects = user?.roleType === 'superAdmin' || user?.team === 'Project Manager';
    
    return (
        <div className="space-y-8">
            
            <div>
                 <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <h2 className="text-xl text-black font-medium self-start md:self-center">Active Projects</h2>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1">
                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-2" />
                            <Input 
                                placeholder="Search Projects"
                                className="pl-12 h-14 rounded-full bg-white text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {canCreateProject && (
                            <CreateProjectSheet 
                                onProjectAdded={handleProjectAdded as any} 
                                projectToEdit={projectToEdit as any}
                                onProjectUpdated={handleProjectUpdated as any}
                                onOpenChange={(isOpen) => !isOpen && setProjectToEdit(null)}
                            />
                        )}
                    </div>
                </div>
                <Card className="rounded-[40px] md:rounded-[50px]">
                    <CardContent className="p-0 lg:p-6">
                        {activeProjects.map((project, index) => (
                            <ProjectListItem 
                                key={project.id} 
                                project={project} 
                                onEdit={handleEdit} 
                                onDelete={handleDeleteClick} 
                                isFirst={index === 0}
                                isLast={index === activeProjects.length - 1} 
                                organizationId={organizationId}
                                canManage={canManageProjects}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-xl text-black font-medium mb-4">Completed Projects</h2>
                 <Card className="rounded-[40px] md:rounded-[50px]">
                    <CardContent className="p-0 lg:p-6">
                        {completedProjects.map((project, index) => (
                            <ProjectListItem 
                                key={project.id} 
                                project={project} 
                                onEdit={handleEdit} 
                                onDelete={handleDeleteClick} 
                                isFirst={index === 0}
                                isLast={index === completedProjects.length - 1} 
                                organizationId={organizationId}
                                canManage={canManageProjects}
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
