
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
import Image from 'next/image';

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

const FileItem = ({ file, index, onFileClick }: { file: File, index: number, onFileClick: (file: File) => void }) => (
    <>
        <div className="flex items-center gap-4 py-4" onClick={() => onFileClick(file)}>
            <p className="text-sm">{index + 1}.</p>
            <PdfIcon className="w-6 h-6 shrink-0" />
            <div className="flex-1 cursor-pointer">
                <p className="text-base text-black font-medium">{file.name}</p>
                <p className="text-xs text-stone-400">{file.date}</p>
            </div>
        </div>
        <Separator />
    </>
);


export const ProjectFilesCard = ({ files: initialFiles }: ProjectFilesCardProps) => {
    const [files, setFiles] = useState(initialFiles);
    const [selectedFile, setSelectedFile] = useState<File | FileVersion | null>(null);

    const handleFileClick = (file: File | FileVersion) => {
        setSelectedFile(file);
    };

    const handleCloseDialog = () => {
        setSelectedFile(null);
    };
    
    const allFiles = [
        ...files.initial,
        ...files.costing,
        ...files.architecture,
        ...files.structure,
        ...files.sanction,
        ...files.construction,
    ];

    return (
        <>
            <Card className="rounded-[50px] border-0">
                <CardContent className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        {allFiles.map((file, index) => (
                             <FileItem key={file.id} file={file} index={index} onFileClick={handleFileClick} />
                        ))}
                    </div>
                </CardContent>
            </Card>
            <PdfViewerDialog open={!!selectedFile} onOpenChange={(open) => !open && handleCloseDialog()} file={selectedFile} />
        </>
    );
};
