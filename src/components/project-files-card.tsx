
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MoreVertical } from 'lucide-react';
import { Separator } from './ui/separator';
import PdfIcon from './icons/pdf-icon';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface File {
    name: string;
    date: string;
    version?: string;
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

export const ProjectFilesCard = ({ files }: ProjectFilesCardProps) => {
    return (
        <Card className="rounded-[50px] border border-stone-300">
            <CardHeader className="flex flex-row justify-between items-center">
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
            </CardContent>
        </Card>
    );
};
