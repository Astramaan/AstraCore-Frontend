
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import PdfIcon from './icons/pdf-icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from './ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

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
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent 
                side="bottom" 
                className="p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-4xl md:mx-auto rounded-t-[50px] border-none data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
                overlayClassName="bg-black/20 backdrop-blur-sm"
            >
                <SheetHeader className="p-4 border-b flex-row items-center justify-between">
                    <SheetTitle>{file.name}</SheetTitle>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-background">
                            <X className="h-5 w-5" />
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <div className="flex-1">
                    <iframe src={dummyPdfUrl} className="w-full h-full" title={file.name} />
                </div>
            </SheetContent>
        </Sheet>
    );
};

const FileItem = ({ file, onFileClick }: { file: File, onFileClick: (file: File | FileVersion) => void }) => (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={file.id} className="border-b-0">
            <div className="flex items-center gap-4 py-3 group">
                <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => onFileClick(file)}>
                    <PdfIcon className="w-6 h-6 shrink-0" />
                    <div className="flex-1">
                        <p className="text-base text-foreground font-medium group-hover:text-primary">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.date}</p>
                    </div>
                </div>

                {file.history && file.history.length > 0 ? (
                    <AccordionTrigger className="p-2 hover:no-underline [&[data-state=open]>svg]:text-primary flex items-center gap-2">
                        {file.version && (
                            <Badge variant="outline" className="font-mono cursor-pointer hover:bg-accent">{file.version}</Badge>
                        )}
                    </AccordionTrigger>
                ) : (
                    <div className="flex items-center gap-2">
                         {file.version && (
                            <Badge variant="outline" className="font-mono cursor-pointer hover:bg-accent" onClick={() => onFileClick(file)}>{file.version}</Badge>
                        )}
                        <div onClick={() => onFileClick(file)} className="cursor-pointer p-2">
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                )}
            </div>
            {file.history && file.history.length > 0 && (
                <AccordionContent>
                    <div className="pl-10 space-y-2 border-l ml-3">
                        {file.history.map((version, index) => (
                            <div key={index} className="flex items-center gap-4 py-2 cursor-pointer group pl-4">
                                <div className="flex-1" onClick={() => onFileClick(version)}>
                                    <p className="text-sm text-foreground font-medium group-hover:text-primary">{version.name}</p>
                                    <p className="text-xs text-muted-foreground">{version.date}</p>
                                </div>
                                <button onClick={() => onFileClick(version)} className="p-0 m-0 bg-transparent hover:bg-transparent">
                                    <Badge variant="outline" className="font-mono cursor-pointer hover:bg-accent">{version.version}</Badge>
                                </button>
                                <div className="p-2" onClick={() => onFileClick(version)}>
                                     <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            )}
        </AccordionItem>
    </Accordion>
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
            <Card className="rounded-[50px] p-6 md:p-10 bg-card text-card-foreground">
                 <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-xl font-medium">Design & Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {phases.map((phase) => {
                            const totalFiles = phase.stages.reduce((acc, stage) => acc + (stage.documents?.length || 0), 0);
                             if (totalFiles === 0) return null;

                            return (
                                <AccordionItem key={phase.name} value={phase.name} className="bg-background dark:bg-input rounded-[24px] border-none">
                                    <AccordionTrigger className="px-6 text-lg font-medium text-foreground hover:no-underline">
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
