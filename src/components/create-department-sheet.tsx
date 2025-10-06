

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
import { Plus, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { addMember } from '@/app/actions';
import { FeatureAccessDialog } from './feature-access-dialog';
import { ScrollArea } from './ui/scroll-area';


const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className={cn("text-lg font-medium", value ? "text-grey-1" : "text-black")}>{label}</Label>
        <Input id={id} className="w-full h-14 bg-background rounded-[50px] px-6 text-lg" value={value} {...props} />
    </div>
);


const CreateDepartmentForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();
    const [departmentName, setDepartmentName] = useState('');
    const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<'Admin' | 'Member' | null>(null);

    // Placeholder action, replace with actual create department action
    const [state, formAction] = useActionState(addMember, { success: false, message: '' });

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

    const handleOpenFeatureDialog = (role: 'Admin' | 'Member') => {
        setSelectedRole(role);
        setIsFeatureDialogOpen(true);
    };

    return (
    <>
        <form action={formAction} className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                    <FloatingLabelInput id="department-name" name="department-name" label="Team Name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
                    
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-grey-1">Features access</h3>
                        <div className="space-y-2">
                            <Label className="text-lg font-medium text-black">Admin</Label>
                            <Button type="button" variant="outline" className="w-full h-14 bg-background rounded-[50px] px-6 text-lg justify-between font-normal text-muted-foreground" onClick={() => handleOpenFeatureDialog('Admin')}>
                                <span>Features for admin</span>
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-lg font-medium text-black">Members</Label>
                             <Button type="button" variant="outline" className="w-full h-14 bg-background rounded-[50px] px-6 text-lg justify-between font-normal text-muted-foreground" onClick={() => handleOpenFeatureDialog('Member')}>
                                <span>Features for members</span>
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            
            <div className="p-6 mt-auto border-t">
                <Button type="submit" className="w-full h-14 px-10 py-3.5 bg-primary rounded-[50px] text-lg">
                    Create
                </Button>
            </div>
        </form>
         {selectedRole && (
            <FeatureAccessDialog 
                isOpen={isFeatureDialogOpen}
                onClose={() => setIsFeatureDialogOpen(false)}
                category={selectedRole}
                roleName="New Role"
                isEditingInitially={true}
            />
        )}
    </>
    );
};


export function CreateDepartmentSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    setShowSuccess(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="h-[54px] w-[54px] md:w-auto md:h-14 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium p-0 md:px-6">
            <Plus className="md:mr-2" />
            <span className="hidden md:inline">Create New Team</span>
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="bottom"
          className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-auto md:max-w-md md:mx-auto rounded-t-[50px] border-none"
        >
          <SheetHeader className="p-6 border-b bg-white rounded-t-[50px]">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center text-2xl font-semibold">
                <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                  <Plus className="h-6 w-6"/>
                </div>
                Create New Team
              </SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-muted rounded-full">
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto no-scrollbar">
            <CreateDepartmentForm onFormSuccess={handleSuccess} />
          </div>
        </SheetContent>
      </Sheet>
      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="New Team Created"
        message="The new team has been successfully added."
      />
    </>
  );
}
