
'use client';

import React from 'react';
import Image from 'next/image';
import { Progress } from './ui/progress';

interface ProjectInfoHeaderProps {
    project: {
        name: string;
        coverImage: string;
        profileImage: string;
        progress: number;
        pm?: string;
    }
}

export const ProjectInfoHeader = ({ project }: ProjectInfoHeaderProps) => {
    return (
        <div className="relative h-60 overflow-hidden p-10 flex items-center justify-between flex-1">
            <Image src={project.coverImage} layout="fill" objectFit="cover" alt={`${project.name} cover`} data-ai-hint="abstract background" className="z-0"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
            <div className="relative z-20 flex items-center gap-4">
                
                <div>
                    <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                    {project.pm && (
                        <p className="text-sm text-white/80">Project Manager: {project.pm}</p>
                    )}
                </div>
            </div>
            <div className="relative z-20 flex items-center gap-4 max-w-md w-1/3">
                <div className="flex-1">
                    <p className="text-white text-sm">Progress</p>
                    <Progress value={project.progress} className="w-full h-3 bg-zinc-100/50" />
                </div>
                <p className="text-white text-sm font-semibold">{project.progress}%</p>
            </div>
        </div>
    );
};
