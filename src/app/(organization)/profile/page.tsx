
'use client';

import React from 'react';
import { PersonalDetails } from '@/components/personal-details';
import { RoleAccessCard } from '@/components/role-access-card';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    // In a real app, you would fetch the logged-in user's data.
    // For now, we'll use a mock ID.
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Personal Details</h2>
                <Button variant="outline" asChild className="rounded-full h-[54px] px-6 text-lg bg-white hover:bg-muted">
                    <Link href="/organization/home">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>
            <PersonalDetails employeeId="1" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RoleAccessCard />
                </div>
                <div className="flex flex-col gap-6">
                    <ActiveSessionsCard />
                    <div className="flex justify-end">
                        <Button variant="outline" asChild className="rounded-full h-14 px-10 text-lg">
                           <Link href="/">
                             <LogOut className="mr-2 h-5 w-5" />
                             Logout
                           </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
