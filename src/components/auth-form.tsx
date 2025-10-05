
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import EmailIcon from "./icons/email-icon";
import LockIcon from "./icons/lock";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import Link from "next/link";
import { useUser } from "@/context/user-context";

export default function AuthForm() {
  const router = useRouter();
  const { user, loading, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // This effect handles redirection after the user state has been updated.
    if (!loading && user) {
        let targetPath;
        if (user.role === 'SUPER_ADMIN') {
            targetPath = '/platform/dashboard';
        } else if (user.team === 'New User') {
            targetPath = `/organization/${user.organizationId}/client/new/${user.userId}/home`;
        } else if (user.role === 'CLIENT') {
            targetPath = `/organization/${user.organizationId}/client/${user.userId}/home`;
        } else {
            targetPath = `/organization/${user.organizationId}/home`;
        }
        router.push(targetPath);
    }
  }, [user, loading, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        const res = await fetch(`/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.success && data.user) {
            setUser(data.user);
        } else {
           toast({
            variant: "destructive",
            description: data.message || "An unknown error occurred.",
          });
        }
    } catch (error) {
        console.error("Login action failed:", error);
         toast({
            variant: "destructive",
            description: "An unexpected network error occurred.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <div className="space-y-4 flex-grow">
            <div className="space-y-2">
                <Label htmlFor="email" className={cn("text-lg font-medium", "text-black")}>Email ID</Label>
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
                        disabled={isSubmitting}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="password" className={cn("text-lg font-medium", password ? 'text-grey-1' : 'text-black')}>Password</Label>
                    <Link href="/forgot-password" className="text-sm text-grey-1 hover:text-primary hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <div className="relative flex items-center">
                    <LockIcon className="absolute left-6 h-5 w-5 text-foreground" />
                    <div className="absolute left-14 h-6 w-px bg-grey-2" />
                    <Input 
                        id="password" 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        placeholder="xxxxxxxxxxx"
                        className={`pl-20 pr-12 rounded-full bg-background h-[54px]`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
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
        <div className="mt-auto pt-6 pb-[env(safe-area-inset-bottom)]">
            <div className="mb-4">
                 <Button type="submit" className="w-full h-[54px] rounded-full" disabled={isSubmitting || loading}>
                    {isSubmitting || loading ? "Logging in..." : "Login"}
                </Button>
            </div>
            
            <div className="text-center text-sm">
                <span className="text-muted-foreground">{"Don't have an account? "}</span>
                <Link href="/signup" className="font-semibold text-black hover:text-primary hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    </form>
  );
}
