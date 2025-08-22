"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Mail, LockKeyhole } from "lucide-react";
import { Separator } from "./ui/separator";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-full" aria-disabled={pending}>
      {pending ? "Signing in..." : "Login"}
    </Button>
  );
}

export default function AuthForm() {
  const [state, action] = useActionState(authenticate, undefined);

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email ID</Label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <div className="absolute left-9 h-6 w-px bg-grey-2" />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@company.com"
            className="pl-12 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm font-medium text-grey-1 hover:text-primary underline">
                Forgot password?
            </a>
        </div>
        <div className="relative flex items-center">
          <LockKeyhole className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <div className="absolute left-9 h-6 w-px bg-grey-2" />
          <Input id="password" name="password" type="password" required className="pl-12 rounded-full"/>
        </div>
      </div>

      {state?.error && (
        <Alert variant="destructive">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div>
        <SubmitButton />
      </div>

       <div className="text-center text-sm">
        <span className="text-muted-foreground">New to Astramaan? </span>
        <a href="#" className="font-semibold text-black hover:text-primary underline">
            Signup
        </a>
      </div>
    </form>
  );
}
