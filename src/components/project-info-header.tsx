
'use client';

import React from 'react';
import Image from 'next/image';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import NotificationBellIcon from './icons/notification-bell-icon';
import { Button } from './ui/button';
import { AvatarWithProgress } from './avatar-with-progress';

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
        <div className="relative h-96 overflow-hidden flex flex-col justify-between">
            <Image src={project.coverImage} layout="fill" objectFit="cover" alt={`${project.name} cover`} data-ai-hint="abstract background" className="z-0"/>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            
            <div className="relative z-20">
                {children}
            </div>
            
            <div className="relative z-20 flex items-center gap-4 px-10 pb-4">
                <div>
                    <h2 className="text-lg font-bold text-white">Project Manager</h2>
                    <p className="text-sm text-white/80">{project.pm}</p>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-10 z-20">
                 <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0 40C0 40 360 0 720 0C1080 0 1440 40 1440 40H0Z" fill="hsl(var(--background))"/>
                </svg>
            </div>
        </div>
    );
};

    