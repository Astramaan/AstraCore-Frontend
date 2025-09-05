
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { X, Check } from 'lucide-react';
import { useToast } from './ui/use-toast';
import OtpForm from './otp-form';
import ResetPasswordForm from './reset-password-form';
import CreatePasswordForm from './create-password-form';

export const ChangePasswordDialog = ({ email, startWithReset = false }: { email: string, startWithReset?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'create-password' | 'otp' | 'reset-password' | 'success'>(startWithReset ? 'reset-password' : 'create-password');
    const [searchParams, setSearchParams] = useState({ email, flow: 'change-password' });
    const { toast } = useToast();

    useEffect(() => {
        if(isOpen) {
            setStep(startWithReset ? 'reset-password' : 'create-password');
        }
    }, [isOpen, startWithReset]);

    const handlePasswordSuccess = () => {
        setStep('success');
         toast({
            title: "Success!",
            description: "Your password has been changed successfully.",
        });
        setTimeout(() => {
            setIsOpen(false);
            setTimeout(() => setStep(startWithReset ? 'reset-password' : 'create-password'), 300); // Reset after close animation
        }, 2000);
    }
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
             setTimeout(() => setStep(startWithReset ? 'reset-password' : 'create-password'), 300); // Reset after close animation
        }
        setIsOpen(open);
    }

    const handleForgotPasswordClick = () => {
        setStep('otp');
    }

    const handleOtpSuccess = (newSearchParams: any) => {
        setSearchParams(prev => ({...prev, ...newSearchParams}));
        setStep('reset-password');
    }
    
    const handleOtpClose = () => {
        setStep('create-password');
    }

    const getTitle = () => {
        switch(step) {
            case 'otp':
                return 'Verify OTP';
            case 'reset-password':
                return 'Reset Password';
            case 'create-password':
            default:
                return 'Change Password';
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-56 h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px] bg-white">
                 <DialogHeader className="p-6">
                    <DialogTitle className="flex justify-between items-center">
                        <span className="text-2xl font-semibold">
                           {getTitle()}
                        </span>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background hover:bg-muted rounded-full">
                                <X />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="px-6 pb-6">
                    {step === 'create-password' && (
                        <CreatePasswordForm searchParams={searchParams} onForgotPasswordClick={handleForgotPasswordClick} />
                    )}
                    {step === 'otp' && (
                        <OtpForm searchParams={searchParams} onVerifySuccess={handleOtpSuccess} onClose={handleOtpClose}/>
                    )}
                    {step === 'reset-password' && (
                        <ResetPasswordForm searchParams={searchParams} onSuccess={handlePasswordSuccess} />
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
