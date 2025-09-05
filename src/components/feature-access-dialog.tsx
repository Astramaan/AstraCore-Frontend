
'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X, Trash2, Edit } from 'lucide-react';
import { Separator } from './ui/separator';

interface FeatureAccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    roleName: string;
}

const permissionsData = {
    'Dashboard': ["Subscription Analytics", "Subscription Churn", "Active Customers", "Exit Survey"],
    'Onboarding Management': ["Subscription Analytics", "Subscription Churn", "Active Customers", "Exit Survey"],
    'Organization Management': ["Subscription Plans Manage", "Active Customers", "Expired Customers", "Payment Attempts", "Invoices", "Discounts Manage"],
    'Subscription Management': ["Subscription Plans Manage", "Active Customers", "Expired Customers", "Payment Attempts", "Invoices", "Discounts Manage"],
};

const FeatureCategory = ({ title, features }: { title: string, features: string[] }) => (
    <div className="space-y-2">
        <p className="font-semibold text-base">{title}</p>
        <div className="space-y-1">
            {features.map((feature, index) => (
                <p key={index} className="text-xs text-black">{feature}</p>
            ))}
        </div>
    </div>
)

export const FeatureAccessDialog = ({ isOpen, onClose, category, roleName }: FeatureAccessDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px] bg-white flex flex-col h-auto max-h-[90vh]">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="flex justify-between items-center">
                        <span className="text-2xl font-semibold">Features for {category.toLowerCase()}</span>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 flex-1 overflow-y-auto space-y-4">
                    <h3 className="text-lg font-semibold text-black">Features access</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <FeatureCategory title="Dashboard" features={permissionsData.Dashboard} />
                        <FeatureCategory title="Onboarding Management" features={permissionsData['Onboarding Management']} />
                        <FeatureCategory title="Organization Management" features={permissionsData['Organization Management']} />
                        <FeatureCategory title="Subscription Management" features={permissionsData['Subscription Management']} />
                    </div>
                </div>
                <div className="px-6 py-4 mt-auto">
                    <div className="relative h-28">
                         <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-white/0 to-white rounded-b-[50px]" />
                         <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-4 gap-2">
                             <Button variant="outline" size="icon" className="w-14 h-14 rounded-full bg-background">
                                 <Trash2 className="w-6 h-6 text-red-500" />
                             </Button>
                             <Button className="h-14 rounded-full flex-1 max-w-xs">
                                 Edit
                             </Button>
                         </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
