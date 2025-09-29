
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
  
  /*
  useEffect(() => {
    if (!loading && user && user.team !== 'New User') {
      router.replace(`/organization/${user.organizationId}/client/${user.userId}/home`);
    }
  }, [user, loading, router]);
  */
  
  if (loading || (user && user.team !== 'New User')) {
    return (
        <div className="min-h-screen bg-background p-4 2xl:p-10">
            <header className="max-w-[1440px] 2xl:max-w-none mx-auto mb-6">
                <Skeleton className="h-16 w-full" />
            </header>
            <main className="max-w-[1440px] 2xl:max-w-none mx-auto">
                <Skeleton className="h-96 w-full" />
            </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4 2xl:px-10">
            <ClientHeader />
        </header>
        <main className="w-full flex-1 overflow-y-auto bg-background pb-32">
            {children}
        </main>
        <NewUserBottomNav />
    </div>
  );
}
