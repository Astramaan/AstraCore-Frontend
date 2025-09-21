
'use client';

import React from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { ProjectFilesCard } from '@/components/project-files-card';
import { ProjectVisualsCard } from '@/components/project-visuals-card';
import { ProjectMaterialsCard } from '@/components/project-materials-card';


const fileSections = [
    {
        title: 'Initial',
        files: [{ id: 'init-1', name: 'Initial Layout', date: '28 July 2024', version: 'version 1', history: [] }]
    },
    {
        title: 'Costing',
        files: [
            { id: 'cost-1', name: 'Tentative Quotation', date: '28 July 2024', history: [] },
            { id: 'cost-2', name: 'Bill of Quantity', date: '28 July 2024', history: [] }
        ]
    },
    {
        title: 'Architecture Design',
        files: [
            { id: 'arch-1', name: 'Architecture Schematic Drawings', date: '28 July 2024', version: 'version 1', history: [] },
            { id: 'arch-2', name: 'Architecture Concept Designs', date: '28 July 2024', version: 'version 1', history: [] },
            { id: 'arch-3', name: 'Interior Concept Designs', date: '28 July 2024', version: 'version 1', history: [] }
        ]
    },
    {
        title: 'Structure Design',
        files: [
            { id: 'struct-1', name: 'Soil Testing Report', date: '28 July 2024', history: [] },
            { id: 'struct-2', name: 'Structure Analysis Report', date: '28 July 2024', history: [] }
        ]
    },
    {
        title: 'Sanction Drawings',
        files: [{ id: 'sanc-1', name: 'Sanction Drawing', date: '28 July 2024', history: [] }]
    },
    {
        title: 'Construction Drawings',
        files: [
            { id: 'cons-1', name: 'Tender Drawings', date: '28 July 2024', history: [] },
            { id: 'cons-2', name: 'Structure GFC Drawings', date: '28 July 2024', history: [] },
            { id: 'cons-3', name: 'Civil GFC Drawings', date: '28 July 2024', history: [] },
            { id: 'cons-4', name: 'Architecture GFC Drawings', date: '28 July 2024', history: [] },
            { id: 'cons-5', name: 'Interior GFC Drawings', date: '28 July 2024', history: [] },
            { id: 'cons-6', name: 'Electrical Drawings', date: '28 July 2024', history: [] },
            { id: 'cons-7', name: 'Plumbing Package', date: '28 July 2024', history: [] },
            { id: 'cons-8', name: 'Passive Cooling Package', date: '28 July 2024', history: [] },
            { id: 'cons-9', name: 'Miscellaneous Package', date: '28 July 2024', history: [] }
        ]
    }
];

const visuals = {
    "3d": Array(5).fill("https://placehold.co/100x100"),
    gallery: Array(24).fill("https://placehold.co/100x100"),
};

const materials = [
    {
        name: 'Tata Steel',
        description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa',
        image: 'https://placehold.co/67x67'
    },
    {
        name: 'Tata Steel',
        description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa',
        image: 'https://placehold.co/67x67'
    },
    {
        name: 'Tata Steel',
        description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa',
        image: 'https://placehold.co/67x67'
    }
];

const projectData = {
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
    }
};

export default function ClientProjectDetailsPage() {
    return (
        <div className="bg-background">
            <main className="max-w-[1240px] mx-auto md:p-8 space-y-8">
                <ProjectDetailsCard 
                    projectInfo={projectData.projectInfo}
                />
                <ProjectFilesCard files={{
                    initial: fileSections.find(s => s.title === 'Initial')?.files || [],
                    costing: fileSections.find(s => s.title === 'Costing')?.files || [],
                    architecture: fileSections.find(s => s.title === 'Architecture Design')?.files || [],
                    structure: fileSections.find(s => s.title === 'Structure Design')?.files || [],
                    sanction: fileSections.find(s => s.title === 'Sanction Drawings')?.files || [],
                    construction: fileSections.find(s => s.title === 'Construction Drawings')?.files || [],
                }} />
                
                <ProjectVisualsCard visuals={visuals} />
                
                <ProjectMaterialsCard materials={materials} />

            </main>
        </div>
    );
}
