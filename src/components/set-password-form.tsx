
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import React from "react";
import { requestPasswordReset } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

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
      <h2 className="text-lg text-grey-1 tracking-tight font-body mb-8">{config.title}</h2>
      <form action={action} className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="space-y-2">
            <Label htmlFor="email">{config.label}</Label>
            <div className="relative flex items-center">
              <Mail className="absolute left-6 h-5 w-5 text-foreground" />
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
              />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-4 space-y-4">
             {flow === 'forgot-password' && (
                <div className="flex items-center gap-4">
                    <Button variant="secondary" className="w-full rounded-full h-[54px]" asChild>
                        <Link href="/">Back</Link>
                    </Button>
                    <SubmitButton />
                </div>
            )}
            {flow !== 'forgot-password' && <SubmitButton />}
          </div>
        </div>
      </form>
    </>
  );
}
