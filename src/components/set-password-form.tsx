

"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import React, { useState } from "react";
import { requestPasswordReset } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import EmailIcon from "./icons/email-icon";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Continuing..." : "Continue"}
    </Button>
  );
}

const flowConfig = {
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
}

export default function SetPasswordForm({ flow }: { flow: 'set-password' | 'forgot-password' }) {
  const [state, action] = useActionState(requestPasswordReset, undefined);
  const [email, setEmail] = useState('');
  const { pending } = useFormStatus();
  const { toast } = useToast();

  const config = flowConfig[flow];

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Check your email",
        description: state.success,
      });
    }
  }, [state, toast]);

  return (
    <>
      <h2 className="text-lg text-grey-1 tracking-tight mb-8">{config.title}</h2>
      <form action={action} className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="space-y-2">
            <Label htmlFor="email" className={cn("text-lg font-medium", email ? 'text-grey-1' : 'text-black')}>{config.label}</Label>
            <div className="relative flex items-center">
              <EmailIcon className="absolute left-6 h-5 w-5 text-foreground" />
              <div className="absolute left-14 h-6 w-px bg-grey-2" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@company.com"
                className={`pl-20 rounded-full bg-background h-[54px]`}
                disabled={pending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="space-y-4">
             {flow === 'forgot-password' && (
                <>
                    <SubmitButton />
                    <Button variant="ghost" className="w-full rounded-full h-[54px] text-foreground bg-background hover:bg-muted" asChild>
                        <Link href="/">Back</Link>
                    </Button>
                </>
            )}
            {flow !== 'forgot-password' && <SubmitButton />}
          </div>
        </div>
      </form>
    </>
  );
}
