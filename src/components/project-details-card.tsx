
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
    onEdit?: () => void;
    onDelete?: () => void;
}

export const ProjectDetailsCard = ({ projectInfo, onEdit, onDelete }: ProjectDetailsCardProps) => {
    const canManage = onEdit && onDelete;

    return (
        <Card className="rounded-[50px] p-6 md:p-10">
            <CardContent className="p-0">
                <div className="relative grid grid-cols-1 gap-x-8 gap-y-6">
                    {canManage && (
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
                    )}

                    <div className="space-y-6">
                        <CardHeader className="p-0">
                         <CardTitle className="text-xl font-medium">Project Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <DetailField label="Project cost" value={projectInfo.cost} />
                          <DetailField label="Duration" value={`${projectInfo.duration.start} - ${projectInfo.duration.end}`} />
                          <DetailField label="Site Dimension" value={projectInfo.dimension} />
                          <DetailField label="Floors" value={projectInfo.floors} />
                          <DetailField label="Status" value={projectInfo.status} />
                          <div className="space-y-2 self-end">
                            <a href={projectInfo.locationLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="w-full h-14 rounded-full bg-sky-500/10 text-sky-500 border-sky-500 hover:bg-sky-500/20">Site location</Button>
                            </a>
                          </div>
                        </CardContent>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
