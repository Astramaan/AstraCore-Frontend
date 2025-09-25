

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
import { ScrollArea } from './ui/scroll-area';
import UserPlusIcon from './icons/user-plus-icon';

const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className={cn("self-stretch text-lg font-medium", value ? "text-grey-1" : "text-black")}>{label}</Label>
        <Input id={id} className="w-full h-14 bg-background rounded-full px-6 text-lg" value={value} {...props} />
    </div>
);


const AddLeadForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();
    const [state, formAction] = useActionState(addLead, { success: false, message: '' });

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pincode, setPincode] = useState('');

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
        <form action={formAction} className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-6 no-scrollbar">
                <div className="space-y-4">
                    <FloatingLabelInput id="full-name" name="name" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <FloatingLabelInput id="phone-number" name="phone_number" label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <FloatingLabelInput id="email-id" name="email" label="Email ID" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <FloatingLabelInput id="pincode" name="pincode" label="Site location pin code" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                </div>
            </ScrollArea>
            
            <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-center">
                <Button type="submit" className="w-full h-14 px-10 py-3.5 bg-primary rounded-full text-lg">
                    Add
                </Button>
            </div>
        </form>
    );
};


export function AddLeadSheet() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = () => {
        setIsOpen(false);
        setShowSuccess(true);
    };

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                     <Button className="md:h-14 md:px-10 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium h-[54px] w-[54px] md:w-auto p-0 md:p-2.5">
                        <UserPlusIcon className="md:mr-2 h-6 w-6"/>
                        <span className="hidden md:inline">Add New Lead</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-md md:mx-auto rounded-t-[50px] border-none"
                >
                    <SheetHeader className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="flex items-center gap-2 text-2xl font-semibold">
                                <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1">
                                    <Plus className="h-6 w-6"/>
                                </div>
                                Add New Lead
                            </SheetTitle>
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                    <X className="h-6 w-6" />
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetHeader>
                     <div className="flex-1 flex flex-col overflow-hidden">
                        <AddLeadForm onFormSuccess={handleSuccess} />
                    </div>
                </SheetContent>
            </Sheet>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="New Lead Added"
                message="You can now follow up and manage this lead in AstraCore."
            />
        </>
    );
}
