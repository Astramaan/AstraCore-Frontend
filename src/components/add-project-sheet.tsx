
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

const FloatingLabelInput = ({ id, label, value, onChange, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement> }) => (
    <div className="space-y-2">
        <Label htmlFor={id} className={cn("text-lg font-medium", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        <Input id={id} className="h-14 bg-background rounded-full px-5" value={value} onChange={onChange} {...props} />
    </div>
);

const FloatingLabelSelect = ({ id, label, value, onValueChange, children }: { id: string, label: string, value: string, onValueChange: (value: string) => void, children: React.ReactNode }) => (
     <div className="space-y-2">
        <Label htmlFor={id} className={cn("text-lg font-medium", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        <Select name={id} value={value} onValueChange={onValueChange}>
            <SelectTrigger id={id} className="h-14 bg-background rounded-full px-5">
                <SelectValue placeholder={label.replace('*','')} />
            </SelectTrigger>
            <SelectContent>
                {children}
            </SelectContent>
        </Select>
    </div>
)

const AddProjectForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();
    const [state, formAction] = useActionState(addProject, { success: false, message: '' });
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [projectCost, setProjectCost] = useState('');
    const [status, setStatus] = useState('');
    const [dimension, setDimension] = useState('');
    const [floor, setFloor] = useState('');
    const [siteLocation, setSiteLocation] = useState('');
    const [siteLocationLink, setSiteLocationLink] = useState('');
    const [architect, setArchitect] = useState('');
    const [siteSupervisor, setSiteSupervisor] = useState('');


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
                        <FloatingLabelInput id="name" name="name" label="Name*" value={name} onChange={e => setName(e.target.value)} />
                        <FloatingLabelInput id="client-id" name="client_id" label="Client ID*" value={clientId} onChange={e => setClientId(e.target.value)} />
                        <FloatingLabelInput id="phone-number" name="phone_number" label="Phone Number*" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                        <FloatingLabelInput id="email" name="email" label="Email*" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <div className="sm:col-span-2">
                             <FloatingLabelInput id="current-location" name="current_location" label="Current location*" value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Project details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FloatingLabelInput id="project-cost" name="project_cost" label="Project Cost*" value={projectCost} onChange={e => setProjectCost(e.target.value)} />
                        <FloatingLabelSelect id="status" label="Status*" value={status} onValueChange={setStatus}>
                            <SelectItem value="on-going">On Going</SelectItem>
                            <SelectItem value="delay">Delay</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </FloatingLabelSelect>
                        <FloatingLabelInput id="dimension" name="dimension" label="Dimension*" value={dimension} onChange={e => setDimension(e.target.value)} />
                        <FloatingLabelInput id="floor" name="floor" label="Floor*" value={floor} onChange={e => setFloor(e.target.value)} />
                        <div className="sm:col-span-2">
                             <FloatingLabelInput id="site-location" name="site_location" label="Site location*" value={siteLocation} onChange={e => setSiteLocation(e.target.value)} />
                        </div>
                         <div className="sm:col-span-2">
                             <FloatingLabelInput id="site-location-link" name="site_location_link" label="Site location link" value={siteLocationLink} onChange={e => setSiteLocationLink(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Project Assign</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <FloatingLabelSelect id="architect" label="Architect*" value={architect} onValueChange={setArchitect}>
                             <SelectItem value="darshan@habi.one">Darshan@habi.one</SelectItem>
                        </FloatingLabelSelect>
                         <FloatingLabelSelect id="site-supervisor" label="Site Supervisior*" value={siteSupervisor} onValueChange={setSiteSupervisor}>
                             <SelectItem value="supervisor1">Supervisor 1</SelectItem>
                        </FloatingLabelSelect>
                    </div>
                </div>

                <div className="flex justify-end pt-8">
                    <Button type="submit" className="px-10 h-14 text-lg rounded-full">
                        Add Project
                        <ArrowRight className="ml-2 h-5 w-5" />
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
    const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={setIsOpen}>
                <DialogOrSheetTrigger asChild>
                    <Button className="bg-primary/10 text-primary border border-primary rounded-full h-[54px] hover:bg-primary/20 text-lg px-6">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add Project
                    </Button>
                </DialogOrSheetTrigger>
                <DialogOrSheetContent
                    className={cn(
                        "p-0 bg-white",
                        isMobile
                            ? "w-full rounded-t-[50px]"
                            : "sm:max-w-3xl rounded-[50px]"
                    )}
                    {...(isMobile && { side: "bottom" })}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                         <div className="flex justify-between items-center">
                            <DialogOrSheetTitle className="text-2xl font-semibold">
                                Add New Project
                            </DialogOrSheetTitle>
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogOrSheetClose>
                        </div>
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
