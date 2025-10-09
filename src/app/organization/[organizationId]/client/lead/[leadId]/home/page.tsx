
import React, { Suspense } from 'react';
import NewUserHomePage from './new-user-home';
import { Skeleton } from '@/components/ui/skeleton';

export default function LeadHomePageWrapper({ params }: { params: { organizationId: string, leadId: string } }) {
    return (
        <Suspense fallback={
             <div className="space-y-6 p-4">
                <Skeleton className="h-48 w-full rounded-[50px]" />
                <Skeleton className="h-64 w-full rounded-[50px]" />
            </div>
        }>
            <NewUserHomePage params={{ organizationId: params.organizationId, userId: params.leadId }}/>
        </Suspense>
    );
}
