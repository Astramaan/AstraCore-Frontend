'use client';

import React, { Suspense } from 'react';
import ExistingClientHomePage from './existing-client-home';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/user-context';
import NewUserHomePage from './new-user-home';
import { useParams } from 'next/navigation';

function ClientHomePage() {
  const { user, loading } = useUser();
  const params = useParams();
  
  if (loading || !user) {
      return (
            <div className="space-y-6 p-4">
                <Skeleton className="h-80 w-full rounded-b-[50px] md:rounded-[50px]" />
                <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-24 w-full rounded-full" />
                        <Skeleton className="h-24 w-full rounded-full" />
                     </div>
                     <div className="space-y-8">
                         <Skeleton className="h-28 w-full rounded-[20px]" />
                         <Skeleton className="h-28 w-full rounded-[20px]" />
                         <Skeleton className="h-28 w-full rounded-[20px]" />
                    </div>
                </div>
            </div>
      );
  }
  
  if (user.team === 'New User') {
      return <NewUserHomePage params={{ organizationId: params.organizationId as string, userId: user.userId }} />;
  }
  
  return <ExistingClientHomePage />;
}

export default function ClientHomePageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientHomePage />
        </Suspense>
    );
}
