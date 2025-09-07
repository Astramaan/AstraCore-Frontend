
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Code, Palette, Search, Shield, Users } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { ViewMembersSheet, type Role, type Member } from '@/components/view-members-sheet';
import { CreateDepartmentSheet } from '@/components/create-department-sheet';
import { getDepartments } from '@/lib/data';
import { AddMemberSheet } from '@/components/add-member-sheet';

const roleIcons: { [key: string]: React.ReactNode } = {
    "Super Admin": <Shield className="w-6 h-6 text-black" />,
    "Sales": <Briefcase className="w-6 h-6 text-black" />,
    "Software Development": <Code className="w-6 h-6 text-black" />,
    "Design": <Palette className="w-6 h-6 text-black" />,
    "Support & Feedback": <Users className="w-6 h-6 text-black" />,
    "Human Resources": <Users className="w-6 h-6 text-black" />,
    "default": <Users className="w-6 h-6 text-black" />,
};

const roleColors: { [key: string]: string } = {
    "Super Admin": "bg-red-200/30",
    "Sales": "bg-yellow-400/30",
    "Software Development": "bg-blue-300/30",
    "Design": "bg-purple-300/30",
    "Support & Feedback": "bg-green-300/30",
    "Human Resources": "bg-pink-300/30",
    "default": "bg-gray-300/30",
};


const RoleCard = ({ role, onViewMembers }: { role: Role; onViewMembers: (role: Role) => void; }) => (
    <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
            <div className="flex items-center gap-4 flex-1">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                    {role.icon}
                </div>
                <p className="text-2xl font-semibold w-60">{role.name}</p>
            </div>
            
            <div className="w-px h-14 bg-stone-200 hidden md:block" />

            <div className="flex flex-col gap-2 flex-1">
                <p className="text-lg"><span className="text-grey-1">Admin: </span><span className="text-black font-medium">{role.admin}</span></p>
                <p className="text-lg"><span className="text-grey-1">Active Members: </span><span className="text-green-600 font-medium">{String(role.active).padStart(2, '0')}</span></p>
            </div>
            
            <div className="w-px h-14 bg-stone-200 hidden md:block" />

            <div className="flex items-center gap-4 flex-1">
                 <p className="text-lg"><span className="text-grey-1">Total Members: </span><span className="text-black font-medium">{String(role.total).padStart(2, '0')}</span></p>
                <Button className="h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium" onClick={() => onViewMembers(role)}>View Members</Button>
            </div>
        </div>
        <Separator />
    </>
);

export default function TeamsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const departmentsData = await getDepartments();
            const formattedRoles = departmentsData.map(dept => ({
                name: dept.name,
                icon: roleIcons[dept.name] || roleIcons.default,
                bgColor: roleColors[dept.name] || roleColors.default,
                admin: dept.admin,
                active: dept.members.filter(m => m.status === 'Active').length,
                total: dept.members.length,
                members: dept.members,
            }));
            setRoles(formattedRoles);
        };
        fetchDepartments();
    }, []);

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
                <h2 className="text-2xl font-medium text-zinc-900">Teams</h2>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-2" />
                        <Input 
                            placeholder="Search Members" 
                            className="pl-12 h-14 rounded-full bg-white text-lg" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <CreateDepartmentSheet />
                     <AddMemberSheet />
                </div>
            </div>

            <Card className="rounded-[50px] overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex flex-col">
                        {filteredRoles.map((role) => (
                            <RoleCard key={role.name} role={role} onViewMembers={handleViewMembers}/>
                        ))}
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
