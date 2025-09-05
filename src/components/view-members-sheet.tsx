
'use client';

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, ShieldAlert, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChangePasswordDialog } from './change-password-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';


export interface Role {
    name: string;
    icon: React.ReactNode;
    bgColor: string;
    admin: string;
    active: number;
    total: number;
}

interface Member {
    id: string;
    name: string;
    avatar: string;
    contact: string;
    role: string;
    status: 'Active' | 'Inactive';
    lastActive: string;
    email: string;
}

const membersData: { [key: string]: Member[] } = {
    "Super Admin": [
        { id: "1", name: "Balaji Naik", email: "balaji@habi.one", avatar: "https://placehold.co/56x56", contact: "balaji@astracore.com | +91 1234567890", role: "Admin", status: "Active", lastActive: "2 days ago" },
        { id: "2", name: "Priya Mehra", email: "priya.m@example.com", avatar: "https://placehold.co/56x56", contact: "priya@astracore.com | +91 9876543210", role: "Admin", status: "Active", lastActive: "2 days ago" }
    ],
    "Sales": [
         { id: "3", name: "Rohan Sharma", email: "rohan.s@example.com", avatar: "https://placehold.co/56x56", contact: "rohan@astracore.com | +91 1234567891", role: "Sales Executive", status: "Active", lastActive: "1 day ago" },
         { id: "4", name: "Anjali Gupta", email: "anjali.g@example.com", avatar: "https://placehold.co/56x56", contact: "anjali@astracore.com | +91 1234567892", role: "Sales Manager", status: "Active", lastActive: "3 hours ago" },
         { id: "5", name: "Vikram Singh", email: "vikram.s@example.com", avatar: "https://placehold.co/56x56", contact: "vikram@astracore.com | +91 1234567893", role: "Sales Head", status: "Inactive", lastActive: "1 week ago" }
    ],
    "Software Development": Array.from({ length: 12 }, (_, i) => ({
        id: `dev-${i+1}`,
        name: `Dev ${i+1}`,
        email: `dev${i+1}@example.com`,
        avatar: `https://placehold.co/56x56?text=D${i+1}`,
        contact: `dev${i+1}@astracore.com | +91 888888888${i}`,
        role: "Software Engineer",
        status: "Active",
        lastActive: `${i+1} hours ago`
    })),
     "Design": Array.from({ length: 4 }, (_, i) => ({
        id: `design-${i+1}`,
        name: `Designer ${i+1}`,
        email: `designer${i+1}@example.com`,
        avatar: `https://placehold.co/56x56?text=DS${i+1}`,
        contact: `design${i+1}@astracore.com | +91 777777777${i}`,
        role: "UI/UX Designer",
        status: "Active",
        lastActive: `${i+1} days ago`
    })),
    "Support & Feedback": Array.from({ length: 20 }, (_, i) => ({
        id: `support-${i+1}`,
        name: `Support ${i+1}`,
        email: `support${i+1}@example.com`,
        avatar: `https://placehold.co/56x56?text=S${i+1}`,
        contact: `support${i+1}@astracore.com | +91 666666666${i}`,
        role: "Support Specialist",
        status: "Active",
        lastActive: `${i+1} mins ago`
    })),
    "Human Resources": [],
};

const MemberCard = ({ member, onDeactivate }: { member: Member; onDeactivate: (member: Member) => void; }) => {
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
                <Link href={`/organization/employee-management/${member.id}`} className="flex items-center gap-4 flex-1 cursor-pointer">
                    <Avatar className="w-14 h-14">
                        <AvatarImage src={member.avatar} data-ai-hint="person portrait" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-medium w-44">{member.name}</p>
                </Link>
                
                <div className="w-px h-14 bg-stone-200 hidden md:block" />

                <div className="flex flex-col gap-2 flex-1">
                    <p className="text-lg"><span className="text-grey-1">Contact: </span><span className="text-black font-medium">{member.contact}</span></p>
                    <p className="text-lg"><span className="text-grey-1">Role: </span><span className="text-primary font-medium">{member.role}</span></p>
                </div>
                
                <div className="w-px h-14 bg-stone-200 hidden md:block" />

                <div className="flex flex-col items-end gap-2 flex-1 text-right">
                    <p className="text-lg"><span className="text-grey-1">Status: </span><span className={member.status === 'Active' ? "text-green-600" : "text-red-600"}>{member.status}</span></p>
                    <p className="text-lg"><span className="text-grey-1">Last Active: </span>
                        <span className={cn("font-medium", member.status === 'Inactive' ? 'text-red-600' : 'text-black')}>
                            {member.status === 'Inactive' ? 'Deactivated' : member.lastActive}
                        </span>
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                         <DropdownMenuItem onSelect={() => setIsPasswordDialogOpen(true)}>
                            Change Password
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onDeactivate(member); }}>Deactivate user</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ChangePasswordDialog 
                email={member.email} 
                startWithReset={true}
                trigger={<></>}
            />
            <ChangePasswordDialog
                isOpen={isPasswordDialogOpen}
                onOpenChange={setIsPasswordDialogOpen}
                email={member.email}
                startWithReset={true}
            />
            <Separator />
        </>
    );
};

const ViewMembersContent = ({ role, onClose }: { role: Role; onClose: () => void }) => {
    const [members, setMembers] = useState<Member[]>(membersData[role.name] || []);
    const [memberToDeactivate, setMemberToDeactivate] = useState<Member | null>(null);

    useEffect(() => {
        setMembers(membersData[role.name] || []);
    }, [role.name]);

    const handleDeactivateClick = (member: Member) => {
        setMemberToDeactivate(member);
    };

    const confirmDeactivation = () => {
        if (memberToDeactivate) {
            setMembers(prevMembers =>
                prevMembers.map(m =>
                    m.id === memberToDeactivate.id ? { ...m, status: 'Inactive' } : m
                )
            );
            setMemberToDeactivate(null);
        }
    };

    return (
        <AlertDialog>
            <div className="bg-white h-full flex flex-col rounded-t-[50px] overflow-hidden">
                <SheetHeader className="p-6 border-b shrink-0">
                    <SheetTitle className="flex items-center text-xl font-medium">
                         <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                                {role.icon}
                            </div>
                            <h2 className="text-2xl font-semibold">{role.name}</h2>
                        </div>
                        <div className="ml-auto">
                            <SheetClose asChild>
                                <Button variant="ghost" onClick={onClose} className="rounded-full h-14 w-14 p-0 text-black bg-background hover:bg-muted">
                                    <X className="h-6 w-6" />
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <div className="p-6 overflow-y-auto flex-1">
                     {members.length > 0 ? (
                        members.map((member) => <MemberCard key={member.id} member={member} onDeactivate={handleDeactivateClick} />)
                    ) : (
                        <div className="text-center text-muted-foreground py-10">
                            No members in this role yet.
                        </div>
                    )}
                </div>
            </div>
            {memberToDeactivate && (
                 <AlertDialogContent className="max-w-md rounded-[50px]">
                    <AlertDialogHeader className="items-center text-center">
                         <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                          <div className="w-full h-full bg-red-600/5 rounded-full" />
                          <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                          <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-semibold">Deactivate User?</AlertDialogTitle>
                        <AlertDialogDescription className="text-lg text-grey-2">
                            Are you sure you want to deactivate {memberToDeactivate.name}? They will lose access to the platform.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel onClick={() => setMemberToDeactivate(null)} className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeactivation} className="w-40 h-14 px-10 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Deactivate</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            )}
        </AlertDialog>
    );
};

interface ViewMembersSheetProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
}

export function ViewMembersSheet({ isOpen, onClose, role }: ViewMembersSheetProps) {
    const isMobile = useIsMobile();

    if (!role) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent 
                side={"bottom"}
                className={cn(
                    "p-0 bg-transparent border-none shadow-none w-full md:max-w-5xl md:mx-auto h-[90vh] md:h-[90vh] md:bottom-0 rounded-t-[50px]",
                )}
                overlayClassName="bg-neutral-900/10 backdrop-blur-sm"
            >
              <ViewMembersContent role={role} onClose={onClose} />
            </SheetContent>
        </Sheet>
    );
}
