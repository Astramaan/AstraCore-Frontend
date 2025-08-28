
'use client';

import React, { useState, useActionState, useEffect } from 'react';
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
import { Plus, User, Mail, Phone, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { addEmployee } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FloatingLabelInput = ({ id, label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className="text-grey-2 text-lg font-medium">{label}</Label>
        <Input id={id} className="w-full h-14 bg-background rounded-[50px] px-6 text-lg" {...props} />
    </div>
);


const AddEmployeeForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();

    const [state, formAction] = useActionState(addEmployee, { success: false, message: '' });

    useEffect(() => {
        if (state.success) {
            onFormSuccess();
        } else if (state.message) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }, [state, onFormSuccess, toast]);
    
    const roles = ["Sales", "Developer", "Design", "Support & Feedback", "HR"];


    return (
    <form action={formAction}>
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="grid grid-cols-1 gap-y-6">
                <FloatingLabelInput id="employee-name" name="employee-name" label="Full Name" placeholder="Balaji Naik" />
                <FloatingLabelInput id="employee-email" name="employee-email" type="email" label="Email ID" placeholder="admin@abc.com" />
                <FloatingLabelInput id="employee-phone" name="employee-phone" type="tel" label="Phone Number" placeholder="+91 1234567890" />

                <div className="space-y-2">
                    <Label htmlFor="role-type" className="text-grey-2 text-lg font-medium">Role Type</Label>
                    <Select name="role-type">
                        <SelectTrigger id="role-type" className="w-full h-14 bg-background rounded-[50px] px-6 text-lg">
                            <SelectValue placeholder="Admin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="employee">Employee</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-grey-2 text-lg font-medium">Roles</Label>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {roles.map(role => (
                            <div key={role} className="flex items-center gap-2">
                                <Checkbox id={`role-${role.toLowerCase()}`} name="roles" value={role.toLowerCase()} className="w-6 h-6 rounded-full" />
                                <Label htmlFor={`role-${role.toLowerCase()}`} className="text-black text-lg font-medium">
                                    {role}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center pt-8">
                <Button type="submit" className="w-96 h-14 px-10 py-3.5 bg-primary rounded-[50px] text-lg">
                    Add
                </Button>
            </div>
        </div>
    </form>
    );
};


export function AddEmployeeSheet() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    setShowSuccess(true);
  };

  const DialogOrSheet = isMobile ? Dialog : Dialog;
  const DialogOrSheetContent = isMobile ? DialogContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? DialogHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? DialogClose : DialogClose;
  const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

  return (
    <>
    <DialogOrSheet open={isOpen} onOpenChange={setIsOpen}>
      <DialogOrSheetTrigger asChild>
        <Button className="h-14 px-10 rounded-full bg-white text-black hover:bg-primary/10 hover:text-primary text-lg font-medium">
            <Plus className="mr-2"/>
            Add New Employee
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent 
          className={cn(
            "p-0 rounded-[50px] w-[452px]"
          )}
      >
          <DialogOrSheetHeader className="p-6 border-b">
              <div className="flex items-center justify-between">
                <DialogOrSheetTitle className="flex items-center text-2xl font-semibold">
                    <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                        <Plus className="h-6 w-6"/>
                    </div>
                    Add New Employee
                </DialogOrSheetTitle>
                <DialogOrSheetClose asChild>
                    <Button variant="ghost" size="icon" className="p-3.5 bg-background rounded-full">
                        <X className="h-6 w-6" />
                    </Button>
                </DialogOrSheetClose>
              </div>
          </DialogOrSheetHeader>
          <AddEmployeeForm onFormSuccess={handleSuccess} />
      </DialogOrSheetContent>
    </DialogOrSheet>
    <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="New Employee added"
        message="Hurray! We’ve added a new member to our team!"
    />
    </>
  );
}
