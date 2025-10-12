"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";
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
  <div className="relative flex flex-col justify-start items-start gap-2">
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
      className="w-full h-14 bg-input rounded-full px-6 text-lg"
      value={value}
      {...props}
    />
  </div>
);

const AddFamilyMemberForm = ({
  onFormSuccess,
}: {
  onFormSuccess: () => void;
}) => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          role: "client",
          team: "New User",
        }),
      });

      const data = await res.json();
      if (data.success) {
        onFormSuccess();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
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
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6 no-scrollbar">
        <div className="space-y-6">
          <FloatingLabelInput
            id="member-name"
            name="name"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FloatingLabelInput
            id="member-email"
            name="email"
            type="email"
            label="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FloatingLabelInput
            id="member-phone"
            name="phone"
            type="tel"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </ScrollArea>
      <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
        <Button
          type="submit"
          className="w-full h-[54px] text-lg rounded-full md:w-auto md:px-14"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
};

interface AddFamilyMemberSheetProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function AddFamilyMemberSheet({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
}: AddFamilyMemberSheetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const onOpenChange = controlledOnOpenChange || setInternalIsOpen;

  const handleSuccess = () => {
    onOpenChange(false);
    setShowSuccess(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-md md:mx-auto rounded-t-[50px] border-none"
        >
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center text-2xl font-semibold">
                <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                  <Plus className="h-6 w-6" />
                </div>
                Add Family Member
              </SheetTitle>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[54px] h-[54px] bg-background rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
            <AddFamilyMemberForm onFormSuccess={handleSuccess} />
          </div>
        </SheetContent>
      </Sheet>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Family Member Added"
        message="The new family member can now access the project."
      />
    </>
  );
}
