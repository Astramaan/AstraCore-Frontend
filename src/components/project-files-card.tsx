
'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MoreVertical, X, Trash2, Replace, ShieldAlert } from 'lucide-react';
import { Separator } from './ui/separator';
import PdfIcon from './icons/pdf-icon';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-background">
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
                                <p className="font-semibold">{version.name}</p>
                                <p className="text-sm text-muted-foreground">{version.date}</p>
                            </div>
                            <Badge variant="outline" className="bg-background cursor-pointer h-[26px] border-transparent text-foreground text-sm">{version.version?.replace('V ', 'Version ')}</Badge>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

const FileSection = ({ files, startIndex, onFileClick, onFileUpdate, onFileDelete }: { files: File[], startIndex: number, onFileClick: (file: File | FileVersion) => void, onFileUpdate: (fileId: string, newFile: globalThis.File) => void, onFileDelete: (fileId: string) => void }) => {
    const [selectedHistoryFile, setSelectedHistoryFile] = useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const [fileToDelete, setFileToDelete] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && currentFileId) {
            onFileUpdate(currentFileId, e.target.files[0]);
        }
    };
    
    const openFilePicker = (fileId: string) => {
        setCurrentFileId(fileId);
        fileInputRef.current?.click();
    };

    const confirmDelete = () => {
        if (fileToDelete) {
            onFileDelete(fileToDelete.id);
            setFileToDelete(null);
        }
    }

    return (
        <AlertDialog>
            <div className="space-y-4">
                
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf"
                />
                
                {files.map((file, index) => (
                    <React.Fragment key={file.id}>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => onFileClick(file)}>
                                <p className="text-sm">{startIndex + index + 1}.</p>
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
                                        className="bg-background cursor-pointer h-[26px] border-transparent text-foreground text-sm"
                                        onClick={() => setSelectedHistoryFile(file)}
                                    >
                                        {file.version.replace('V ', 'Version ')}
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
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem className="text-red-600" onSelect={(e) => {e.preventDefault(); setFileToDelete(file)}}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Remove
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
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
                 <AlertDialogContent className="max-w-md rounded-[50px]">
                    <AlertDialogHeader className="items-center text-center">
                         <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                          <div className="w-full h-full bg-red-600/5 rounded-full" />
                          <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                          <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-semibold">
                            Confirm File Deletion?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-lg text-grey-2">
                           Deleting this file will permanently remove it. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="w-40 h-14 px-10 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </div>
        </AlertDialog>
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
    
    const handleFileDelete = (fileId: string) => {
        const updatedFiles = JSON.parse(JSON.stringify(files));
        for (const category in updatedFiles) {
            updatedFiles[category] = updatedFiles[category].filter((f: File) => f.id !== fileId);
        }
        setFiles(updatedFiles);
    }

    const handleCloseDialog = () => {
        setSelectedFile(null);
    };
    
    let fileCount = 0;

    const allFiles = [
        ...files.initial,
        ...files.costing,
        ...files.architecture,
        ...files.structure,
        ...files.sanction,
        ...files.construction
    ];

    const halfwayPoint = Math.ceil(allFiles.length / 2);
    const firstColumnFiles = allFiles.slice(0, halfwayPoint);
    const secondColumnFiles = allFiles.slice(halfwayPoint);

    return (
        <>
            <Card className="rounded-[50px] border-0">
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <FileSection 
                            files={firstColumnFiles} 
                            startIndex={0} 
                            onFileClick={handleFileClick}
                            onFileUpdate={handleFileUpdate}
                            onFileDelete={handleFileDelete}
                        />
                         <FileSection 
                            files={secondColumnFiles} 
                            startIndex={firstColumnFiles.length} 
                            onFileClick={handleFileClick}
                            onFileUpdate={handleFileUpdate}
                            onFileDelete={handleFileDelete}
                        />
                    </div>
                </CardContent>
            </Card>
            <PdfViewerDialog open={!!selectedFile} onOpenChange={(open) => !open && handleCloseDialog()} file={selectedFile} />
        </>
    );
};
