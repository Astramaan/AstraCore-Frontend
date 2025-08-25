
'use client';

import React, { useState, useActionState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle, X, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { addProject } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FloatingLabelInput = ({ id, label, placeholder, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div className="relative">
        <Label htmlFor={id} className="absolute -top-3 left-2 bg-white px-1 text-sm text-gray-500">{label}</Label>
        <Input id={id} placeholder={placeholder} className="h-12 bg-background" {...props} />
    </div>
);

const AddProjectForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();
    const [state, formAction] = useActionState(addProject, { success: false, message: '' });

    useEffect(() => {
        if (state.success) {
            onFormSuccess();
        } else if (state.message) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }, [state, onFormSuccess, toast]);

    return (
        <form action={formAction}>
            <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-150px)]">
                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Personal details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FloatingLabelInput id="name" name="name" label="Name*" placeholder="Enter Full Name" />
                        <FloatingLabelInput id="client-id" name="client_id" label="Client ID*" placeholder="Enter Client ID" />
                        <FloatingLabelInput id="phone-number" name="phone_number" label="Phone Number*" placeholder="Enter Phone Number" />
                        <FloatingLabelInput id="email" name="email" label="Email*" placeholder="Enter email" type="email" />
                        <div className="sm:col-span-2">
                             <FloatingLabelInput id="current-location" name="current_location" label="Current location*" placeholder="Enter Current location" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Project details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FloatingLabelInput id="project-cost" name="project_cost" label="Project Cost*" placeholder="Enter Project Cost" />
                        <div className="relative">
                            <Label htmlFor="status" className="absolute -top-3 left-2 bg-white px-1 text-sm text-gray-500">Status*</Label>
                            <Select name="status">
                                <SelectTrigger id="status" className="h-12 bg-background">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="on-going">On Going</SelectItem>
                                    <SelectItem value="delay">Delay</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <FloatingLabelInput id="dimension" name="dimension" label="Dimension*" placeholder="Site Dimension" />
                        <FloatingLabelInput id="floor" name="floor" label="Floor*" placeholder="Add Floors" />
                        <div className="sm:col-span-2">
                             <FloatingLabelInput id="site-location" name="site_location" label="Site location*" placeholder="Add Site location" />
                        </div>
                         <div className="sm:col-span-2">
                             <FloatingLabelInput id="site-location-link" name="site_location_link" label="Site location link" placeholder="Paste Link here" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Project Assign</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative">
                            <Label htmlFor="architect" className="absolute -top-3 left-2 bg-white px-1 text-sm text-gray-500">Architect*</Label>
                            <Select name="architect">
                                <SelectTrigger id="architect" className="h-12 bg-background">
                                    <SelectValue placeholder="Select Architect" />
                                </SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="darshan@habi.one">Darshan@habi.one</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative">
                            <Label htmlFor="site-supervisor" className="absolute -top-3 left-2 bg-white px-1 text-sm text-gray-500">Site Supervisior*</Label>
                             <Select name="site_supervisor">
                                <SelectTrigger id="site-supervisor" className="h-12 bg-background">
                                    <SelectValue placeholder="Select Supervisor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="supervisor1">Supervisor 1</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-8">
                    <Button type="submit" className="px-14 h-12 text-lg rounded-full">
                        Add Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export function AddProjectSheet() {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = () => {
        setIsOpen(false);
        setShowSuccess(true);
    };

    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={setIsOpen}>
                <DialogOrSheetTrigger asChild>
                    <Button className="bg-primary/10 text-primary border border-primary rounded-full h-[54px]">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Project
                    </Button>
                </DialogOrSheetTrigger>
                <DialogOrSheetContent
                    className={cn(
                        isMobile
                            ? "w-full p-0 rounded-t-[50px]"
                            : "sm:max-w-2xl p-0 rounded-[50px]"
                    )}
                    {...(isMobile && { side: "bottom" })}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                        <DialogOrSheetTitle className="flex items-center text-xl font-medium">
                            Add New Project
                            <div className="flex items-center gap-4 ml-auto">
                                <DialogOrSheetClose asChild>
                                    <Button variant="ghost" className="rounded-full text-sm font-normal h-auto px-4 py-2 bg-gray-100 hover:bg-gray-200">
                                        <X className="h-4 w-4 mr-1" />
                                        Close
                                    </Button>
                                </DialogOrSheetClose>
                            </div>
                        </DialogOrSheetTitle>
                    </DialogOrSheetHeader>
                    <AddProjectForm onFormSuccess={handleSuccess} />
                </DialogOrSheetContent>
            </DialogOrSheet>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="New Project added"
                message="Congratulations! You have successfully added a new project."
            />
        </>
    );
}
