

'use client';

import { PersonalDetails } from '@/components/personal-details';
import { FeatureAccessCard } from '@/components/feature-access-card';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import React from 'react';
import { Button }from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useUser } from '@/context/user-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function MemberDetailsPage() {
    const params = useParams();
    const memberId = params.memberId as string;
    const { user, logout, loading } = useUser();
    
    if (loading || !user) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-64 w-full rounded-[50px]" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Skeleton className="h-64 w-full rounded-[50px]" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-[50px]" />
                </div>
            </div>
        );
    }
    
    // In a real app, you would fetch this member's data. Here we assume we are viewing the logged in user's profile.
    const isViewingSelf = user.userId === memberId;
    
    return (
        <div className="space-y-6">
            <PersonalDetails memberId={memberId} />
            {(isViewingSelf && user.role !== 'SUPER_ADMIN') && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex">
                        <FeatureAccessCard />
                    </div>
                    <div className="flex flex-col gap-6">
                        <ActiveSessionsCard />
                         <div className="flex justify-end">
                            <Button variant="outline" onClick={logout} className="rounded-full h-[54px] px-10 text-lg bg-white hover:bg-destructive/10 hover:text-destructive w-full">
                                 <LogOut className="mr-2 h-5 w-5" />
                                 Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
