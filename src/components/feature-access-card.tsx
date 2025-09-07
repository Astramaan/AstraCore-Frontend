
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RolePermissionsDialog, type RoleData } from './role-permissions-dialog';
import { FeatureAccessDialog } from './feature-access-dialog';
import { Shield, Briefcase, Code, Palette, Users } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const allRoles: RoleData[] = [
    { name: "Super Admin", icon: <Shield className="w-6 h-6 text-black" />, bgColor: "bg-red-200/30" },
    { name: "Sales", icon: <Briefcase className="w-6 h-6 text-black" />, bgColor: "bg-yellow-400/30" },
    { name: "Software Development", icon: <Code className="w-6 h-6 text-black" />, bgColor: "bg-blue-300/30" },
    { name: "Design", icon: <Palette className="w-6 h-6 text-black" />, bgColor: "bg-purple-300/30" },
    { name: "Support & Feedback", icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-green-300/30" },
    { name: "Human Resources", icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-pink-300/30" },
];

const RoleListItem = ({ role, onClick }: { role: RoleData; onClick: () => void }) => (
    <div className="flex justify-between items-center py-4 border-b cursor-pointer" onClick={onClick}>
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                {role.icon}
            </div>
            <p className="text-lg font-medium">{role.name}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
    </div>
);

export const FeatureAccessCard = () => {
    const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
    const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);

    const handleRoleClick = (role: RoleData) => {
        setSelectedRole(role);
        if (role.name === 'Super Admin') {
            setIsFeatureDialogOpen(true);
        } else {
            setIsPermissionsDialogOpen(true);
        }
    };
    
    const closePermissionsDialog = () => {
        setIsPermissionsDialogOpen(false);
        setSelectedRole(null);
    };
    
    const closeFeatureDialog = () => {
        setIsFeatureDialogOpen(false);
        setSelectedRole(null);
    }
    
    return (
        <>
            <Card className="rounded-[50px] h-full">
                <CardHeader className="flex flex-row justify-between items-center p-6">
                    <div className="flex items-center gap-2">
                        <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                            <Users className="h-6 w-6"/>
                        </div>
                        <CardTitle className="text-2xl font-semibold">Feature Access</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 px-6 pb-0">
                    {allRoles.map(role => (
                       <RoleListItem key={role.name} role={role} onClick={() => handleRoleClick(role)} />
                    ))}
                </CardContent>
            </Card>
            <RolePermissionsDialog
                isOpen={isPermissionsDialogOpen}
                onClose={closePermissionsDialog}
                role={selectedRole}
            />
            {selectedRole && (
                <FeatureAccessDialog 
                    isOpen={isFeatureDialogOpen}
                    onClose={closeFeatureDialog}
                    category={"Admin"} // For Super Admin, we show all admin features
                    roleName={selectedRole.name}
                />
            )}
        </>
    )
}
