"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import React, { useState } from "react";
import { signup } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Mail, LockKeyhole, Eye, EyeOff, Phone, Building2 } from "lucide-react";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Signing up..." : "Sign up"}
    </Button>
  );
}

export default function SignupForm() {
  const [state, action] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const { pending } = useFormStatus();

  return (
    <form action={action} className="flex flex-col">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email ID</Label>
          <div className="relative flex items-center">
            <Mail className="absolute left-6 h-5 w-5 text-foreground" />
            <div className="absolute left-14 h-6 w-px bg-grey-2" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@company.com"
              className={`pl-20 rounded-full bg-background h-[54px] border-0`}
              disabled={pending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative flex items-center">
            <Phone className="absolute left-6 h-5 w-5 text-foreground" />
            <div className="absolute left-14 h-6 w-px bg-grey-2" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Your phone number"
              className={`pl-20 rounded-full bg-background h-[54px] border-0`}
              disabled={pending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organization Name</Label>
          <div className="relative flex items-center">
            <Building2 className="absolute left-6 h-5 w-5 text-foreground" />
            <div className="absolute left-14 h-6 w-px bg-grey-2" />
            <Input
              id="organization"
              name="organization"
              type="text"
              required
              placeholder="Your organization's name"
              className={`pl-20 rounded-full bg-background h-[54px] border-0`}
              disabled={pending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Create Password</Label>
          <div className="relative flex items-center">
            <LockKeyhole className="absolute left-6 h-5 w-5 text-foreground" />
            <div className="absolute left-14 h-6 w-px bg-grey-2" />
            <Input 
              id="password" 
              name="password" 
              type={showPassword ? "text" : "password"} 
              required 
              className={`pl-20 pr-12 rounded-full bg-background h-[54px] border-0`}
              disabled={pending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={pending}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {state?.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Signup Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-4">
          <SubmitButton />
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/" className="font-semibold text-black hover:text-primary underline">
              Login
          </Link>
        </div>
      </div>
    </form>
  );
}
