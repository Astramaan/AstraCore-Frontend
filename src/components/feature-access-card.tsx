
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RolePermissionsDialog, type RoleData } from './role-permissions-dialog';
import { Shield, Briefcase, Code, Palette, Users, Plus, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CreateRoleDialog } from './create-role-dialog';

const allRoles: RoleData[] = [
    { name: "Sales", icon: <Briefcase className="w-6 h-6 text-black" />, bgColor: "bg-green-200/30" },
    { name: "Super Admin", icon: <Shield className="w-6 h-6 text-black" />, bgColor: "bg-cyan-200/30" },
    { name: "Software Development", icon: <Code className="w-6 h-6 text-black" />, bgColor: "bg-blue-300/30" },
    { name: "Design", icon: <Palette className="w-6 h-6 text-black" />, bgColor: "bg-purple-300/30" },
    { name: "Support & Feedback", icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-red-200/30" },
    { name: "Human Resources", icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-pink-300/30" },
];

const RoleListItem = ({ role, onClick, isFirst, isSecond, isSecondLast, isLast }: { role: RoleData; onClick: () => void; isFirst?: boolean; isSecond?: boolean; isSecondLast?: boolean; isLast?: boolean; }) => (
    <div className={cn(
        "flex justify-between items-center py-2 cursor-pointer hover:bg-muted/50 rounded-lg -mx-2 px-2 group",
        isFirst && "hover:rounded-tl-[25px]",
        isSecond && "hover:rounded-tr-[25px]",
        isSecondLast && "hover:rounded-bl-[25px]",
        isLast && "hover:rounded-br-[25px]"
    )} onClick={onClick}>
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                {role.icon}
            </div>
            <p className="text-lg font-medium">{role.name}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </div>
);

export const FeatureAccessCard = () => {
    const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
    const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
    const [isCreateRoleDialogOpen, setIsCreateRoleDialogOpen] = useState(false);

    const handleRoleClick = (role: RoleData) => {
        setSelectedRole(role);
        setIsPermissionsDialogOpen(true);
    };
    
    const closePermissionsDialog = () => {
        setIsPermissionsDialogOpen(false);
        setSelectedRole(null);
    };
    
    return (
        <>
            <Card className="rounded-[50px] w-full flex flex-col">
                <CardHeader className="flex flex-row justify-between items-center p-6">
                    <div className="flex items-center gap-2">
                        <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                            <Users className="h-6 w-6"/>
                        </div>
                        <CardTitle className="text-2xl font-semibold">Feature Access</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 px-6 pt-0 pb-6 flex-grow">
                    {allRoles.map((role, index) => (
                       <RoleListItem 
                           key={role.name} 
                           role={role} 
                           onClick={() => handleRoleClick(role)}
                           isFirst={index === 0}
                           isSecond={index === 1}
                           isSecondLast={index === allRoles.length - 2}
                           isLast={index === allRoles.length - 1}
                       />
                    ))}
                </CardContent>
            </Card>
            <RolePermissionsDialog
                isOpen={isPermissionsDialogOpen}
                onClose={closePermissionsDialog}
                role={selectedRole}
            />
            <CreateRoleDialog
                isOpen={isCreateRoleDialogOpen}
                onOpenChange={setIsCreateRoleDialogOpen}
            />
        </>
    )
}
