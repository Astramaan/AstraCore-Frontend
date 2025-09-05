
import React from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { ProjectFilesCard } from '@/components/project-files-card';
import { ProjectVisualsCard } from '@/components/project-visuals-card';
import { ProjectInfoHeader } from '@/components/project-info-header';
import { ProjectMaterialsCard } from '@/components/project-materials-card';
import { TimelineDialog } from '@/components/timeline-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DesignDocumentsDialog } from '@/components/design-documents-dialog';
import { PaymentsDialog } from '@/components/payments-dialog';
import { getProjectDetails } from '@/lib/data';

const mockProject = {
    id: "YAS2024",
    name: "Yash",
    coverImage: "https://placehold.co/1216x144",
    profileImage: "https://placehold.co/94x94",
    progress: 25,
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

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
    const project = await getProjectDetails(params.id) || mockProject;

    return (
        <div className="space-y-6">
            <ProjectInfoHeader project={project} />

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6">
                <div className="space-y-6">
                    <ProjectDetailsCard personalInfo={project.personalInfo} projectInfo={project.projectInfo} />
                    <ProjectVisualsCard visuals={project.visuals} />
                </div>
                
                <div className="w-full xl:w-[384px] space-y-6">
                     <div className="flex gap-2 bg-zinc-100 p-1 rounded-full">
                        <TimelineDialog />
                        <PaymentsDialog />
                        <DesignDocumentsDialog files={project.files} />
                    </div>
                     <ProjectMaterialsCard materials={project.materials} />
                </div>
            </div>
        </div>
    );
}
