
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Code, Palette, Search, Shield, Users, ChevronLeft } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { ViewMembersSheet, type Role, type Member } from '@/components/view-members-sheet';
import { CreateDepartmentSheet } from '@/components/create-department-sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/user-context';
import { AddMemberSheet } from '@/components/add-member-sheet';

const roleIconsAndColors: { [key: string]: { icon: React.ReactNode, bgColor: string } } = {
    "Super Admin": { icon: <Shield className="w-6 h-6 text-black" />, bgColor: "bg-red-200/30" },
    "Project Manager": { icon: <Briefcase className="w-6 h-6 text-black" />, bgColor: "bg-blue-300/30" },
    "Site Supervisor": { icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-green-300/30" },
    "Architect": { icon: <Palette className="w-6 h-6 text-black" />, bgColor: "bg-purple-300/30" },
    "Sales": { icon: <Briefcase className="w-6 h-6 text-black" />, bgColor: "bg-yellow-400/30" },
    "Software Development": { icon: <Code className="w-6 h-6 text-black" />, bgColor: "bg-blue-300/30" },
    "Design": { icon: <Palette className="w-6 h-6 text-black" />, bgColor: "bg-purple-300/30" },
    "Support & Feedback": { icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-green-300/30" },
    "Human Resources": { icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-pink-300/30" },
    "default": { icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-gray-200/30" }
};

const allRoles: Role[] = [
    { 
        name: "Super Admin", 
        icon: <Shield className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-red-200/30",
        admin: "Balaji Naik", 
        active: 2, 
        total: 2,
        members: [
            { id: '1', name: 'Balaji Naik', avatar: 'https://placehold.co/100x100', contact: 'balaji@habi.one | +91 9380032186', role: 'Super Admin', status: 'Active', lastActive: '6 hrs ago', email: 'balaji@habi.one'},
            { id: '2', name: 'Anil Kumar', avatar: 'https://placehold.co/100x100', contact: 'anil@habi.one | +91 9876543210', role: 'Super Admin', status: 'Active', lastActive: '2 hrs ago', email: 'anil@habi.one' },
        ]
    },
    { 
        name: "Project Manager", 
        icon: <Briefcase className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-blue-300/30",
        admin: "Priya", 
        active: 1, 
        total: 1,
        members: [
             { id: 'priya', name: 'Priya', avatar: 'https://placehold.co/100x100', contact: 'priya@example.com | +91 9876543210', role: 'Project Manager', status: 'Active', lastActive: '1 hr ago', email: 'priya@example.com' },
        ]
    },
    { 
        name: "Site Supervisor", 
        icon: <Users className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-green-300/30",
        admin: "Yaswanth", 
        active: 1, 
        total: 1,
        members: [
            { id: 'yaswanth', name: 'Yaswanth', avatar: 'https://placehold.co/100x100', contact: 'yaswanth@example.com | +91 9876543211', role: 'Site Supervisor', status: 'Active', lastActive: '30 mins ago', email: 'yaswanth@example.com' },
        ]
    },
    { 
        name: "Architect", 
        icon: <Palette className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-purple-300/30",
        admin: "Darshan", 
        active: 1, 
        total: 1,
        members: [
            { id: 'darshan', name: 'Darshan', avatar: 'https://placehold.co/100x100', contact: 'darshan@example.com | +91 9876543212', role: 'Architect', status: 'Active', lastActive: '2 hrs ago', email: 'darshan@example.com' },
        ]
    },
    { 
        name: "Sales", 
        icon: <Briefcase className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-yellow-400/30",
        admin: "Balaji Naik", 
        active: 3, 
        total: 8,
        members: [
            { id: '3', name: 'Sales Person 1', avatar: 'https://placehold.co/100x100', contact: 'sales1@habi.one | +91 1111111111', role: 'Sales', status: 'Active', lastActive: '1 day ago', email: 'sales1@habi.one' },
        ]
    },
    { 
        name: "Software Development", 
        icon: <Code className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-blue-300/30",
        admin: "Balaji Naik", 
        active: 12, 
        total: 12,
        members: []
    },
    { 
        name: "Design", 
        icon: <Palette className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-purple-300/30",
        admin: "Balaji Naik", 
        active: 4, 
        total: 4,
        members: []
    },
    { 
        name: "Support & Feedback", 
        icon: <Users className="w-6 h-6 text-foreground" />,
        bgColor: "bg-green-300/30",
        admin: "Balaji Naik", 
        active: 20, 
        total: 20,
        members: []
    },
    { 
        name: "Human Resources", 
        icon: <Users className="w-6 h-6 text-foreground" />, 
        bgColor: "bg-pink-300/30",
        admin: "Balaji Naik", 
        active: 0, 
        total: 2,
        members: []
    },
];

const RoleCard = ({ role, onViewMembers }: { role: Role; onViewMembers: (role: Role) => void; }) => (
    <>
        {/* Desktop & Tablet View */}
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_auto_1fr_auto_1fr] items-stretch py-4 gap-4">
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${role.bgColor}`}>
                    {role.icon}
                </div>
                <p className="text-xl font-semibold">{role.name}</p>
            </div>
            
            <Separator orientation="vertical" className="self-stretch" />

            <div className="flex flex-col justify-center gap-2">
                <p className="text-lg"><span className="text-muted-foreground">Admin: </span><span className="text-foreground font-medium">{role.admin}</span></p>
                <p className="text-lg"><span className="text-muted-foreground">Active Members: </span><span className="text-foreground font-medium">{String(role.active).padStart(2, '0')}</span></p>
            </div>
            
            <Separator orientation="vertical" className="self-stretch" />

            <div className="flex items-center justify-between gap-4">
                 <p className="text-lg"><span className="text-muted-foreground">Total Members: </span><span className="text-foreground font-medium">{String(role.total).padStart(2, '0')}</span></p>
                <Button className="h-14 px-10 rounded-full bg-background dark:bg-card text-foreground hover:bg-muted text-lg font-medium" onClick={() => onViewMembers(role)}>View Members</Button>
            </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col py-4 gap-4">
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${role.bgColor}`}>
                    {role.icon}
                </div>
                <p className="text-2xl font-semibold">{role.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <p className="text-base text-muted-foreground">Admin: <span className="text-foreground font-medium block">{role.admin}</span></p>
                </div>
                 <div className="text-right">
                    <p className="text-base text-muted-foreground">Active Members: <span className="text-foreground font-medium block">{String(role.active).padStart(2, '0')}</span></p>
                </div>
                 <div>
                    <p className="text-base text-muted-foreground">Total Members: <span className="text-foreground font-medium block">{String(role.total).padStart(2, '0')}</span></p>
                </div>
                <Button className="h-12 px-6 col-span-2 rounded-full bg-background text-foreground hover:bg-muted text-base font-medium self-end" onClick={() => onViewMembers(role)}>View Members</Button>
            </div>
        </div>
        <Separator className="last:hidden"/>
    </>
);

const RoleCardSkeleton = () => (
    <>
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_auto_1fr_auto_1fr] items-center py-4 gap-4">
            <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="h-8 w-40" />
            </div>
            <Separator orientation="vertical" className="h-14" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-36" />
            </div>
            <Separator orientation="vertical" className="h-14" />
            <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-14 w-40 rounded-full" />
            </div>
        </div>
        <div className="lg:hidden flex flex-col py-4 gap-4">
            <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="h-8 w-40" />
            </div>
             <div className="grid grid-cols-2 gap-4 mt-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full rounded-full" />
            </div>
        </div>
        <Separator className="last:hidden"/>
    </>
);


export default function TeamsPageContent() {
    const params = useParams();
    const organizationId = params.organizationId as string;
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        // Simulate fetching data
        setTimeout(() => {
            let rolesToShow = allRoles;
            if (user?.roleType !== 'superAdmin') {
                // If not super admin, filter roles based on team.
                rolesToShow = allRoles.filter(role => role.name !== "Super Admin");

                if (user?.team === 'Project Manager') {
                    rolesToShow = rolesToShow.filter(role => 
                        ["Software Development", "Design", "Support & Feedback", "Site Supervisor", "Architect"].includes(role.name)
                    );
                }
                 // Add other team-based filtering here if needed
            }
            setRoles(rolesToShow);
            setIsLoading(false);
        }, 100);
    }, [user]);

    const filteredRoles = useMemo(() => {
        if (!searchTerm) return roles;
        return roles.filter(role =>
            role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.admin.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, roles]);

    const handleViewMembers = (role: Role) => {
        setSelectedRole(role);
    };

    const handleCloseSheet = () => {
        setSelectedRole(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="hidden md:block text-2xl font-medium text-foreground">Team List</h2>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search Members" 
                            className="pl-12 h-14 rounded-full bg-card text-lg" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     {user?.roleType === 'superAdmin' ? <CreateDepartmentSheet /> : <AddMemberSheet />}
                     <Button variant="outline" onClick={() => router.back()} className="rounded-full h-[54px] px-6 text-lg bg-card hover:bg-muted hidden md:flex">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>
            </div>

            <Card className="rounded-[50px] overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex flex-col">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => <RoleCardSkeleton key={i} />)
                        ) : (
                            filteredRoles.length > 0 ? (
                                filteredRoles.map((role) => (
                                    <RoleCard key={role.name} role={role} onViewMembers={handleViewMembers}/>
                                ))
                            ) : (
                                <div className="text-center py-10 text-muted-foreground">
                                    <p>No teams found.</p>
                                    {user?.roleType === 'superAdmin' && <p>Click "Create New Team" to add one.</p>}
                                </div>
                            )
                        )}
                    </div>
                </CardContent>
            </Card>

            <ViewMembersSheet 
                isOpen={!!selectedRole}
                onClose={handleCloseSheet}
                role={selectedRole}
            />
        </div>
    );
}
