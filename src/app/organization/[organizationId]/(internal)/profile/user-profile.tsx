
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PersonalDetails } from '@/components/personal-details';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronLeft } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { SettingsCard } from '@/components/settings-card';

export default function UserProfilePage() {
    const router = useRouter();
    const { user, logout } = useUser();

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => router.back()} className="rounded-full h-[54px] px-6 text-lg bg-card hover:bg-primary/10 hover:text-primary hidden md:flex">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h2 className="text-2xl font-medium text-zinc-900 dark:text-white">Personal Details</h2>
            </div>
            <PersonalDetails memberId={user.userId} />

            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
                <div className="2xl:col-span-2 space-y-6">
                    <SettingsCard />
                    <ActiveSessionsCard />
                </div>
                <div className="flex justify-end 2xl:items-end">
                    <Button variant="outline" onClick={logout} className="rounded-full h-[54px] px-10 text-lg bg-card hover:bg-destructive/10 hover:text-destructive w-full 2xl:w-auto">
                       <LogOut className="mr-2 h-5 w-5" />
                       Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
