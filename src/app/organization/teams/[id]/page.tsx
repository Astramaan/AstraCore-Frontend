
'use client';

import { PersonalDetails } from '@/components/personal-details';
import { FeatureAccessCard } from '@/components/feature-access-card';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import React from 'react';
import { Button }from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default function MemberDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch member data based on params.id
    // For now, we'll pass a mock ID to the component.
    
    // In a real app, you would get this from your auth context
    const isSuperAdmin = true;

    return (
        <div className="space-y-6">
            <PersonalDetails memberId={params.id} />
            {!isSuperAdmin && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex">
                        <FeatureAccessCard />
                    </div>
                    <div className="flex flex-col gap-6">
                        <ActiveSessionsCard />
                         <div className="flex justify-end">
                            <Button variant="outline" asChild className="rounded-full h-[54px] px-10 text-lg bg-white hover:bg-primary/10 hover:text-primary w-full">
                               <Link href="/">
                                 <LogOut className="mr-2 h-5 w-5" />
                                 Logout
                               </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
