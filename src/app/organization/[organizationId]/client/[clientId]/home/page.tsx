
'use client';

import React, { Suspense } from 'react';
import ExistingClientHomePage from './existing-client-home';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/user-context';
import NewUserHomePage from './new-user-home';
import { useParams } from 'next/navigation';

function ClientHomePageContent() {
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
  
  return (
      <ExistingClientHomePage />
  );
}

export default function ClientHomePageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientHomePageContent />
        </Suspense>
    );
}

export function generateStaticParams() {
  // In a real app, you would fetch this data from a database or API
  return [
    { organizationId: 'ORG-f9705032-d42a-46df-b799-87bcda629142', clientId: '8c26c0b3032ecc4f' },
    { organizationId: 'ORG-f9705032-d42a-46df-b799-87bcda629142', clientId: '1e17e76f2486e270' },
  ];
}
