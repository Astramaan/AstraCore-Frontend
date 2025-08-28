

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { AddSnagSheet } from '@/components/add-snag-sheet';

const projects = [
    {
        projectName: 'Charan Project',
        projectId: 'CHA2024',
        snags: [
            {
                title: 'Material Damage',
                description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
                createdBy: 'Yaswanth',
                createdAt: '01 June 2024, 11:00am',
                status: 'Open',
                subStatus: 'unresolved',
                statusColor: 'text-red-600',
                image: 'https://placehold.co/60x60'
            },
            {
                title: 'Material Damage',
                description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
                createdBy: 'Yaswanth',
                createdAt: '01 June 2024, 11:00am',
                status: 'Closed',
                subStatus: 'Resolved',
                statusColor: 'text-cyan-500',
                image: 'https://placehold.co/60x60'
            },
             {
                title: 'Material Damage',
                description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
                createdBy: 'Yaswanth',
                createdAt: '01 June 2024, 11:00am',
                status: 'Closed',
                subStatus: 'Resolved',
                statusColor: 'text-cyan-500',
                image: 'https://placehold.co/60x60'
            },
        ]
    },
    {
        projectName: 'Satish Project',
        projectId: 'SAT2024',
        snags: [
             {
                title: 'Material Damage',
                description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
                createdBy: 'Yaswanth',
                createdAt: '01 June 2024, 11:00am',
                status: 'Open',
                subStatus: 'unresolved',
                statusColor: 'text-red-600',
                image: 'https://placehold.co/60x60'
            },
        ]
    }
];

const SnagRow = ({ snag, isHighlighted }: { snag: typeof projects[0]['snags'][0], isHighlighted?: boolean }) => (
  <div className={cn("grid grid-cols-12 items-center py-3 gap-4", isHighlighted && "bg-yellow-500/10 rounded-lg")}>
    <div className="col-span-1 flex justify-center"><Checkbox /></div>
    <div className="col-span-3 flex items-center gap-4">
      <Image src={snag.image} alt={snag.title} width={60} height={60} className="rounded-lg" data-ai-hint="defect photo"/>
      <p className="font-medium">{snag.title}</p>
    </div>
    <div className="col-span-3">
        <p className="line-clamp-2">{snag.description}</p>
    </div>
    <div className="col-span-2 text-center">
        <p>{snag.createdBy}</p>
        <p className="text-sm text-muted-foreground">{snag.createdAt}</p>
    </div>
    <div className="col-span-2 text-center">
        <p className={snag.statusColor}>{snag.status}</p>
        <p className="text-sm text-muted-foreground">{snag.subStatus}</p>
    </div>
    <div className="col-span-1 flex justify-center">
      <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
    </div>
  </div>
);


export default function SnagListPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [openProjects, setOpenProjects] = useState<string[]>(projects.map(p => p.projectName));

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">Snag List</h2>
            <AddSnagSheet />
        </div>
        
        <Card className="rounded-2xl">
            <CardContent className="p-0">
                <div className="grid grid-cols-12 p-4 text-muted-foreground font-medium">
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Snag Title</div>
                    <div className="col-span-3">Description</div>
                    <div className="col-span-2 text-center">Created By</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-1"></div>
                </div>

                <Accordion type="multiple" value={openProjects} onValueChange={setOpenProjects} className="w-full">
                    {projects.map((project, index) => (
                        <AccordionItem value={project.projectName} key={project.projectName} className="border-t">
                            <AccordionTrigger className="p-4 hover:no-underline">
                                 <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-medium">{project.projectName}</h2>
                                    <div className="px-2.5 py-1 bg-zinc-100 rounded-md text-xs">{project.projectId}</div>
                                 </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                               <div className="divide-y divide-border">
                                   {project.snags.map((snag, snagIndex) => (
                                        <SnagRow key={snagIndex} snag={snag} isHighlighted={index === 1 && snagIndex === 0} />
                                    ))}
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
