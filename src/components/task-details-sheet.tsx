
'use client';

import React, { useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, UploadCloud, Paperclip, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Badge } from './ui/badge';
import PdfIcon from './icons/pdf-icon';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { useUser } from '@/context/user-context';
import { ReworkTaskSheet } from './rework-task-sheet';

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
  completedDate?: string;
  isProjectTask?: boolean;
  subtitle?: string;
  isAssigned?: boolean;
}

interface TaskDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdateTask: (task: Task) => void;
}

const DetailRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div>
    <p className="text-lg text-stone-500 font-medium">{label}</p>
    <div className="text-lg text-zinc-900 font-medium">
      {value}
    </div>
  </div>
);

const AttachmentViewerDialog = ({ attachment, onClose }: { attachment: Task['attachments'][0] | null, onClose: () => void }) => {
    if (!attachment) return null;

    return (
        <Dialog open={!!attachment} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white">
                <DialogHeader className="p-4 border-b flex-row items-center justify-between">
                    <DialogTitle>{attachment.name}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-background">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex-1 flex items-center justify-center p-4">
                    {attachment.type === 'pdf' ? (
                        <iframe src={`https://docs.google.com/gview?url=${attachment.url}&embedded=true`} className="w-full h-full" title={attachment.name} />
                    ) : (
                        <div className="relative w-full h-full">
                            <Image src={attachment.url} alt={attachment.name} layout="fill" objectFit="contain" />
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};


const TaskDetailsContent = ({ task, onUpdateTask }: { task: Task, onUpdateTask: (task: Task) => void; }) => {
  const { user } = useUser();
  const priorityColors: { [key: string]: string } = {
    "Low": "bg-cyan-500/10 text-cyan-500",
    "Medium": "bg-yellow-500/10 text-yellow-500",
    "High": "bg-red-500/10 text-red-500",
  };
  
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAttachment, setSelectedAttachment] = useState<Task['attachments'][0] | null>(null);
  const [isReworkSheetOpen, setIsReworkSheetOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(prev => [...prev, ...Array.from(event.target.files)]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartTask = () => {
    onUpdateTask({ ...task, status: 'In Progress' });
  };

  const handleCompleteTask = () => {
    const today = new Date();
    const day = String(today.getDate());
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const completedDate = `${day} ${month} ${year}`;
    onUpdateTask({ ...task, status: 'Completed', completedDate: completedDate });
  };

  const handleApprove = () => {
     handleCompleteTask();
  };
  
  const handleRework = () => {
    setIsReworkSheetOpen(true);
  };
  
  const handleDelete = () => {
      console.log("Deleting task:", task.id);
  }


  const isProjectManager = user?.team === 'Project Manager';
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
        return dateString;
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 no-scrollbar">
          <div className="p-6 space-y-6">
            <div className="space-y-8">
              {task.isProjectTask ? (
                <>
                  <DetailRow label="Task" value={task.subtitle || ''}/>
                  <DetailRow label="Stage" value={task.title} />
                  <DetailRow label="Phase" value={<Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900 text-base">{task.category}</Badge>} />
                  <DetailRow label="Project" value={`${task.project} (${task.clientId})`} />
                  <DetailRow label="Due Date" value={formatDate(task.date)} />
                  <DetailRow label="Priority" value={<Badge className={cn(priorityColors[task.priority], "text-lg py-1")}>{task.priority}</Badge>} />
                </>
              ) : (
                <>
                  <DetailRow label="Title" value={task.title} />
                  {!task.isProjectTask && <DetailRow label="Description" value={<p className="text-lg font-medium">{task.description}</p>} />}
                  <DetailRow label="Category" value={<Badge variant="outline" className="bg-zinc-100 border-zinc-100 text-zinc-900 text-base">{task.category}</Badge>} />
                   {!task.isProjectTask && <DetailRow label="Project" value={task.project} />}
                  <DetailRow label="Due Date" value={formatDate(task.date)} />
                  <DetailRow label="Priority" value={<Badge className={cn(priorityColors[task.priority], "text-lg py-1")}>{task.priority}</Badge>} />
                </>
              )}
              {task.status === 'Completed' && task.completedDate && (
                <DetailRow label="Completed Date" value={formatDate(task.completedDate)} />
              )}

              {task.attachments.length > 0 && (
                <div>
                  <p className="text-lg text-stone-500 mb-4">Attachment</p>
                  <div className="flex gap-4 flex-wrap">
                    {task.attachments.map((file, index) => (
                      <button onClick={() => setSelectedAttachment(file)} key={index} className="w-20 h-20 rounded-lg border border-stone-300 flex items-center justify-center">
                        {file.type === 'pdf' ? <PdfIcon className="w-10 h-10" /> : <Image src={file.url} alt={file.name} width={65} height={65} className="rounded" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
             {!task.isProjectTask && task.status === 'In Progress' && (
              <div className="space-y-2 mt-6">
                  <p className="text-lg text-stone-500">Attach Files</p>
                  <div
                      className="border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-background cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                  >
                      <input
                          type="file"
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
            )}
          </div>
        </ScrollArea>
        <div className="p-6 mt-auto border-t md:border-0">
            {isProjectManager && task.isProjectTask && task.status === 'ongoing' ? (
                <div className="flex gap-4">
                    <Button variant="outline" onClick={handleRework} className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg">Rework</Button>
                    <Button onClick={handleApprove} className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg">Approve</Button>
                </div>
            ) : task.isAssigned ? (
                <div className="flex gap-4">
                    <Button variant="outline" onClick={handleDelete} className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg">
                        <Trash2 className="mr-2 h-4 w-4"/>
                        Delete
                    </Button>
                    <Button onClick={handleApprove} className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg">Approve</Button>
                </div>
            ) : !task.isProjectTask && task.status !== 'In Progress' && task.status !== 'Completed' && task.status !== 'ongoing' ? (
                <Button onClick={handleStartTask} className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full">
                    Start
                </Button>
            ) : !task.isProjectTask && task.status === 'In Progress' ? (
                 <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 rounded-full bg-background border-stone-300">
                        Upload Attachments
                    </Button>
                    <Button onClick={handleCompleteTask} className="flex-1 rounded-full bg-primary">
                        Mark as Complete
                    </Button>
                </div>
            ) : null}
        </div>
      </div>
       <AttachmentViewerDialog 
            attachment={selectedAttachment}
            onClose={() => setSelectedAttachment(null)}
       />
      <ReworkTaskSheet 
        isOpen={isReworkSheetOpen}
        onClose={() => setIsReworkSheetOpen(false)}
        task={task}
      />
    </>
  );
};

export function TaskDetailsSheet({ isOpen, onClose, task, onUpdateTask }: TaskDetailsSheetProps) {
  const isMobile = useIsMobile();

  if (!task) return null;

  const DialogOrSheet = Sheet;
  const DialogOrSheetContent = SheetContent;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
        side="bottom"
        className={cn(
          "p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-3xl md:mx-auto rounded-t-[50px] border-none"
        )}
      >
        <DialogHeader className="p-6 border-b bg-white rounded-t-[50px]">
          <DialogTitle className="flex items-center text-2xl font-semibold gilroy-semibold">
            {task.isProjectTask ? 'Project Task Details' : 'Task Details'}
            <div className="flex items-center gap-4 ml-auto">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] rounded-full bg-gray-100 hover:bg-gray-200">
                  <X className="h-6 w-6"/>
                </Button>
              </SheetClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='font-gilroy-medium text-[18px] flex-1 flex flex-col overflow-hidden'>
          <TaskDetailsContent task={task} onUpdateTask={onUpdateTask} />
        </div>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
