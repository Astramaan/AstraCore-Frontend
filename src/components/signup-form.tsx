
"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";

export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkEmail = async (emailToCheck: string) => {
    if (!emailToCheck || !/^\S+@\S+\.\S+$/.test(emailToCheck)) {
      setEmailError("");
      return;
    }

    setIsCheckingEmail(true);
    try {
      const res = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToCheck }),
      });
      const data = await res.json();
      if (data.message === "Email already exists") {
        setEmailError("Email already exists. Please login.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Failed to check email", error);
      setEmailError("");
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      checkEmail(value);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError) {
      toast({
        variant: "destructive",
        title: "Email Error",
        description: emailError,
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const res = await fetch(`/api/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed to send OTP. Please try again.",
        });
      } else {
        const params = new URLSearchParams(
          Object.fromEntries(formData.entries()) as Record<string, string>,
        );
        params.set("flow", "signup");
        router.push(`/otp-verification?${params.toString()}`);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
      <div className="space-y-4 flex-grow">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className={cn(
              "text-lg font-medium",
              name ? "text-muted-foreground" : "text-foreground",
            )}
          >
            Full Name
          </Label>
          <div className="relative flex items-center">
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder={name ? "" : "Your full name"}
              className={`pl-6 rounded-full bg-background h-[54px]`}
              disabled={isSubmitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className={cn(
                "text-lg font-medium",
                email ? "text-muted-foreground" : "text-foreground",
              )}
            >
              Email ID
            </Label>
            <div className="relative flex items-center">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={email ? "" : "name@company.com"}
                className={cn(
                  `pl-6 rounded-full bg-background h-[54px]`,
                  emailError && "border-destructive",
                )}
                disabled={isSubmitting}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {isCheckingEmail && (
              <p className="text-sm text-muted-foreground px-4">Checking...</p>
            )}
            {emailError && (
              <p className="text-sm text-destructive px-4">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className={cn(
                "text-lg font-medium",
                phone ? "text-muted-foreground" : "text-foreground",
              )}
            >
              Phone Number
            </Label>
            <div className="relative flex items-center">
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder={phone ? "" : "Your phone number"}
                className={`pl-6 rounded-full bg-background h-[54px]`}
                disabled={isSubmitting}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="organization"
              className={cn(
                "text-lg font-medium",
                organization ? "text-muted-foreground" : "text-foreground",
              )}
            >
              Organization Name
            </Label>
            <div className="relative flex items-center">
              <Input
                id="organization"
                name="organization"
                type="text"
                required
                placeholder={organization ? "" : "Your organization's name"}
                className={`pl-6 rounded-full bg-background h-[54px]`}
                disabled={isSubmitting}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className={cn(
                "text-lg font-medium",
                password ? "text-muted-foreground" : "text-foreground",
              )}
            >
              Create Password
            </Label>
            <div className="relative flex items-center">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder={password ? "" : "xxxxxxxxxxx"}
                className={`pl-6 pr-12 rounded-full bg-background h-[54px]`}
                disabled={isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isSubmitting}
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
      </div>

      <div className="mt-auto pt-6 pb-[env(safe-area-inset-bottom)]">
        <div className="mb-4">
          <Button
            type="submit"
            className="w-full rounded-full hover:bg-primary/90 h-[54px]"
            disabled={isSubmitting || isCheckingEmail || !!emailError}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/"
            className="font-semibold text-foreground hover:text-primary underline"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
