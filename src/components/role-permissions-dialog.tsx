
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X, Edit } from 'lucide-react';
import { Separator } from './ui/separator';
import { FeatureAccessDialog } from './feature-access-dialog';

export interface RoleData {
    name: string;
    icon: React.ReactNode;
    bgColor: string;
}

const permissionsData = {
    'Home': ["Assign Task", "Add New Member"],
    'Project Management': ["Projects", "Project Details", "Snag List", "Add Project", "Edit Project", "Delete Project", "Create Snag"],
    'Client & Lead Management': ["Leads", "Meetings", "Add Lead", "Edit Lead", "Delete Lead", "Create Meeting"],
    'Vendor Management': ["Vendors", "Add Vendor", "Edit Vendor"],
    'Team Management': ["Team", "Member Details", "Profile", "Subscription", "Create New Team"],
    'Settings': ["Change Password", "Role Access", "Create Role"],
};

const PermissionCategory = ({ title, permissions }: { title: string, permissions: string[] }) => (
    <div className="flex flex-col gap-2 p-4 rounded-xl">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground">{permissions.join(', ')}</p>
    </div>
)

const RolePermissionsDialog = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: RoleData | null }) => {
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);

    if (!role) return null;

    const handleEditClick = () => {
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
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="rounded-full h-14 px-6" onClick={handleEditClick}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                        <X className="h-6 w-6" />
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="px-6 pb-6 space-y-2 flex-1 overflow-y-auto">
                        {Object.entries(permissionsData).map(([category, permissions]) => (
                            <React.Fragment key={category}>
                                <PermissionCategory title={category} permissions={permissions} />
                                <Separator />
                            </React.Fragment>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
            <FeatureAccessDialog
                isOpen={isFeatureDialogOpen}
                onClose={() => setIsFeatureDialogOpen(false)}
                category="Admin"
                roleName={role.name}
            />
        </>
    );
};

export { RolePermissionsDialog };
