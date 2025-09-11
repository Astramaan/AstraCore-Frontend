
"use client";

import React, { useState, useEffect, useActionState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import LockIcon from "./icons/lock";
import EmailIcon from "./icons/email-icon";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Signing in..." : "Login"}
    </Button>
  );
}

export default function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const [state, formAction] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state?.success === false) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: state.message,
      });
    } else if (state?.success === true) {
      toast({
        title: "Login Successful",
        description: "Redirecting...",
      });
      const role = state.user?.role;
      if (role === 'ORG_ADMIN') {
        router.push('/organization/home');
      } else if (role === 'admin') {
        router.push('/platform/dashboard');
      } else {
        router.push('/organization/home');
      }
    }
  }, [state, router, toast]);

  return (
    <div className="flex-grow flex flex-col">
      <form action={formAction} className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="space-y-2">
            <Label htmlFor="email" className={cn("text-lg font-medium")}>Email ID</Label>
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
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="password" className={cn("text-lg font-medium")}>Password</Label>
            </div>
            <div className="relative flex items-center">
              <LockIcon className="absolute left-6 h-5 w-5 text-foreground" />
              <div className="absolute left-14 h-6 w-px bg-grey-2" />
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className={`pl-20 pr-12 rounded-full bg-background h-[54px]`}
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
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-4">
            <SubmitButton />
          </div>
        </div>
      </form>
       <Link href="/forgot-password" className="block text-right text-sm font-medium text-grey-1 hover:text-primary underline -mt-2">
            Forgot password?
        </Link>
        <div className="text-center text-sm mt-6">
            <span className="text-muted-foreground">New to Astramaan? </span>
            <Link href="/signup" className="font-semibold text-black hover:text-primary underline">
                Signup
            </Link>
        </div>
    </div>
  );
}
