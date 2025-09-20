

'use client';

import React, { Suspense, useEffect } from 'react';
import { useUser } from '@/context/user-context';
import DefaultHomePage from './default-home';
import ProjectManagerHome from './project-manager-home';
import { Skeleton } from '@/components/ui/skeleton';
import ArchitectHome from './architect-home';
import SalesHome from './sales-home';
import SiteSupervisorHome from './site-supervisor-home';
import { useRouter, useParams } from 'next/navigation';


function OrganizationHomePageContent() {
    const params = useParams();
    const organizationId = params.organizationId as string;
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        } else if (!loading && user) {
            if (user.team === 'New User') {
                router.replace(`/organization/${user.organizationId}/client/new/${user.userId}/home`);
            } else if (user.roleType === 'client') {
                router.replace(`/organization/${user.organizationId}/client/${user.userId}/home`);
            }
        }
    }, [loading, user, router, organizationId]);

    if (loading || !user || user.roleType === 'client' || user.team === 'New User') {
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

    return <DefaultHomePage />;
}

export default function OrganizationHomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrganizationHomePageContent />
        </Suspense>
    );
}

    