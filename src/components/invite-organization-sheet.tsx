
"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuccessPopup } from "./success-popup";

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

const InviteOrganizationForm = ({ onInvite }: { onInvite: () => void }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onInvite();
      }}
      className="p-6 space-y-6"
    >
      <FloatingLabelInput
        id="full-name"
        label="Full Name"
        value=""
        onChange={() => {}}
      />
      <FloatingLabelInput
        id="email-id"
        label="Email Id"
        value=""
        onChange={() => {}}
      />
      <FloatingLabelInput
        id="phone-number"
        label="Phone Number"
        value=""
        onChange={() => {}}
      />
      <FloatingLabelInput
        id="city"
        label="City"
        value=""
        onChange={() => {}}
      />
      <FloatingLabelInput
        id="org-name"
        label="Organization Name"
        value=""
        onChange={() => {}}
      />
      <div className="pt-6">
        <Button
          type="submit"
          className="w-full h-14 px-10 rounded-full text-lg"
        >
          Invite
        </Button>
      </div>
    </form>
  );
};

export const InviteOrganizationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInvite = () => {
    setIsOpen(false);
    setShowSuccess(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="h-14 px-10 bg-card rounded-full text-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Invite
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="p-0 m-0 w-full max-w-md mx-auto flex flex-col bg-card text-card-foreground h-auto rounded-t-[50px] border-none"
        >
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex justify-between items-center">
              <span className="text-2xl font-semibold">
                Invite Organization
              </span>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full"
                >
                  <X />
                </Button>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          <InviteOrganizationForm onInvite={handleInvite} />
        </SheetContent>
      </Sheet>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Invitation Sent"
        message="The organization has been invited to join your platform."
      />
    </>
  );
};
