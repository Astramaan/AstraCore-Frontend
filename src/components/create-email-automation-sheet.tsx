
"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { X, ArrowRight, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface CreateEmailAutomationSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const StepIndicator = ({
  step,
  title,
  isActive,
  isLast = false,
}: {
  step: number;
  title: React.ReactNode;
  isActive: boolean;
  isLast?: boolean;
}) => (
  <>
    <div className="flex items-center gap-4">
      <div
        className={cn(
          "size-14 rounded-3xl flex items-center justify-center text-lg font-medium",
          isActive
            ? "bg-primary/10 border border-primary text-primary"
            : "border border-border text-muted-foreground opacity-30",
        )}
      >
        {step}
      </div>
      <div
        className={cn(
          "text-lg font-medium",
          isActive ? "text-foreground" : "text-muted-foreground opacity-30",
        )}
      >
        {title}
      </div>
    </div>
    {!isLast && (
      <div className="pl-7">
        <div className="h-28 w-px border-l border-border" />
      </div>
    )}
  </>
);

const BasicInfoForm = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="template-name"
          className="text-lg font-medium text-foreground"
        >
          Template Name
        </Label>
        <Input
          id="template-name"
          className="h-14 bg-background rounded-full"
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="subject-line"
          className="text-lg font-medium text-foreground"
        >
          Subject Line
        </Label>
        <Input
          id="subject-line"
          className="h-14 bg-background rounded-full"
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="sender-email"
          className="text-lg font-medium text-foreground"
        >
          Sender Email
        </Label>
        <Select>
          <SelectTrigger className="h-14 bg-background rounded-full">
            <SelectValue placeholder="Support@astramaan.com" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="support@astramaan.com">
              Support@astramaan.com
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="pt-6 flex justify-end">
        <Button onClick={onNext} className="h-14 rounded-full px-10 text-lg">
          Next
        </Button>
      </div>
    </div>
  );
};

export function CreateEmailAutomationSheet({
  isOpen,
  onOpenChange,
}: CreateEmailAutomationSheetProps) {
  const [step, setStep] = useState(1);

  const steps = [
    "Basic Info",
    "Upload Email Template",
    "Trigger Settings",
    "Preview & Save",
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="p-0 m-0 w-full max-w-4xl mx-auto flex flex-col bg-card text-card-foreground h-[90vh] rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-[54px] h-[54px] p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1 dark:outline-border flex justify-center items-center">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold">
                Create New Email Automation
              </h2>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-[54px] h-[54px] rounded-full bg-background"
              >
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 p-6 border-r hidden md:block">
            <div className="flex flex-col">
              {steps.map((title, index) => (
                <StepIndicator
                  key={index}
                  step={index + 1}
                  title={title}
                  isActive={step === index + 1}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </aside>
          <main className="flex-1 p-6 overflow-y-auto">
            {step === 1 && <BasicInfoForm onNext={() => setStep(2)} />}
            {/* Add other steps here */}
          </main>
        </div>
      </SheetContent>
    </Sheet>
  );
}
