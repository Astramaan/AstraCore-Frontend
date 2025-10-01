import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ClientProjectDetailsPage from './client-project-details-page';

export default function Page() {
    return (
        <Suspense fallback={
            <div className="space-y-6 p-4">
                <Skeleton className="h-20 w-full" />
                <div className="space-y-4">
                     <Skeleton className="h-64 w-full" />
                     <Skeleton className="h-96 w-full" />
                </div>
            </div>
        }>
            <ClientProjectDetailsPage />
        </Suspense>
    );
}
