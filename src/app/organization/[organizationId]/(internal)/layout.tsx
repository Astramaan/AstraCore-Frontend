
'use client';

import React from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';

export default function OrganizationInternalLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
          <div className="max-w-[1440px] 2xl:max-w-none mx-auto p-4 2xl:px-10">
            <OrganizationHeader />
          </div>
        </header>
        <main className="max-w-[1440px] 2xl:max-w-none w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 py-4 px-4 md:px-8 2xl:px-10 space-y-6">
            {children}
        </main>
        <OrganizationBottomNav />
    </div>
  );
}
