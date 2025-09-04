
'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import OtpForm from './otp-form';
import CreatePasswordForm from './create-password-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { X, Check } from 'lucide-react';
import { HabiLogo } from './habi-logo';
import { useToast } from './ui/use-toast';

export const ChangePasswordDialog = ({ email }: { email: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'otp' | 'create-password' | 'success'>('otp');
    const [searchParams, setSearchParams] = useState({ email, flow: 'change-password' });
    const { toast } = useToast();

    const handleOtpSuccess = (newSearchParams: any) => {
        setSearchParams(newSearchParams);
        setStep('create-password');
    }

    const handlePasswordSuccess = () => {
        setStep('success');
         toast({
            title: "Success!",
            description: "Your password has been changed successfully.",
        });
        setTimeout(() => {
            setIsOpen(false);
            setTimeout(() => setStep('otp'), 300); // Reset after close animation
        }, 2000);
    }
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
             setTimeout(() => setStep('otp'), 300); // Reset after close animation
        }
        setIsOpen(open);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px]">
                 <DialogHeader className="p-6">
                    <DialogTitle className="flex justify-between items-center">
                        <HabiLogo />
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] rounded-full bg-background hover:bg-muted">
                                <X />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-0">
                    {step === 'otp' && (
                        <OtpForm searchParams={searchParams} onVerifySuccess={handleOtpSuccess} onClose={() => setIsOpen(false)} />
                    )}
                    {step === 'create-password' && (
                        <CreatePasswordForm searchParams={searchParams} onSuccess={handlePasswordSuccess} onClose={() => setIsOpen(false)} />
                    )}
                    {step === 'success' && (
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
            </DialogContent>
        </Dialog>
    );
};
