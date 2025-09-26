
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Separator } from './ui/separator';

interface ProjectVisualsCardProps {
    visuals: {
        '3d': string[];
        gallery: string[];
    }
}

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

const ImageGallerySheet = ({ open, onOpenChange, images, title, onImageClick }: { open: boolean, onOpenChange: (open: boolean) => void, images: string[], title: string, onImageClick: (index: number) => void }) => {
    return (
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
                            <div key={index} className="relative aspect-square cursor-pointer group" onClick={() => onImageClick(index)}>
                                <Image src={src} layout="fill" objectFit="cover" alt={`${title} image ${index + 1}`} className="rounded-[10px]" />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

const ImageGrid = ({ images, title, onViewMoreClick, onImageClick }: { images: string[], title: string, onViewMoreClick: () => void, onImageClick: (index: number) => void }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{title}</h3>
                <Button variant="link" className="text-cyan-500 p-0 h-auto" onClick={onViewMoreClick}>
                    View more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {images.slice(0, 3).map((src, index) => (
                    <div key={index} className="relative aspect-square cursor-pointer" onClick={() => onImageClick(index)}>
                        <Image src={src} layout="fill" objectFit="cover" alt={`${title} ${index + 1}`} className="rounded-[10px]" data-ai-hint="architectural render" />
                    </div>
                ))}
            </div>
        </div>
    );
};


export const ProjectVisualsCard = ({ visuals }: ProjectVisualsCardProps) => {
    const [sheetState, setSheetState] = useState<{ open: boolean, images: string[], title: string }>({ open: false, images: [], title: '' });
     const [previewState, setPreviewState] = useState<{ open: boolean, images: string[], startIndex: number, title: string }>({ open: false, images: [], startIndex: 0, title: '' });

    const openSheet = (images: string[], title: string) => {
        setSheetState({ open: true, images, title });
    };

    const closeSheet = () => {
        setSheetState({ open: false, images: [], title: '' });
    }

    const openPreview = (images: string[], title: string, index: number) => {
        setPreviewState({ open: true, images, startIndex: index, title });
    };

    const closePreview = () => {
        setPreviewState({ open: false, images: [], startIndex: 0, title: '' });
    };

    return (
        <>
            <Card className="rounded-[50px]">
                <CardContent className="p-10 flex flex-col gap-8">
                    <ImageGrid
                        images={visuals['3d']}
                        title="3D Visualize"
                        onViewMoreClick={() => openSheet(visuals['3d'], '3D Visualize')}
                        onImageClick={(index) => openPreview(visuals['3d'], '3D Visualize', index)}
                    />

                    <Separator orientation="horizontal" />

                    <ImageGrid
                        images={visuals.gallery}
                        title="Gallery"
                        onViewMoreClick={() => openSheet(visuals.gallery, 'Gallery')}
                        onImageClick={(index) => openPreview(visuals.gallery, 'Gallery', index)}
                    />
                </CardContent>
            </Card>

            <ImageGallerySheet
                open={sheetState.open}
                onOpenChange={(open) => !open && closeSheet()}
                images={sheetState.images}
                title={sheetState.title}
                onImageClick={(index) => openPreview(sheetState.images, sheetState.title, index)}
            />
             <ImagePreviewDialog
                open={previewState.open}
                onOpenChange={(open) => !open && closePreview()}
                images={previewState.images}
                startIndex={previewState.startIndex}
                title={previewState.title}
            />
        </>
    );
}
