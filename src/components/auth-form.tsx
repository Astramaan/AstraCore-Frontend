
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Check } from "lucide-react";

export default function AuthForm() {
  const router = useRouter();
  const { user, loading, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { toast } = useToast();

  const redirectToDashboard = (userData: any) => {
    let targetPath;
    if (userData.role === "SUPER_ADMIN") {
      targetPath = "/platform/dashboard";
    } else if (userData.team === "New User") {
      targetPath = `/organization/${userData.organizationId}/client/lead/${userData.userId}/home`;
    } else if (userData.role === "CLIENT") {
      targetPath = `/organization/${userData.organizationId}/client/${userData.userId}/home`;
    } else {
      targetPath = `/organization/${userData.organizationId}/home`;
    }
    router.push(targetPath);
  };

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

      if (res.ok && data.user) {
        setUser(data.user);
        setLoginSuccess(true);
        setTimeout(() => {
          redirectToDashboard(data.user);
        }, 1500);
      } else {
        toast({
          variant: "destructive",
          description: data.message || "An unknown error occurred.",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Login action failed:", error);
      toast({
        variant: "destructive",
        description: "An unexpected network error occurred.",
      });
      setIsSubmitting(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-20 h-20 bg-lime-600/5 rounded-full animate-ping" />
          <div className="w-14 h-14 bg-lime-600/20 rounded-full absolute" />
          <div className="w-10 h-10 bg-primary/20 absolute flex items-center justify-center rounded-full">
            <Check className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Login Successful!</h2>
        <p className="text-muted-foreground mt-2">Redirecting you now...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
      <div className="space-y-4 flex-grow">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={cn("text-lg font-medium", "text-foreground")}
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
              className={`pl-20 rounded-full bg-background h-[54px]`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              className={cn(
                "text-lg font-medium",
                password ? "text-grey-1" : "text-foreground",
              )}
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-grey-1 hover:text-primary hover:underline"
            >
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
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6 pb-[env(safe-area-inset-bottom)]">
        <div className="mb-4">
          <Button
            type="submit"
            className="w-full h-[54px] rounded-full"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            {"Don't have an account? "}
          </span>
          <Link
            href="/signup"
            className="font-semibold text-foreground hover:text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}
