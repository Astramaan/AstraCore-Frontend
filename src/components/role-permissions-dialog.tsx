
'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X, Trash2, Edit } from 'lucide-react';
import { Separator } from './ui/separator';

export interface RoleData {
    name: string;
    icon: React.ReactNode;
    bgColor: string;
}

const permissionsData = {
    Admin: {
        permissions: ["Dashboard", "Onboarding Ma..", "Organization Ma.."],
    },
    Employee: {
        permissions: ["Dashboard", "Onboarding Ma..", "Organization Ma.."],
    },
    "Special Access": {
        "Priya B": ["Dashboard", "Onboarding Ma..", "Organization Ma.."],
    }
};


const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    if (!role) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px] bg-white flex flex-col h-auto max-h-[90vh]">
                <DialogHeader className="p-6 border-b">
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
                <div className="px-6 pb-6 space-y-4 flex-1 overflow-y-auto">
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold text-base mb-1">Admin</p>
                            <p className="text-sm text-muted-foreground">{permissionsData.Admin.permissions.join(', ')}</p>
                        </div>
                        <Separator />
                        <div>
                            <p className="font-semibold text-base mb-1">Employee</p>
                            <p className="text-sm text-muted-foreground">{permissionsData.Employee.permissions.join(', ')}</p>
                        </div>

                        <div>
                           <div className="flex items-center gap-2 justify-center my-4">
                                <Separator className="flex-1" />
                                <p className="text-muted-foreground text-sm whitespace-nowrap">Special access</p>
                                <Separator className="flex-1" />
                            </div>
                            <div className="mt-2">
                                <p className="font-semibold text-base">Priya B</p>
                                <p className="text-sm text-muted-foreground">{permissionsData["Special Access"]["Priya B"].join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { RolePermissionsDialog };
