
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Check, X, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  inviteLink?: string;
}

export function SuccessPopup({
  isOpen,
  onClose,
  title,
  message,
  inviteLink,
}: SuccessPopupProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast({
        title: "Copied!",
        description: "Invite link copied to clipboard.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[50px] p-8 m-10">
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
        </DialogHeader>
        <div className="text-center flex flex-col items-center">
          <div className="relative mb-6 flex items-center justify-center">
            <div className="w-20 h-20 bg-[#50C878]/5 rounded-full" />
            <div className="w-14 h-14 bg-[#50C878]/20 rounded-full absolute" />
            <div className="w-10 h-10 bg-[#50C878]/20 absolute flex items-center justify-center rounded-full">
              <Check className="w-8 h-8 text-[#50C878]" />
            </div>
          </div>
          <h2 className="text-lg font-medium text-zinc-900 mb-2">{title}</h2>
          <p className="text-sm text-neutral-500 max-w-xs mx-auto">{message}</p>
          {inviteLink && (
            <div className="mt-4 w-full relative">
              <Input
                readOnly
                value={inviteLink}
                className="pr-10 rounded-full bg-background"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
