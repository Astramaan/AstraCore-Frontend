
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

interface ProjectVisualsCardProps {
    visuals: {
        '3d': string[];
        gallery: string[];
    }
}

const ImageGalleryDialog = ({ images, title, trigger }: { images: string[], title: string, trigger: React.ReactNode }) => (
    <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px]">
            <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
                <DialogTitle>{title}</DialogTitle>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <X className="h-4 w-4" />
                    </Button>
                </DialogClose>
            </DialogHeader>
            <ScrollArea className="flex-1">
                <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="relative aspect-square">
                            <Image src={src} layout="fill" objectFit="cover" alt={`${title} image ${index + 1}`} className="rounded-[10px]" data-ai-hint="architectural render" />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
);


export const ProjectVisualsCard = ({ visuals }: ProjectVisualsCardProps) => {
    return (
        <Card className="rounded-[50px]">
            <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">3D Visualize</h3>
                         <ImageGalleryDialog
                            images={visuals['3d']}
                            title="3D Visualize"
                            trigger={
                                <Button variant="link" className="text-cyan-500 p-0 h-auto">
                                    View more <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-3.5">
                        {visuals['3d'].slice(0, 4).map((src, index) => (
                            <div key={index} className="relative aspect-square">
                                <Image src={src} layout="fill" objectFit="cover" alt={`3D Visual ${index + 1}`} className="rounded-[10px]" data-ai-hint="3d architectural render" />
                                {index === 3 && visuals['3d'].length > 4 && (
                                     <ImageGalleryDialog
                                        images={visuals['3d']}
                                        title="3D Visualize"
                                        trigger={
                                            <div className="absolute inset-0 bg-black/50 rounded-[10px] flex items-center justify-center cursor-pointer">
                                                <p className="text-white text-lg font-bold">+{visuals['3d'].length - 4}</p>
                                            </div>
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Gallery</h3>
                         <ImageGalleryDialog
                            images={visuals.gallery}
                            title="Gallery"
                            trigger={
                                <Button variant="link" className="text-cyan-500 p-0 h-auto">
                                    View more <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-3.5">
                         {visuals.gallery.slice(0, 4).map((src, index) => (
                             <div key={index} className="relative aspect-square">
                                <Image src={src} layout="fill" objectFit="cover" alt={`Gallery image ${index + 1}`} className="rounded-[10px]" data-ai-hint="construction photo" />
                                {index === 3 && visuals.gallery.length > 4 && (
                                     <ImageGalleryDialog
                                        images={visuals.gallery}
                                        title="Gallery"
                                        trigger={
                                            <div className="absolute inset-0 bg-black/50 rounded-[10px] flex items-center justify-center cursor-pointer">
                                                <p className="text-white text-lg font-bold">+{visuals.gallery.length - 4}</p>
                                            </div>
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
