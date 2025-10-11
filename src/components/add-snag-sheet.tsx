"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Camera, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

const activeProjects = [
  { id: "CHA2024", name: "Charan Project" },
  { id: "SAT2024", name: "Satish Project" },
];

const AddSnagForm = ({
  onFormSuccess,
  selectedProjectId,
}: {
  onFormSuccess: () => void;
  selectedProjectId?: string;
}) => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [project, setProject] = useState(selectedProjectId || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedProjectId) {
      setProject(selectedProjectId);
    }
  }, [selectedProjectId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6 no-scrollbar">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="project-select"
              className={cn(
                "text-lg font-medium",
                project ? "text-grey-1" : "text-black",
              )}
            >
              Project*
            </Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger
                id="project-select"
                className="bg-background rounded-full h-12"
              >
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {activeProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="snag-title"
              className={cn(
                "text-lg font-medium",
                title ? "text-grey-1" : "text-black",
              )}
            >
              Snag Title*
            </Label>
            <Input
              id="snag-title"
              placeholder="Enter a title for the snag"
              className="bg-background rounded-full h-12"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="snag-description"
              className={cn(
                "text-lg font-medium",
                description ? "text-grey-1" : "text-black",
              )}
            >
              Description
            </Label>
            <Textarea
              id="snag-description"
              placeholder="Describe the issue in detail"
              className="bg-background rounded-2xl"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-medium text-black">
              Attach Photos/Videos
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {images.map((src, index) => (
                <div key={index} className="relative w-full aspect-square">
                  <Image
                    src={src}
                    alt={`upload-preview-${index}`}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="mr-2" />
              Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-full"
            >
              <Camera className="mr-2" />
              Take Photo
            </Button>
          </div>
        </div>
      </ScrollArea>
      <div className="p-6 mt-auto border-t md:border-0">
        <Button type="submit" className="w-full rounded-full h-[54px]">
          Report Snag
        </Button>
      </div>
    </form>
  );
};

interface AddSnagSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedProjectId?: string;
  trigger?: React.ReactNode;
}

export function AddSnagSheet({
  isOpen,
  onOpenChange,
  selectedProjectId,
  trigger,
}: AddSnagSheetProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    // Optionally, show a success toast here
  };

  const Trigger = trigger || (
    <Button className="h-[54px] w-[54px] md:w-auto md:h-14 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium p-0 md:px-6">
      <Plus className="md:mr-2" />
      <span className="hidden md:inline">New snag</span>
    </Button>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{Trigger}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-md md:mx-auto rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex justify-between items-center">
            <span className="flex items-center text-2xl font-semibold">
              <div className="w-[54px] h-[54px] rounded-full border border-stone-300 flex items-center justify-center mr-3">
                <Plus className="h-6 w-6 text-black" />
              </div>
              Report a New Snag
            </span>
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
          <AddSnagForm
            onFormSuccess={handleSuccess}
            selectedProjectId={selectedProjectId}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
