

'use client';

import React, { useState, useActionState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { addEmployee } from '@/app/actions';


const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className={cn("text-lg font-medium", value ? "text-grey-1" : "text-black")}>{label}</Label>
        <Input id={id} className="w-full h-14 bg-background rounded-[50px] px-6 text-lg" value={value} {...props} />
    </div>
);


const CreateDepartmentForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();
    const [departmentName, setDepartmentName] = useState('');
    const [admin, setAdmin] = useState('');

    // Placeholder action, replace with actual create department action
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

    return (
    <form action={formAction}>
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="grid grid-cols-1 gap-y-6">
                <FloatingLabelInput id="department-name" name="department-name" label="Team Name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />

                <div className="space-y-2">
                    <Label htmlFor="admin" className={cn("text-lg font-medium", admin ? "text-grey-1" : "text-black")}>Assign Admin</Label>
                    <Select name="admin" onValueChange={setAdmin}>
                        <SelectTrigger id="admin" className="w-full h-14 bg-background rounded-[50px] px-6 text-lg">
                            <SelectValue placeholder="Select an admin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="balaji">Balaji Naik</SelectItem>
                            <SelectItem value="anil">Anil Kumar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="flex justify-center pt-8">
                <Button type="submit" className="w-full md:w-96 h-14 px-10 py-3.5 bg-primary rounded-[50px] text-lg">
                    Create
                </Button>
            </div>
        </div>
    </form>
    );
};


export function CreateDepartmentSheet() {
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
        <Button className="h-14 px-10 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 text-lg font-medium">
            <Plus className="mr-2"/>
            Create New Team
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent 
          className={cn(
            "p-0 rounded-[50px] w-full md:w-[452px]",
             isMobile && "m-4"
          )}
      >
          <DialogOrSheetHeader className="p-6 border-b">
              <div className="flex items-center justify-between">
                <DialogOrSheetTitle className="flex items-center text-2xl font-semibold">
                    <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                        <Plus className="h-6 w-6"/>
                    </div>
                    Create New Team
                </DialogOrSheetTitle>
                <DialogOrSheetClose asChild>
                    <Button variant="ghost" size="icon" className="p-3.5 bg-background rounded-full">
                        <X className="h-6 w-6" />
                    </Button>
                </DialogOrSheetClose>
              </div>
          </DialogOrSheetHeader>
          <CreateDepartmentForm onFormSuccess={handleSuccess} />
      </DialogOrSheetContent>
    </DialogOrSheet>
    <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="New Team Created"
        message="The new team has been successfully added."
    />
    </>
  );
}
