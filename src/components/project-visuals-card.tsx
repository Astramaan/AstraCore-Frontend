
'use client';

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectVisualsCardProps {
    visuals: {
        '3d': string[];
        gallery: string[];
    }
}

export const ProjectVisualsCard = ({ visuals }: ProjectVisualsCardProps) => {
    return (
        <Card className="rounded-[20px]">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">3D Visualize</h3>
                        <Button variant="link" className="text-cyan-500 p-0 h-auto">
                            View more <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-3.5">
                        {visuals['3d'].map((src, index) => (
                            <div key={index} className="relative aspect-square">
                                <Image src={src} layout="fill" objectFit="cover" alt={`3D Visual ${index + 1}`} className="rounded-[10px]" data-ai-hint="3d architectural render" />
                                {index === 3 && visuals['3d'].length > 4 && (
                                    <div className="absolute inset-0 bg-black/50 rounded-[10px] flex items-center justify-center">
                                        <p className="text-white text-lg font-bold">+{visuals['3d'].length - 4}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Gallery</h3>
                        <Button variant="link" className="text-cyan-500 p-0 h-auto">
                            View more <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-3.5">
                         {visuals.gallery.slice(0, 4).map((src, index) => (
                             <div key={index} className="relative aspect-square">
                                <Image src={src} layout="fill" objectFit="cover" alt={`Gallery image ${index + 1}`} className="rounded-[10px]" data-ai-hint="construction photo" />
                                {index === 3 && visuals.gallery.length > 4 && (
                                    <div className="absolute inset-0 bg-black/50 rounded-[10px] flex items-center justify-center">
                                        <p className="text-white text-lg font-bold">+{visuals.gallery.length - 4}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
