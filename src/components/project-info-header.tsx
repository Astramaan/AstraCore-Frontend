
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
            <div className="relative h-36 rounded-[10px] overflow-hidden">
                <Image src={project.coverImage} layout="fill" objectFit="cover" alt={`${project.name} cover`} data-ai-hint="abstract background"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <p className="text-white text-sm">Progress</p>
                            <Progress value={project.progress} className="w-full h-3 bg-zinc-100" />
                        </div>
                        <p className="text-white text-sm font-semibold">{project.progress}%</p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-[-48px] left-10">
                <Image src={project.profileImage} width={94} height={94} alt={project.name} className="rounded-full border-[3px] border-white" data-ai-hint="person portrait"/>
            </div>
        </div>
    );
};
