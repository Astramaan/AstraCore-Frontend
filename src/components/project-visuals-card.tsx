
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface ProjectVisualsCardProps {
    visuals: {
        '3d': string[];
        gallery: string[];
    }
}

const ImageGalleryDialog = ({ images, title, startIndex = 0 }: { images: string[], title: string, startIndex?: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

const ImageGrid = ({ images, title }: { images: string[], title: string }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const openDialog = (index: number) => {
        setStartIndex(index);
        setDialogOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-3.5">
                {images.slice(0, 4).map((src, index) => (
                    <div key={index} className="relative aspect-square cursor-pointer" onClick={() => openDialog(index)}>
                        <Image src={src} layout="fill" objectFit="cover" alt={`${title} ${index + 1}`} className="rounded-[10px]" data-ai-hint="architectural render" />
                        {index === 3 && images.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 rounded-[10px] flex items-center justify-center" onClick={(e) => { e.stopPropagation(); openDialog(0); }}>
                                <p className="text-white text-lg font-bold">+{images.length - 4}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {dialogOpen && <ImageGalleryDialog images={images} title={title} startIndex={startIndex} />}
        </>
    );
};


export const ProjectVisualsCard = ({ visuals }: ProjectVisualsCardProps) => {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [visualizeOpen, setVisualizeOpen] = useState(false);

    return (
        <>
            <Card className="rounded-[50px]">
                <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">3D Visualize</h3>
                             <Button variant="link" className="text-cyan-500 p-0 h-auto" onClick={() => setVisualizeOpen(true)}>
                                View more <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <ImageGrid images={visuals['3d']} title="3D Visualize" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Gallery</h3>
                            <Button variant="link" className="text-cyan-500 p-0 h-auto" onClick={() => setGalleryOpen(true)}>
                                View more <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <ImageGrid images={visuals.gallery} title="Gallery" />
                    </div>
                </CardContent>
            </Card>

            {visualizeOpen && (
                <Dialog open={visualizeOpen} onOpenChange={setVisualizeOpen}>
                    <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px]">
                        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
                            <DialogTitle>3D Visualize</DialogTitle>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <X className="h-4 w-4" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <ScrollArea className="flex-1">
                            <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {visuals['3d'].map((src, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <Image src={src} layout="fill" objectFit="cover" alt={`3D Visualize image ${index + 1}`} className="rounded-[10px]" data-ai-hint="architectural render" />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}

            {galleryOpen && (
                 <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
                    <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px]">
                        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
                            <DialogTitle>Gallery</DialogTitle>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <X className="h-4 w-4" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <ScrollArea className="flex-1">
                            <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {visuals.gallery.map((src, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <Image src={src} layout="fill" objectFit="cover" alt={`Gallery image ${index + 1}`} className="rounded-[10px]" data-ai-hint="construction photo" />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
