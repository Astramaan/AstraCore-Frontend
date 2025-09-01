
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MoreVertical, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import PdfIcon from './icons/pdf-icon';
import { Badge } from './ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface File {
    name: string;
    date: string;
    version?: string;
}

interface Material {
    name: string;
    image: string;
    description: string;
}

interface ProjectFilesCardProps {
    files: {
        initial: File[];
        costing: File[];
        architecture: File[];
        structure: File[];
        sanction: File[];
        construction: File[];
    };
    materials: Material[];
}

const FileSection = ({ title, files }: { title: string, files: File[] }) => (
    <div className="space-y-4">
        <p className="text-sm text-stone-400">{title}</p>
        {files.map((file, index) => (
            <React.Fragment key={index}>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <p className="text-sm">{index + 1}.</p>
                        <PdfIcon className="w-6 h-6 shrink-0" />
                        <div className="flex-1">
                            <p className="text-base text-black font-medium">{file.name}</p>
                            <p className="text-xs text-stone-400">{file.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {file.version && (
                            <Badge variant="outline" className="bg-cyan-500/10 text-cyan-500 border-cyan-500">{file.version}</Badge>
                        )}
                        <Button variant="ghost" size="icon" className="w-6 h-6">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                {index < files.length - 1 && <Separator />}
            </React.Fragment>
        ))}
    </div>
);

export const ProjectFilesCard = ({ files, materials }: ProjectFilesCardProps) => {
    return (
        <Card className="rounded-[20px] border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-lg">Design & Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <FileSection title="Initial" files={files.initial} />
                <Separator />
                <FileSection title="Costing" files={files.costing} />
                <Separator />
                <FileSection title="Architecture Design" files={files.architecture} />
                <Separator />
                <FileSection title="Structure Design" files={files.structure} />
                <Separator />
                <FileSection title="Sanction Drawings" files={files.sanction} />
                <Separator />
                <FileSection title="Construction Drawings" files={files.construction} />
                 <Separator />
                <div>
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Materials</h3>
                        <Button variant="link" className="text-cyan-500 p-0 h-auto">
                            View more <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {materials.map((material, index) => (
                             <React.Fragment key={index}>
                                <div className="flex gap-4">
                                    <Image src={material.image} alt={material.name} width={67} height={67} className="rounded-[10px] border border-stone-300" data-ai-hint="construction material" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{material.name}</p>
                                        <p className="text-xs text-stone-400 line-clamp-3">{material.description}</p>
                                    </div>
                                </div>
                                {index < materials.length - 1 && <Separator />}
                             </React.Fragment>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
