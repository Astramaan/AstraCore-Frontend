"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";

export default function ResetPasswordForm({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form action={() => {}}>
      <input type="hidden" name="email" value={searchParams.email || ""} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password" className={cn("text-lg font-medium")}>
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
            className={cn("text-lg font-medium")}
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
          >
            Save Password
          </Button>
        </div>
      </div>
    </form>
  );
}
