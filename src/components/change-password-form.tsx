
"use client";

import { useFormStatus } from "react-dom";
import React, { useState, useEffect, useActionState } from "react";
import { changePassword } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Saving..." : "Save Password"}
    </Button>
  );
}

export function ChangePasswordForm({ email, onSuccess }: { email: string, onSuccess: () => void }) {
  const { toast } = useToast();

  const [state, formAction] = useActionState(changePassword, {success: false, message: ''});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (state?.message) {
        if (state.success) {
            onSuccess();
        } else {
             toast({
                variant: "destructive",
                title: "Error",
                description: state.message,
            });
        }
    }
  }, [state, toast, onSuccess]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="email" value={email} />
      <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="currentPassword" className={cn("text-lg font-medium")}>Current Password</Label>
            </div>
          <div className="relative flex items-center">
            <Input 
              id="currentPassword" 
              name="currentPassword" 
              type={showCurrentPassword ? "text" : "password"} 
              required 
              className={`pr-12 rounded-full bg-background h-[54px]`}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-6 text-foreground"
              aria-label={showCurrentPassword ? "Hide password" : "Show password"}
            >
              {showCurrentPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="newPassword" className={cn("text-lg font-medium")}>New Password</Label>
          <div className="relative flex items-center">
            <Input 
              id="newPassword" 
              name="newPassword" 
              type={showNewPassword ? "text" : "password"} 
              required 
              className={`pr-12 rounded-full bg-background h-[54px]`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-6 text-foreground"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="confirmPassword" className={cn("text-lg font-medium")}>Confirm New Password</Label>
          <div className="relative flex items-center">
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"} 
              required 
              className={`pr-12 rounded-full bg-background h-[54px]`}
              placeholder="Confirm new password"
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
          <div className="text-right pt-1">
             <Link href="/forgot-password" className="text-sm text-grey-1 underline">
                Forgot current password?
            </Link>
          </div>
      </div>
      <div className="pt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
