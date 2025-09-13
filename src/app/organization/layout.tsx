

'use client';

import React from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';


export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="max-w-[1440px] mx-auto w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 px-4 md:px-8 py-6 space-y-6">
            <OrganizationHeader />
            {children}
        </main>
        <OrganizationBottomNav />
    </div>
  );
}
