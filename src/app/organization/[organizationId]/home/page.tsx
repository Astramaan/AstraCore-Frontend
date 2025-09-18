
'use client';

import React, { Suspense } from 'react';
import { useUser } from '@/context/user-context';
import DefaultHomePage from './default-home';
import ProjectManagerHome from './project-manager-home';
import { Skeleton } from '@/components/ui/skeleton';
import ArchitectHome from './architect-home';
import SalesHome from './sales-home';
import SiteSupervisorHome from './site-supervisor-home';
import NewUserHomePage from '../newuser/[newuserId]/home/page';

function OrganizationHomePageContent({ params: { organizationId } }: { params: { organizationId: string } }) {
    const { user, loading } = useUser();

    if (loading) {
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

    if (!user) {
        // You can return a loading spinner or a default view
        return <div>Failed to load user data. Please try logging in again.</div>;
    }

    // Use the user's team to determine which component to render
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
    
    if (user.team === 'New User') {
        return <NewUserHomePage params={{ organizationId: user.organizationId, newuserId: user.userId }} />;
    }

    return <DefaultHomePage />;
}

export default function OrganizationHomePage({ params }: { params: { organizationId: string } }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrganizationHomePageContent params={params} />
        </Suspense>
    );
}
