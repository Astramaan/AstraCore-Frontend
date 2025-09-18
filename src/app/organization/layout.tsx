'use client';

import React, from 'react';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';
import { UserProvider } from '@/context/user-context';


function OrganizationLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="max-w-[1440px] mx-auto w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 p-4 space-y-6">
            {children}
        </main>
        <OrganizationBottomNav />
    </div>
  );
}

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <OrganizationLayoutContent>{children}</OrganizationLayoutContent>
    </UserProvider>
  )
}
