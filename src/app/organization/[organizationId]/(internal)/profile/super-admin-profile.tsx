
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonalDetails } from '@/components/personal-details';
import { ActiveSessionsCard } from '@/components/active-sessions-card';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronLeft, Palette } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { FeatureAccessCard } from '@/components/feature-access-card';
import { BrandingWorkflowCard } from '@/components/branding-workflow-card';
import { ProjectStageToggleCard } from '@/components/project-stage-toggle-card';
import { BrandingSheet } from '@/components/branding-sheet';
import { AppearanceCard } from '@/components/appearance-card';

export default function SuperAdminProfilePage() {
    const router = useRouter();
    const { user, logout } = useUser();
    const [isBrandingSheetOpen, setIsBrandingSheetOpen] = useState(false);
    
    if (!user) return null; // Should be handled by layout, but as a safeguard
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium text-zinc-900 md:hidden">My Profile</h2>
                <h2 className="text-2xl font-medium text-zinc-900 hidden md:block">Personal Details</h2>
                <Button variant="outline" onClick={() => router.back()} className="rounded-full h-[54px] px-6 text-lg bg-white hover:bg-primary/10 hover:text-primary">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
            <PersonalDetails memberId={user.userId} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                   <FeatureAccessCard />
                   <BrandingWorkflowCard />
                   <ProjectStageToggleCard />
                </div>
                <div className="space-y-6">
                    <AppearanceCard />
                    <ActiveSessionsCard />
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={logout} className="rounded-full h-[54px] px-10 text-lg bg-white hover:bg-destructive/10 hover:text-destructive w-full">
                           <LogOut className="mr-2 h-5 w-5" />
                           Logout
                        </Button>
                    </div>
                </div>
            </div>
            <BrandingSheet isOpen={isBrandingSheetOpen} onOpenChange={setIsBrandingSheetOpen} />
        </div>
    );
}
