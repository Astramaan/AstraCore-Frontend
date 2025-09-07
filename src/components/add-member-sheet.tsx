
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
import { Plus, X, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { addMember } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className={cn("text-lg font-medium", value ? 'text-grey-1' : 'text-black')}>{label}</Label>
        <Input id={id} className="w-full h-14 bg-input rounded-[50px] px-6 text-lg" value={value} {...props} />
    </div>
);


const AddMemberForm = ({ onFormSuccess, onClose }: { onFormSuccess: () => void, onClose: () => void }) => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [team, setTeam] = useState('');
    const [role, setRole] = useState('');

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
    
    const teams = ["Sales", "Developer", "Design", "Support & Feedback", "HR"];
    const roles = ["Admin", "Member"];

    return (
    <form action={formAction} className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
        <FloatingLabelInput id="member-name" name="name" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <FloatingLabelInput id="member-email" name="email" type="email" label="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="space-y-2">
            <Label htmlFor="team" className={cn("text-lg font-medium", team ? 'text-grey-1' : 'text-black')}>Team</Label>
            <Select name="team" onValueChange={setTeam}>
                <SelectTrigger id="team" className="w-full h-14 bg-input rounded-[50px] px-6 text-lg">
                    <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                     {teams.map(r => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <Label htmlFor="role" className={cn("text-lg font-medium", role ? 'text-grey-1' : 'text-black')}>Role Type</Label>
            <Select name="role" onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full h-14 bg-input rounded-[50px] px-6 text-lg">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                     {roles.map(r => (
                        <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        
        <div className="flex justify-end pt-8">
            <Button type="submit" className="px-14 h-12 text-lg rounded-full">
                Add
            </Button>
        </div>
    </form>
    );
};


export function AddMemberSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    setShowSuccess(true);
  };
  
  const handleClose = () => setIsOpen(false);

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="md:h-14 md:px-6 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium h-[54px] w-[54px] md:w-auto p-0 md:p-2.5">
            <UserPlus className="md:mr-2 h-6 w-6"/>
            <span className="hidden md:inline">Add New Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent 
          className="p-0 flex flex-col m-0 bg-white sm:max-w-md rounded-[50px]"
      >
          <DialogHeader className="p-6 border-b bg-white rounded-t-[50px]">
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center text-2xl font-semibold">
                    <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                        <Plus className="h-6 w-6"/>
                    </div>
                    Add New Member
                </DialogTitle>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                      <X className="h-6 w-6" />
                  </Button>
                </DialogClose>
              </div>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto no-scrollbar">
            <AddMemberForm onFormSuccess={handleSuccess} onClose={handleClose} />
          </div>
      </DialogContent>
    </Dialog>
    <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Invitation Sent"
        message="The new member has been invited and will receive an email to set up their account."
    />
    </>
  );
}
