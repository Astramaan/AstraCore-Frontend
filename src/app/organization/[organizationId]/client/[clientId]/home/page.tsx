
'use client';

import React, { Suspense } from 'react';
import ExistingClientHomePage from './existing-client-home';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/user-context';
import NewUserHomePage from './new-user-home';
import { useParams, useRouter } from 'next/navigation';

function ClientHomePage() {
  const { user } = useUser();
  
  if (user?.team === 'New User') {
      return <NewUserHomePage />;
  }

  return <ExistingClientHomePage />;
}

export default function ClientHomePageWrapper() {
    const { user, loading } = useUser();
    const router = useRouter();
    const params = useParams();

    React.useEffect(() => {
        if (!loading && user) {
            const currentPathClientId = params.clientId;
            if (user.userId !== currentPathClientId) {
                if (user.team === 'New User') {
                     router.replace(`/organization/${user.organizationId}/client/new/${user.userId}/home`);
                } else if (user.roleType === 'client') {
                    router.replace(`/organization/${user.organizationId}/client/${user.userId}/home`);
                }
            }
        } else if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router, params]);

    if (loading || !user) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6 p-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <Skeleton className="h-80 w-full rounded-b-[50px] md:rounded-[50px]" />
                <div className="p-4 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Skeleton className="h-28 w-full rounded-[20px]" />
                        <Skeleton className="h-28 w-full rounded-[20px]" />
                     </div>
                     <div className="px-4 pb-24 space-y-8">
                         <Skeleton className="h-28 w-full rounded-[20px]" />
                         <Skeleton className="h-28 w-full rounded-[20px]" />
                         <Skeleton className="h-28 w-full rounded-[20px]" />
                    </div>
                </div>
            </div>
        );
    }
    
    // Based on user role, render the correct home page
    const ComponentToRender = user.team === 'New User' ? NewUserHomePage : ExistingClientHomePage;
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ComponentToRender />
        </Suspense>
    );
}
