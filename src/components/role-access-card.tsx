
'use client';

import { ArrowRight, Briefcase, Code, Palette, Plus, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useState } from 'react';
import { RolePermissionsDialog, type RoleData } from './role-permissions-dialog';
import { CreateRoleDialog } from './create-role-dialog';
import { Separator } from './ui/separator';

const adminRoles: RoleData[] = [
    { name: "Super Admin", icon: <Shield className="w-6 h-6 text-black" />, bgColor: "bg-red-200/30" },
];

const employeeRoles: RoleData[] = [
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


export const RoleAccessCard = () => {
    const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

    return (
        <>
            <Card className="rounded-[50px] h-full">
                <CardHeader className="flex flex-row justify-between items-center p-6">
                    <div className="flex items-center gap-2">
                        <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                            <Users className="h-6 w-6"/>
                        </div>
                        <CardTitle className="text-2xl font-semibold">Role Access</CardTitle>
                    </div>
                    <Button variant="outline" className="h-14 px-10 rounded-full text-lg bg-background hover:bg-muted" onClick={() => setIsCreateRoleOpen(true)}>
                        <Plus className="mr-2 h-6 w-6"/>
                        Create Role
                    </Button>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-4">
                    <div>
                        <h3 className="text-base text-muted-foreground mb-2">Admin</h3>
                        {adminRoles.map(role => (
                            <RoleListItem key={role.name} role={role} onClick={() => setSelectedRole(role)} />
                        ))}
                    </div>
                    <div>
                        <h3 className="text-base text-muted-foreground mb-2">Employee</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
                            {employeeRoles.map(role => (
                                <RoleListItem key={role.name} role={role} onClick={() => setSelectedRole(role)} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <RolePermissionsDialog
                isOpen={!!selectedRole}
                onClose={() => setSelectedRole(null)}
                role={selectedRole}
            />
             <CreateRoleDialog isOpen={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen} />
        </>
    )
}
