

'use client';

import React, { useEffect } from 'react';
import { ClientBottomNav } from '@/components/client-bottom-nav';
import { UserProvider, useUser } from '@/context/user-context';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ClientHeader } from '@/components/client-header';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading, isClient } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const isLivePage = pathname.includes('/live');

    useEffect(() => {
        if (!loading && user) {
            if (!isClient) {
                router.replace(`/organization/${user.organizationId}/home`);
            }
        } else if (!loading && !user) {
            router.replace('/');
        }
    }, [user, loading, router, isClient]);
    
    if (loading || !user || !isClient) {
         return (
            <div className="space-y-6 p-4">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
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
    
    return (
        <div className="min-h-screen bg-background relative">
            <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4">
              <ClientHeader />
            </header>
            <main className={cn(
                "w-full flex-1 bg-background",
                !isLivePage && "pb-32",
                "px-4 sm:px-6 md:px-8"
            )}>
                {children}
            </main>
            <ClientBottomNav />
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
        <ClientLayoutContent>{children}</ClientLayoutContent>
    </UserProvider>
  );
}
