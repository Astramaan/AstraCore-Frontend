
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { ProjectFilesCard } from './project-files-card';
import { X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface DesignDocumentsDialogProps {
  files: any; // Using 'any' as it was in ProjectFilesCardProps
}

export const DesignDocumentsDialog = ({ files }: DesignDocumentsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            variant="link"
            className={cn("text-black text-lg hover:bg-primary/10 hover:text-primary flex-1 rounded-full bg-white", "hover:no-underline w-full h-[54px]")}
        >
            Design & Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white">
        <DialogHeader className="p-4 border-b flex-row items-center">
            <DialogTitle className="text-2xl font-semibold">Design & Documents</DialogTitle>
             <DialogClose asChild>
                <Button variant="ghost" size="icon" className="ml-auto rounded-full bg-background w-[54px] h-[54px]">
                    <X className="h-5 w-5" />
                </Button>
            </DialogClose>
        </DialogHeader>
         <ScrollArea className="flex-1">
            <div className="p-6">
                 <ProjectFilesCard files={files} />
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
