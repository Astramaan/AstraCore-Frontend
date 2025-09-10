
'use client';

import React, { useState, useActionState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { Edit, Save, ShieldAlert } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { ChangePasswordDialog } from './change-password-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { updateUser } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const initialMemberData = {
    id: "1",
    name: "Balaji Naik",
    phone: "+91 9380032186",
    email: "balaji@habi.one",
    dob: "09 Sept 2002",
    address: "#3, Ganigarapalya, Thalaghattpura post, Bengaluru - 560109",
    role: "Super Admin",
    lastLogin: "6 hrs ago",
    dateJoined: "22nd June 2025",
    avatar: "https://placehold.co/156x156"
};

interface PersonalDetailsProps {
    memberId: string;
}

const EditProfileForm = ({ member, onSave, onCancel }: { member: typeof initialMemberData, onSave: (data: typeof initialMemberData) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(member);
    const [isRoleChangeConfirmOpen, setIsRoleChangeConfirmOpen] = useState(false);
    const [pendingRole, setPendingRole] = useState<string | null>(null);
    const { toast } = useToast();

    const [state, formAction] = useActionState(updateUser, null);

    useEffect(() => {
        if (state?.success) {
            onSave(formData);
            toast({
                title: 'Success!',
                description: state.message,
            });
        } else if (state?.message) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }, [state, onSave, toast, formData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value: string) => {
        if (value !== formData.role && member.role === 'Super Admin') {
            setPendingRole(value);
            setIsRoleChangeConfirmOpen(true);
        } else {
            setFormData(prev => ({...prev, role: value}));
        }
    }

    const confirmRoleChange = () => {
        if(pendingRole) {
            setFormData(prev => ({ ...prev, role: pendingRole }));
        }
        setPendingRole(null);
        setIsRoleChangeConfirmOpen(false);
    }
    
    const cancelRoleChange = () => {
        setPendingRole(null);
        setIsRoleChangeConfirmOpen(false);
    }
    
    const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
        <div className="space-y-2">
            <Label htmlFor={id} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
            <Input id={id} className="h-14 bg-background rounded-full px-5" value={value} {...props} />
        </div>
    );

    return (
        <form action={formAction} className="flex flex-col h-full">
            <input type="hidden" name="id" value={member.id} />
            <DialogHeader className="p-6 border-b bg-white rounded-t-[50px]">
                <DialogTitle className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">Edit Profile</span>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full" onClick={onCancel}>
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] bg-white no-scrollbar flex-1">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-6">
                        <FloatingLabelInput id="name" name="name" label="Full Name" value={formData.name} onChange={handleInputChange} />
                        <FloatingLabelInput id="email" name="email" label="Email Id" value={formData.email} onChange={handleInputChange} type="email" />
                        <FloatingLabelInput id="dob" name="dob" label="Date of Birth" value={formData.dob} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-6">
                        <FloatingLabelInput id="phone" name="phone" label="Phone Number" value={formData.phone} onChange={handleInputChange} />
                        <div className="space-y-2">
                             <Label className={cn("text-lg font-medium px-2 text-grey-1")}>Role</Label>
                              <Select name="role" value={formData.role} onValueChange={handleRoleChange}>
                                <SelectTrigger className="h-14 bg-background rounded-full px-5">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Member">Member</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <FloatingLabelInput id="address" name="address" label="Address" value={formData.address} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2 bg-white rounded-b-[50px] mt-auto">
                <Button type="submit" className="w-full md:w-auto h-14 px-10 rounded-full text-lg"><Save className="mr-2 h-4 w-4" /> Save</Button>
            </div>
             <AlertDialog open={isRoleChangeConfirmOpen} onOpenChange={setIsRoleChangeConfirmOpen}>
                <AlertDialogContent className="max-w-md rounded-[50px]">
                    <AlertDialogHeader className="items-center text-center">
                        <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                            <div className="w-full h-full bg-yellow-600/5 rounded-full" />
                            <div className="w-14 h-14 bg-yellow-600/20 rounded-full absolute" />
                            <ShieldAlert className="w-8 h-8 text-yellow-600 absolute" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-semibold">Confirm Role Change</AlertDialogTitle>
                        <AlertDialogDescription className="text-lg text-grey-2">
                            Changing the role of a Super Admin can have significant security implications. Are you sure you want to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel onClick={cancelRoleChange} className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmRoleChange} className="w-40 h-14 px-10 bg-primary rounded-[50px] text-lg font-medium text-white hover:bg-primary/90">Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    );
};

export function PersonalDetails({ memberId }: PersonalDetailsProps) {
    const [member, setMember] = useState(initialMemberData);
    const [isEditing, setIsEditing] = useState(false);
    const isMobile = useIsMobile();

    const handleSave = (updatedMember: typeof initialMemberData) => {
        setMember(updatedMember);
        setIsEditing(false);
    };
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setMember(initialMemberData);
        }
        setIsEditing(open);
    }
    
    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;


    return (
        <DialogOrSheet open={isEditing} onOpenChange={handleOpenChange}>
            <Card className="rounded-[50px] py-4 px-4 md:px-8">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                        {/* Mobile Layout */}
                        <div className="flex md:hidden items-center gap-4 w-full">
                            <Image src={member.avatar} alt={member.name} width={100} height={100} className="rounded-full" data-ai-hint="person portrait"/>
                            <div className="flex flex-col gap-2 flex-1">
                                 <DialogOrSheetTrigger asChild>
                                    <Button className="w-full h-12 rounded-full text-primary text-base font-medium bg-primary/10 border border-primary hover:bg-primary/20">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </DialogOrSheetTrigger>
                                <ChangePasswordDialog 
                                    email={member.email} 
                                    trigger={
                                        <Button variant="outline" className="w-full h-12 rounded-full bg-background text-black hover:bg-muted text-base font-medium">
                                            Change Password
                                        </Button>
                                    }
                                />
                            </div>
                        </div>

                         {/* Desktop Layout */}
                        <div className="hidden md:flex shrink-0 flex-col items-center gap-4">
                            <Image src={member.avatar} alt={member.name} width={156} height={156} className="rounded-full" data-ai-hint="person portrait"/>
                        </div>

                        <div className="flex-1 w-full grid grid-cols-2 gap-y-4 gap-x-4 md:gap-x-8">
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Full Name</Label>
                                <p className="text-black text-base md:text-lg leading-tight truncate">{member.name}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Phone Number</Label>
                                <p className="text-black text-base md:text-lg leading-tight truncate">{member.phone}</p>
                            </div>
                             <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Email Id</Label>
                                <p className="text-black text-base md:text-lg leading-tight truncate">{member.email}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Role</Label>
                                <p className="text-primary text-base md:text-lg leading-tight truncate">{member.role}</p>
                            </div>
                             <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Last Login</Label>
                                <p className="text-black text-base md:text-lg leading-tight truncate">{member.lastLogin}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Date Joined</Label>
                                <p className="text-black text-base md:text-lg leading-tight truncate">{member.dateJoined}</p>
                            </div>
                             <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Date of Birth</Label>
                                <p className="text-black text-base md:text-lg leading-tight truncate">{member.dob}</p>
                            </div>
                             <div className="space-y-1 col-span-2 md:col-span-1">
                                <Label className="text-sm md:text-base font-medium px-2 text-grey-1">Address</Label>
                                <p className="text-black text-base md:text-lg leading-tight">{member.address}</p>
                            </div>
                        </div>
                         <div className="hidden md:flex flex-col space-y-4 lg:pl-8">
                            <DialogOrSheetTrigger asChild>
                                <Button className="w-full md:w-56 h-14 px-10 rounded-full text-primary text-lg font-medium bg-primary/10 border border-primary hover:bg-primary/20">
                                    <Edit className="mr-2 h-5 w-5" />
                                    Edit Profile
                                </Button>
                            </DialogOrSheetTrigger>
                            <ChangePasswordDialog email={member.email} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <DialogOrSheetContent className={cn(
                "p-0 flex flex-col m-0 bg-white",
                isMobile 
                  ? "w-full h-full rounded-none border-none"
                  : "sm:max-w-3xl sm:h-auto sm:rounded-[50px]"
            )}>
                <EditProfileForm 
                    member={member}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            </DialogOrSheetContent>
        </DialogOrSheet>
    );
}
