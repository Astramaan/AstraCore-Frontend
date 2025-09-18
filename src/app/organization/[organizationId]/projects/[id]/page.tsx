

'use client';

import React, { useState, useEffect, use } from 'react';
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
import { ShieldAlert, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DesignDocumentsDialog } from '@/components/design-documents-dialog';
import { useUser } from '@/context/user-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


const mockProject = {
    id: "YAS2024",
    name: "Yash",
    coverImage: "https://placehold.co/1216x144",
    profileImage: "https://placehold.co/94x94",
    progress: 25,
    contact: "yash69@gmail.com | 1234567890",
    city: "Bengaluru",
    startDate: "25 May 2024",
    status: "On going",
    statusColor: "text-green-600",
    image: "https://placehold.co/59x59",
    // Adding createdBy field for permission check
    createdBy: "pm_user_id", // This should come from your data source
    personalInfo: {
        name: "Yash",
        clientId: "YAS2024",
        phone: "1234567890",
        email: "yash69@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
    },
    projectInfo: {
        cost: "1.5 cr",
        duration: {
            start: "25 May 2024",
            end: "1 Dec 2024"
        },
        dimension: "1200 Sq. ft",
        floors: "G+1",
        status: "On going",
        locationLink: "https://maps.google.com"
    },
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
            { id: 'arch-3', name: "Interior Concept Design", date: "28 July 2024", version: "V 1", history: [] },
        ],
        structure: [
            { id: 'struct-1', name: "Soil Testing Report", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'struct-2', name: "Structure Analysis Report", date: "28 July 2024", version: "V 1", history: [] },
        ],
        sanction: [{ id: 'sanc-1', name: "Sanction Drawing", date: "28 July 2024", version: "V 1", history: [] }],
        construction: [
            { id: 'cons-1', name: "Tender Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-2', name: "Structure GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-3', name: "Civil GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-4', name: "Architecture GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-5', name: "Interior GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-6', name: "Electrical Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-7', name: "Plumbing Package", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-8', name: "Passive Cooling Package", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-9', name: "Miscellaneous Package", date: "28 July 2024", version: "V 1", history: [] },
        ],
    },
    timeline: {
        // Mock timeline data
    }
};

export default function ProjectDetailsPage({ params }: { params: { organizationId: string, id: string } }) {
    const { id, organizationId } = use(params);
    const { user } = useUser();
    const [project, setProject] = useState<(Project & typeof mockProject) | null>(null);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const fetchProject = async () => {
            const projectDetails = await getProjectDetails(id);
            if (projectDetails) {
                 const displayProject = { ...mockProject, ...projectDetails, name: projectDetails.name || mockProject.name, personalInfo: { ...mockProject.personalInfo, name: projectDetails.name || mockProject.personalInfo.name } };
                setProject(displayProject as any);
            }
        };
        fetchProject();
    }, [id]);

    const canManageProject = user?.roleType === 'superAdmin' || (user?.team === 'Project Manager' && user.userId === project?.createdBy);

    if (!project) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Loading project details...</p>
            </div>
        );
    }
    
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
                toast({
                    title: 'Success',
                    description: result.message,
                });
                router.push('/organization/projects');
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
        setProject(prev => prev ? { ...prev, ...updatedProject } : null);
    };
    
    const canViewPayments = user?.roleType === 'superAdmin' || user?.team === 'Project Manager';

    return (
        <div className="space-y-6">
            <ProjectInfoHeader project={project} />

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6">
                <div className="space-y-6">
                    <ProjectDetailsCard 
                        personalInfo={project.personalInfo} 
                        projectInfo={project.projectInfo} 
                        onEdit={canManageProject ? () => handleEdit(project) : undefined}
                        onDelete={canManageProject ? () => handleDeleteClick(project) : undefined}
                    />
                    <ProjectVisualsCard visuals={project.visuals} />
                </div>
                
                <div className="w-full xl:w-[384px] space-y-6">
                     <div className="flex flex-col gap-2 bg-zinc-100 p-1 rounded-full">
                        <div className="flex flex-1 gap-2">
                           <TimelineDialog />
                           {canViewPayments ? <PaymentsDialog /> : <DesignDocumentsDialog files={project.files} />}
                        </div>
                        {canViewPayments && <DesignDocumentsDialog files={project.files} />}
                        <Link href={`/organization/${organizationId}/projects/${id}/client`} legacyBehavior>
                            <a target="_blank" className="w-full">
                                <Button
                                    variant="link"
                                    className="text-black text-lg hover:bg-primary/10 hover:text-primary flex-1 rounded-full bg-white hover:no-underline w-full h-[54px]"
                                >
                                    <Eye className="mr-2 h-5 w-5" />
                                    View Client Version
                                </Button>
                            </a>
                        </Link>
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

    

    
