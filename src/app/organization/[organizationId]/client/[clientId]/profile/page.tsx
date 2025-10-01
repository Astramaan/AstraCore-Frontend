
import React, { Suspense } from 'react';
import ClientProfilePageContent from './client-profile-page-content';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClientProfilePage() {
    return (
        <Suspense fallback={
            <div className="space-y-6 p-4">
                <Skeleton className="h-48 w-full rounded-[50px]" />
                <Skeleton className="h-24 w-full rounded-[50px]" />
                <Skeleton className="h-14 w-full rounded-full" />
            </div>
        }>
            <ClientProfilePageContent />
        </Suspense>
    );
}
