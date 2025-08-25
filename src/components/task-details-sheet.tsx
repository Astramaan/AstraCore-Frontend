
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, UploadCloud, Paperclip } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import PdfIcon from './icons/pdf-icon';
import Image from 'next/image';

export interface Task {
    id: string;
    title: string;
    date: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: string;
    category: string;
    project: string;
    clientId: string;
    attachments: { type: 'pdf' | 'image', name: string, url: string }[];
}

interface TaskDetailsSheetProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

const DetailRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="grid grid-cols-2 items-start gap-4">
        <p className="text-lg text-stone-500">{label}</p>
        <div className="text-lg text-zinc-900 font-normal">
            {value}
        </div>
    </div>
);

const TaskDetailsContent = ({ task }: { task: Task }) => {
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "Medium": "bg-yellow-500/10 text-yellow-500",
        "High": "bg-red-500/10 text-red-500",
    };

    return (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="space-y-8">
                <DetailRow label="Title" value={task.title} />
                <DetailRow label="Project" value={task.project} />
                <DetailRow label="Client ID" value={<Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900">{task.clientId}</Badge>} />
                <DetailRow label="Category" value={<Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900">{task.category}</Badge>} />
                <DetailRow label="Due Date" value={task.date} />
                 <DetailRow label="Priority" value={<Badge className={cn(priorityColors[task.priority], "text-lg py-1")}>{task.priority}</Badge>} />
                <DetailRow label="Description" value={<p className="text-base">{task.description}</p>} />

                <div>
                    <p className="text-lg text-stone-500 mb-4">Attachment</p>
                    <div className="flex gap-4">
                        {task.attachments.map((file, index) => (
                            <div key={index} className="w-20 h-20 rounded-lg border border-stone-300 flex items-center justify-center">
                                {file.type === 'pdf' ? <PdfIcon className="w-10 h-10" /> : <Image src={file.url} alt={file.name} width={65} height={65} className="rounded" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-lg text-stone-500 mb-4">Members</p>
                     <div className="grid grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Avatar className="w-8 h-8"><AvatarImage src={`https://placehold.co/34x34`} data-ai-hint="person portrait" /></Avatar>
                            <div>
                                <p className="text-sm font-normal">Darshan</p>
                                <p className="text-xs text-stone-500">Junior Architect</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-stone-300 -mx-6 px-6 pt-6 mt-8 space-y-4">
                <div className="space-y-2">
                    <label className="text-base font-normal text-zinc-900 px-2 bg-white relative">Attach Files</label>
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-background">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
                    </div>
                </div>
                 <div className="flex justify-end pt-4">
                    <Button className="px-14 h-12 text-lg rounded-lg">
                        Start
                    </Button>
                </div>
            </div>
        </div>
    );
};


export function TaskDetailsSheet({ isOpen, onClose, task }: TaskDetailsSheetProps) {
  const isMobile = useIsMobile();

  if (!task) return null;

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
          className={cn(
            isMobile 
              ? "w-full p-0 rounded-t-[50px]"
              : "p-0 rounded-[50px] md:max-w-2xl lg:max-w-3xl"
          )}
          {...(isMobile ? { side: "bottom" } : { side: "right" })}
      >
          <DialogOrSheetHeader className="p-6 border-b">
              <DialogOrSheetTitle className="flex items-center text-xl font-medium">
                  Task Details
                  <div className="flex items-center gap-4 ml-auto">
                      <DialogOrSheetClose asChild>
                          <Button variant="ghost" className="rounded-full text-sm font-normal h-auto px-4 py-2 bg-gray-100 hover:bg-gray-200">
                              <X className="h-4 w-4 mr-1"/>
                              Close
                          </Button>
                      </DialogOrSheetClose>
                  </div>
              </DialogOrSheetTitle>
          </DialogOrSheetHeader>
          <TaskDetailsContent task={task} />
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
