
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PersonalDetails } from '@/components/personal-details';
import { FeatureAccessCard } from '@/components/feature-access-card';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const router = useRouter();
    // In a real app, you would fetch the logged-in user's data.
    // For now, we'll use a mock ID.
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center md:hidden">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full h-12 w-12 bg-white">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold hidden md:block">Personal Details</h2>
                <Button variant="outline" onClick={() => router.back()} className="rounded-full h-[54px] px-6 text-lg bg-white hover:bg-primary/10 hover:text-primary hidden md:flex">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
            <PersonalDetails memberId="1" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <FeatureAccessCard />
                </div>
                <div className="flex flex-col gap-6">
                    <ActiveSessionsCard />
                    <div className="flex justify-end">
                        <Button variant="outline" asChild className="rounded-full h-[54px] px-10 text-lg bg-white hover:bg-primary/10 hover:text-primary w-full md:w-auto">
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
