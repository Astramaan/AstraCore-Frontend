

"use client";

import { useFormStatus } from "react-dom";
import React, { useState, useEffect, useActionState } from "react";
import { createPassword } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Saving..." : "Save Password"}
    </Button>
  );
}

export default function ResetPasswordForm({ searchParams, onSuccess }: { searchParams: { [key: string]: string | string[] | undefined }, onSuccess: () => void }) {
  const { toast } = useToast();

  const formAction = async (prevState: any, formData: FormData) => {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match.' };
    }
    
    console.log("Resetting password...");
    if (onSuccess) {
        onSuccess();
        return { success: true };
    }

    return createPassword(prevState, formData);
  }

  const [state, dispatch] = useActionState(formAction, { success: false, message: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  useEffect(() => {
    if (!state.success && state.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={dispatch} className="flex-grow flex flex-col">
       <input type="hidden" name="email" value={searchParams.email || ''} />
      <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="password" className={cn("text-lg font-medium")}>New Password</Label>
            <div className="relative flex items-center">
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className={`pr-12 rounded-full bg-background h-[54px]`}
                placeholder="xxxxxxxxxxx"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="confirm-password" className={cn("text-lg font-medium")}>Confirm New Password</Label>
            <div className="relative flex items-center">
              <Input 
                id="confirm-password" 
                name="confirm-password" 
                type={showConfirmPassword ? "text" : "password"} 
                required 
                className={`pr-12 rounded-full bg-background h-[54px]`}
                placeholder="xxxxxxxxxxx"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-6 text-foreground"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
        </div>
      </div>
        <div className="mt-auto pt-6">
          <div className="mb-4">
            <SubmitButton />
          </div>
        </div>
      </form>
  );
}
