
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
import { Plus, X } from "lucide-react";
import { SuccessPopup } from "./success-popup";
import { InviteOrganizationForm } from "./invite-organization-form";

export const InviteOrganizationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const handleInviteSuccess = (link: string) => {
    setIsOpen(false);
    setInviteLink(link);
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
          <InviteOrganizationForm onInviteSuccess={handleInviteSuccess} />
        </SheetContent>
      </Sheet>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Invitation Sent"
        message="The organization has been invited. Share the link below with them to get started."
        inviteLink={inviteLink}
      />
    </>
  );
};
