
"use client";

import { useActionState } from "react-dom";
import { useFormStatus } from "react-dom";
import React, { useState, useEffect } from "react";
import { signup } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import LockIcon from "./icons/lock";
import EmailIcon from "./icons/email-icon";
import PhoneIcon from "./icons/phone-icon";
import OrganizationIcon from "./icons/organization-icon";
import EyeIcon from "./icons/eye-icon";
import EyeOffIcon from "./icons/eye-off-icon";
import { cn } from "@/lib/utils";

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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Signup Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <form action={action} className="flex flex-col flex-grow">
      <div className="space-y-4 flex-grow">
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
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={cn("text-lg font-medium", phone ? 'text-grey-1' : 'text-black')}>Phone Number</Label>
          <div className="relative flex items-center">
            <PhoneIcon className="absolute left-6 h-5 w-5 text-foreground" />
            <div className="absolute left-14 h-6 w-px bg-grey-2" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Your phone number"
              className={`pl-20 rounded-full bg-background h-[54px]`}
              disabled={pending}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization" className={cn("text-lg font-medium", organization ? 'text-grey-1' : 'text-black')}>Organization Name</Label>
          <div className="relative flex items-center">
            <OrganizationIcon className="absolute left-6 h-5 w-5 text-foreground" />
            <div className="absolute left-14 h-6 w-px bg-grey-2" />
            <Input
              id="organization"
              name="organization"
              type="text"
              required
              placeholder="Your organization's name"
              className={`pl-20 rounded-full bg-background h-[54px]`}
              disabled={pending}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className={cn("text-lg font-medium", password ? 'text-grey-1' : 'text-black')}>Create Password</Label>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={pending}
            >
              {showPassword ? <EyeOffIcon className="h-s w-5" /> : <EyeIcon className="h-s w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 pb-[env(safe-area-inset-bottom)]">
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
