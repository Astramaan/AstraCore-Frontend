
'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

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

export const ImageGallerySheet = ({ open, onOpenChange, images, title }: { open: boolean, onOpenChange: (open: boolean) => void, images: string[], title: string }) => {
    const [previewState, setPreviewState] = useState<{ open: boolean, startIndex: number }>({ open: false, startIndex: 0 });

    const openPreview = (index: number) => {
        setPreviewState({ open: true, startIndex: index });
    };

    const closePreview = () => {
        setPreviewState({ open: false, startIndex: 0 });
    };

    return (
        <>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent 
                    side="bottom"
                    className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-4xl md:mx-auto rounded-t-[50px] border-none"
                >
                    <SheetHeader className="p-4 border-b flex-row items-center justify-between">
                        <SheetTitle>{title}</SheetTitle>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full bg-background w-[54px] h-[54px]">
                                <X className="h-5 w-5" />
                            </Button>
                        </SheetClose>
                    </SheetHeader>
                    <ScrollArea className="flex-1">
                        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((src, index) => (
                                <div key={index} className="relative aspect-square cursor-pointer group" onClick={() => openPreview(index)}>
                                    <Image src={src} layout="fill" objectFit="cover" alt={`${title} image ${index + 1}`} className="rounded-[10px]" />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
            <ImagePreviewDialog 
                open={previewState.open}
                onOpenChange={(open) => !open && closePreview()}
                images={images}
                startIndex={previewState.startIndex}
                title={title}
            />
        </>
    )
}
