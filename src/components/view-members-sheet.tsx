
'use client';

import React from 'react';
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
import { MoreVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

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
}

const membersData: { [key: string]: Member[] } = {
    "Super Admin": [
        { id: "1", name: "Balaji Naik", avatar: "https://placehold.co/56x56", contact: "balaji@astracore.com | +91 1234567890", role: "Admin", status: "Active", lastActive: "2 days ago" },
        { id: "2", name: "Priya Mehra", avatar: "https://placehold.co/56x56", contact: "priya@astracore.com | +91 9876543210", role: "Admin", status: "Active", lastActive: "2 days ago" }
    ],
    "Sales": [
         { id: "3", name: "Rohan Sharma", avatar: "https://placehold.co/56x56", contact: "rohan@astracore.com | +91 1234567891", role: "Sales Executive", status: "Active", lastActive: "1 day ago" },
         { id: "4", name: "Anjali Gupta", avatar: "https://placehold.co/56x56", contact: "anjali@astracore.com | +91 1234567892", role: "Sales Manager", status: "Active", lastActive: "3 hours ago" },
         { id: "5", name: "Vikram Singh", avatar: "https://placehold.co/56x56", contact: "vikram@astracore.com | +91 1234567893", role: "Sales Head", status: "Inactive", lastActive: "1 week ago" }
    ],
    "Software Development": Array.from({ length: 12 }, (_, i) => ({
        id: `dev-${i+1}`,
        name: `Dev ${i+1}`,
        avatar: `https://placehold.co/56x56?text=D${i+1}`,
        contact: `dev${i+1}@astracore.com | +91 888888888${i}`,
        role: "Software Engineer",
        status: "Active",
        lastActive: `${i+1} hours ago`
    })),
     "Design": Array.from({ length: 4 }, (_, i) => ({
        id: `design-${i+1}`,
        name: `Designer ${i+1}`,
        avatar: `https://placehold.co/56x56?text=DS${i+1}`,
        contact: `design${i+1}@astracore.com | +91 777777777${i}`,
        role: "UI/UX Designer",
        status: "Active",
        lastActive: `${i+1} days ago`
    })),
    "Support & Feedback": Array.from({ length: 20 }, (_, i) => ({
        id: `support-${i+1}`,
        name: `Support ${i+1}`,
        avatar: `https://placehold.co/56x56?text=S${i+1}`,
        contact: `support${i+1}@astracore.com | +91 666666666${i}`,
        role: "Support Specialist",
        status: "Active",
        lastActive: `${i+1} mins ago`
    })),
    "Human Resources": [],
};

const MemberCard = ({ member }: { member: Member }) => (
    <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
            <Link href={`/organization/employee-management/${member.id}`} className="flex items-center gap-4 flex-1 cursor-pointer">
                <Avatar className="w-14 h-14">
                    <AvatarImage src={member.avatar} />
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
                <p className="text-lg"><span className="text-grey-1">Last Active: </span><span className="text-black font-medium">{member.lastActive}</span></p>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="w-6 h-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/organization/employee-management/${member.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Deactivate user</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Separator />
    </>
);

const ViewMembersContent = ({ role, onClose }: { role: Role; onClose: () => void }) => {
    const members = membersData[role.name] || [];

    return (
        <div className="bg-white h-full flex flex-col">
            <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex items-center text-xl font-medium">
                     <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                            {role.icon}
                        </div>
                        <h2 className="text-2xl font-semibold">{role.name} - Members</h2>
                    </div>
                    <div className="ml-auto">
                        <Button variant="ghost" onClick={onClose} className="rounded-full h-14 px-10 text-black bg-background hover:bg-muted">Close</Button>
                    </div>
                </SheetTitle>
            </SheetHeader>
            <div className="p-6 overflow-y-auto flex-1">
                 {members.length > 0 ? (
                    members.map((member, index) => <MemberCard key={index} member={member} />)
                ) : (
                    <div className="text-center text-muted-foreground py-10">
                        No members in this role yet.
                    </div>
                )}
            </div>
        </div>
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
                side="bottom" 
                className="w-full md:max-w-4xl lg:max-w-5xl h-full md:h-auto md:max-h-[90vh] md:rounded-t-[50px] p-0 bg-transparent border-none shadow-none mx-auto"
                overlayClassName="bg-neutral-900/10 backdrop-blur-md"
            >
                <div className="h-full w-full bg-white rounded-t-[50px] mt-20 overflow-hidden">
                  <ViewMembersContent role={role} onClose={onClose} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
