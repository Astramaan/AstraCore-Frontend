
"use client";

import { useFormStatus } from "react-dom";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import EmailIcon from "./icons/email-icon";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SetPasswordForm({ flow }: { flow: 'set-password' | 'forgot-password' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = {
    'set-password': {
        title: "Complete Email Verification to Set Your Password",
        description: "Enter your email to get started.",
        label: "Enter Your Email ID",
    },
    'forgot-password': {
        title: "Forgot Your Password?",
        description: "Enter your email and we'll send you a link to reset it.",
        label: "Your Email ID",
    }
  }[flow];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          const res = await fetch('/api/send-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
          });
          const data = await res.json();
          if(data.success) {
              router.push(`/otp-verification?email=${email}&flow=${flow}`);
          } else {
              toast({
                  variant: 'destructive',
                  title: 'Error',
                  description: data.message
              });
          }
      } catch (error) {
          toast({
              variant: 'destructive',
              title: 'Error',
              description: 'An unexpected error occurred.'
          });
      } finally {
          setIsSubmitting(false);
      }
  }


  return (
    <>
      <h2 className="text-lg text-muted-foreground tracking-tight mb-8">{config.title}</h2>
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="space-y-2">
            <Label htmlFor="email" className={cn("text-lg font-medium", email ? 'text-muted-foreground' : 'text-foreground')}>{config.label}</Label>
            <div className="relative flex items-center">
              <EmailIcon className="absolute left-6 h-5 w-5 text-foreground" />
              <div className="absolute left-14 h-6 w-px bg-border" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@company.com"
                className={`pl-20 rounded-full bg-background h-[54px]`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
            {flow === 'forgot-password' ? (
                <div className="flex flex-col md:flex-row gap-4">
                    <Button variant="ghost" className="w-full md:w-auto flex-1 rounded-full h-[54px] text-foreground bg-background hover:bg-muted" asChild>
                        <Link href="/">Back</Link>
                    </Button>
                    <div className="flex-1">
                        <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={isSubmitting}>
                          {isSubmitting ? "Continuing..." : "Continue"}
                        </Button>
                    </div>
                </div>
            ) : (
                 <div className="space-y-4">
                    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={isSubmitting}>
                      {isSubmitting ? "Continuing..." : "Continue"}
                    </Button>
                 </div>
            )}
        </div>
      </form>
    </>
  );
}
