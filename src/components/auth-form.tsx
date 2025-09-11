
"use client";

import React, { useState, useEffect } from "react";
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
import { cookies } from 'next/headers';

async function loginUser(email: string, password: string): Promise<any> {
  try {
    const res = await fetch("https://astramaan-be-1.onrender.com/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Network error. Please try again." };
  }
}

export default function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await loginUser(email, password);
    setIsLoading(false);

    if (!response.success) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: response.message || "Invalid credentials. Please try again.",
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Redirecting...",
      });

      // In a real app, you would save the token from response.token securely
      // For now, setting a dummy cookie to simulate a logged-in state
      document.cookie = "auth_token=dummy_token_for_now; path=/; max-age=86400";

      const role = response.user?.role;
      if (role === 'ORG_ADMIN') {
        router.push('/organization/home');
      } else if (role === 'admin') {
        router.push('/platform/dashboard');
      } else {
        // Default redirect for other roles or if role is not specified
        router.push('/organization/home');
      }
    }
  };

  return (
    <div className="flex-grow flex flex-col">
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="space-y-2">
            <Label htmlFor="email" className={cn("text-lg font-medium", email ? 'text-grey-1' : 'text-black')}>Email ID</Label>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="password" className={cn("text-lg font-medium", password ? 'text-grey-1' : 'text-black')}>Password</Label>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-4">
            <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Login"}
            </Button>
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
