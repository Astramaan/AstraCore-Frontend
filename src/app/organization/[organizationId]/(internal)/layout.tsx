
'use client';

import React, { useEffect, useState } from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser, UserProvider } from '@/context/user-context';
import { Skeleton } from '@/components/ui/skeleton';


function OrganizationInternalLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (window.isNativeApp || searchParams.get('isNativeApp') === 'true') {
      setIsNativeApp(true);
    }
  }, [searchParams]);

  /*
  useEffect(() => {
    if (!loading && user && isClient) {
      router.replace(`/organization/${user.organizationId}/client/${user.userId}/home`);
    }
  }, [user, loading, router, isClient]);
  */
  
  if (loading || !user) {
    return (
       <div className="min-h-screen bg-background p-4 md:p-8 2xl:p-10">
            <header className="max-w-[1440px] 2xl:max-w-none mx-auto mb-6">
                <Skeleton className="h-20 w-full" />
            </header>
            <main className="max-w-[1440px] 2xl:max-w-none mx-auto">
                <Skeleton className="h-96 w-full" />
            </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        {!isNativeApp && (
          <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
            <div className="max-w-[1440px] 2xl:max-w-none mx-auto p-4 2xl:px-10">
              <OrganizationHeader />
            </div>
          </header>
        )}
        <main className="max-w-[1440px] 2xl:max-w-none w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 py-4 px-4 md:px-8 2xl:px-10 space-y-6">
            {children}
        </main>
        <OrganizationBottomNav />
    </div>
  );
}

export default function OrganizationInternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
        <OrganizationInternalLayoutContent>{children}</OrganizationInternalLayoutContent>
    </UserProvider>
  )
}
