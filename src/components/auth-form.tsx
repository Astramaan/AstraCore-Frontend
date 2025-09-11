
"use client";

import React, { useState, useEffect, useActionState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import LockIcon from "./icons/lock";
import EmailIcon from "./icons/email-icon";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";
import { authenticate } from "@/app/actions";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [state, formAction] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state?.success === false) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: state.message || "Invalid credentials",
      });
    } else if (state?.success === true) {
      toast({
        title: "Login Successful",
        description: "Redirecting...",
      });
      
      const userRole = state.user?.role;
      if (userRole === 'superadmin' || userRole === 'super-admin') {
          window.location.href = "/organization/dashboard";
      } else if (userRole === 'client') {
          window.location.href = "/organization/home";
      } else {
          window.location.href = "/organization/home";
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="flex-grow flex flex-col">
      <div className="flex-grow">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={cn("text-lg font-medium", email ? "text-grey-1" : "text-black")}
          >
            Email ID
          </Label>
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
              className="pl-20 rounded-full bg-background h-[54px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className={cn("text-lg font-medium", password ? "text-grey-1" : "text-black")}
            >
              Password
            </Label>
          </div>
          <div className="relative flex items-center">
            <LockIcon className="absolute left-6 h-5 w-5 text-foreground" />
            <div className="absolute left-14 h-6 w-px bg-grey-2" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="pl-20 pr-12 rounded-full bg-background h-[54px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <Link
            href="/forgot-password"
            className="block text-right text-sm font-medium text-grey-1 hover:text-primary underline mt-1"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-4">
          <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]">
            Login
          </Button>
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
