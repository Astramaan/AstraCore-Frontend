
'use client';

import React, { useEffect } from 'react';
import { NewUserBottomNav } from '@/components/new-user-bottom-nav';
import { ClientHeader } from '@/components/client-header';
import { useUser } from '@/context/user-context';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewUserLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const params = useParams();
  const organizationId = params.organizationId as string;
  const newuserId = params.newuserId as string;

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/');
      } else if (user.team !== 'New User' || user.userId !== newuserId) {
        // If the user is not a "New User" or trying to access another user's page,
        // redirect them to their correct home.
        const targetPath = user.team === 'New User'
          ? `/organization/${user.organizationId}/client/new/${user.userId}/home`
          : user.roleType === 'client'
          ? `/organization/${user.organizationId}/client/${user.userId}/home`
          : `/organization/${user.organizationId}/home`;
        router.replace(targetPath);
      }
    }
  }, [user, loading, router, organizationId, newuserId]);

  if (loading || !user) {
    return (
        <div className="min-h-screen bg-background p-4">
            <header className="max-w-[1440px] mx-auto mb-6">
                <Skeleton className="h-16 w-full" />
            </header>
            <main className="max-w-[1440px] mx-auto">
                <Skeleton className="h-96 w-full" />
            </main>
        </div>
    );
  }


  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
           <div className="max-w-[1440px] mx-auto p-4">
             <ClientHeader />
           </div>
        </header>
        <main className="w-full flex-1 overflow-y-auto bg-background pb-32">
            {children}
        </main>
        <NewUserBottomNav />
    </div>
  );
}
