"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import React, { useState } from "react";
import { createPassword } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full hover:bg-primary/90 h-[54px]" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </Button>
  );
}

export default function CreatePasswordForm() {
  const [state, action] = useActionState(createPassword, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <>
      <h2 className="text-lg text-grey-1 tracking-tight font-body mb-8">You're almost there.<br/>Create your password.</h2>
      <form action={action} className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="space-y-2">
            <Label htmlFor="password">Create your password</Label>
            <div className="relative flex items-center">
              <LockKeyhole className="absolute left-6 h-5 w-5 text-foreground" />
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
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
             <p className="text-sm text-grey-1 pt-1">Use 8 or more characters with a combination of letters, numbers, and symbols.</p>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-4">
            <SubmitButton />
          </div>
        </div>
      </form>
    </>
  );
}
