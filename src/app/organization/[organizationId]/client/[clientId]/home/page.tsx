
'use client';

import React, { Suspense } from 'react';
import ExistingClientHomePage from './existing-client-home';
import { Skeleton } from '@/components/ui/skeleton';

function ClientHomePage() {
  // This component will be responsible for fetching data and deciding
  // whether to show the new user home or existing client home.
  // For now, we'll just show the existing client home.

  return <ExistingClientHomePage />;
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
