
'use client';

import React, { Suspense } from 'react';
import ExistingClientHomePage from './existing-client-home';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function ClientHomePage() {
  const params = useParams();
  const organizationId = params.organizationId as string;
  const clientId = params.clientId as string;

  // Since this page is for existing clients, we directly render the existing client view.
  // The routing logic in the main home page will direct new users to the correct page.
  return <ExistingClientHomePage params={{ organizationId, clientId }} />;
}

export default function ClientHomePageWrapper() {
    return (
        <Suspense fallback={
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
        }>
            <ClientHomePage />
        </Suspense>
    );
}
