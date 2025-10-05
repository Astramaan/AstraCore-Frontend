

"use client";

import React, { useState, useRef, useEffect, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function OtpForm({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) {
  const { toast } = useToast();
  const router = useRouter();
  
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(28);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasOtp = otp.some(d => d);
  const email = searchParams.email as string || 'user@example.com';
  const flow = searchParams.flow as string || '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 4) {
        toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "Please enter a valid 4-digit OTP.",
        });
        return;
    }
    
    setIsSubmitting(true);
    try {
        const res = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp: otpValue }),
        });
        
        const data = await res.json();

        if (res.ok && data.success) {
            const params = new URLSearchParams(searchParams as Record<string, string>);
            if (flow === 'signup') {
                router.push(`/create-password?${params.toString()}`);
            } else if (flow === 'forgot-password' || flow === 'change-password') {
                router.push(`/set-password?${params.toString()}`);
            }
        } else {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: data.message || "Invalid OTP. Please try again.",
            });
             setOtp(new Array(4).fill(""));
             inputRefs.current[0]?.focus();
        }
    } catch(error) {
        console.error('Verify OTP failed', error);
         toast({
            variant: 'destructive',
            title: 'Error',
            description: "An unexpected error occurred.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
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
                    />
                ))}
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <div>
                    <span className="text-muted-foreground">Didn’t receive OTP? </span>
                    <button type="button" onClick={handleResend} disabled={timer > 0} className="font-medium text-black underline hover:text-primary disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed">
                        Resend
                    </button>
                </div>
                <div className="text-black font-mono">
                    00:{timer.toString().padStart(2, '0')}
                </div>
            </div>
        </div>
        
        <div className='pt-4 mt-auto'>
            <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
            </Button>
        </div>
    </form>
  );
}
