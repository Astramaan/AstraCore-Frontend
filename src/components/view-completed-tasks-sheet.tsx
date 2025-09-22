
'use client';

import React, { useState, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, ImageIcon } from "lucide-react";
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import PdfIcon from './icons/pdf-icon';
import { Separator } from './ui/separator';

interface Stage {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    duration: string;
    status: 'ongoing' | 'upcoming' | 'completed' | 'pending';
    type: 'stage' | 'payment';
    siteImages?: string[];
    snagCount?: number;
    createdBy: string;
    createdAt: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    progress?: number;
    approvalDate?: string;
    documents?: { name: string; url: string }[];
}

const PdfPreviewDialog = ({ open, onOpenChange, file }: { open: boolean; onOpenChange: (open: boolean) => void; file: { name: string, url: string } | null }) => {
    if (!file) return null;
    const dummyPdfUrl = `https://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white">
                <DialogHeader className="p-4 border-b flex-row items-center justify-between">
                    <DialogTitle>{file.name}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-background">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex-1">
                    <iframe src={dummyPdfUrl} className="w-full h-full" title={file.name} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

const ImagePreviewDialog = ({ open, onOpenChange, images, startIndex = 0, title }: { open: boolean, onOpenChange: (open: boolean) => void, images: string[], startIndex?: number, title: string }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-background">
                <DialogHeader className="p-4 border-b flex-row items-center justify-between">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex-1 p-6 flex items-center justify-center">
                    <Carousel
                        opts={{
                            startIndex: startIndex,
                            loop: true,
                        }}
                        className="w-full max-w-lg"
                    >
                        <CarouselContent>
                            {images.map((src, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-video">
                                        <Image src={src} layout="fill" objectFit="contain" alt={`${title} image ${index + 1}`} className="rounded-[10px]" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const CompletedTaskCard = ({ stage, onClick, className }: { stage: Stage, onClick: (stage: Stage) => void, className?: string }) => {
    const hasAttachments = (stage.documents && stage.documents.length > 0) || (stage.siteImages && stage.siteImages.length > 0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pdfPreview, setPdfPreview] = useState<{ open: boolean; file: { name: string; url: string; } | null; }>({ open: false, file: null });
    const [imagePreview, setImagePreview] = useState<{ open: boolean; images: string[], startIndex: number, title: string }>({ open: false, images: [], startIndex: 0, title: '' });

    const handleImageClick = (images: string[] | undefined, index: number, title: string) => {
        if (!images) return;
        setImagePreview({ open: true, images: images, startIndex: index, title });
    }

    const handleCardClick = () => {
        if (hasAttachments) {
            setIsExpanded(!isExpanded);
        } else {
            onClick(stage);
        }
    }
    
    return (
        <>
            <Card className={cn("rounded-[24px] p-4 hover:shadow-md transition-shadow cursor-pointer bg-background", className)} onClick={handleCardClick} data-state={isExpanded ? 'open' : 'closed'}>
                <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 shrink-0">
                        <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-[24px] object-cover w-full h-full" data-ai-hint="construction work" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[24px] flex items-end justify-center p-2">
                            <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                            <span className="text-white text-sm font-semibold">{stage.category}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-1 w-full">
                        <div className="flex justify-between items-start">
                            <h3 className="text-black text-base font-semibold">{stage.title}</h3>
                            <Badge className="capitalize bg-green-100 text-green-700">Completed</Badge>
                        </div>
                        <p className="text-sm">{stage.subtitle}</p>
                        <div className="pt-2">
                            <Progress value={stage.progress || 100} className="h-2" />
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-black text-xs font-normal">{stage.progress || 100}%</span>
                                <span className="text-grey-1 text-xs">{new Date(stage.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="mt-4 space-y-2">
                        <Separator />
                        {stage.approvalDate && <p className="text-sm text-muted-foreground pt-2">Approved by Project Manager on {stage.approvalDate}</p>}
                        
                        {stage.siteImages && stage.siteImages.length > 0 && (
                            <div className="grid grid-cols-4 gap-2 pt-2">
                                {stage.siteImages.map((img, index) => (
                                     <div key={index} className="relative w-full aspect-square cursor-pointer" onClick={(e) => {e.stopPropagation(); handleImageClick(stage.siteImages, index, stage.title)}}>
                                        <Image src={img} layout="fill" objectFit="cover" alt={`Site image ${index + 1}`} className="rounded-[10px]" data-ai-hint="construction site photo" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {stage.documents && stage.documents.length > 0 && (
                            <div className="pt-2 space-y-2">
                                {stage.documents.map((doc, index) => (
                                    <div key={index} onClick={(e) => { e.stopPropagation(); setPdfPreview({ open: true, file: doc })}} className="flex items-center gap-4 p-2 -mx-2 rounded-lg cursor-pointer hover:bg-muted">
                                        <PdfIcon className="w-6 h-6 shrink-0"/>
                                        <div className="flex-1">
                                            <p className="text-base text-black font-medium">{doc.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
            <PdfPreviewDialog open={pdfPreview.open} onOpenChange={(open) => setPdfPreview({ ...pdfPreview, open })} file={pdfPreview.file} />
            <ImagePreviewDialog open={imagePreview.open} onOpenChange={(open) => setImagePreview({ ...imagePreview, open })} {...imagePreview} />
        </>
    );
};

interface ViewCompletedTasksSheetProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Stage[];
  onTaskClick: (task: Stage) => void;
}

export function ViewCompletedTasksSheet({ isOpen, onClose, tasks, onTaskClick }: ViewCompletedTasksSheetProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);
  
  const handleTaskClickAndClose = (task: Stage) => {
    onTaskClick(task);
    onClose();
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="flex justify-between items-center">
            <span className="text-2xl font-semibold">Completed Tasks</span>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </SheetTitle>
           <div className="relative pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-0.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search completed tasks..."
              className="pl-12 h-14 rounded-full bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
             {filteredTasks.length > 0 ? (
                 filteredTasks.map((task, index) => (
                    <CompletedTaskCard key={`${task.id}-${index}`} stage={task} onClick={() => {}} />
                ))
             ) : (
                <p className="text-muted-foreground col-span-full text-center py-10">No completed tasks match your search.</p>
             )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
