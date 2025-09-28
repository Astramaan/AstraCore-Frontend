
'use client';

import React, { useEffect } from 'react';
import { ClientBottomNav } from '@/components/client-bottom-nav';
import { UserProvider, useUser } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/');
        }
    }, [user, loading, router]);
    
    if (loading || !user) {
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
            <main className="w-full flex-1 bg-background">
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
