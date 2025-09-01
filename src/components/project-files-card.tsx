
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MoreVertical, X, Trash2, Replace } from 'lucide-react';
import { Separator } from './ui/separator';
import PdfIcon from './icons/pdf-icon';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface File {
    name: string;
    date: string;
    version?: string;
    url?: string; // Assuming a URL is available for the PDF
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

const PdfViewerDialog = ({ open, onOpenChange, file }: { open: boolean; onOpenChange: (open: boolean) => void; file: File | null }) => {
    if (!file) return null;
    const dummyPdfUrl = `https://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white">
                <DialogHeader className="p-4 border-b flex-row items-center justify-between">
                    <DialogTitle>{file.name}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full bg-background w-[54px] h-[54px]">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex-1">
                    <iframe src={dummyPdfUrl} className="w-full h-full" title={file.name} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

const FileSection = ({ title, files, onFileClick }: { title: string, files: File[], onFileClick: (file: File) => void }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Logic to handle file change can be added here
            console.log('File selected:', e.target.files[0]);
        }
    };
    
    return (
        <div className="space-y-4">
             <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <p className="text-sm text-stone-400">{title}</p>
            {files.map((file, index) => (
                <React.Fragment key={index}>
                    <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => onFileClick(file)}>
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-6 h-6">
                                        <MoreVertical className="w-5 h-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onSelect={() => fileInputRef.current?.click()}>
                                        <Replace className="mr-2 h-4 w-4" />
                                        Change
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {index < files.length - 1 && <Separator />}
                </React.Fragment>
            ))}
        </div>
    );
}

export const ProjectFilesCard = ({ files }: ProjectFilesCardProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileClick = (file: File) => {
        setSelectedFile(file);
    };

    const handleCloseDialog = () => {
        setSelectedFile(null);
    };

    return (
        <>
            <Card className="rounded-[50px] p-0 border-0">
                <CardContent className="p-0 space-y-6">
                    <FileSection title="Initial" files={files.initial} onFileClick={handleFileClick} />
                    <Separator />
                    <FileSection title="Costing" files={files.costing} onFileClick={handleFileClick} />
                    <Separator />
                    <FileSection title="Architecture Design" files={files.architecture} onFileClick={handleFileClick} />
                    <Separator />
                    <FileSection title="Structure Design" files={files.structure} onFileClick={handleFileClick} />
                    <Separator />
                    <FileSection title="Sanction Drawings" files={files.sanction} onFileClick={handleFileClick} />
                    <Separator />
                    <FileSection title="Construction Drawings" files={files.construction} onFileClick={handleFileClick} />
                </CardContent>
            </Card>
            <PdfViewerDialog open={!!selectedFile} onOpenChange={(open) => !open && handleCloseDialog()} file={selectedFile} />
        </>
    );
};
