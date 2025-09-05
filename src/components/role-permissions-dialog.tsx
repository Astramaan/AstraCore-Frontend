
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

const PermissionCategory = ({ title, description, onClick }: { title: string, description: string, onClick: () => void }) => (
    <div className="flex flex-col gap-2 cursor-pointer p-4 rounded-xl hover:bg-muted/50 transition-colors" onClick={onClick}>
        <div className="flex justify-between items-center">
            <h4 className="font-semibold text-base">{title}</h4>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
)

const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'Admin' | 'Member' | 'Special Access' | null>(null);

    if (!role) return null;

    const handleCategoryClick = (category: 'Admin' | 'Member' | 'Special Access') => {
        setSelectedCategory(category);
        setIsFeatureDialogOpen(true);
    };
    
    const permissionsDescription = "Dashboard, Onboarding Ma.., Organization Ma..";

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
                    <div className="px-6 pb-6 space-y-2 flex-1 overflow-y-auto">
                        <PermissionCategory title="Admin" description={permissionsDescription} onClick={() => handleCategoryClick('Admin')} />
                        <Separator />
                        <PermissionCategory title="Member" description={permissionsDescription} onClick={() => handleCategoryClick('Member')} />
                        
                        <div className="flex items-center gap-2 justify-center py-2">
                            <div className="flex-grow border-t border-dashed border-gray-300"></div>
                            <p className="text-muted-foreground text-sm whitespace-nowrap">Special access</p>
                            <div className="flex-grow border-t border-dashed border-gray-300"></div>
                        </div>
                        
                        <PermissionCategory title="Priya B" description={permissionsDescription} onClick={() => handleCategoryClick('Special Access')} />
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
