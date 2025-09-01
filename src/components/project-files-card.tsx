
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

const PdfViewerDialog = ({ open, onOpenChange, file }: { open: boolean; onOpenChange: (open: boolean) => void; file: File | FileVersion | null }) => {
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

const VersionHistoryDialog = ({ open, onOpenChange, file, onFileClick }: { open: boolean, onOpenChange: (open: boolean) => void, file: File | null, onFileClick: (file: FileVersion) => void }) => {
    if (!file) return null;
    return (
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 rounded-[20px]">
                <DialogHeader className="p-4 border-b">
                     <DialogTitle className="flex justify-between items-center">
                        Version History
                        <DialogClose asChild>
                             <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="p-4 space-y-2">
                     {[file, ...file.history].map((version, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => { onFileClick(version); onOpenChange(false); }}>
                            <div>
                                <p className="font-semibold">{version.name} ({version.version})</p>
                                <p className="text-sm text-muted-foreground">{version.date}</p>
                            </div>
                            <Badge variant="outline" className="bg-cyan-500/10 text-cyan-500 border-cyan-500">{version.version}</Badge>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

const FileSection = ({ title, files, onFileClick, onFileUpdate }: { title: string, files: File[], onFileClick: (file: File | FileVersion) => void, onFileUpdate: (fileId: string, newFile: globalThis.File) => void }) => {
    const [selectedHistoryFile, setSelectedHistoryFile] = useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && currentFileId) {
            onFileUpdate(currentFileId, e.target.files[0]);
        }
    };
    
    const openFilePicker = (fileId: string) => {
        setCurrentFileId(fileId);
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
             <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
            />
            <p className="text-sm text-stone-400">{title}</p>
            {files.map((file, index) => (
                <React.Fragment key={file.id}>
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
                                <Badge
                                    variant="outline"
                                    className="bg-cyan-500/10 text-cyan-500 border-cyan-500 cursor-pointer"
                                    onClick={() => setSelectedHistoryFile(file)}
                                >
                                    {file.version}
                                </Badge>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-6 h-6">
                                        <MoreVertical className="w-5 h-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onSelect={() => openFilePicker(file.id)}>
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
             <VersionHistoryDialog 
                open={!!selectedHistoryFile}
                onOpenChange={(open) => !open && setSelectedHistoryFile(null)}
                file={selectedHistoryFile}
                onFileClick={onFileClick}
            />
        </div>
    );
}

export const ProjectFilesCard = ({ files: initialFiles }: ProjectFilesCardProps) => {
    const [files, setFiles] = useState(initialFiles);
    const [selectedFile, setSelectedFile] = useState<File | FileVersion | null>(null);

    const handleFileClick = (file: File | FileVersion) => {
        setSelectedFile(file);
    };

    const handleFileUpdate = (fileId: string, newFile: globalThis.File) => {
        const today = new Date();
        const newVersionNumber = (file: File) => (parseInt(file.version?.replace('V ', '') || '1', 10) + 1);

        const updatedFiles = JSON.parse(JSON.stringify(files)); // Deep copy

        for (const category in updatedFiles) {
            const fileIndex = updatedFiles[category].findIndex((f: File) => f.id === fileId);
            if (fileIndex > -1) {
                const oldFile = updatedFiles[category][fileIndex];
                const newVersion = `V ${newVersionNumber(oldFile)}`;
                
                const oldVersionRecord = {
                    name: oldFile.name,
                    date: oldFile.date,
                    version: oldFile.version,
                    url: oldFile.url
                };

                updatedFiles[category][fileIndex] = {
                    ...oldFile,
                    name: newFile.name.replace(/\.[^/.]+$/, ""), // remove extension
                    date: today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                    version: newVersion,
                    history: [oldVersionRecord, ...oldFile.history]
                };
                break;
            }
        }
        setFiles(updatedFiles);
    };


    const handleCloseDialog = () => {
        setSelectedFile(null);
    };

    return (
        <>
            <Card className="rounded-[50px] p-0 border-0">
                <CardContent className="p-0 space-y-6">
                    <FileSection title="Initial" files={files.initial} onFileClick={handleFileClick} onFileUpdate={handleFileUpdate} />
                    <Separator />
                    <FileSection title="Costing" files={files.costing} onFileClick={handleFileClick} onFileUpdate={handleFileUpdate} />
                    <Separator />
                    <FileSection title="Architecture Design" files={files.architecture} onFileClick={handleFileClick} onFileUpdate={handleFileUpdate} />
                    <Separator />
                    <FileSection title="Structure Design" files={files.structure} onFileClick={handleFileClick} onFileUpdate={handleFileUpdate} />
                    <Separator />
                    <FileSection title="Sanction Drawings" files={files.sanction} onFileClick={handleFileClick} onFileUpdate={handleFileUpdate} />
                    <Separator />
                    <FileSection title="Construction Drawings" files={files.construction} onFileClick={handleFileClick} onFileUpdate={handleFileUpdate} />
                </CardContent>
            </Card>
            <PdfViewerDialog open={!!selectedFile} onOpenChange={(open) => !open && handleCloseDialog()} file={selectedFile} />
        </>
    );
};
