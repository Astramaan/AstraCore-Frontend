
"use client";

import { useFormStatus } from "react-dom";
import React, { useState, useEffect } from "react";
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
    <Button type="submit" className="w-full md:w-auto md:px-14 h-[54px] rounded-full hover:bg-primary/90" disabled={pending}>
      {pending ? "Saving..." : "Save Password"}
    </Button>
  );
}

export function ChangePasswordForm({ email, onSuccess }: { email: string, onSuccess: () => void }) {
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(newPassword !== confirmPassword) {
          toast({
              variant: "destructive",
              title: "Error",
              description: "New passwords do not match."
          });
          return;
      }
      setIsSubmitting(true);
      try {
          const res = await fetch('/api/change-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, currentPassword, newPassword, confirmPassword })
          });
          const data = await res.json();
          if(data.success) {
              onSuccess();
          } else {
              toast({
                  variant: 'destructive',
                  title: 'Error',
                  description: data.message
              })
          }
      } catch (e) {
          toast({
              variant: 'destructive',
              title: 'Error',
              description: 'An unexpected error occurred.'
          })
      } finally {
          setIsSubmitting(false);
      }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
      <div className="flex-1">
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
        <div className="space-y-2 mt-6">
            <Label htmlFor="newPassword" className={cn("text-lg font-medium")}>New Password</Label>
            <div className="relative flex items-center">
              <Input 
                id="newPassword" 
                name="newPassword" 
                type={showNewPassword ? "text" : "password"} 
                required 
                className={`pr-12 rounded-full bg-background h-[54px]`}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
        <div className="space-y-2 mt-6">
            <Label htmlFor="confirmPassword" className={cn("text-lg font-medium")}>Confirm New Password</Label>
            <div className="relative flex items-center">
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"} 
                required 
                className={`pr-12 rounded-full bg-background h-[54px]`}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
               <Link href="/forgot-password" className="text-sm text-grey-1 underline hover:text-primary">
                  Forgot current password?
              </Link>
            </div>
        </div>
      </div>
      <div className="pt-6 mt-auto flex justify-end">
        <Button type="submit" className="w-full md:w-auto md:px-14 h-[54px] rounded-full hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Password"}
        </Button>
      </div>
    </form>
  );
}
