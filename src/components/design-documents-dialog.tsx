
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import { ProjectFilesCard } from './project-files-card';
import { X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DesignDocumentsDialogProps {
  files: any; // Using 'any' as it was in ProjectFilesCardProps
}

export const DesignDocumentsDialog = ({ files }: DesignDocumentsDialogProps) => {
    const isMobile = useIsMobile();
    const DialogOrSheet = Sheet;
    const DialogOrSheetTrigger = SheetTrigger;
    const DialogOrSheetContent = SheetContent;
    const DialogOrSheetHeader = SheetHeader;
    const DialogOrSheetTitle = SheetTitle;
    const DialogOrSheetClose = SheetClose;

  return (
    <DialogOrSheet>
      <DialogOrSheetTrigger asChild>
        <Button
            variant="link"
            className="text-black text-lg hover:bg-primary/10 hover:text-primary flex-1 rounded-full bg-white hover:no-underline w-full h-[54px]"
        >
            Design & Documents
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent
        side="bottom"
        className={cn(
          "p-0 flex flex-col bg-white transition-all m-0 border-none",
          "w-full h-full md:h-[90vh] md:w-full md:max-w-xl md:mx-auto md:bottom-0 rounded-t-[50px]"
        )}
        overlayClassName="bg-black/20 backdrop-blur-sm"
      >
        <DialogOrSheetHeader className="p-4 border-b flex-row items-center">
            <DialogOrSheetTitle className="text-2xl font-semibold">Design & Documents</DialogOrSheetTitle>
             <DialogOrSheetClose asChild>
                <Button variant="ghost" size="icon" className="ml-auto rounded-full bg-background w-[54px] h-[54px]">
                    <X className="h-5 w-5" />
                </Button>
            </DialogOrSheetClose>
        </DialogOrSheetHeader>
         <ScrollArea className="flex-1">
            <div className="p-6">
                 <ProjectFilesCard files={files} />
            </div>
        </ScrollArea>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
};
