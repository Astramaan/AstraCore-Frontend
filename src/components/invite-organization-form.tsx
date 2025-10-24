
"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/user-context";

const FloatingLabelInput = ({
  id,
  label,
  value,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
}) => (
  <div className="space-y-2">
    <Label
      htmlFor={id}
      className={cn(
        "text-lg font-medium",
        value ? "text-muted-foreground" : "text-foreground",
      )}
    >
      {label}
    </Label>
    <Input
      id={id}
      className="h-14 bg-background rounded-full px-5"
      value={value}
      {...props}
    />
  </div>
);

export function InviteOrganizationForm({
  onInviteSuccess,
}: {
  onInviteSuccess: (link: string) => void;
}) {
  const { toast } = useToast();
  const { user } = useUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      inviteeDetails: {
        inviteeName: fullName,
        inviteeEmail: email,
        inviteeMobileNumber: phone,
        inviteeRole: "ORG_ADMIN",
        team: "ORG_ADMIN",
        roleType: "admin",
      },
      organizationDetails: {
        orgName: organizationName,
        city: city,
      },
    };

    try {
      const res = await fetch("/api/invite-organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify(user),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onInviteSuccess(data.inviteLink);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed to send invitation.",
        });
      }
    } catch (error) {
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
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <FloatingLabelInput
        id="full-name"
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <FloatingLabelInput
        id="email-id"
        label="Email Id"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FloatingLabelInput
        id="phone-number"
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <FloatingLabelInput
        id="city"
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <FloatingLabelInput
        id="org-name"
        label="Organization Name"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        required
      />
      <div className="pt-6">
        <Button
          type="submit"
          className="w-full h-14 px-10 rounded-full text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Invite"}
        </Button>
      </div>
    </form>
  );
}
