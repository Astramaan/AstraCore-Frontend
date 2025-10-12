"use client";

import React, { useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  X,
  UploadCloud,
  Paperclip,
  Trash2,
  Calendar,
  Star,
  GanttChartSquare,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import PdfIcon from "./icons/pdf-icon";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useUser } from "@/context/user-context";
import { ReworkTaskSheet } from "./rework-task-sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldAlert } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { ProjectTaskDetails } from "./project-task-details";

export interface ReworkInfo {
  comments: string;
  attachments: File[];
}
export interface Task {
  id: string;
  title: string;
  date: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: string;
  category: string;
  project: string;
  clientId: string;
  attachments: { type: "pdf" | "image"; name: string; url: string }[];
  completedDate?: string;
  isProjectTask?: boolean;
  subtitle?: string;
  isAssigned?: boolean;
  rework?: ReworkInfo;
}

interface TaskDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdateTask: (task: Task) => void;
}

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-muted-foreground mt-1">
      {icon}
    </div>
    <div>
      <p className="text-base text-muted-foreground font-medium">{label}</p>
      <div className="text-base text-foreground font-semibold mt-1">
        {value}
      </div>
    </div>
  </div>
);

const PdfPreviewDialog = ({
  open,
  onOpenChange,
  file,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: { name: string; url: string } | null;
}) => {
  if (!file) return null;
  const dummyPdfUrl = `https://docs.google.com/gview?url=${file.url}&embedded=true`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-card text-card-foreground">
        <DialogHeader className="p-4 border-b flex-row items-center justify-between">
          <DialogTitle>{file.name}</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-full bg-background"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-1">
          <iframe
            src={dummyPdfUrl}
            className="w-full h-full"
            title={file.name}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const UploadAttachmentsDialog = ({
  isOpen,
  onClose,
  onUpload,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(event.target.files as FileList)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onUpload(attachments);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[50px] p-0 bg-card text-card-foreground">
        <DialogHeader className="p-6">
          <DialogTitle className="flex justify-between items-center">
            <span className="text-xl">Upload Attachments</span>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4">
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
            <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
              <UploadCloud className="w-6 h-6 text-gray-500" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
          </div>
          {attachments.length > 0 && (
            <div className="space-y-2 pt-4">
              <p className="text-sm font-medium">Attached files:</p>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800 p-2 rounded-md"
                  >
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
          <Button
            onClick={handleSubmit}
            className="w-full h-14 rounded-full text-lg"
            disabled={attachments.length === 0}
          >
            Submit Attachments
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (err) {
    return dateString;
  }
};

const StandardTaskDetails = ({ task }: { task: Task }) => {
  const priorityColors: { [key: string]: string } = {
    Low: "bg-cyan-500/10 text-cyan-500",
    Medium: "bg-yellow-500/10 text-yellow-500",
    High: "bg-red-500/10 text-red-500",
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DetailRow
        icon={<GanttChartSquare className="w-5 h-5" />}
        label="Category"
        value={
          <Badge
            variant="outline"
            className="bg-zinc-100 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 text-foreground text-base"
          >
            {task.category}
          </Badge>
        }
      />
      <DetailRow
        icon={<Calendar className="w-5 h-5" />}
        label="Due Date"
        value={formatDate(task.date)}
      />
      <DetailRow
        icon={<Star className="w-5 h-5" />}
        label="Priority"
        value={
          <Badge
            className={cn(priorityColors[task.priority], "text-base py-1 px-4")}
          >
            {task.priority}
          </Badge>
        }
      />
    </div>
  );
};

const TaskDetailsContent = ({
  task,
  onUpdateTask,
  onClose,
}: {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onClose: () => void;
}) => {
  const { user } = useUser();
  const { toast } = useToast();

  const [selectedAttachment, setSelectedAttachment] = useState<
    Task["attachments"][0] | null
  >(null);
  const [isReworkSheetOpen, setIsReworkSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const handleStartTask = () => {
    onUpdateTask({ ...task, status: "In Progress" });
  };

  const handleCompleteTask = () => {
    const today = new Date();
    const day = String(today.getDate());
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    const completedDate = `${day} ${month} ${year}`;
    onUpdateTask({
      ...task,
      status: "Completed",
      completedDate: completedDate,
    });
  };

  const handleApprove = () => {
    handleCompleteTask();
  };

  const handleRework = () => {
    setIsReworkSheetOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting task:", task.id);
    setIsDeleteDialogOpen(false);
    onClose(); // Close sheet after deletion
  };

  const handleAttachmentsUploaded = (files: File[]) => {
    console.log("Uploaded files:", files);
    toast({
      title: "Attachments Uploaded",
      description: `${files.length} file(s) have been attached to the task.`,
    });
  };

  const handleReworkSubmit = (reworkInfo: ReworkInfo) => {
    onUpdateTask({ ...task, status: "Rework", rework: reworkInfo });
    setIsReworkSheetOpen(false);
    toast({
      title: "Rework Requested",
      description: `The task "${task.title}" has been sent back for rework.`,
    });
  };

  const isProjectManager = user?.team === "Project Manager";
  const isArchitect = user?.team === "Architect";

  const renderCtas = () => {
    const canStartTask =
      !task.isAssigned &&
      task.status !== "In Progress" &&
      task.status !== "Completed" &&
      task.status !== "ongoing" &&
      !isProjectManager;

    if (canStartTask) {
      return (
        <div className="flex justify-end">
          <Button
            onClick={handleStartTask}
            className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full"
          >
            Start
          </Button>
        </div>
      );
    }

    if (
      (task.status === "In Progress" || task.status === "ongoing") &&
      !isProjectManager
    ) {
      return (
        <div className="flex gap-4">
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            variant="outline"
            className="flex-1 rounded-full bg-background border-stone-300 h-[54px]"
          >
            Upload Attachments
          </Button>
          <Button
            onClick={handleCompleteTask}
            className="flex-1 rounded-full bg-primary h-[54px]"
          >
            Mark as Complete
          </Button>
        </div>
      );
    }

    if (isProjectManager && task.isProjectTask && task.status === "ongoing") {
      return (
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleRework}
            className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg"
          >
            Rework
          </Button>
          <Button
            onClick={handleApprove}
            className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg"
          >
            Approve
          </Button>
        </div>
      );
    }

    if (task.isAssigned) {
      const showApproveDelete =
        user?.roleType === "superAdmin" || isProjectManager || isArchitect;
      if (showApproveDelete) {
        return (
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button
              onClick={handleApprove}
              className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg"
            >
              Approve
            </Button>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 no-scrollbar">
          <div className="p-6">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                {task.title}
              </h3>
              <p className="text-muted-foreground">{task.description}</p>

              <Separator />

              {task.isProjectTask ? (
                <ProjectTaskDetails task={task} />
              ) : (
                <StandardTaskDetails task={task} />
              )}

              {task.attachments.length > 0 && (
                <div className="pt-6">
                  <p className="text-lg text-muted-foreground mb-4">
                    Attachment
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    {task.attachments.map((file, index) => (
                      <button
                        onClick={() => setSelectedAttachment(file)}
                        key={index}
                        className="w-20 h-20 rounded-lg border border-border flex items-center justify-center bg-background"
                      >
                        {file.type === "pdf" ? (
                          <PdfIcon className="w-10 h-10" />
                        ) : (
                          <Image
                            src={file.url}
                            alt={file.name}
                            width={65}
                            height={65}
                            className="rounded"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {task.rework && (
                <div className="pt-6">
                  <h4 className="text-lg font-medium text-muted-foreground mb-4">
                    Rework Details
                  </h4>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl space-y-4">
                    <p className="text-sm text-amber-900 dark:text-amber-200">
                      {task.rework.comments}
                    </p>
                    {task.rework.attachments.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2 text-amber-900 dark:text-amber-200">
                          Attachments:
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {task.rework.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 bg-white dark:bg-zinc-800 p-2 rounded-md border text-xs"
                            >
                              <Paperclip className="h-3 w-3" />
                              <span>{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
        <div className="p-6 mt-auto border-t md:border-0 shrink-0">
          {renderCtas()}
        </div>
      </div>
      <PdfPreviewDialog
        open={!!(selectedAttachment && selectedAttachment.type === "pdf")}
        onOpenChange={(open) => !open && setSelectedAttachment(null)}
        file={selectedAttachment}
      />
      <ReworkTaskSheet
        isOpen={isReworkSheetOpen}
        onClose={() => setIsReworkSheetOpen(false)}
        task={task}
        onSubmit={handleReworkSubmit}
      />
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-md rounded-[50px]">
          <AlertDialogHeader className="items-center text-center">
            <div className="relative mb-6 flex items-center justify-center h-20 w-20">
              <div className="w-full h-full bg-red-600/5 rounded-full" />
              <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
              <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
            </div>
            <AlertDialogTitle className="text-2xl font-semibold">
              Delete this task?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-muted-foreground">
              This action cannot be undone. Are you sure you want to permanently
              delete this task?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
            <AlertDialogCancel className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-foreground border-none hover:bg-primary/10 hover:text-primary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="w-40 h-14 px-10 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <UploadAttachmentsDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleAttachmentsUploaded}
      />
    </>
  );
};

export function TaskDetailsSheet({
  isOpen,
  onClose,
  task,
  onUpdateTask,
}: TaskDetailsSheetProps) {
  if (!task) return null;

  const DialogOrSheet = Sheet;
  const DialogOrSheetContent = SheetContent;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent
        side="bottom"
        className={cn(
          "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-xl md:mx-auto rounded-t-[50px] border-none data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        )}
      >
        <DialogHeader className="p-6 border-b bg-card rounded-t-[50px]">
          <DialogTitle className="flex items-center text-2xl font-semibold">
            {task.isProjectTask
              ? "Project Stage Details"
              : task.isAssigned
                ? "Assigned Task Details"
                : "Task Details"}
            <div className="flex items-center gap-4 ml-auto">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[54px] h-[54px] rounded-full bg-background hover:bg-muted"
                >
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="text-[18px] flex-1 flex flex-col overflow-hidden">
          <TaskDetailsContent
            task={task}
            onUpdateTask={onUpdateTask}
            onClose={onClose}
          />
        </div>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
