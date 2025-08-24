
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { verifyOtp } from '@/app/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? 'Verifying...' : 'Verify & Continue'}
    </Button>
  );
}

export default function OtpForm() {
  const [state, setState] = useState<{ error?: string } | undefined>(undefined);
  const [pending, setPending] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData();
    otp.forEach((digit, index) => {
        // use a consistent key for the action
        formData.append(`otp-${index}`, digit);
    })
    
    const result = await verifyOtp(state, formData);
    setState(result);
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
        <div className="flex-grow space-y-6">
            <div className="text-lg text-grey-1">
                Check your inbox at user@example.com Incorrect email?{' '}
                <a href="#" className="text-primary underline hover:text-primary/80">
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
