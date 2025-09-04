
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
    Dashboard: [
        "Subscription Analytics",
        "Subscription Churn",
        "Active Customers",
        "Exit Survey",
    ],
    "Onboarding Management": [
        "Subscription Analytics",
        "Subscription Churn",
        "Active Customers",
        "Exit Survey",
    ],
    "Organization Management": [
        "Subscription Plans Manage",
        "Active Customers",
        "Expired Customers",
        "Payment Attempts",
        "Invoices",
        "Discounts Manage",
    ],
    "Subscription Management": [
        "Subscription Plans Manage",
        "Active Customers",
        "Expired Customers",
        "Payment Attempts",
        "Invoices",
        "Discounts Manage",
    ],
};


const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    if (!role) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl p-0 rounded-[50px] bg-white flex flex-col h-auto max-h-[90vh]">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                                {role.icon}
                            </div>
                            <span className="text-2xl font-semibold">{role.name} Admin</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {Object.entries(permissionsData).map(([category, features]) => (
                            <div key={category} className="space-y-2">
                                <p className="text-base font-medium text-black">{category.replace(/ /g, '\n')}</p>
                                <ul className="space-y-1">
                                    {features.map((feature, index) => (
                                        <li key={index} className="text-xs text-black">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="px-6 py-4 border-t flex justify-end items-center gap-2 shrink-0 bg-white rounded-b-[50px]">
                     <div className="flex gap-2">
                        <Button variant="outline" className="h-[54px] rounded-full text-lg text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700">
                            <Trash2 className="mr-2 h-5 w-5"/>
                            Delete
                        </Button>
                        <Button className="h-[54px] rounded-full text-lg px-8">
                            <Edit className="mr-2 h-5 w-5"/>
                            Edit
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { RolePermissionsDialog };
