
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
import { Plus, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Textarea } from './ui/textarea';

const AddVendorForm = () => {
    return (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter company address" />
                </div>
            </div>
            
            <div className="flex justify-end pt-8">
                <Button type="submit" className="w-full h-14 px-10 py-3.5 bg-primary rounded-[50px] text-lg">
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
                    <Button variant="outline" className="flex-1 px-6 py-2.5 bg-primary/10 rounded-[10px] border border-primary text-primary text-base font-normal">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Vendor
                    </Button>
                </DialogOrSheetTrigger>
                <DialogOrSheetContent
                    className={cn(
                        isMobile 
                            ? "w-full p-0 rounded-t-[50px]" 
                            : "sm:max-w-md p-0 rounded-[50px]"
                    )}
                    {...(isMobile && { side: "bottom" })}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                        <DialogOrSheetTitle className="flex items-center justify-between text-2xl font-semibold">
                            Add New Vendor
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="p-3.5 bg-background rounded-[50px]">
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
