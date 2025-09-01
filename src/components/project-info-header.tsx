
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
    }
}

export const ProjectInfoHeader = ({ project }: ProjectInfoHeaderProps) => {
    return (
        <div className="relative">
            <div className="relative h-36 rounded-[50px] overflow-hidden p-10 flex items-center justify-between">
                <Image src={project.coverImage} layout="fill" objectFit="cover" alt={`${project.name} cover`} data-ai-hint="abstract background" className="z-0"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                <div className="relative z-20 flex items-center gap-4">
                    <Image src={project.profileImage} width={94} height={94} alt={project.name} className="rounded-full border-[3px] border-white" data-ai-hint="person portrait"/>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                    </div>
                </div>
                <div className="relative z-20 flex items-center gap-4 max-w-md">
                    <div className="flex-1">
                        <p className="text-white text-sm">Progress</p>
                        <Progress value={project.progress} className="w-full h-3 bg-zinc-100/50" />
                    </div>
                    <p className="text-white text-sm font-semibold">{project.progress}%</p>
                </div>
            </div>
        </div>
    );
};
