
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ClientHomePageContent from './client-home-page-content';

export async function generateStaticParams() {
    // This function is required for static export of dynamic routes.
    // We don't want to pre-build any client pages, so we return an empty array.
    return [];
}

export default function ClientHomePageWrapper() {
    return (
        <Suspense fallback={
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
        }>
            <ClientHomePageContent />
        </Suspense>
    );
}
