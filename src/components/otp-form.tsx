
"use client";

import React, { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { verifyOtp } from '@/app/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? 'Verifying...' : 'Verify & Continue'}
    </Button>
  );
}

export default function OtpForm({ searchParams, onVerifySuccess, onClose }: { searchParams: { [key: string]: string | string[] | undefined }; onVerifySuccess?: (newSearchParams: any) => void; onClose?: () => void; }) {
  const { toast } = useToast();
  
  const formAction = async (prevState: any, formData: FormData) => {
    // In a real app, you would verify the OTP here.
    // For now, we'll simulate success and call the callback if it exists.
    if (onVerifySuccess) {
      const newSearchParams = Object.fromEntries(formData.entries());
      onVerifySuccess(newSearchParams);
      return { success: true };
    }
    
    // Fallback to server action if no callback
    return verifyOtp(prevState, formData);
  }
  
  const [state, dispatch] = useActionState(formAction, undefined);
  const { pending } = useFormStatus();
  
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(28);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasOtp = otp.some(d => d);
  const email = searchParams.email as string || 'user@example.com';
  const flow = searchParams.flow as string || '';
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
      // Clear OTP on error
      setOtp(new Array(4).fill(""));
      inputRefs.current[0]?.focus();
    }
  }, [state, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    console.log("Resending OTP...");
    setTimer(28);
  };

  return (
    <form ref={formRef} action={dispatch} className="space-y-6 flex flex-col flex-grow">
      <input type="hidden" name="email" value={searchParams.email || ''} />
      <input type="hidden" name="phone" value={searchParams.phone || ''} />
      <input type="hidden" name="organization" value={searchParams.organization || ''} />
      <input type="hidden" name="password" value={searchParams.password || ''} />
      <input type="hidden" name="flow" value={flow || ''} />
      
        <div className="flex-grow space-y-6">
            <div className="text-lg text-grey-1">
                Check your inbox at {email}. 
                {flow !== 'change-password' && (
                    <>
                    {' '}Incorrect email?{' '}
                    <a href="/signup" className="text-primary underline hover:text-primary/80">
                        Edit it
                    </a>
                    </>
                )}
            </div>

            <div className="space-y-2">
                <Label className={cn("text-lg font-medium", hasOtp ? 'text-grey-1' : 'text-black')}>Enter OTP</Label>
                <div className="flex justify-between gap-2 md:gap-4">
                {otp.map((data, index) => (
                    <Input
                        key={index}
                        type="text"
                        name="otp"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-[78px] h-[57px] text-center text-xl font-bold rounded-[15px] bg-background border-border focus:border-primary focus:ring-primary"
                        disabled={pending}
                    />
                ))}
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <div>
                    <span className="text-muted-foreground">Didn’t receive OTP? </span>
                    <button type="button" onClick={handleResend} disabled={timer > 0 || pending} className="font-medium text-black underline hover:text-primary disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed">
                        Resend
                    </button>
                </div>
                <div className="text-black font-mono">
                    00:{timer.toString().padStart(2, '0')}
                </div>
            </div>
        </div>
        
        <div className='pt-4 mt-auto'>
            <SubmitButton pending={pending} />
        </div>
    </form>
  );
}

    