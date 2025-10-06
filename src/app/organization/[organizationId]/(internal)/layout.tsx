
'use client';

import React from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';

export default function OrganizationInternalLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-4 z-20 px-4">
          <div className="relative p-px rounded-full bg-gradient-to-b from-white/50 to-white/0">
            <div className="relative w-full bg-black/10 rounded-full backdrop-blur-[5px] p-4">
              <div className="max-w-[1440px] 2xl:max-w-none mx-auto px-4">
                <OrganizationHeader />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-[1440px] 2xl:max-w-none w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 pt-16 px-4 md:px-8 2xl:px-10 space-y-6">
            {children}
        </main>
        <OrganizationBottomNav />
    </div>
  );
}
