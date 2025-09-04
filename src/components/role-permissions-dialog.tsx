
'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Separator } from './ui/separator';

export interface RoleData {
    name: string;
    icon: React.ReactNode;
    bgColor: string;
}

const permissions = {
    Admin: ["Dashboard", "Onboarding Ma..", "Organization Ma.."],
    Employee: ["Dashboard", "Onboarding Ma..", "Organization Ma.."],
    "Special access": {
        "Priya B": ["Dashboard", "Onboarding Ma..", "Organization Ma.."]
    }
};


const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    if (!role) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px] bg-white">
                <DialogHeader className="p-6">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                                {role.icon}
                            </div>
                            <span className="text-2xl font-semibold">{role.name}</span>
                        </div>
                         <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="px-6 pb-6 space-y-4">
                    <div className="space-y-2">
                        <p className="text-lg font-medium">Admin</p>
                        <p className="text-base text-grey-2">{permissions.Admin.join(', ')}</p>
                    </div>
                     <Separator />
                     <div className="space-y-2">
                        <p className="text-lg font-medium">Employee</p>
                        <p className="text-base text-grey-2">{permissions.Employee.join(', ')}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Separator className="flex-1"/>
                         <span className="text-base text-grey-1">Special access</span>
                        <Separator className="flex-1"/>
                    </div>
                    
                    {Object.entries(permissions['Special access']).map(([name, perms]) => (
                         <div key={name} className="space-y-2">
                            <p className="text-lg font-medium">{name}</p>
                            <p className="text-base text-grey-2">{perms.join(', ')}</p>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { RolePermissionsDialog };
