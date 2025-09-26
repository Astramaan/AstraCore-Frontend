
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
        profileImage: string;
        progress: number;
        daysLeft: number;
        pm?: string;
        id: string;
    }
}

const CircularProgress = ({ value, maxValue, text, size=100, strokeWidth=8 }: { value: number, maxValue: number, text: string, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / maxValue) * 100;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                <circle
                    stroke="rgba(255, 255, 255, 0.2)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size/2}
                    cy={size/2}
                />
                <circle
                    stroke="hsl(var(--primary))"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    r={radius}
                    cx={size/2}
                    cy={size/2}
                />
            </svg>
            <span className="absolute text-2xl font-bold text-white">{text}</span>
        </div>
    );
};


export const ProjectInfoHeader = ({ project }: ProjectInfoHeaderProps) => {
    return (
        <div className="relative h-60 overflow-hidden flex flex-col justify-between">
            <Image src={project.coverImage} layout="fill" objectFit="cover" alt={`${project.name} cover`} data-ai-hint="abstract background" className="z-0"/>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            
            <div className="relative z-20 flex items-center justify-end p-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white">
                    Soil Testing is Underway...
                </div>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                     <NotificationBellIcon />
                     <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </Button>
                <Avatar>
                    <AvatarImage src={project.profileImage} />
                    <AvatarFallback>{project.pm?.[0]}</AvatarFallback>
                </Avatar>
            </div>
            
            <div className="relative z-20 flex items-center gap-4 px-10 pb-4">
                <CircularProgress value={project.daysLeft} maxValue={365} text={String(project.daysLeft)} />
                <div>
                    <h2 className="text-lg font-bold text-white">CLIENT ID: {project.id}</h2>
                    <p className="text-sm text-white/80">Banashankari, Bengaluru - 560109</p>
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
