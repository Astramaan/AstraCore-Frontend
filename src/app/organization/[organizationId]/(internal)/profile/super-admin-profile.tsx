
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
import { BrandingSheet } from '@/components/branding-sheet';
import { SettingsCard } from '@/components/settings-card';
import { ProjectStageToggleCard } from '@/components/project-stage-toggle-card';

export default function SuperAdminProfilePage() {
    const router = useRouter();
    const { user, logout } = useUser();
    const [isBrandingSheetOpen, setIsBrandingSheetOpen] = useState(false);
    
    if (!user) return null; // Should be handled by layout, but as a safeguard
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <Button variant="outline" onClick={() => router.back()} className="rounded-full h-[54px] px-6 text-lg bg-card hover:bg-primary/10 hover:text-primary hidden md:flex">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h2 className="text-2xl font-medium text-zinc-900 dark:text-white">My Profile</h2>
            </div>
            <PersonalDetails memberId={user.userId} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                   <FeatureAccessCard />
                   <BrandingWorkflowCard />
                   <ProjectStageToggleCard />
                </div>
                <div className="space-y-6">
                    <SettingsCard />
                    <ActiveSessionsCard />
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={logout} className="rounded-full h-[54px] px-10 text-lg bg-card hover:bg-destructive/10 hover:text-destructive w-full">
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
