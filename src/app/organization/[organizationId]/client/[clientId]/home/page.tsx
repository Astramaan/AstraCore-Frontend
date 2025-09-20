'use client';

import React, { useEffect } from 'react';
import { useUser } from '@/context/user-context';
import NewUserHomePage from '@/app/organization/[organizationId]/client/new/[newuserId]/home/page';
import ExistingClientHomePage from './existing-client-home';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function ClientHomePage() {
  const { user, loading } = useUser();
  const params = useParams();
  const organizationId = params.organizationId as string;
  const clientId = params.clientId as string;

  if (loading || !user) {
    return (
        <div className="space-y-6 p-4">
            <Skeleton className="h-80 w-full rounded-b-[50px]" />
            <div className="p-4 -mt-36 relative z-10">
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-32" />
            </div>
            <div className="p-4 flex justify-between items-center">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
             <div className="px-4 pb-24 space-y-8">
                 <Skeleton className="h-28 w-full rounded-[20px]" />
                 <Skeleton className="h-28 w-full rounded-[20px]" />
                 <Skeleton className="h-28 w-full rounded-[20px]" />
            </div>
        </div>
    )
  }

  if (user.team === 'New User') {
    return <NewUserHomePage params={{ organizationId, newuserId: clientId }} />;
  }

  return <ExistingClientHomePage params={{ organizationId, clientId }} />;
}

export default ClientHomePage;
