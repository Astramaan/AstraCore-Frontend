

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { Edit, Save, ShieldAlert, Palette } from 'lucide-react';
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
import { useToast } from './ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from './ui/scroll-area';
import { useUser } from '@/context/user-context';
import { BrandingSheet } from './branding-sheet';


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
    avatar: "https://picsum.photos/seed/balaji/156/156"
};

interface PersonalDetailsProps {
    memberId: string;
}

const EditProfileForm = React.memo(({ member, onSave, onCancel }: { member: any, onSave: (data: any) => void, onCancel: () => void }) => {
    const { user, setUser } = useUser();
    const [formData, setFormData] = useState(member);
    const [isRoleChangeConfirmOpen, setIsRoleChangeConfirmOpen] = useState(false);
    const [pendingRole, setPendingRole] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value: string) => {
        if (value !== formData.role && member.role === 'Super Admin') {
            setPendingRole(value);
            setIsRoleChangeConfirmOpen(true);
        } else {
            setFormData(prev => ({...prev, team: value}));
        }
    }

    const confirmRoleChange = () => {
        if(pendingRole) {
            setFormData(prev => ({ ...prev, team: pendingRole }));
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
            <Label htmlFor={id} className={cn("text-lg font-medium", value ? 'text-grey-1' : 'text-foreground')}>{label}</Label>
            <Input id={id} className="h-14 bg-background rounded-full px-5" value={value} {...props} />
        </div>
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/update-profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success) {
                const updatedUser = { ...user, ...formData };
                setUser(updatedUser as any);
                onSave(formData);
                toast({
                    title: 'Success!',
                    description: data.message,
                });
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: data.message,
                });
            }
        } catch(e) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <input type="hidden" name="id" value={member.id} />
            <SheetHeader className="p-6 border-b bg-card rounded-t-[50px] shrink-0">
                <SheetTitle className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">Edit Profile</span>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full" onClick={onCancel}>
                            <X className="h-5 w-5" />
                        </Button>
                    </SheetClose>
                </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1">
                <div className="p-6 space-y-4 bg-card">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-6">
                            <FloatingLabelInput id="name" name="name" label="Full Name" value={formData.name} onChange={handleInputChange} />
                            <FloatingLabelInput id="email" name="email" label="Email Id" value={formData.email} onChange={handleInputChange} type="email" />
                            <FloatingLabelInput id="dob" name="dob" label="Date of Birth" value={formData.dob} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-6">
                            <FloatingLabelInput id="phone" name="mobileNumber" label="Phone Number" value={formData.mobileNumber} onChange={handleInputChange} />
                            <div className="space-y-2">
                                <Label className={cn("text-lg font-medium", 'text-grey-1')}>Team</Label>
                                <Select name="team" value={formData.team} onValueChange={handleRoleChange}>
                                    <SelectTrigger className="h-14 bg-background rounded-full px-5">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                                        <SelectItem value="ORG_ADMIN">Admin</SelectItem>
                                        <SelectItem value="MEMBER">Member</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <FloatingLabelInput id="address" name="address" label="Address" value={formData.address} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="px-6 py-4 border-t flex justify-end gap-2 bg-card rounded-b-[50px] mt-auto shrink-0">
                <Button type="submit" className="w-full md:w-auto h-14 px-10 rounded-full text-lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save</>}
                </Button>
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
});

EditProfileForm.displayName = 'EditProfileForm';

export function PersonalDetails({ memberId }: PersonalDetailsProps) {
    const { user, loading } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isBrandingSheetOpen, setIsBrandingSheetOpen] = useState(false);
    
    const member = user;

    const isOwner = user?.userId === memberId;
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    const handleSave = (updatedMember: any) => {
        setIsEditing(false);
    };
    
    const handleOpenChange = (open: boolean) => {
        setIsEditing(open);
    }
    
    const DialogOrSheet = Sheet;
    const DialogOrSheetContent = SheetContent;
    const DialogOrSheetTrigger = SheetTrigger;

    if (loading) {
        return <Card className="rounded-[50px] p-10"><CardContent className="p-0">Loading...</CardContent></Card>
    }

    if (!member) {
        return <Card className="rounded-[50px] p-10"><CardContent className="p-0">Could not load user details.</CardContent></Card>
    }

    return (
        <DialogOrSheet open={isEditing} onOpenChange={handleOpenChange}>
            <Card className="rounded-[50px] p-10 bg-card">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-col lg:flex-row md:items-start gap-4 md:gap-8">
                        {/* Mobile and Tablet Layout */}
                        <div className="flex lg:hidden items-center md:justify-between gap-4 w-full">
                            <Image src={initialMemberData.avatar} alt={member.name} width={100} height={100} className="rounded-full" data-ai-hint="person portrait"/>
                            {isOwner && (
                                <div className="flex flex-col gap-2 md:items-end">
                                    <DialogOrSheetTrigger asChild>
                                        <Button className="md:w-56 h-12 rounded-full text-primary text-base font-medium bg-primary/10 border border-primary hover:bg-primary/20">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Profile
                                        </Button>
                                    </DialogOrSheetTrigger>
                                    <ChangePasswordDialog 
                                        email={member.email} 
                                        trigger={
                                            <Button variant="outline" className="md:w-56 h-12 rounded-full bg-card text-foreground hover:bg-muted text-base font-medium">
                                                Change Password
                                            </Button>
                                        }
                                    />
                                     {isSuperAdmin && (
                                        <Button className="md:w-56 h-12 rounded-full text-primary text-base font-medium bg-primary/10 border border-primary hover:bg-primary/20" onClick={() => setIsBrandingSheetOpen(true)}>
                                            <Palette className="mr-2 h-4 w-4"/>
                                            Branding
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                         {/* Desktop Layout */}
                        <div className="hidden lg:flex shrink-0 flex-col items-center gap-4">
                            <Image src={initialMemberData.avatar} alt={member.name} width={156} height={156} className="rounded-full" data-ai-hint="person portrait"/>
                        </div>

                        <div className="flex-1 w-full grid grid-cols-2 gap-y-4 gap-x-4 md:gap-x-8">
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Full Name</Label>
                                <p className="text-foreground text-base md:text-lg leading-tight truncate">{member.name}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Phone Number</Label>
                                <p className="text-foreground text-base md:text-lg leading-tight truncate">{member.mobileNumber}</p>
                            </div>
                             <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Email Id</Label>
                                <p className="text-foreground text-base md:text-lg leading-tight truncate">{member.email}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Team</Label>
                                <p className="text-primary text-base md:text-lg leading-tight truncate">{member.team}</p>
                            </div>
                             <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Last Login</Label>
                                <p className="text-foreground text-base md:text-lg leading-tight truncate">{initialMemberData.lastLogin}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Date Joined</Label>
                                <p className="text-foreground text-base md:text-lg leading-tight truncate">{initialMemberData.dateJoined}</p>
                            </div>
                             <div className="space-y-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Date of Birth</Label>
                                <p className="text-foreground text-base md:text-lg leading-tight truncate">{initialMemberData.dob}</p>
                            </div>
                             <div className="space-y-1 col-span-2 md:col-span-1">
                                <Label className="text-sm md:text-base font-medium text-grey-1">Address</Label>
                                <p className="text-foreground text-base md:text-lg leading-tight">{initialMemberData.address}</p>
                            </div>
                        </div>
                         {isOwner && (
                            <div className="hidden lg:flex flex-col space-y-4 lg:pl-8">
                                <DialogOrSheetTrigger asChild>
                                    <Button className="w-full md:w-56 h-14 px-10 rounded-full text-primary text-lg font-medium bg-primary/10 border border-primary hover:bg-primary/20">
                                        <Edit className="mr-2 h-5 w-5" />
                                        Edit Profile
                                    </Button>
                                </DialogOrSheetTrigger>
                                <ChangePasswordDialog email={member.email} />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <DialogOrSheetContent
                side="bottom"
                className={cn(
                    "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-3xl md:mx-auto rounded-t-[50px] border-none"
                )}
            >
                <EditProfileForm 
                    member={member}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            </DialogOrSheetContent>
            <BrandingSheet isOpen={isBrandingSheetOpen} onOpenChange={setIsBrandingSheetOpen} />
        </DialogOrSheet>
    );
}
