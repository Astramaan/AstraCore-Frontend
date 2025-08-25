
'use client';

import React, { useState } from 'react';
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
import { PlusCircle, X, Plus, User, Mail, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const AddEmployeeForm = () => {
    const [role, setRole] = useState('sales');

    return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 gap-y-6">
        
            <div className="space-y-2">
                <Label htmlFor="employee-name" className="text-zinc-900 font-medium">Name*</Label>
                <div className="relative flex items-center">
                    <User className="absolute left-4 h-5 w-5 text-gray-400" />
                    <Input id="employee-name" placeholder="Enter name" className="pl-12 bg-background rounded-lg h-12" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="employee-email" className="text-zinc-900 font-medium">Email*</Label>
                 <div className="relative flex items-center">
                    <Mail className="absolute left-4 h-5 w-5 text-gray-400" />
                    <Input id="employee-email" type="email" placeholder="Enter email" className="pl-12 bg-background rounded-lg h-12" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="employee-phone" className="text-zinc-900 font-medium">Phone Number*</Label>
                 <div className="relative flex items-center">
                    <Phone className="absolute left-4 h-5 w-5 text-gray-400" />
                    <Input id="employee-phone" type="tel" placeholder="Enter phone number" className="pl-12 bg-background rounded-lg h-12" />
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-zinc-900 font-medium">Role</Label>
                <RadioGroup value={role} onValueChange={setRole} className="gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {['Sales', 'Support', 'Architect', 'Site Engineer'].map(value => (
                            <div key={value} className="flex items-center space-x-2 bg-background p-3 rounded-lg">
                                <RadioGroupItem value={value.toLowerCase().replace(' ', '')} id={`role-${value.toLowerCase()}`} />
                                <Label htmlFor={`role-${value.toLowerCase()}`} className="font-normal text-sm">{value}</Label>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2 bg-background p-3 rounded-lg">
                        <RadioGroupItem value="custom" id="role-custom" />
                        <Label htmlFor="role-custom" className="font-normal text-sm flex-1">Custom Role</Label>
                         {role === 'custom' && (
                            <Input placeholder="Enter custom role" className="h-8 bg-white" />
                        )}
                    </div>
                </RadioGroup>
            </div>
        
        </div>
        
        <div className="flex justify-end pt-8">
            <Button className="px-14 h-12 text-lg rounded-full">
                Add Employee
            </Button>
        </div>
    </div>
    );
};


export function AddEmployeeSheet() {
  const isMobile = useIsMobile();

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
  const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;

  return (
    <DialogOrSheet>
      <DialogOrSheetTrigger asChild>
        <Button variant="outline" className="flex-1 md:flex-none rounded-full h-[54px] text-primary hover:bg-primary/10 hover:text-primary border border-primary">
            <Plus className="w-4 h-4 mr-2"/>
            Add Employee
        </Button>
      </DialogOrSheetTrigger>
      <DialogOrSheetContent 
          className={cn(
            isMobile 
              ? "w-full p-0 rounded-t-[50px]" 
              : "sm:max-w-2xl p-0 rounded-[50px]"
          )}
          {...(isMobile && { side: "bottom" })}
      >
          <DialogOrSheetHeader className="p-6 border-b">
              <DialogOrSheetTitle className="flex items-center text-xl font-medium">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Plus className="h-5 w-5 text-gray-600"/>
                  </div>
                  Add New Employee
                  <div className="flex items-center gap-4 ml-auto">
                      <DialogOrSheetClose asChild>
                          <Button variant="ghost" className="rounded-full text-sm font-normal h-auto px-4 py-2 bg-gray-100 hover:bg-gray-200">
                              <X className="h-4 w-4 mr-1"/>
                              Close
                          </Button>
                      </DialogOrSheetClose>
                  </div>
              </DialogOrSheetTitle>
          </DialogOrSheetHeader>
          <AddEmployeeForm />
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}
