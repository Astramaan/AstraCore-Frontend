"use client";

import React, { useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, UploadCloud, Paperclip } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

export interface IssueInfo {
  comments: string;
  attachments: File[];
}

interface RaiseIssueSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issueInfo: IssueInfo) => void;
  stageTitle: string;
}

const RaiseIssueForm = ({
  stageTitle,
  onClose,
  onSubmit,
}: {
  stageTitle: string;
  onClose: () => void;
  onSubmit: (issueInfo: IssueInfo) => void;
}) => {
  const { toast } = useToast();
  const [comments, setComments] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments((prev) => [
        ...prev,
        ...Array.from(event.target.files as FileList),
      ]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) {
      toast({
        variant: "destructive",
        title: "Comment required",
        description: "Please describe the issue before submitting.",
      });
      return;
    }
    onSubmit({ comments, attachments });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6 no-scrollbar">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="issue-comments"
              className={cn(
                "text-lg font-medium",
                comments ? "text-grey-1" : "text-zinc-900",
              )}
            >
              Comments
            </Label>
            <Textarea
              id="issue-comments"
              className="h-32 bg-background rounded-2xl"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide detailed feedback about the issue..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-zinc-900">
              Attach Files
            </Label>
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
              <p className="mt-2 text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">
                JPG, PNG, PDF • Up to 10Mb
              </p>
            </div>
            {attachments.length > 0 && (
              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium">Attached files:</p>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
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
          </div>
        </div>
      </ScrollArea>
      <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
        <Button
          type="submit"
          className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full"
        >
          Submit Issue
        </Button>
      </div>
    </form>
  );
};

export function RaiseIssueSheet({
  isOpen,
  onClose,
  stageTitle,
  onSubmit,
}: RaiseIssueSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-xl md:mx-auto rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b bg-white rounded-t-[50px]">
          <SheetTitle className="flex items-center justify-between text-2xl font-semibold">
            Raise Issue for "{stageTitle}"
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-[54px] h-[54px] bg-background rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col overflow-hidden">
          <RaiseIssueForm
            stageTitle={stageTitle}
            onClose={onClose}
            onSubmit={onSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
