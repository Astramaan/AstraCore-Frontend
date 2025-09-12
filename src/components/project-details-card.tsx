

'use client';

import React from 'react';
import { Card, CardContent } from './ui/card';
import { MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';

interface DetailFieldProps {
    label: string;
    value: React.ReactNode;
    fullWidth?: boolean;
}

const DetailField = ({ label, value, fullWidth = false }: DetailFieldProps) => (
    <div className={cn("space-y-2", fullWidth ? 'md:col-span-2' : '')}>
        <Label className={cn("text-base font-medium px-2 text-grey-1")}>{label}</Label>
        <div className="h-14 flex items-center px-5 rounded-full bg-background">
            <p className="text-black text-lg leading-tight truncate">{value}</p>
        </div>
    </div>
);

interface ProjectDetailsCardProps {
    personalInfo: {
        name: string;
        clientId: string;
        phone: string;
        email: string;
        address: string;
    };
    projectInfo: {
        cost: string;
        duration: {
            start: string;
            end: string;
        };
        dimension: string;
        floors: string;
        status: string;
        locationLink: string;
    };
    onEdit: () => void;
    onDelete: () => void;
}

export const ProjectDetailsCard = ({ personalInfo, projectInfo, onEdit, onDelete }: ProjectDetailsCardProps) => {
    return (
        <Card className="rounded-[50px] p-10">
            <CardContent className="p-0">
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="absolute right-0 top-0" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-zinc-100 rounded-[20px]">
                                    <DropdownMenuItem className="rounded-[10px]" onSelect={onEdit}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600 rounded-[10px]" onSelect={onDelete}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-medium">Personal Information</h3>
                        <DetailField label="Name" value={personalInfo.name} />
                        <DetailField label="Client ID" value={personalInfo.clientId} />
                        <DetailField label="Phone Number" value={personalInfo.phone} />
                        <DetailField label="Email" value={personalInfo.email} />
                    </div>
                    
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium">Project Information</h3>
                        <DetailField label="Project cost" value={projectInfo.cost} />
                        <DetailField label="Duration" value={`${projectInfo.duration.start} - ${projectInfo.duration.end}`} />
                        <div className="grid grid-cols-2 gap-x-8">
                            <DetailField label="Site Dimension" value={projectInfo.dimension} />
                            <DetailField label="Floors" value={projectInfo.floors} />
                        </div>
                        <DetailField label="Status" value={projectInfo.status} />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
                        <div className="space-y-2">
                            <Label className={cn("text-base font-medium px-2 text-grey-1")}>Current address</Label>
                            <div className="h-auto flex items-center p-5 rounded-3xl bg-background min-h-[56px]">
                                <p className="text-black text-lg leading-tight">{personalInfo.address}</p>
                            </div>
                        </div>
                         <div className="space-y-2 self-end">
                            <a href={projectInfo.locationLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="w-full h-14 rounded-full bg-sky-500/10 text-sky-500 border-sky-500 hover:bg-sky-500/20">Site location</Button>
                            </a>
                         </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
