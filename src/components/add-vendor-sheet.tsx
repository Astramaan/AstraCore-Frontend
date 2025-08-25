
'use client';

import React, { useState } from 'react';
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
import { Plus, X, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Textarea } from './ui/textarea';
import Image from 'next/image';

const FloatingLabelInput = ({ id, label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div className="relative">
        <Label htmlFor={id} className="absolute -top-2.5 left-2 px-1 bg-white text-stone-500 text-sm">{label}</Label>
        <Input id={id} {...props} className="h-12"/>
    </div>
);

const FileUploadField = ({ label, id }: { label: string, id: string }) => (
    <div className="flex items-center rounded-lg border border-stone-300 h-12">
        <Label htmlFor={id} className="px-3 text-base text-zinc-900 whitespace-nowrap">{label}</Label>
        <div className="border-l border-stone-300 h-full"></div>
        <div className="flex-1 flex items-center justify-between px-3">
             <span className="text-sm text-neutral-500"></span>
            <label htmlFor={id} className="cursor-pointer text-sm text-neutral-500 flex items-center gap-1">
                <Upload className="w-4 h-4" />
                Upload
            </label>
            <Input id={id} type="file" className="hidden" />
        </div>
    </div>
)

const DayToggle = ({ day }: { day: string }) => {
    const [isActive, setIsActive] = useState(['M', 'T', 'W'].includes(day));
    return (
        <Button 
            size="icon" 
            variant={isActive ? 'default' : 'outline'}
            className={cn("w-7 h-7 rounded-full text-sm", isActive ? "bg-primary text-white" : "bg-zinc-100 text-black border-zinc-100")}
            onClick={() => setIsActive(!isActive)}
        >
            {day}
        </Button>
    )
};


const AddVendorForm = () => {
    return (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-36 h-36 bg-zinc-100 rounded-lg border border-stone-300 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-zinc-400" />
                        </div>
                        <div className="space-y-4 flex-1">
                            <FloatingLabelInput id="company-name" label="Company Name*" />
                            <FloatingLabelInput id="phone" label="Phone Number*" type="tel" />
                        </div>
                    </div>
                     <FloatingLabelInput id="email" label="Email*" type="email"/>
                     <div className="relative">
                        <Label htmlFor="address" className="absolute -top-2.5 left-2 px-1 bg-white text-stone-500 text-sm">Address*</Label>
                        <Textarea id="address" className="h-24"/>
                    </div>
                    <FileUploadField id="cin-cert" label="CIN Certificate" />
                    <FileUploadField id="gst-cert" label="GST Certificate" />
                    <FloatingLabelInput id="gst-number" label="GST Number*" />
                    <FileUploadField id="brochure" label="Product Brochure" />

                    <div className="relative rounded-lg border border-stone-300 p-4 min-h-[160px]">
                         <Label className="absolute -top-3 left-2 px-1 bg-white text-stone-500 text-sm">Serviceable City</Label>
                         <div className="flex items-center h-full">
                            <Button variant="ghost" className="text-neutral-500">
                                <Plus className="w-4 h-4 mr-2" /> Add
                            </Button>
                         </div>
                    </div>

                     <div className="space-y-2">
                        <Label>Days</Label>
                        <div className="flex gap-2">
                            {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map(day => <DayToggle key={day} day={day} />)}
                        </div>
                    </div>
                    
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-stone-300 p-4 space-y-6">
                        <h3 className="text-lg font-medium">Account details</h3>
                        <FloatingLabelInput id="bank-name" label="Bank Name*" />
                        <FloatingLabelInput id="account-holder" label="Account Holder Name*" />
                        <FloatingLabelInput id="account-number" label="Account Number*" />
                        <FloatingLabelInput id="confirm-account-number" label="Confirm Account Number*" />
                        <FloatingLabelInput id="ifsc-code" label="IFSC Code*" />
                        <FloatingLabelInput id="upi-id" label="UPI ID" />
                    </div>
                </div>

            </div>
            
            <div className="flex justify-end pt-8">
                <Button type="submit" className="w-40 h-12 px-10 py-3.5 bg-primary rounded-lg text-lg">
                    Add Vendor
                </Button>
            </div>
        </div>
    );
};

export function AddVendorSheet() {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

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
                    <Button variant="outline" className="flex-1 md:flex-none rounded-full h-[54px] bg-primary/10 text-primary hover:bg-primary/20 border border-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Vendor
                    </Button>
                </DialogOrSheetTrigger>
                <DialogOrSheetContent
                    className={cn(
                        "p-0 rounded-[20px]",
                        isMobile 
                            ? "w-full rounded-t-3xl" 
                            : "md:max-w-4xl lg:max-w-6xl"
                    )}
                    {...(isMobile && { side: "bottom" })}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                        <DialogOrSheetTitle className="flex items-center justify-between text-2xl font-semibold">
                            Add New Vendor
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="p-3.5 bg-background rounded-full">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogOrSheetClose>
                        </DialogOrSheetTitle>
                    </DialogOrSheetHeader>
                    <AddVendorForm />
                </DialogOrSheetContent>
            </DialogOrSheet>
        </>
    );
}
