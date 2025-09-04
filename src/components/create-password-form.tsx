
"use client";

import { useFormStatus, useActionState } from "react-dom";
import React, { useState, useEffect } from "react";
import { createPassword } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import LockIcon from "./icons/lock";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Changing..." : "Change"}
    </Button>
  );
}

export default function CreatePasswordForm({ searchParams, onSuccess, onClose }: { searchParams: { [key: string]: string | string[] | undefined }, onSuccess?: () => void, onClose?: () => void; }) {
  const { toast } = useToast();

  const formAction = async (prevState: any, formData: FormData) => {
    // In a real app, you would save the password here
    console.log("Creating new password...");
    if (onSuccess) {
        onSuccess();
        return { success: true };
    }

    // Fallback to server action if no callback
    return createPassword(prevState, formData);
  }

  const [state, dispatch] = useActionState(formAction, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { pending } = useFormStatus();
  const flow = searchParams.flow;

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="current-password" className={cn("text-lg font-medium")}>Current Password</Label>
            <div className="relative flex items-center">
              <Input 
                id="current-password" 
                name="current-password" 
                type={showPassword ? "text" : "password"} 
                required 
                className={`pr-12 rounded-full bg-background h-[54px]`}
                disabled={pending}
                placeholder="xxxxxxxxxxx"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={pending}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="password" className={cn("text-lg font-medium")}>New Password</Label>
            <div className="relative flex items-center">
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className={`pr-12 rounded-full bg-background h-[54px]`}
                disabled={pending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="xxxxxxxxxxx"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={pending}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-muted-foreground underline">Forgot Current Password?</Link>
            </div>
        </div>
      </div>
      <form action={dispatch} className="flex-grow flex flex-col">
        <input type="hidden" name="email" value={searchParams.email || ''} />
        <input type="hidden" name="phone" value={searchParams.phone || ''} />
        <input type="hidden" name="organization" value={searchParams.organization || ''} />
        <div className="mt-auto pt-6">
          <div className="mb-4">
            <SubmitButton />
          </div>
        </div>
      </form>
    </>
  );
}
