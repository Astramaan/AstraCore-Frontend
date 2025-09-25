
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface DetailFieldProps {
    label: string;
    value: React.ReactNode;
    fullWidth?: boolean;
}

const DetailField = ({ label, value, fullWidth = false }: DetailFieldProps) => (
    <div className={cn("space-y-1", fullWidth ? 'col-span-2' : '')}>
        <Label className="text-sm md:text-base font-medium text-grey-1">{label}</Label>
        <div className={cn("text-black text-base md:text-lg leading-tight", !fullWidth && "truncate")}>{value}</div>
    </div>
);

interface ProjectDetailsCardProps {
    personalInfo?: {
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
    onEdit?: () => void;
    onDelete?: () => void;
}

export const ProjectDetailsCard = ({ personalInfo, projectInfo, onEdit, onDelete }: ProjectDetailsCardProps) => {
    const canManage = onEdit && onDelete;

    return (
        <Card className="rounded-[50px] p-10">
            <CardHeader className="p-0 flex flex-row items-center justify-end mb-6">
                {canManage && (
                    <div onClick={(e) => e.stopPropagation()}>
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
            </CardHeader>
            <CardContent className="p-0 flex justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-x-8">
                    {personalInfo && (
                        <>
                            <div className="space-y-6">
                                <h4 className="text-lg font-medium text-stone-500 mb-4">Personal details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <DetailField label="Name" value={personalInfo.name} />
                                    <DetailField label="Client ID" value={personalInfo.clientId} />
                                    <DetailField label="Phone" value={personalInfo.phone} />
                                    <DetailField label="Email" value={personalInfo.email} />
                                    <DetailField label="Address" value={personalInfo.address} fullWidth />
                                </div>
                            </div>
                            <Separator orientation="vertical" className="hidden lg:block"/>
                        </>
                    )}
                     <div className="space-y-6">
                        <h4 className="text-lg font-medium text-stone-500 mb-4">Project details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          <DetailField label="Project cost" value={projectInfo.cost} />
                          <DetailField label="Duration" value={`${projectInfo.duration.start} - ${projectInfo.duration.end}`} />
                          <DetailField label="Site Dimension" value={projectInfo.dimension} />
                          <DetailField label="Floors" value={projectInfo.floors} />
                          <DetailField label="Status" value={projectInfo.status} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
