"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";

export default function CreatePasswordForm({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match.",
      });
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name: searchParams.name,
      email: searchParams.email,
      phone: searchParams.phone,
      organization: searchParams.organization,
      password: password,
    };
    try {
      const res = await fetch("/api/create-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/password-success");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed to create account.",
        });
      }
    } catch (error) {
      console.error("Create password failed:", error);
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
    <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
      <div className="space-y-6 flex-grow">
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className={cn(
              "text-lg font-medium",
              password ? "text-muted-foreground" : "text-foreground",
            )}
          >
            New Password
          </Label>
          <div className="relative flex items-center">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className={`pr-12 rounded-full bg-background h-[54px]`}
              placeholder="xxxxxxxxxxx"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className={cn(
              "text-lg font-medium",
              confirmPassword ? "text-muted-foreground" : "text-foreground",
            )}
          >
            Confirm New Password
          </Label>
          <div className="relative flex items-center">
            <Input
              id="confirm-password"
              name="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              required
              className={`pr-12 rounded-full bg-background h-[54px]`}
              placeholder="xxxxxxxxxxx"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-6 text-foreground"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <div className="mb-4">
          <Button
            type="submit"
            className="w-full rounded-full hover:bg-primary/90 h-[54px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Password"}
          </Button>
        </div>
      </div>
    </form>
  );
}
