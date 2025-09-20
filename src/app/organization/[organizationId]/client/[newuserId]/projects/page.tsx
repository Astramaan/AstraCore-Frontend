
'use client';

import { ClientBottomNav } from "@/components/client-bottom-nav";
import Image from "next/image";
import { Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const completedProjects = [
    {
        name: "Arvind Kumar",
        location: "Bengaluru",
        area: "1200 Sq. Feet",
        type: "3BHK Duplex villa",
        orientation: "West",
        videoThumbnail: "https://picsum.photos/seed/project1/600/400",
        images: [
            "https://picsum.photos/seed/p1i1/100/100",
            "https://picsum.photos/seed/p1i2/100/100",
            "https://picsum.photos/seed/p1i3/100/100",
            "https://picsum.photos/seed/p1i4/100/100",
        ],
        testimonial: "habi has satisfied all my requirements and has done a very beautiful and quality construction. Their architects visited the site and made a convenient plan despite difficulties due to COVID 19. Overall we are very happy with the construction of our house."
    },
    {
        name: "Arvind Kumar",
        location: "Bengaluru",
        area: "1200 Sq. Feet",
        type: "3BHK Duplex villa",
        orientation: "West",
        videoThumbnail: "https://picsum.photos/seed/project2/600/400",
        images: [
            "https://picsum.photos/seed/p2i1/100/100",
            "https://picsum.photos/seed/p2i2/100/100",
            "https://picsum.photos/seed/p2i3/100/100",
            "https://picsum.photos/seed/p2i4/100/100",
        ],
        testimonial: "habi has satisfied all my requirements and has done a very beautiful and quality construction. Their architects visited the site and made a convenient plan despite difficulties due to COVID 19. Overall we are very happy with the construction of our house."
    }
];

const ongoingProjects = [
    {
        name: "Arvind Kumar",
        location: "Bengaluru",
        area: "1200 Sq. Feet",
        type: "3BHK Duplex villa",
        orientation: "West",
        mainImage: "https://picsum.photos/seed/project3/600/400",
        images: [
            "https://picsum.photos/seed/p3i1/100/100",
            "https://picsum.photos/seed/p3i2/100/100",
            "https://picsum.photos/seed/p3i3/100/100",
            "https://picsum.photos/seed/p3i4/100/100",
        ]
    },
     {
        name: "Arvind Kumar",
        location: "Bengaluru",
        area: "1200 Sq. Feet",
        type: "3BHK Duplex villa",
        orientation: "West",
        mainImage: "https://picsum.photos/seed/project4/600/400",
        images: [
            "https://picsum.photos/seed/p4i1/100/100",
            "https://picsum.photos/seed/p4i2/100/100",
            "https://picsum.photos/seed/p4i3/100/100",
            "https://picsum.photos/seed/p4i4/100/100",
        ]
    }
];

const ProjectCard = ({ project, isCompleted }: { project: any, isCompleted: boolean }) => (
    <div className="bg-white rounded-[50px] p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-64 h-40 bg-zinc-100 rounded-[30px] flex items-center justify-center shrink-0">
                {isCompleted ? (
                    <>
                        <Image src={project.videoThumbnail} alt={project.name} width={600} height={400} className="object-cover rounded-[30px] w-full h-full" data-ai-hint="house exterior"/>
                        <div className="absolute inset-0 bg-black/30 rounded-[30px]"></div>
                        <Button variant="ghost" className="w-16 h-16 bg-red-600/50 rounded-full flex items-center justify-center hover:bg-red-600/70 absolute z-10">
                            <Youtube className="w-8 h-8 text-white"/>
                        </Button>
                    </>
                ) : (
                    <Image src={project.mainImage} alt={project.name} width={600} height={400} className="object-cover rounded-[30px] w-full h-full" data-ai-hint="modern house"/>
                )}
            </div>
            <div className="space-y-1 text-zinc-600">
                <h3 className="text-xl font-semibold text-black">{project.name}</h3>
                <p>{project.location}</p>
                <p>{project.area}</p>
                <p>{project.type}</p>
                <p>Orientation: {project.orientation}</p>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
            {project.images.map((img: string, i: number) => (
                <div key={i} className="relative aspect-square">
                    <Image src={img} alt={`Project image ${i+1}`} width={100} height={100} className="object-cover rounded-[30px] w-full h-full" data-ai-hint="house interior"/>
                </div>
            ))}
        </div>
        {isCompleted && (
            <p className="text-zinc-600 pt-2">{project.testimonial}</p>
        )}
    </div>
)


export default function ProjectsPage() {
    return (
        <div className="bg-zinc-100 min-h-screen">
            <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-32">
                

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center">Completed</h2>
                    <div className="space-y-6">
                        {completedProjects.map((p, i) => <ProjectCard key={i} project={p} isCompleted={true} />)}
                    </div>
                </div>

                <Separator className="my-8"/>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center">Ongoing</h2>
                    <div className="space-y-6">
                        {ongoingProjects.map((p, i) => <ProjectCard key={i} project={p} isCompleted={false} />)}
                    </div>
                </div>

            </main>
            <ClientBottomNav />
        </div>
    )
}
