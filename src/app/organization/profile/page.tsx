
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PersonalDetails } from '@/components/personal-details';
import { FeatureAccessCard } from '@/components/feature-access-card';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { BrandingWorkflowCard } from '@/components/branding-workflow-card';
import { useUser } from '@/context/user-context';

export default function ProfilePage({ params: { organizationId } }: { params: { organizationId: string } }) {
    const router = useRouter();
    const { user } = useUser();
    
    const isSuperAdmin = user?.roleType === 'superAdmin';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center md:hidden">
                {/* This header part is handled by the main layout now. 
                    Keeping this div for structure but content might be removed if redundant. */}
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium text-zinc-900 hidden md:block">Personal Details</h2>
                <Button variant="outline" onClick={() => router.back()} className="rounded-full h-[54px] px-6 text-lg bg-white hover:bg-primary/10 hover:text-primary hidden md:flex">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
            <PersonalDetails memberId={user?.userId || ''} />
            
            {isSuperAdmin && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3">
                        <BrandingWorkflowCard />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex">
                    <FeatureAccessCard />
                </div>
                <div className="flex flex-col gap-6">
                    <ActiveSessionsCard />
                    <div className="flex justify-end">
                        <Button variant="outline" asChild className="rounded-full h-[54px] px-10 text-lg bg-white hover:bg-destructive/10 hover:text-destructive w-full">
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
