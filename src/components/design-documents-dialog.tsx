
"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ProjectFilesCard, type Phase } from "./project-files-card";
import { X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface DesignDocumentsDialogProps {
  files: {
    initial: any[];
    costing: any[];
    architecture: any[];
    structure: any[];
    sanction: any[];
    construction: any[];
  };
}

const mapFilesToPhases = (
  files: DesignDocumentsDialogProps["files"],
): Phase[] => {
  return [
    {
      name: "Initial",
      stages: [{ name: "Initial Documents", documents: files.initial }],
    },
    {
      name: "Costing",
      stages: [{ name: "Costing Documents", documents: files.costing }],
    },
    {
      name: "Architecture",
      stages: [
        { name: "Architecture Documents", documents: files.architecture },
      ],
    },
    {
      name: "Structure",
      stages: [{ name: "Structure Documents", documents: files.structure }],
    },
    {
      name: "Sanction",
      stages: [{ name: "Sanction Documents", documents: files.sanction }],
    },
    {
      name: "Construction",
      stages: [
        { name: "Construction Documents", documents: files.construction },
      ],
    },
  ];
};

export const DesignDocumentsDialog = ({
  files,
}: DesignDocumentsDialogProps) => {
  const DialogOrSheet = Sheet;
  const DialogOrSheetTrigger = SheetTrigger;
  const DialogOrSheetContent = SheetContent;
  const DialogOrSheetHeader = SheetHeader;
  const DialogOrSheetTitle = SheetTitle;
  const DialogOrSheetClose = SheetClose;

  const phases = mapFilesToPhases(files);

  return (
    <DialogOrSheet>
      <DialogOrSheetTrigger asChild>
        <Button
          variant="link"
          className="text-foreground text-lg hover:bg-primary/10 hover:text-primary flex-1 rounded-full bg-background hover:no-underline w-full h-[54px]"
        >
          Design & Documents
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent
        side="bottom"
        className={cn(
          "p-0 flex flex-col bg-card transition-all m-0 border-none",
          "w-full h-full md:h-[90vh] md:w-full md:max-w-xl md:mx-auto md:bottom-0 rounded-t-[50px]",
        )}
        overlayClassName="bg-black/20 backdrop-blur-sm"
      >
        <DialogOrSheetHeader className="p-4 border-b flex-row items-center">
          <DialogOrSheetTitle className="text-2xl font-semibold">
            Design & Documents
          </DialogOrSheetTitle>
          <DialogOrSheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-full bg-background w-[54px] h-[54px]"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogOrSheetClose>
        </DialogOrSheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-6">
            <ProjectFilesCard phases={phases} />
          </div>
        </ScrollArea>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
};
