

'use client';

import { PersonalDetails } from '@/components/personal-details';
import { FeatureAccessCard } from '@/components/feature-access-card';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import React from 'react';
import { Button }from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useUser } from '@/context/user-context';

export default function MemberDetailsPage() {
    const params = useParams();
    const memberId = params.id as string;
    const { user, logout } = useUser();
    
    // In a real app, you would get this from your auth context
    const isSuperAdmin = true;

    return (
        <div className="space-y-6">
            <PersonalDetails memberId={memberId} />
            {!isSuperAdmin && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex">
                        <FeatureAccessCard />
                    </div>
                    <div className="flex flex-col gap-6">
                        <ActiveSessionsCard />
                         <div className="flex justify-end">
                            <Button variant="outline" onClick={logout} className="rounded-full h-[54px] px-10 text-lg bg-white hover:bg-primary/10 hover:text-primary w-full">
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
