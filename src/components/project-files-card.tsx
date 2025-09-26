'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import PdfIcon from './icons/pdf-icon';
import { Dialog, DialogContent, DialogHeader as DialogPrimitiveHeader, DialogTitle as DialogPrimitiveTitle, DialogClose } from './ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface FileVersion {
    name: string;
    date: string;
    version: string;
    url?: string;
}

export interface File {
    id: string;
    name: string;
    date: string;
    version?: string;
    url?: string;
    history: FileVersion[];
}

export interface Stage {
    name: string;
    documents?: File[];
}

export interface Phase {
    name: string;
    stages: Stage[];
}

interface ProjectFilesCardProps {
    phases: Phase[];
}

const PdfViewerDialog = ({ open, onOpenChange, file }: { open: boolean; onOpenChange: (open: boolean) => void; file: File | FileVersion | null }) => {
    if (!file) return null;
    const dummyPdfUrl = `https://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white">
                <DialogPrimitiveHeader className="p-4 border-b flex-row items-center justify-between">
                    <DialogPrimitiveTitle>{file.name}</DialogPrimitiveTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-background">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogPrimitiveHeader>
                <div className="flex-1">
                    <iframe src={dummyPdfUrl} className="w-full h-full" title={file.name} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

const FileItem = ({ file, onFileClick }: { file: File, onFileClick: (file: File) => void }) => (
    <div className="flex items-center gap-4 py-3 cursor-pointer group" onClick={() => onFileClick(file)}>
        <PdfIcon className="w-6 h-6 shrink-0" />
        <div className="flex-1">
            <p className="text-base text-black font-medium group-hover:text-primary">{file.name}</p>
            <p className="text-xs text-stone-400">{file.date} {file.version && `• ${file.version}`}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
    </div>
);

export const ProjectFilesCard = ({ phases }: ProjectFilesCardProps) => {
    const [selectedFile, setSelectedFile] = useState<File | FileVersion | null>(null);

    const handleFileClick = (file: File | FileVersion) => {
        setSelectedFile(file);
    };

    const handleCloseDialog = () => {
        setSelectedFile(null);
    };
    
    return (
        <>
            <Card className="rounded-[50px] p-6 md:p-10">
                 <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-xl font-medium">Design & Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {phases.map((phase) => {
                            const totalFiles = phase.stages.reduce((acc, stage) => acc + (stage.documents?.length || 0), 0);
                             if (totalFiles === 0) return null;

                            return (
                                <AccordionItem key={phase.name} value={phase.name} className="bg-background rounded-[24px] border-none">
                                    <AccordionTrigger className="px-6 text-lg font-medium text-black hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <span>{phase.name}</span>
                                            <span className="text-sm font-normal text-muted-foreground">({totalFiles} files)</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-2">
                                            {phase.stages.map((stage) => (
                                                stage.documents && stage.documents.length > 0 && (
                                                    <div key={stage.name} className="pl-4">
                                                        <h4 className="font-semibold text-md text-muted-foreground my-2">{stage.name}</h4>
                                                         {stage.documents.map((file) => (
                                                            <FileItem key={file.id} file={file} onFileClick={handleFileClick} />
                                                         ))}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </CardContent>
            </Card>
            <PdfViewerDialog open={!!selectedFile} onOpenChange={(open) => !open && handleCloseDialog()} file={selectedFile} />
        </>
    );
};
