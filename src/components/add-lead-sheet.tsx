

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
import { Plus, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { addLead } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';

const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className={cn("self-stretch text-lg font-medium", value ? "text-grey-1" : "text-black")}>{label}</Label>
        <Input id={id} className="w-96 h-14 bg-background rounded-[50px] px-6 text-lg" value={value} {...props} />
    </div>
);


const AddLeadForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();
    const [state, formAction] = useActionState(addLead, { success: false, message: '' });

    const [orgName, setOrgName] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

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
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                <div className="space-y-4">
                    <FloatingLabelInput id="organization-name" name="organization_name" label="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                    <FloatingLabelInput id="full-name" name="name" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <FloatingLabelInput id="phone-number" name="phone_number" label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <FloatingLabelInput id="email-id" name="email" label="Email ID" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                
                <div className="flex justify-center pt-8">
                    <Button type="submit" className="w-96 h-14 px-10 py-3.5 bg-primary rounded-[50px] text-lg">
                        Add
                    </Button>
                </div>
            </div>
        </form>
    );
};


export function AddLeadSheet() {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = () => {
        setIsOpen(false);
        setShowSuccess(true);
    };

    const DialogOrSheet = isMobile ? Dialog : Dialog; // Always dialog for this one as per design
    const DialogOrSheetContent = isMobile ? DialogContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? DialogHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={setIsOpen}>
                <DialogOrSheetTrigger asChild>
                     <Button className="h-14 px-10 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 text-lg font-medium">
                        <Plus className="mr-2"/>
                        Add New Lead
                    </Button>
                </DialogOrSheetTrigger>
                <DialogOrSheetContent
                    className={cn(
                        "p-0 rounded-[50px] w-[452px]"
                    )}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                        <div className="flex items-center justify-between text-2xl font-semibold">
                            <DialogOrSheetTitle className="flex items-center gap-2">
                                <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1">
                                    <Plus className="h-6 w-6"/>
                                </div>
                                Add New Lead
                            </DialogOrSheetTitle>
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="p-3.5 bg-background rounded-[50px]">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogOrSheetClose>
                        </div>
                    </DialogOrSheetHeader>
                    <AddLeadForm onFormSuccess={handleSuccess} />
                </DialogOrSheetContent>
            </DialogOrSheet>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="New Lead Added"
                message="You can now follow up and manage this lead in AstraCore."
            />
        </>
    );
}
