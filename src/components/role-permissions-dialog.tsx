
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { FeatureAccessDialog } from './feature-access-dialog';

export interface RoleData {
    name: string;
    icon: React.ReactNode;
    bgColor: string;
}

const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'Admin' | 'Employee' | 'Special Access' | null>(null);

    if (!role) return null;

    const handleCategoryClick = (category: 'Admin' | 'Employee' | 'Special Access') => {
        setSelectedCategory(category);
        setIsFeatureDialogOpen(true);
    };

    return (
        <>
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
                            <div className="flex justify-between items-center cursor-pointer hover:bg-muted p-2 rounded-lg" onClick={() => handleCategoryClick('Admin')}>
                                <p className="font-semibold text-base">Admin</p>
                                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center cursor-pointer hover:bg-muted p-2 rounded-lg" onClick={() => handleCategoryClick('Employee')}>
                                <p className="font-semibold text-base">Employee</p>
                                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 justify-center my-4">
                                    <Separator className="flex-1" />
                                    <p className="text-muted-foreground text-sm whitespace-nowrap">Special access</p>
                                    <Separator className="flex-1" />
                                </div>
                                <div className="flex justify-between items-center mt-2 cursor-pointer hover:bg-muted p-2 rounded-lg" onClick={() => handleCategoryClick('Special Access')}>
                                    <p className="font-semibold text-base">Priya B</p>
                                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {selectedCategory && (
                <FeatureAccessDialog 
                    isOpen={isFeatureDialogOpen}
                    onClose={() => setIsFeatureDialogOpen(false)}
                    category={selectedCategory}
                    roleName={role.name}
                />
            )}
        </>
    );
};

export { RolePermissionsDialog };
