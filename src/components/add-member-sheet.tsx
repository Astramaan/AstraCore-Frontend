

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
import { cn } from "@/lib/utils";
import { addMember } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from './ui/sheet';
import UserPlusIcon from './icons/user-plus-icon';
import { SuccessPopup } from './success-popup';
import { useUser } from '@/context/user-context';


const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className={cn("text-lg font-medium", value ? 'text-grey-1' : 'text-black')}>{label}</Label>
        <Input id={id} className="w-full h-14 bg-input rounded-[50px] px-6 text-lg" value={value} {...props} />
    </div>
);


const AddMemberForm = ({ onFormSuccess, onClose }: { onFormSuccess: () => void, onClose: () => void }) => {
    const { toast } = useToast();
    const { user } = useUser();
    
    const isTeamAdmin = user?.team === 'Architect' || user?.team === 'Sales' || user?.team === 'Site Supervisor';
    const teamValue = user?.team?.toLowerCase().replace(' ', '');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [team, setTeam] = useState(() => (isTeamAdmin ? teamValue : ''));
    const [role, setRole] = useState(() => (isTeamAdmin ? 'member' : ''));

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
    <form action={formAction} className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-6 no-scrollbar">
            <div className="space-y-6">
                <FloatingLabelInput id="member-name" name="name" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <FloatingLabelInput id="member-email" name="email" type="email" label="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FloatingLabelInput id="member-phone" name="phone" type="tel" label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />

                {isTeamAdmin ? (
                    <>
                        <input type="hidden" name="team" value={teamValue} />
                        <input type="hidden" name="role" value="member" />
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="team" className={cn("text-lg font-medium", team ? 'text-grey-1' : 'text-black')}>Team</Label>
                            <Select name="team" onValueChange={setTeam} value={team}>
                                <SelectTrigger id="team" className="w-full h-14 bg-input rounded-[50px] px-6 text-lg">
                                    <SelectValue placeholder="Select a team" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teams.map(r => (
                                        <SelectItem key={r} value={r.toLowerCase().replace('&', 'and')}>{r}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className={cn("text-lg font-medium", role ? 'text-grey-1' : 'text-black')}>Role Type</Label>
                            <Select name="role" onValueChange={setRole} value={role}>
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
                    </>
                )}
            </div>
        </ScrollArea>
        
        <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
            <Button type="submit" className="w-full h-[54px] text-lg rounded-full md:w-auto md:px-14">
                Add
            </Button>
        </div>
    </form>
    );
};


interface AddMemberSheetProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export function AddMemberSheet({ isOpen: controlledIsOpen, onOpenChange: controlledOnOpenChange }: AddMemberSheetProps) {
  const { user } = useUser();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const onOpenChange = controlledOnOpenChange || setInternalIsOpen;

  const handleSuccess = () => {
    onOpenChange(false);
    setShowSuccess(true);
  };
  
  const handleClose = () => onOpenChange(false);

  return (
    <>
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {!controlledIsOpen && (
        <SheetTrigger asChild>
            <Button className="md:h-14 md:px-12 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 md:text-lg font-medium h-[54px] w-[54px] md:w-auto p-4 md:p-2.5">
                <UserPlusIcon className="md:mr-2 h-6 w-6"/>
                <span className="hidden md:inline">Add New Member</span>
            </Button>
        </SheetTrigger>
      )}
      <SheetContent 
          side="bottom"
          className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-md md:mx-auto rounded-t-[50px] border-none"
      >
          <SheetHeader className="p-6 border-b bg-white rounded-t-[50px]">
              <div className="flex items-center justify-between">
                <SheetTitle className="flex items-center text-2xl font-semibold">
                    <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-grey-1 mr-2">
                        <Plus className="h-6 w-6"/>
                    </div>
                    Add New Member
                </SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                      <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </div>
          </SheetHeader>
          <div className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
            <AddMemberForm onFormSuccess={handleSuccess} onClose={handleClose} />
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
