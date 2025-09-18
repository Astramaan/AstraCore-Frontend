
'use client';

import React, { useState, useEffect, use } from 'react';
import { ProjectInfoHeader } from '@/components/project-info-header';
import { getProjectDetails, Project } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Timeline, Home, Phone, Mail, FileText, Bot, Camera } from 'lucide-react';
import { ProjectVisualsCard } from '@/components/project-visuals-card';
import { ProjectTimelineStages, CustomStage } from '@/components/project-timeline-stages';


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
    timeline: [
         { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'completed', type: 'stage' },
         { id: 4, title: 'Excavation', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'ongoing', type: 'stage'},
         { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'upcoming', type: 'stage' },
    ],
    projectManager: {
        name: 'Priya',
        avatar: 'https://placehold.co/40x40.png'
    }
};

const ClientInfoCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-base font-medium">{value}</p>
        </div>
    </div>
);

export default function ProjectClientViewPage({ params }: { params: { id: string } }) {
    const { id } = use(params);
    const [project, setProject] = useState<(Project & typeof mockProject) | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            const projectDetails = await getProjectDetails(id);
            if (projectDetails) {
                 const displayProject = { ...mockProject, ...projectDetails, name: projectDetails.name || mockProject.name };
                setProject(displayProject as any);
            }
        };
        fetchProject();
    }, [id]);
    
    if (!project) {
        return <div className="p-8 text-center">Loading project details...</div>;
    }

    return (
        <div className="bg-zinc-100 min-h-screen">
            <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
                <ProjectInfoHeader project={project} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                    <div className="space-y-6">
                        <Card className="rounded-[50px] p-6">
                            <CardHeader className="p-0">
                                <CardTitle className="text-xl">Project Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-4">
                                <ProjectTimelineStages stages={project.timeline as CustomStage[]} />
                            </CardContent>
                        </Card>
                        <ProjectVisualsCard visuals={project.visuals} />
                    </div>

                    <div className="space-y-6">
                        <Card className="rounded-[50px] p-6">
                             <CardHeader className="p-0 mb-4">
                                <CardTitle className="text-xl">Your Project Manager</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-14 h-14">
                                        <AvatarImage src={project.projectManager.avatar} />
                                        <AvatarFallback>{project.projectManager.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-lg font-semibold">{project.projectManager.name}</p>
                                    </div>
                                    <Button className="ml-auto rounded-full" size="icon"><Phone className="h-5 w-5"/></Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-[50px] p-6">
                             <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-xl">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-24 flex-col gap-2 text-base rounded-3xl"><Timeline />Timeline</Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 text-base rounded-3xl"><FileText />Documents</Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 text-base rounded-3xl"><Bot />AI Assistant</Button>
                                <Button variant="outline" className="h-24 flex-col gap-2 text-base rounded-3xl"><Camera />Visuals</Button>
                            </CardContent>
                        </Card>
                         <Card className="rounded-[50px] p-6">
                             <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-xl">Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-4">
                                <ClientInfoCard label="Address" value={project.personalInfo.address} icon={<Home className="w-6 h-6"/>}/>
                                <ClientInfoCard label="Site Dimension" value={project.projectInfo.dimension} icon={<Home className="w-6 h-6"/>}/>
                                <ClientInfoCard label="Floors" value={project.projectInfo.floors} icon={<Home className="w-6 h-6"/>}/>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}


    