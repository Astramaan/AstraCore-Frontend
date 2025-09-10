

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { X, Check } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { ChangePasswordForm } from './change-password-form';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from './ui/sheet';
import { cn } from '@/lib/utils';

export const ChangePasswordDialog = ({ email, trigger }: { email: string, trigger?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { toast } = useToast();
    const isMobile = useIsMobile();
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
             setShowSuccess(false);
        }
        setIsOpen(open);
    }
    
    const handlePasswordSuccess = () => {
        setShowSuccess(true);
         toast({
            title: "Success!",
            description: "Your password has been changed successfully.",
        });
        setTimeout(() => {
            handleOpenChange(false);
        }, 2000);
    }

    const defaultTrigger = (
         <Button variant="outline" className="w-full md:w-56 h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">
            Change Password
        </Button>
    )

    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;

    return (
        <DialogOrSheet open={isOpen} onOpenChange={handleOpenChange}>
            <DialogOrSheetTrigger asChild>
                {trigger || defaultTrigger}
            </DialogOrSheetTrigger>
            <DialogOrSheetContent className={cn(
                "p-0 flex flex-col bg-white",
                isMobile ? "w-full h-full rounded-none" : "sm:max-w-md rounded-[50px]"
            )}>
                 <DialogOrSheetHeader className="p-6 border-b">
                    <DialogOrSheetTitle className="flex justify-between items-center">
                        <span className="text-2xl font-semibold">
                           Change Password
                        </span>
                        <DialogOrSheetClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background hover:bg-muted rounded-full">
                                <X />
                            </Button>
                        </DialogOrSheetClose>
                    </DialogOrSheetTitle>
                </DialogOrSheetHeader>
                <div className="px-6 pb-6 flex-1 flex flex-col">
                    {!showSuccess ? (
                        <ChangePasswordForm email={email} onSuccess={handlePasswordSuccess} />
                    ) : (
                        <div className="text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                              <div className="relative mb-6 flex items-center justify-center">
                                <div className="w-20 h-20 bg-lime-600/5 rounded-full" />
                                <div className="w-14 h-14 bg-lime-600/20 rounded-full absolute" />
                                <div className="w-10 h-10 bg-primary/20 rounded-full absolute flex items-center justify-center">
                                    <Check className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-semibold mb-2">Password Changed!</h1>
                            <p className="text-muted-foreground">Your password has been updated successfully.</p>
                        </div>
                    )}
                </div>
            </DialogOrSheetContent>
        </DialogOrSheet>
    );
};

