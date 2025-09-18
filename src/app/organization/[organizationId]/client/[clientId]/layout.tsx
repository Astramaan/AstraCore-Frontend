
'use client';

import React, from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { UserProvider } from '@/context/user-context';


function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="max-w-[1440px] mx-auto w-full flex-1 overflow-y-auto bg-background p-4 space-y-6">
            <OrganizationHeader />
            {children}
        </main>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </UserProvider>
  )
}
