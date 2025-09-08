

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
import { deactivateUser } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { ScrollArea } from './ui/scroll-area';


export interface Member {
    id: string;
    name: string;
    avatar: string;
    contact: string;
    role: string;
    status: 'Active' | 'Inactive';
    lastActive: string;
    email: string;
}

export interface Role {
    name: string;
    icon: React.ReactNode;
    bgColor: string;
    admin: string;
    active: number;
    total: number;
    members: Member[];
}

const MemberCard = ({ member, onDeactivate }: { member: Member; onDeactivate: (member: Member) => void; }) => {
    
    return (
        <>
            <div className="flex justify-between items-start py-4 gap-4">
                <div className="flex items-center gap-4 flex-1">
                     <Link href={`/organization/teams/${member.id}`} className="flex items-center gap-4 cursor-pointer">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} data-ai-hint="person portrait" />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                     </Link>
                    <div className="flex-1">
                        <Link href={`/organization/teams/${member.id}`} className="cursor-pointer">
                           <p className="text-lg font-medium">{member.name}</p>
                        </Link>
                        <div className="md:hidden mt-2 space-y-1 text-sm">
                            <p><span className="text-grey-1">Contact: </span><span className="text-black font-medium">{member.contact}</span></p>
                            <p><span className="text-grey-1">Role: </span><span className="text-primary font-medium">{member.role}</span></p>
                            <p><span className="text-grey-1">Status: </span><span className={cn("font-medium", member.status === 'Active' ? "text-green-600" : "text-red-600")}>{member.status}</span></p>
                            <p><span className="text-grey-1">Last Active: </span>
                                <span className={cn("font-medium", member.status === 'Inactive' ? 'text-red-600' : 'text-black')}>
                                    {member.status === 'Inactive' ? 'Deactivated' : member.lastActive}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-col gap-2 flex-1">
                    <p className="text-lg"><span className="text-grey-1">Contact: </span><span className="text-black font-medium">{member.contact}</span></p>
                    <p className="text-lg"><span className="text-grey-1">Role: </span><span className="text-primary font-medium">{member.role}</span></p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-2 flex-1 text-right">
                    <p className="text-lg"><span className="text-grey-1">Status: </span><span className={cn("font-medium", member.status === 'Active' ? "text-green-600" : "text-red-600")}>{member.status}</span></p>
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
                         <DropdownMenuItem asChild><Link href={`/organization/teams/${member.id}`}>View Details</Link></DropdownMenuItem>
                        <ChangePasswordDialog
                             email={member.email}
                             trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Change Password</DropdownMenuItem>}
                        />
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onDeactivate(member); }}>Deactivate user</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Separator className="last:hidden"/>
        </>
    );
};

const ViewMembersContent = ({ role, onClose }: { role: Role; onClose: () => void }) => {
    const [members, setMembers] = useState<Member[]>(role.members || []);
    const [memberToDeactivate, setMemberToDeactivate] = useState<Member | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        setMembers(role.members || []);
    }, [role.members]);

    const handleDeactivateClick = (member: Member) => {
        setMemberToDeactivate(member);
    };

    const handleStatusChange = (memberId: string, status: 'Active' | 'Inactive') => {
        setMembers(prevMembers =>
            prevMembers.map(m =>
                m.id === memberId ? { ...m, status } : m
            )
        );
    };

    const confirmDeactivation = async () => {
        if (memberToDeactivate) {
            const result = await deactivateUser(memberToDeactivate.id);
             if (result.success) {
                handleStatusChange(memberToDeactivate.id, 'Inactive');
                toast({
                    title: 'Success',
                    description: result.message,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: result.message,
                });
            }
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
                            <h2 className="text-2xl font-semibold">{role.name} - Members</h2>
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
                <ScrollArea className="flex-1">
                    <div className="p-6">
                        {members.length > 0 ? (
                            members.map((member) => <MemberCard key={member.id} member={member} onDeactivate={handleDeactivateClick} />)
                        ) : (
                            <div className="text-center text-muted-foreground py-10">
                                No members in this role yet.
                            </div>
                        )}
                    </div>
                </ScrollArea>
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

    if (isMobile) {
        return (
             <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent 
                    side={"right"}
                    className="p-0 bg-white border-none shadow-none w-full h-full"
                    overlayClassName="bg-transparent"
                >
                    <ViewMembersContent role={role} onClose={onClose} />
                </SheetContent>
            </Sheet>
        )
    }

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
