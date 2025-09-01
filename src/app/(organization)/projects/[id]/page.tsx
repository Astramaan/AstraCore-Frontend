
import React from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { ProjectFilesCard } from '@/components/project-files-card';
import { ProjectTimelineGantt } from '@/components/project-timeline-gantt';
import { ProjectVisualsCard } from '@/components/project-visuals-card';
import { ProjectInfoHeader } from '@/components/project-info-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GanttChartSquare, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';

const mockProject = {
    id: "YAS2024",
    name: "Yash",
    coverImage: "https://placehold.co/712x144",
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
        initial: [{ name: "Initial Layout", date: "28 July 2024" }],
        costing: [
            { name: "Tentative Quotation", date: "28 July 2024" },
            { name: "Bill of Quantity", date: "28 July 2024" },
        ],
        architecture: [
            { name: "Architecture Schematic Drawing", date: "28 July 2024", version: "V 1" },
            { name: "Architecture Concept Design", date: "28 July 2024", version: "V 1" },
            { name: "Interior Concept Design", date: "28 July 2024", version: "V 1" },
        ],
        structure: [
            { name: "Soil Testing Report", date: "28 July 2024" },
            { name: "Structure Analysis Report", date: "28 July 2024" },
        ],
        sanction: [{ name: "Sanction Drawing", date: "28 July 2024" }],
        construction: [
            { name: "Tender Drawing", date: "28 July 2024" },
            { name: "Structure GFC Drawing", date: "28 July 2024" },
            { name: "Civil GFC Drawing", date: "28 July 2024" },
            { name: "Architecture GFC Drawing", date: "28 July 2024" },
            { name: "Interior GFC Drawing", date: "28 July 2024" },
            { name: "Electrical Drawing", date: "28 July 2024" },
            { name: "Plumbing Package", date: "28 July 2024" },
            { name: "Passive Cooling Package", date: "28 July 2024" },
            { name: "Miscellaneous Package", date: "28 July 2024" },
        ],
    },
    timeline: {
        // Mock timeline data
    }
};

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch project data based on params.id
    const project = mockProject;

    return (
        <div className="space-y-6">
            <ProjectInfoHeader project={project} />

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6 mt-20">
                <div className="space-y-6">
                    <ProjectDetailsCard personalInfo={project.personalInfo} projectInfo={project.projectInfo} />
                    <ProjectVisualsCard visuals={project.visuals} />
                    <ProjectTimelineGantt />
                </div>
                
                <div className="w-full xl:w-[384px]">
                     <Card className="rounded-[20px] border border-stone-300">
                        <Tabs defaultValue="timeline" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-auto p-2 bg-transparent gap-2">
                                <TabsTrigger value="timeline" className="rounded-[10px] py-4 data-[state=active]:bg-zinc-100 data-[state=active]:text-black data-[state=inactive]:text-zinc-400">Timeline</TabsTrigger>
                                <TabsTrigger value="payment" className="rounded-[10px] py-4 data-[state=active]:bg-zinc-100 data-[state=active]:text-black data-[state=inactive]:text-zinc-400">Payment</TabsTrigger>
                            </TabsList>
                            <TabsContent value="timeline" className="mt-0">
                               <ProjectFilesCard files={project.files} materials={project.materials} />
                            </TabsContent>
                             <TabsContent value="payment" className="mt-0">
                                <div className="p-4 text-center text-muted-foreground">Payment details will be shown here.</div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
}
