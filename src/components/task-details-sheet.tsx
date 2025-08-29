
'use client';

import React, { useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, UploadCloud, Paperclip } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
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
        <p className="text-lg text-stone-500 font-medium">{label}</p>
        <div className="text-lg text-zinc-900 font-medium">
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
    
    const [attachments, setAttachments] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedAttachment, setSelectedAttachment] = useState<Task['attachments'][0] | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachments(prev => [...prev, ...Array.from(event.target.files)]);
        }
    };
    
    const handleRemoveFile = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar">
            <div className="space-y-8">
                <DetailRow label="Title" value={task.title} />
                <DetailRow label="Project" value={task.project} />
                <DetailRow label="Client ID" value={<Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900 text-base">{task.clientId}</Badge>} />
                <DetailRow label="Category" value={<Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900 text-base">{task.category}</Badge>} />
                <DetailRow label="Due Date" value={task.date} />
                 <DetailRow label="Priority" value={<Badge className={cn(priorityColors[task.priority], "text-lg py-1")}>{task.priority}</Badge>} />
                <DetailRow label="Description" value={<p className="text-lg font-medium">{task.description}</p>} />

                <div>
                    <p className="text-lg text-stone-500 mb-4">Attachment</p>
                    <div className="flex gap-4">
                        {task.attachments.map((file, index) => (
                             <button onClick={() => setSelectedAttachment(file)} key={index} className="w-20 h-20 rounded-lg border border-stone-300 flex items-center justify-center">
                                {file.type === 'pdf' ? <PdfIcon className="w-10 h-10" /> : <Image src={file.url} alt={file.name} width={65} height={65} className="rounded" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {selectedAttachment && (
                <Dialog open={!!selectedAttachment} onOpenChange={() => setSelectedAttachment(null)}>
                    <DialogContent className="max-w-3xl h-[90vh] p-0 rounded-lg">
                        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
                            <DialogTitle>{selectedAttachment.name}</DialogTitle>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <X className="h-5 w-5" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <div className="h-full p-4 relative">
                            {selectedAttachment.type === 'image' ? (
                                <Image src={selectedAttachment.url} alt={selectedAttachment.name} layout="fill" objectFit="contain" />
                            ) : (
                                <iframe src={selectedAttachment.url} className="w-full h-full" title={selectedAttachment.name} />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <div className="border-t border-stone-300 -mx-6 px-6 pt-6 mt-8 space-y-4">
                <div className="space-y-2">
                    <label htmlFor="file-upload" className="text-lg font-medium text-zinc-900 px-2 bg-white relative">Attach Files</label>
                    <div
                        className="border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-background cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                        />
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
                    </div>
                    {attachments.length > 0 && (
                        <div className="space-y-2 pt-4">
                            <p className="text-sm font-medium">Attached files:</p>
                            <div className="space-y-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <Paperclip className="h-4 w-4" />
                                            <span className="text-sm truncate">{file.name}</span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => handleRemoveFile(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                 <div className="flex justify-end pt-4">
                    <Button className="px-14 h-12 text-lg rounded-full">
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
  const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? DialogClose : DialogClose;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
          className={cn(
            "p-0 m-0 flex flex-col bg-white rounded-lg",
            isMobile 
              ? "h-auto rounded-t-[50px]"
              : "sm:max-w-4xl rounded-[50px] !bottom-0 !top-auto !translate-y-0"
          )}
          {...(isMobile && { side: "bottom" })}
      >
          <DialogOrSheetHeader className="p-6 border-b bg-white rounded-t-[50px]">
              <DialogOrSheetTitle className="flex items-center text-2xl font-semibold">
                  Task Details
                  <div className="flex items-center gap-4 ml-auto">
                      <DialogOrSheetClose asChild>
                          <Button variant="ghost" size="icon" className="w-[54px] h-[54px] rounded-full bg-gray-100 hover:bg-gray-200">
                              <X className="h-6 w-6"/>
                          </Button>
                      </DialogOrSheetClose>
                  </div>
              </DialogOrSheetTitle>
          </DialogOrSheetHeader>
          <div className='font-gilroy-medium text-[18px]'>
            <TaskDetailsContent task={task} />
          </div>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
