
'use client';

import React, { useEffect } from 'react';
import { ClientHeader } from '@/components/client-header';
import { ClientBottomNav } from '@/components/client-bottom-nav';
import { useUser } from '@/context/user-context';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const params = useParams();
  const organizationId = params.organizationId as string;
  const clientId = params.clientId as string;

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
