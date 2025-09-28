
'use client';

import React, { useState, useEffect } from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { ProjectFilesCard } from '@/components/project-files-card';
import { ProjectVisualsCard } from '@/components/project-visuals-card';
import { ProjectInfoHeader } from '@/components/project-info-header';
import { ProjectMaterialsCard } from '@/components/project-materials-card';
import { TimelineDialog } from '@/components/timeline-dialog';
import { PaymentsDialog } from '@/components/payments-dialog';
import { getProjectDetails, Project } from '@/lib/data';
import { CreateProjectSheet } from '@/components/create-project-sheet';
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
import { ShieldAlert, Eye, ChevronLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { DesignDocumentsDialog } from '@/components/design-documents-dialog';
import { useUser } from '@/context/user-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';


const mockFilesAndVisuals = {
    visuals: {
        "3d": [
            "https://placehold.co/68x68",
            "https://placehold.co/69x68",
            "https://placehold.co/69x68",
            "https://placehold.co/69x68",
        ],
        gallery: Array(24).fill("https://placehold.co/68x68"),
    },
    materials: Array(6).fill({
        name: "Tata Steel",
        image: "https://placehold.co/67x67",
        description: "Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter...",
    }),
    files: {
        initial: [{ id: 'init-1', name: "Initial Layout", date: "28 July 2024", version: "V 1", history: [] }],
        costing: [
            { id: 'cost-1', name: "Tentative Quotation", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cost-2', name: "Bill of Quantity", date: "28 July 2024", version: "V 1", history: [] },
        ],
        architecture: [
            { id: 'arch-1', name: "Architecture Schematic Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'arch-2', name: "Architecture Concept Design", date: "28 July 2024", version: "V 2", history: [{ name: "Architecture Concept Design", date: "27 July 2024", version: "V 1"}] },
        ],
        structure: [
            { id: 'struct-1', name: "Soil Testing Report", date: "28 July 2024", version: "V 1", history: [] },
        ],
        sanction: [{ id: 'sanc-1', name: "Sanction Drawing", date: "28 July 2024", version: "V 1", history: [] }],
        construction: [
            { id: 'cons-1', name: "Tender Drawing", date: "28 July 2024", version: "V 1", history: [] },
        ],
    },
};

export default function ProjectDetailsPage() {
    const params = useParams();
    const id = params.projectId as string;
    const { user } = useUser();
    const [project, setProject] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            const projectDetails = await getProjectDetails(id);
            if (projectDetails) {
                 const displayProject = { 
                     ...projectDetails, 
                     id: projectDetails.projectId,
                     name: projectDetails.personalDetails.name,
                     progress: 50, // Placeholder
                     ...mockFilesAndVisuals // Merging mock data for UI that is not yet in API
                 };
                setProject(displayProject);
            }
            setIsLoading(false);
        };
        fetchProject();
    }, [id]);

    const canManageProject = user?.roleType === 'superAdmin' || user?.userId === project?.createdBy;

    if (isLoading) {
        return (
             <div className="space-y-6">
                 <Skeleton className="h-12 w-1/4" />
                 <Skeleton className="h-48 w-full" />
                 <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6">
                    <div className="space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-80 w-full" />
                    </div>
                    <div className="w-full xl:w-[384px] space-y-6">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-80 w-full" />
                    </div>
                </div>
            </div>
        );
    }
    
    if (!project) {
        return (
            <div className="flex flex-col justify-center items-center h-full text-center">
                <h2 className="text-2xl font-bold">Project Not Found</h2>
                <p className="text-muted-foreground">The project you are looking for does not exist or you do not have permission to view it.</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        );
    }
    
    const handleEdit = () => {
        const editData = {
            id: project.id,
            name: project.name,
            city: project.projectDetails.siteAddress, // Or a more specific city field if available
            contact: `${project.personalDetails.email} | ${project.personalDetails.phoneNumber}`,
            startDate: project.startDate,
            status: project.projectStatus,
            statusColor: project.projectStatus === "In Progress" ? "text-green-600" : "text-gray-500",
            image: "https://placehold.co/59x59",
            progress: project.progress,
            projectType: project.projectDetails.projectType,
        };
        setProjectToEdit(editData as Project);
    };
    
    const handleDeleteClick = () => {
        setProjectToDelete(project as Project);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (projectToDelete) {
            const result = await deleteProject(projectToDelete.id);
            if (result.success) {
                toast({
                    title: 'Success',
                    description: result.message,
                });
                router.push(`/organization/${params.organizationId}/projects`);
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

    const handleProjectUpdated = (updatedProject: Project) => {
        setProject((prev: any) => ({ ...prev, ...updatedProject }));
        setProjectToEdit(null);
    };
    
    const canViewPayments = user?.roleType === 'superAdmin' || user?.team === 'Project Manager';

    const projectInfoHeaderData = {
        name: project.personalDetails.name,
        coverImage: "https://placehold.co/1216x144",
        progress: project.progress,
        pm: "Yaswanth", // Placeholder
        id: project.projectId,
    }

    const projectDetailsCardData = {
        personalInfo: {
            name: project.personalDetails.name,
            clientId: project.clientId,
            phone: project.personalDetails.phoneNumber,
            email: project.personalDetails.email,
            address: project.personalDetails.currentAddress,
        },
        projectInfo: {
            cost: project.projectDetails.projectCost,
            duration: {
                start: new Date(project.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                end: "1 Dec 2024" // Placeholder
            },
            dimension: project.projectDetails.dimension,
            floors: project.projectDetails.floor,
            status: project.projectStatus,
            locationLink: project.projectDetails.siteLink || "https://maps.google.com"
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-medium">Project Details</h2>
                <Button variant="outline" onClick={() => router.back()} className="rounded-full h-[54px] px-6 text-lg bg-white hover:bg-primary/10 hover:text-primary hidden md:flex">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
             <ProjectInfoHeader project={projectInfoHeaderData} />

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6">
                <div className="space-y-6">
                    <ProjectDetailsCard 
                        personalInfo={projectDetailsCardData.personalInfo} 
                        projectInfo={projectDetailsCardData.projectInfo} 
                        onEdit={canManageProject ? handleEdit : undefined}
                        onDelete={canManageProject ? handleDeleteClick : undefined}
                    />
                    <ProjectVisualsCard visuals={project.visuals} />
                </div>
                
                <div className="w-full xl:w-[384px] space-y-6">
                     <div className="flex flex-col gap-2 bg-zinc-100 p-1 rounded-full">
                        <div className="flex flex-1 gap-2">
                           <TimelineDialog />
                            {canViewPayments && (
                                <PaymentsDialog>
                                     <Button
                                        variant="link"
                                        className="text-black text-lg hover:bg-primary/10 hover:text-primary flex-1 rounded-full bg-white hover:no-underline w-full h-[54px]"
                                    >
                                        Payments
                                    </Button>
                                </PaymentsDialog>
                            )}
                        </div>
                        <DesignDocumentsDialog files={project.files} />
                    </div>
                     <ProjectMaterialsCard materials={project.materials} />
                </div>
            </div>
             {projectToEdit && (
                <CreateProjectSheet
                    projectToEdit={projectToEdit}
                    onProjectUpdated={handleProjectUpdated}
                    onOpenChange={(isOpen) => !isOpen && setProjectToEdit(null)} onProjectAdded={function (project: Project): void {
                        throw new Error('Function not implemented.');
                    } }
                />
            )}

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
