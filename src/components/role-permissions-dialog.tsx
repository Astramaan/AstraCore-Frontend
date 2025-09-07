
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Separator } from './ui/separator';
import { FeatureAccessDialog } from './feature-access-dialog';

export interface RoleData {
    name: string;
    icon: React.ReactNode;
    bgColor: string;
}

const PermissionCategory = ({ title, permissions, onEdit }: { title: string, permissions: string[], onEdit: () => void }) => (
    <div>
        <div className="flex justify-between items-center py-2">
            <div className="flex flex-col">
                <h4 className="font-semibold text-lg">{title}</h4>
                <p className="text-sm text-muted-foreground">{permissions.join(', ')}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onEdit}>
                
            </Button>
        </div>
        <Separator />
    </div>
)

const SpecialAccessDivider = () => (
    <div className="flex items-center text-center my-4">
        <div className="flex-1 border-t border-dashed"></div>
        <span className="px-4 text-sm text-muted-foreground">Special access</span>
        <div className="flex-1 border-t border-dashed"></div>
    </div>
);


const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);

    if (!role) return null;

    const handleEditClick = (category: string) => {
        setEditingCategory(category);
        setIsFeatureDialogOpen(true);
    };
    
    const handleCloseFeatureDialog = () => {
        setIsFeatureDialogOpen(false);
        setEditingCategory(null);
    }

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
                        <PermissionCategory 
                            title="Admin" 
                            permissions={["Dashboard", "Onboarding Ma..", "Organization Ma.."]}
                            onEdit={() => handleEditClick("Admin")}
                        />
                        <PermissionCategory 
                            title="Employee" 
                            permissions={["Dashboard", "Onboarding Ma..", "Organization Ma.."]}
                            onEdit={() => handleEditClick("Employee")}
                        />
                        <SpecialAccessDivider />
                        <PermissionCategory 
                            title="Priya B" 
                            permissions={["Dashboard", "Onboarding Ma..", "Organization Ma.."]}
                            onEdit={() => handleEditClick("Priya B")}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            {editingCategory && (
                 <FeatureAccessDialog
                    isOpen={isFeatureDialogOpen}
                    onClose={handleCloseFeatureDialog}
                    category={editingCategory}
                    roleName={role.name}
                />
            )}
        </>
    );
};

export { RolePermissionsDialog };
