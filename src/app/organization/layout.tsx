
'use client';

import React, { Suspense } from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';


function OrganizationLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="max-w-[1440px] mx-auto w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 p-4 space-y-6">
            <OrganizationHeader />
            {children}
        </main>
        <OrganizationBottomNav />
    </div>
  );
}

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <OrganizationLayoutContent>{children}</OrganizationLayoutContent>
    </Suspense>
  )
}
