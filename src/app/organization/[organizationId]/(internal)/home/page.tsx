
'use client';

import React, { Suspense } from 'react';
import { useUser } from '@/context/user-context';
import DefaultHomePage from '@/app/organization/[organizationId]/(internal)/home/default-home';
import ProjectManagerHome from '@/app/organization/(internal)/home/project-manager-home';
import { Skeleton } from '@/components/ui/skeleton';
import ArchitectHome from '@/app/organization/[organizationId]/(internal)/home/architect-home';
import SalesHome from '@/app/organization/[organizationId]/(internal)/home/sales-home';
import SiteSupervisorHome from '@/app/organization/[organizationId]/(internal)/home/site-supervisor-home';


function OrganizationHomePageContent() {
    const { user, loading } = useUser();

    if (loading || !user) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="hidden lg:flex items-center gap-4">
                         <Skeleton className="h-[54px] w-40 rounded-full" />
                         <Skeleton className="h-[54px] w-40 rounded-full" />
                         <Skeleton className="h-[54px] w-40 rounded-full" />
                    </div>
                     <div className="flex lg:hidden justify-between items-center w-full">
                        <Skeleton className="h-[54px] w-32 rounded-full" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-[54px] w-[54px] rounded-full" />
                            <Skeleton className="h-[54px] w-[54px] rounded-full" />
                        </div>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-44 rounded-[40px]" />
                    <Skeleton className="h-44 rounded-[40px]" />
                    <Skeleton className="h-44 rounded-[40px]" />
                    <Skeleton className="h-44 rounded-[40px]" />
                </div>
            </div>
        )
    }

    if (user.team === 'Project Manager') {
        return <ProjectManagerHome />;
    }
    
    if (user.team === 'Architect') {
        return <ArchitectHome />;
    }

    if (user.team === 'Site Supervisor') {
        return <SiteSupervisorHome />;
    }

    if (user.team === 'Sales') {
        return <SalesHome />;
    }

    return <DefaultHomePage />;
}

export default function OrganizationHomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrganizationHomePageContent />
        </Suspense>
    );
}
