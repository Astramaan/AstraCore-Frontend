"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import React, { useState } from "react";
import { authenticate } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { EyeOff } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import LockIcon from "./icons/lock";
import EmailIcon from "./icons/email-icon";
import EyeIcon from "./icons/eye-icon";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Signing in..." : "Login"}
    </Button>
  );
}

export default function AuthForm() {
  const [state, action] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <form action={action} className="flex-grow flex flex-col">
      <div className="flex-grow">
        <div className="space-y-2">
          <Label htmlFor="email">Email ID</Label>
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
            />
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
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
              disabled={pending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={pending}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <Link href="/forgot-password" className="block text-right text-sm font-medium text-grey-1 hover:text-primary underline mt-1">
              Forgot password?
          </Link>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-4">
          <SubmitButton />
        </div>

         <div className="text-center text-sm">
          <span className="text-muted-foreground">New to Astramaan? </span>
          <Link href="/signup" className="font-semibold text-black hover:text-primary underline">
              Signup
          </Link>
        </div>
      </div>
    </form>
  );
}
