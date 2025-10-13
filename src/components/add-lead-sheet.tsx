
"use client";

import React, { useState, useTransition, useRef } from "react";
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
import { Plus, X, ShieldAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { SuccessPopup } from "./success-popup";
import { ScrollArea } from "./ui/scroll-area";
import UserPlusIcon from "./icons/user-plus-icon";
import { Lead } from "./lead-details-sheet";
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
  <div className="relative flex flex-col justify-start items-start gap-2">
    <Label
      htmlFor={id}
      className={cn(
        "self-stretch text-lg font-medium",
        value ? "text-grey-1" : "text-foreground",
      )}
    >
      {label}
    </Label>
    <Input
      id={id}
      className="w-full h-14 bg-background rounded-full px-6 text-lg"
      value={value}
      {...props}
    />
  </div>
);

const AddLeadForm = ({
  onFormSuccess,
}: {
  onFormSuccess: (lead: Lead) => void;
}) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [backendError, setBackendError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and limit to 6 digits
    if (/^[0-9]*$/.test(value) && value.length <= 6) {
      setPincode(value);
      // Indian pincode validation (must be 6 digits)
      if (value.length > 0 && value.length !== 6) {
        setPincodeError("Pincode must be 6 digits.");
      } else {
        setPincodeError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    if (pincodeError) {
      toast({
        variant: "destructive",
        title: "Invalid Pincode",
        description: "Pincode must be 6 digits.",
      });
      return;
    }

    startTransition(async () => {
      const payload = {
        inviteeDetails: {
          inviteeName: fullName,
          inviteeMobileNumber: phone,
          inviteeEmail: email,
          inviteeRole: "LEAD",
          siteLocationPinCode: pincode,
        },
      };

      try {
        const res = await fetch(`/api/invite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user": JSON.stringify(user),
            Authorization: `Bearer ${user?.userId}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({})); // Catch empty response

        if (res.ok) {
          const newLead: Lead = {
            organization: "Your Org", // This might need to be dynamic
            leadId: data.data?.leadDisplayId || `LEAD${Date.now()}`,
            fullName: fullName,
            contact: `${email} | ${phone}`,
            phone: phone,
            email: email,
            address: `Pincode: ${pincode}`,
            pincode: pincode,
            tokenAmount: "0",
            level: "Level 1",
            profileImage: "https://placehold.co/94x94.png",
            coverImage: "https://placehold.co/712x144.png",
            siteImages: [],
          };
          onFormSuccess(newLead);
        } else {
          setBackendError(data.message || "Failed to create lead.");
        }
      } catch (error) {
        console.error("Add lead failed:", error);
        setBackendError("An unexpected error occurred.");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-6 no-scrollbar">
          <div className="space-y-4">
            <FloatingLabelInput
              id="full-name"
              name="fullName"
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <FloatingLabelInput
              id="phone-number"
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <div>
              <FloatingLabelInput
                id="email-id"
                name="email"
                label="Email ID"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <p className="text-destructive text-sm mt-1 px-4">
                  {emailError}
                </p>
              )}
            </div>
            <div>
              <FloatingLabelInput
                id="pincode"
                name="pincode"
                label="Site location pin code"
                value={pincode}
                onChange={handlePincodeChange}
                required
              />
              {pincodeError && (
                <p className="text-destructive text-sm mt-1 px-4">
                  {pincodeError}
                </p>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-center">
          <Button
            type="submit"
            className="w-full h-14 px-10 py-3.5 bg-primary rounded-full text-lg"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
      <AlertDialog
        open={!!backendError}
        onOpenChange={() => setBackendError(null)}
      >
        <AlertDialogContent className="max-w-md rounded-[50px]">
          <AlertDialogHeader className="items-center text-center">
            <div className="relative mb-6 flex items-center justify-center h-20 w-20">
              <div className="w-full h-full bg-red-600/5 rounded-full" />
              <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
              <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
            </div>
            <AlertDialogTitle className="text-2xl font-semibold">
              Error Adding Lead
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-grey-1">
              {backendError}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
            <AlertDialogAction
              onClick={() => setBackendError(null)}
              className="w-40 h-14 px-10 bg-primary rounded-[50px] text-lg font-medium text-black dark:text-black hover:bg-primary/90"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

interface AddLeadSheetProps {
  onLeadAdded: (lead: Lead) => void;
}

export function AddLeadSheet({ onLeadAdded }: AddLeadSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = (newLead: Lead) => {
    setIsOpen(false);
    setShowSuccess(true);
    onLeadAdded(newLead);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="md:h-14 md:px-10 rounded-full bg-primary/10 text-primary dark:text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium h-[54px] w-[54px] md:w-auto p-0 md:p-2.5">
            <UserPlusIcon className="md:mr-2 h-6 w-6" />
            <span className="hidden md:inline">Add New Lead</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-md md:mx-auto rounded-t-[50px] border-none"
          onInteractOutside={(e) => {
            if (
              (e.target as HTMLElement).closest(
                "[data-radix-popper-content-wrapper]",
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-2xl font-semibold">
                <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1">
                  <Plus className="h-6 w-6" />
                </div>
                Add New Lead
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
          <div className="flex-1 flex flex-col overflow-hidden">
            <AddLeadForm onFormSuccess={handleSuccess} />
          </div>
        </SheetContent>
      </Sheet>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="New Lead Added!"
        message="Invitation sent successfully. You can now follow up and manage this lead in AstraCore."
      />
    </>
  );
}
