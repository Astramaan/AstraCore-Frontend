
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, ArrowRight, Eye, Upload, Trash2, Replace } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import PdfIcon from '@/components/icons/pdf-icon';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const fileSections = [
    {
        title: 'Initial',
        files: [{ name: 'Initial Layout', date: '28 July 2024', version: 'version 1' }]
    },
    {
        title: 'Costing',
        files: [
            { name: 'Tentative Quotation', date: '28 July 2024' },
            { name: 'Bill of Quantity', date: '28 July 2024' }
        ]
    },
    {
        title: 'Architecture Design',
        files: [
            { name: 'Architecture Schematic Drawings', date: '28 July 2024', version: 'version 1' },
            { name: 'Architecture Concept Designs', date: '28 July 2024', version: 'version 1' },
            { name: 'Interior Concept Designs', date: '28 July 2024', version: 'version 1' }
        ]
    },
    {
        title: 'Structure Design',
        files: [
            { name: 'Soil Testing Report', date: '28 July 2024' },
            { name: 'Structure Analysis Report', date: '28 July 2024' }
        ]
    },
    {
        title: 'Sanction Drawings',
        files: [{ name: 'Sanction Drawing', date: '28 July 2024' }]
    },
    {
        title: 'Construction Drawings',
        files: [
            { name: 'Tender Drawings', date: '28 July 2024' },
            { name: 'Structure GFC Drawings', date: '28 July 2024' },
            { name: 'Civil GFC Drawings', date: '28 July 2024' },
            { name: 'Architecture GFC Drawings', date: '28 July 2024' },
            { name: 'Interior GFC Drawings', date: '28 July 2024' },
            { name: 'Electrical Drawings', date: '28 July 2024' },
            { name: 'Plumbing Package', date: '28 July 2024' },
            { name: 'Passive Cooling Package', date: '28 July 2024' },
            { name: 'Miscellaneous Package', date: '28 July 2024' }
        ]
    }
];

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

const FileItem = ({ index, name, date, version }: { index: number, name: string, date: string, version?: string }) => (
    <div className="flex items-center gap-4 py-3">
        <span className="text-muted-foreground">{index + 1}.</span>
        <PdfIcon />
        <div className="flex-1">
            <p className="font-medium text-black">{name}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        {version && <Badge variant="outline" className="border-primary text-primary bg-primary/10">{version}</Badge>}
        <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-muted-foreground" /></Button>
    </div>
);

const VisualsCard = ({ title, images }: { title: string, images: string[] }) => (
    <Card className="rounded-[30px]">
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                <Button variant="link" className="text-primary p-0 h-auto">View more <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.slice(0, 4).map((src, i) => (
                <div key={i} className="relative aspect-square">
                    <Image src={src} alt={`${title} ${i + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
                     {i === 3 && images.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <p className="text-white text-lg font-bold">+{images.length - 4}</p>
                        </div>
                    )}
                </div>
            ))}
        </CardContent>
    </Card>
);


export default function ClientProjectDetailsPage() {
    return (
        <div className="bg-background">
            <main className="max-w-[1240px] mx-auto p-4 md:p-8 space-y-8">
                <Card className="rounded-[50px] p-6 md:p-10">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xl font-medium">My Project</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                         {fileSections.map((section, sectionIndex) => (
                            <div key={section.title + sectionIndex} className="mb-6">
                                <h3 className="text-base text-muted-foreground mb-2">{section.title}</h3>
                                <div className="space-y-2">
                                    {section.files.map((file, fileIndex) => (
                                        <React.Fragment key={`${file.name}-${fileIndex}`}>
                                            <FileItem index={fileIndex} {...file} />
                                            {fileIndex < section.files.length - 1 && <Separator />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                <VisualsCard title="3D Visualize" images={Array(5).fill("https://placehold.co/100x100")} />
                
                <Card className="rounded-[30px]">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-medium">Materials</CardTitle>
                            <Button variant="link" className="text-primary p-0 h-auto">View more <ArrowRight className="w-4 h-4 ml-1" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {materials.map((material, i) => (
                            <React.Fragment key={i}>
                                <div className="flex gap-4 items-center">
                                    <Image src={material.image} alt={material.name} width={67} height={67} className="rounded-lg" />
                                    <div className="flex-1">
                                        <p className="font-semibold">{material.name}</p>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
                                    </div>
                                </div>
                                {i < materials.length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </CardContent>
                </Card>
                
                <VisualsCard title="Gallery" images={Array(24).fill("https://placehold.co/100x100")} />

            </main>
        </div>
    );
}
