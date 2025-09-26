
'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectInfoHeaderProps {
    project: {
        name: string;
        coverImage: string;
        progress: number;
        pm?: string;
        id: string;
    },
    children?: React.ReactNode;
}

export const ProjectInfoHeader = ({ project, children }: ProjectInfoHeaderProps) => {
    return (
        <div className="relative w-full h-80">
            <Image 
                src={project.coverImage} 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center"
                alt={`${project.name} cover`} 
                data-ai-hint="abstract background" 
                className="z-0 rounded-b-[50px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 rounded-b-[50px]"></div>
            
            <div className="relative z-20 h-full flex flex-col justify-between">
                <div>
                    {children}
                </div>
                
                <div className="p-6 md:p-10">
                    <h3 className="text-lg font-semibold text-white text-shadow">Project Manager</h3>
                    <p className="text-white text-shadow">{project.pm}</p>
                </div>
            </div>
        </div>
    );
};
