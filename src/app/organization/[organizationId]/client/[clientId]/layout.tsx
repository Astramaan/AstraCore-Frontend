
'use client';

import React from 'react';
import { ClientBottomNav } from '@/components/client-bottom-nav';
import { useUser } from '@/context/user-context';
import { Skeleton } from '@/components/ui/skeleton';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { loading } = useUser();

  if (loading) {
    return (
        <div className="min-h-screen bg-background">
            <main className="w-full flex-1 bg-background">
                <Skeleton className="h-96 w-full" />
            </main>
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
      <ClientLayoutContent>{children}</ClientLayoutContent>
  )
}
