
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Separator } from './ui/separator';

interface ProjectVisualsCardProps {
    visuals: {
        '3d': string[];
        gallery: string[];
    }
}

const ImageGalleryDialog = ({ open, onOpenChange, images, title, startIndex = 0 }: { open: boolean, onOpenChange: (open: boolean) => void, images: string[], title: string, startIndex?: number }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-background">
                <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
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

const ImageGrid = ({ images, title, onImageClick, onViewMoreClick }: { images: string[], title: string, onImageClick: (index: number) => void, onViewMoreClick: () => void }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{title}</h3>
                <Button variant="link" className="text-cyan-500 p-0 h-auto" onClick={onViewMoreClick}>
                    View more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-3.5">
                {images.slice(0, 4).map((src, index) => (
                    <div key={index} className="relative aspect-square cursor-pointer" onClick={() => onImageClick(index)}>
                        <Image src={src} layout="fill" objectFit="cover" alt={`${title} ${index + 1}`} className="rounded-[10px]" data-ai-hint="architectural render" />
                        {index === 3 && images.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 rounded-[10px] flex items-center justify-center" onClick={(e) => { e.stopPropagation(); onViewMoreClick(); }}>
                                <p className="text-white text-lg font-bold">+{images.length - 4}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export const ProjectVisualsCard = ({ visuals }: ProjectVisualsCardProps) => {
    const [dialogState, setDialogState] = useState<{ open: boolean, images: string[], title: string, startIndex: number }>({ open: false, images: [], title: '', startIndex: 0 });

    const openDialog = (images: string[], title: string, startIndex = 0) => {
        setDialogState({ open: true, images, title, startIndex });
    };

    const closeDialog = () => {
        setDialogState({ open: false, images: [], title: '', startIndex: 0 });
    }

    return (
        <>
            <Card className="rounded-[50px]">
                <CardContent className="p-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8">
                    <ImageGrid
                        images={visuals['3d']}
                        title="3D Visualize"
                        onImageClick={(index) => openDialog(visuals['3d'], '3D Visualize', index)}
                        onViewMoreClick={() => openDialog(visuals['3d'], '3D Visualize')}
                    />

                    <Separator orientation="vertical" className="h-full" />

                    <ImageGrid
                        images={visuals.gallery}
                        title="Gallery"
                        onImageClick={(index) => openDialog(visuals.gallery, 'Gallery', index)}
                        onViewMoreClick={() => openDialog(visuals.gallery, 'Gallery')}
                    />
                </CardContent>
            </Card>

            <ImageGalleryDialog
                open={dialogState.open}
                onOpenChange={(open) => !open && closeDialog()}
                images={dialogState.images}
                title={dialogState.title}
                startIndex={dialogState.startIndex}
            />
        </>
    );
}
