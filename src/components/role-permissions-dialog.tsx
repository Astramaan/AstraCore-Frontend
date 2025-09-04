
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
        Dashboard: ["Subscription Analytics", "Subscription Churn", "Active Customers", "Exit Survey"],
        "Onboarding Management": ["Subscription Analytics", "Subscription Churn", "Active Customers", "Exit Survey"],
    },
    Employee: {
         "Organization Management": ["Subscription Plans Manage", "Active Customers", "Expired Customers", "Payment Attempts", "Invoices", "Discounts Manage"],
         "Subscription Management": ["Subscription Plans Manage", "Active Customers", "Expired Customers", "Payment Attempts", "Invoices", "Discounts Manage"],
    },
    "Special Access": {
        "Priya B": ["Dashboard", "Onboarding Ma..", "Organization Ma.."],
    }
};


const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    if (!role) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg p-0 rounded-[50px] bg-white flex flex-col h-auto max-h-[90vh]">
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
                    <h3 className="text-lg font-semibold">Features access</h3>
                     <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-x-8">
                             <div>
                                 <p className="font-semibold text-base mb-2">Dashboard</p>
                                 <div className="pb-4">
                                     <p className="text-xs text-muted-foreground">{permissionsData.Admin.Dashboard.join(', ')}</p>
                                 </div>
                             </div>
                              <div>
                                 <p className="font-semibold text-base mb-2">Onboarding Management</p>
                                 <div className="pb-4">
                                     <p className="text-xs text-muted-foreground">{permissionsData.Admin["Onboarding Management"].join(', ')}</p>
                                 </div>
                             </div>
                               <div>
                                 <p className="font-semibold text-base mb-2">Organization Management</p>
                                 <div className="pb-4">
                                     <p className="text-xs text-muted-foreground">{permissionsData.Employee["Organization Management"].join(', ')}</p>
                                 </div>
                             </div>
                             <div>
                                 <p className="font-semibold text-base mb-2">Subscription Management</p>
                                 <div className="pb-4">
                                     <p className="text-xs text-muted-foreground">{permissionsData.Employee["Subscription Management"].join(', ')}</p>
                                 </div>
                             </div>
                         </div>
                         <div>
                            <div className="flex items-center gap-2 justify-center mb-2">
                                <Separator className="flex-1" />
                                <p className="text-muted-foreground text-sm">Special access</p>
                                <Separator className="flex-1" />
                            </div>
                            <div className="pb-4">
                                 <p className="font-semibold text-base">Priya B</p>
                                 <p className="text-xs text-muted-foreground">{permissionsData["Special Access"]["Priya B"].join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="px-6 py-4 border-t flex justify-end items-center gap-2 shrink-0 bg-white rounded-b-[50px] invisible">
                     <div className="flex gap-2">
                        <Button variant="outline" className="h-[54px] rounded-full text-lg bg-background hover:bg-destructive/10 text-destructive border-transparent hover:border-destructive">
                            <Trash2 className="mr-2 h-5 w-5"/>
                        </Button>
                        <Button className="h-[54px] rounded-full text-lg px-8">
                            Edit
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { RolePermissionsDialog };
