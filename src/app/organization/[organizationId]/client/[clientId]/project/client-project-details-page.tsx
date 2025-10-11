"use client";

import React from "react";
import { ProjectDetailsCard } from "@/components/project-details-card";
import { ProjectFilesCard, type Phase } from "@/components/project-files-card";
import { ProjectVisualsCard } from "@/components/project-visuals-card";
import { ProjectMaterialsCard } from "@/components/project-materials-card";

const mockTimeline: Phase[] = [
  {
    name: "Design",
    stages: [
      {
        name: "Architecture Schematic Drawings",
        documents: [
          {
            id: "arch-1",
            name: "Architecture Schematic Drawings",
            date: "28 July 2024",
            version: "version 1",
            history: [],
          },
        ],
      },
      {
        name: "Architecture Concept Designs",
        documents: [
          {
            id: "arch-2",
            name: "Architecture Concept Designs",
            date: "28 July 2024",
            version: "version 1",
            history: [],
          },
        ],
      },
      {
        name: "Interior Concept Designs",
        documents: [
          {
            id: "arch-3",
            name: "Interior Concept Designs",
            date: "28 July 2024",
            version: "version 1",
            history: [],
          },
        ],
      },
    ],
  },
  {
    name: "Structure",
    stages: [
      {
        name: "Soil Testing Report",
        documents: [
          {
            id: "struct-1",
            name: "Soil Testing Report",
            date: "28 July 2024",
            history: [],
          },
        ],
      },
      {
        name: "Structure Analysis Report",
        documents: [
          {
            id: "struct-2",
            name: "Structure Analysis Report",
            date: "28 July 2024",
            history: [],
          },
        ],
      },
    ],
  },
  {
    name: "Construction",
    stages: [
      {
        name: "Tender Drawings",
        documents: [
          {
            id: "cons-1",
            name: "Tender Drawings",
            date: "28 July 2024",
            history: [],
          },
        ],
      },
      {
        name: "Structure GFC Drawings",
        documents: [
          {
            id: "cons-2",
            name: "Structure GFC Drawings",
            date: "28 July 2024",
            history: [],
          },
        ],
      },
    ],
  },
];

const visuals = {
  "3d": Array(5).fill("https://placehold.co/100x100"),
  gallery: Array(24).fill("https://placehold.co/100x100"),
};

const materials = [
  {
    name: "Tata Steel",
    description:
      "Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa",
    image: "https://placehold.co/67x67",
  },
  {
    name: "Tata Steel",
    description:
      "Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa",
    image: "https://placehold.co/67x67",
  },
  {
    name: "Tata Steel",
    description:
      "Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa",
    image: "https://placehold.co/67x67",
  },
];

const projectData = {
  personalInfo: {
    name: "Yash",
    clientId: "YAS2024",
    phone: "1234567890",
    email: "yash69@gmail.com",
    address:
      "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
  },
  projectInfo: {
    cost: "1.5 cr",
    duration: {
      start: "25 May 2024",
      end: "1 Dec 2024",
    },
    dimension: "1200 Sq. ft",
    floors: "G+1",
    status: "On going",
    locationLink: "https://maps.google.com",
  },
};

export default function ClientProjectDetailsPage() {
  return (
    <div className="bg-background">
      <main className="max-w-[1440px] 2xl:max-w-none mx-auto p-4 md:p-8 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-3 lg:grid-rows-[auto_1fr] md:gap-8">
        <div className="md:col-span-2 lg:col-span-5 xl:col-span-3">
          <ProjectDetailsCard projectInfo={projectData.projectInfo} />
        </div>
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 lg:row-start-2">
          <ProjectFilesCard phases={mockTimeline} />
        </div>
        <div className="space-y-8 md:col-span-2 lg:col-span-2 xl:col-span-1 lg:row-start-2">
          <ProjectVisualsCard visuals={visuals} />
          <ProjectMaterialsCard materials={materials} />
        </div>
      </main>
    </div>
  );
}
