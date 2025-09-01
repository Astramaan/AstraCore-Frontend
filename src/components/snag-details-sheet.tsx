

'use client';

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, MoreVertical, Edit, Trash2, Save } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export interface Snag {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
    status: 'Open' | 'Closed' | 'In Progress';
    subStatus: string;
    statusColor: string;
    images: string[];
    projectId: string;
    projectName: string;
}

interface SnagDetailsSheetProps {
    isOpen: boolean;
    onClose: () => void;
    snag: Snag | null;
    onDelete: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onUpdate: (snag: Snag) => void;
    startInEditMode?: boolean;
}

const DetailRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-medium text-zinc-900">{value}</p>
    </div>
);

const SnagDetailsContent = ({ snag: initialSnag, onClose, onDelete, onUpdate, startInEditMode = false }: { snag: Snag, onClose: () => void, onDelete: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void, onUpdate: (snag: Snag) => void, startInEditMode?: boolean }) => {
    const [isEditing, setIsEditing] = useState(startInEditMode);
    const [snag, setSnag] = useState(initialSnag);

    useEffect(() => {
        setSnag(initialSnag);
        setIsEditing(startInEditMode);
    }, [initialSnag, startInEditMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSnag(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(snag);
        setIsEditing(false);
    }
    
    const handleCancel = () => {
        setSnag(initialSnag);
        setIsEditing(false);
    }
    
    return (
        <>
            <DialogHeader className="p-4 border-b">
                <DialogTitle className="flex items-center font-medium">
                    {isEditing ? 'Edit Snag' : 'Snag Details'}
                    <div className="ml-auto flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <Button variant="ghost" onClick={handleCancel} className="h-14 rounded-full px-8">Cancel</Button>
                                <Button onClick={handleSave} className="h-14 rounded-full px-8">
                                    <Save className="mr-2 h-4 w-4" />
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600" onSelect={(e) => { e.preventDefault(); onDelete(e as any); }}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogClose asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <X className="h-5 w-5" />
                                    </Button>
                                </DialogClose>
                            </>
                        )}
                    </div>
                </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)]">
                <div className="space-y-4">
                     {snag.images && snag.images.length > 0 && (
                        <Carousel className="w-full max-w-sm mx-auto">
                            <CarouselContent>
                                {snag.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="w-full aspect-video relative">
                                            <Image src={image} alt={`${snag.title} - image ${index + 1}`} layout="fill" className="rounded-lg object-cover" data-ai-hint="defect photo"/>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                             {snag.images.length > 1 && (
                                <>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </>
                            )}
                        </Carousel>
                    )}
                    {isEditing ? (
                        <div className="space-y-2">
                            <Label htmlFor="title" className="px-2">Title</Label>
                            <Input id="title" name="title" value={snag.title} onChange={handleInputChange} className="h-14 rounded-full bg-background" />
                        </div>
                    ) : (
                        <h3 className="text-2xl font-semibold">{snag.title}</h3>
                    )}
                     {isEditing ? (
                        <div className="space-y-2">
                             <Label htmlFor="description" className="px-2">Description</Label>
                             <Textarea id="description" name="description" value={snag.description} onChange={handleInputChange} className="text-muted-foreground min-h-[54px] rounded-3xl bg-background" />
                        </div>
                    ) : (
                        <p className="text-muted-foreground">{snag.description}</p>
                    )}
                </div>

                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailRow label="Project" value={`${snag.projectName} (${snag.projectId})`} />
                    <DetailRow label="Created By" value={snag.createdBy} />
                    <DetailRow label="Created At" value={snag.createdAt} />
                    <DetailRow label="Status" value={<Badge className={cn("text-base", snag.statusColor)} variant="outline">{snag.status}</Badge>} />
                </div>
            </div>
            {!isEditing && (
                 <div className="p-4 border-t mt-auto">
                    <div className="flex justify-end gap-4">
                        {snag.status === 'Open' && (
                            <Button onClick={() => onUpdate({ ...snag, status: 'In Progress' })} className="h-14 rounded-full px-8">Mark as In Progress</Button>
                        )}
                        {snag.status === 'In Progress' && (
                            <Button onClick={() => onUpdate({ ...snag, status: 'Closed' })} className="h-14 rounded-full px-8">Mark as Resolved</Button>
                        )}
                         {snag.status === 'Closed' && (
                            <Button variant="outline" onClick={() => onUpdate({ ...snag, status: 'Open' })} className="h-14 rounded-full px-8">Re-open Snag</Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};


export function SnagDetailsSheet({ isOpen, onClose, snag, onDelete, onUpdate, startInEditMode = false }: SnagDetailsSheetProps) {
  const isMobile = useIsMobile();

  if (!snag) return null;

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
          className={cn(
            "p-0 bg-white border-stone-300",
            isMobile 
              ? "w-full rounded-t-3xl"
              : "md:max-w-lg rounded-[20px]"
          )}
          {...(isMobile ? { side: "bottom" } : { side: "right" })}
          onInteractOutside={(e) => {
              if ((e.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
                  e.preventDefault();
              }
          }}
      >
          <SnagDetailsContent snag={snag} onClose={onClose} onDelete={onDelete} onUpdate={onUpdate} startInEditMode={startInEditMode} />
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}

