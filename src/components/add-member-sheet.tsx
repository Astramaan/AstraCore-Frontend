
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
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import UserPlusIcon from "./icons/user-plus-icon";
import { SuccessPopup } from "./success-popup";
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
        "text-lg font-medium",
        value ? "text-muted-foreground" : "text-foreground",
      )}
    >
      {label}
    </Label>
    <Input
      id={id}
      className="w-full h-14 bg-input rounded-[50px] px-6 text-lg"
      value={value}
      {...props}
    />
  </div>
);

const AddMemberForm = ({
  onFormSuccess,
}: {
  onFormSuccess: () => void;
}) => {
  const { toast } = useToast();
  const { user } = useUser();

  const isTeamAdmin =
    user?.team === "Architect" ||
    user?.team === "Sales" ||
    user?.team === "Site Supervisor";
  const teamValue = user?.team;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [team, setTeam] = useState(() => (isTeamAdmin ? teamValue : ""));
  const [role, setRole] = useState(() => (isTeamAdmin ? "member" : ""));
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teams = [
    "Sales",
    "Developer",
    "Design",
    "Support & Feedback",
    "HR",
    "Architect",
    "Site Supervisor",
  ];
  const roles = ["Admin", "Member"];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      inviteeDetails: {
        inviteeName: name,
        inviteeEmail: email,
        inviteeMobileNumber: phone,
        inviteeRole: "ORG",
        team: team,
        roleType: role.toUpperCase(),
      },
    };

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify(user),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success || res.status === 201) {
        onFormSuccess();
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
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6 no-scrollbar">
        <div className="space-y-6">
          <FloatingLabelInput
            id="member-name"
            name="name"
            label="Full Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <div>
            <FloatingLabelInput
              id="member-email"
              name="email"
              type="email"
              label="Email ID"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-destructive text-sm mt-1 px-4">{emailError}</p>
            )}
          </div>
          <FloatingLabelInput
            id="member-phone"
            name="mobileNumber"
            type="tel"
            label="Mobile Number"
            value={phone}
            onChange={handlePhoneChange}
            required
          />

          {!isTeamAdmin && (
            <>
              <div className="space-y-2">
                <Label
                  htmlFor="team-select"
                  className={cn(
                    "text-lg font-medium",
                    team ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  Team
                </Label>
                <Select
                  value={team}
                  onValueChange={(value) =>
                    setTeam(value.toUpperCase().replace(/\s/g, "_"))
                  }
                >
                  <SelectTrigger
                    id="team-select"
                    className="w-full h-14 bg-input rounded-full px-6 text-lg"
                  >
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="role-select"
                  className={cn(
                    "text-lg font-medium",
                    role ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  Role Type
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger
                    id="role-select"
                    className="w-full h-14 bg-input rounded-full px-6 text-lg"
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r} value={r.toLowerCase()}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
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

interface AddMemberSheetProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function AddMemberSheet({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
}: AddMemberSheetProps) {
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
        {!controlledIsOpen && (
          <SheetTrigger asChild>
            <Button className="md:h-14 md:px-12 rounded-full bg-primary/10 text-primary dark:text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium h-[54px] w-[54px] md:w-auto p-4 md:p-2.5">
              <UserPlusIcon className="md:mr-2 h-6 w-6" />
              <span className="hidden md:inline">Add New Member</span>
            </Button>
          </SheetTrigger>
        )}
        <SheetContent
          side="bottom"
          className="p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-md md:mx-auto rounded-t-[50px] border-none"
        >
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center text-2xl font-semibold">
                <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                  <UserPlusIcon className="h-6 w-6" />
                </div>
                Add New Member
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
            <AddMemberForm
              onFormSuccess={handleSuccess}
            />
          </div>
        </SheetContent>
      </Sheet>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Employee Added Successfully"
        message="The new employee has been added. A password creation link has been sent to their email, allowing them to access AstraCore."
      />
    </>
  );
}
