"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useActionState, useFormStatus } from 'react-dom';
import { verifyOtp } from '@/app/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? 'Verifying...' : 'Verify & Continue'}
    </Button>
  );
}

export default function OtpForm() {
  const [state, action] = useActionState(verifyOtp, undefined);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(28);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    // Add resend logic here
    console.log("Resending OTP...");
    setTimer(28); // Reset timer
  };

  return (
    <form action={action} className="space-y-6 flex flex-col flex-grow">
        <div className="flex-grow space-y-6">
            <div className="text-lg text-grey-1">
                Check your inbox at user@example.com Incorrect email?{' '}
                <a href="#" className="text-primary underline">
                    Edit it
                </a>
            </div>

            <div className="space-y-2">
                <label className="text-lg font-medium">Enter OTP</label>
                <div className="flex justify-between gap-2 md:gap-4">
                {otp.map((data, index) => (
                    <Input
                        key={index}
                        type="text"
                        name={`otp-${index}`}
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-16 h-14 md:w-20 md:h-16 text-center text-2xl font-bold rounded-2xl bg-background border-border focus:border-primary focus:ring-primary"
                    />
                ))}
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <div>
                    <span className="text-muted-foreground">Didn’t receive OTP? </span>
                    <button type="button" onClick={handleResend} disabled={timer > 0} className="font-medium text-primary underline disabled:text-muted-foreground disabled:no-underline">
                        Resend
                    </button>
                </div>
                <div className="text-muted-foreground font-mono">
                    00:{timer.toString().padStart(2, '0')}
                </div>
            </div>
        </div>
        
        <div className='pt-4'>
            <SubmitButton />
        </div>
    </form>
  );
}
