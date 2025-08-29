
'use client';

import React, { useState, useActionState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, X, UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { addEmployee } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className={cn("text-lg font-medium", value ? 'text-grey-1' : 'text-black')}>{label}</Label>
        <Input id={id} className="w-full h-14 bg-input rounded-[50px] px-6 text-lg" value={value} {...props} />
    </div>
);


const AddEmployeeForm = ({ onFormSuccess, onClose }: { onFormSuccess: () => void, onClose: () => void }) => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [roleType, setRoleType] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

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

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setName(value);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhone(value);
        }
    };

    return (
    <form action={formAction}>
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <FloatingLabelInput id="employee-name" name="employee-name" label="Full Name" value={name} onChange={handleNameChange} />
                <FloatingLabelInput id="employee-email" name="employee-email" type="email" label="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FloatingLabelInput id="employee-phone" name="employee-phone" type="tel" label="Phone Number" value={phone} onChange={handlePhoneChange} />

                <div className="space-y-2">
                    <Label htmlFor="role-type" className={cn("text-lg font-medium", roleType ? 'text-grey-1' : 'text-black')}>{ "Role Type"}</Label>
                    <Select name="role-type" onValueChange={setRoleType}>
                        <SelectTrigger id="role-type" className="w-full h-14 bg-input rounded-[50px] px-6 text-lg">
                            <SelectValue placeholder="Select a role type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="employee">Employee</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                    <Label className={cn("text-lg font-medium", selectedRole ? 'text-grey-1' : 'text-black')}>Roles</Label>
                    <RadioGroup name="roles" className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4" onValueChange={setSelectedRole}>
                        {roles.map(role => (
                            <div key={role} className="flex items-center gap-2">
                                <RadioGroupItem value={role.toLowerCase()} id={`role-${role.toLowerCase()}`} className="w-6 h-6" />
                                <Label htmlFor={`role-${role.toLowerCase()}`} className="text-black text-lg font-medium">
                                    {role}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
            
            <div className="flex justify-end pt-8">
                <Button type="submit" className="px-14 h-12 text-lg rounded-full">
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
  
  const handleClose = () => setIsOpen(false);

  const DialogOrSheet = isMobile ? Dialog : Dialog;
  const DialogOrSheetContent = isMobile ? DialogContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? DialogClose : DialogClose;
  const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

  return (
    <>
    <DialogOrSheet open={isOpen} onOpenChange={setIsOpen}>
      <DialogOrSheetTrigger asChild>
        <Button className="md:h-14 md:px-10 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium h-[54px] w-[54px] md:w-auto p-0 md:p-2.5">
            <UserPlus className="md:mr-2 h-6 w-6"/>
            <span className="hidden md:inline">Add New Employee</span>
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent 
          side={isMobile ? 'bottom' : undefined}
          className={cn(
            "p-0 flex flex-col m-0 h-auto bg-white rounded-t-[50px] w-full",
            !isMobile && "sm:max-w-2xl !bottom-0 !top-auto !translate-y-0 rounded-b-none"
          )}
      >
          <SheetHeader className="p-6 border-b bg-white rounded-t-[50px]">
              <div className="flex items-center justify-between">
                <SheetTitle className="flex items-center text-2xl font-semibold">
                    <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                        <Plus className="h-6 w-6"/>
                    </div>
                    Add New Employee
                </SheetTitle>
                <DialogOrSheetClose asChild>
                  <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                      <X className="h-6 w-6" />
                  </Button>
                </DialogOrSheetClose>
              </div>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto no-scrollbar">
            <AddEmployeeForm onFormSuccess={handleSuccess} onClose={handleClose} />
          </div>
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
