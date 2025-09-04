
'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X, Plus } from 'lucide-react';

export const CreateRoleDialog = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="h-14 px-10 rounded-full text-lg bg-background hover:bg-muted">
                    <Plus className="mr-2 h-6 w-6"/>
                    Create Role
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px] bg-white">
                <DialogHeader className="p-6">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                                <Plus className="h-6 w-6"/>
                            </div>
                            <span className="text-2xl font-semibold">Create New Role</span>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    {/* Form to create a new role would go here */}
                    <p className="text-center text-muted-foreground">Role creation form placeholder.</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
