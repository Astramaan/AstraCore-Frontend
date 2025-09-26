'use client';

import React from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { ProjectFilesCard, type Phase } from '@/components/project-files-card';
import { ProjectVisualsCard } from '@/components/project-visuals-card';
import { ProjectMaterialsCard } from '@/components/project-materials-card';
import { ClientHeader } from '@/components/client-header';


const mockTimeline: Phase[] = [
    {
        name: 'Design',
        stages: [
            { 
                name: 'Architecture Schematic Drawings', 
                documents: [{ id: 'arch-1', name: 'Architecture Schematic Drawings', date: '28 July 2024', version: 'version 1', history: [] }]
            },
            { 
                name: 'Architecture Concept Designs',
                documents: [{ id: 'arch-2', name: 'Architecture Concept Designs', date: '28 July 2024', version: 'version 1', history: [] }]
            },
            { 
                name: 'Interior Concept Designs',
                documents: [{ id: 'arch-3', name: 'Interior Concept Designs', date: '28 July 2024', version: 'version 1', history: [] }]
            }
        ]
    },
    {
        name: 'Structure',
        stages: [
            {
                name: 'Soil Testing Report',
                documents: [{ id: 'struct-1', name: 'Soil Testing Report', date: '28 July 2024', history: [] }]
            },
             {
                name: 'Structure Analysis Report',
                documents: [{ id: 'struct-2', name: 'Structure Analysis Report', date: '28 July 2024', history: [] }]
            }
        ]
    },
    {
        name: 'Construction',
        stages: [
             { name: 'Tender Drawings', documents: [{ id: 'cons-1', name: 'Tender Drawings', date: '28 July 2024', history: [] }]},
             { name: 'Structure GFC Drawings', documents: [{ id: 'cons-2', name: 'Structure GFC Drawings', date: '28 July 2024', history: [] }]},
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
            <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4">
                <ClientHeader />
            </header>
            <main className="max-w-[1240px] mx-auto md:p-8 space-y-8">
                <ProjectDetailsCard 
                    projectInfo={projectData.projectInfo}
                />
                <ProjectFilesCard phases={mockTimeline} />
                
                <ProjectVisualsCard visuals={visuals} />
                
                <ProjectMaterialsCard materials={materials} />

            </main>
        </div>
    );
}
