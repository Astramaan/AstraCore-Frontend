
'use client';

import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Camera, Image as ImageIcon } from "lucide-react";
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const activeProjects = [
    { id: "CHA2024", name: "Charan Project" },
    { id: "SAT2024", name: "Satish Project" },
];

const AddSnagForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
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
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                <div className="space-y-2">
                    <Label htmlFor="project-select">Project*</Label>
                    <Select>
                        <SelectTrigger id="project-select" className="bg-background rounded-full h-12">
                            <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                            {activeProjects.map(project => (
                                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="snag-title">Snag Title*</Label>
                    <Input id="snag-title" placeholder="Enter a title for the snag" className="bg-background rounded-full h-12" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="snag-description">Description</Label>
                    <Textarea id="snag-description" placeholder="Describe the issue in detail" className="bg-background rounded-2xl" />
                </div>
                <div className="space-y-2">
                    <Label>Attach Photos/Videos</Label>
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((src, index) => (
                            <div key={index} className="relative w-full aspect-square">
                                <Image src={src} alt={`upload-preview-${index}`} layout="fill" className="rounded-lg object-cover" />
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
                     <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={() => fileInputRef.current?.click()}>
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
                    <Button type="button" variant="outline" className="flex-1 rounded-full">
                        <Camera className="mr-2" />
                        Take Photo
                    </Button>
                </div>
            </div>
            <div className="px-6 py-4 border-t">
                <Button type="submit" className="w-full rounded-full">Report Snag</Button>
            </div>
        </form>
    );
};

export function AddSnagSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    // Optionally, show a success toast here
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
         <Button className="h-14 px-10 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 text-lg font-medium">
            <Plus className="mr-2"/>
            New snag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 rounded-lg bg-card">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex justify-between items-center">
            Report a New Snag
             <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="h-4 w-4" />
                </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <AddSnagForm onFormSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
