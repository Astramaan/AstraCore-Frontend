
'use client';

import React, { Suspense, useEffect, use } from 'react';
import { useUser } from '@/context/user-context';
import DefaultHomePage from './default-home';
import ProjectManagerHome from './project-manager-home';
import { Skeleton } from '@/components/ui/skeleton';
import ArchitectHome from './architect-home';
import SalesHome from './sales-home';
import SiteSupervisorHome from './site-supervisor-home';
import NewUserHomePage from '../../newuser/[newuserId]/home/page';
import { useRouter } from 'next/navigation';


function OrganizationHomePageContent({ params }: { params: { organizationId: string } }) {
    const { organizationId } = use(params);
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [loading, user, router]);

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
        return <div>Redirecting to login...</div>;
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
    
    if (user.team === 'New User' || user.roleType === 'client') {
        router.replace(`/organization/${user.organizationId}/newuser/${user.userId}/home`);
        return <div>Redirecting to your personal dashboard...</div>;
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
