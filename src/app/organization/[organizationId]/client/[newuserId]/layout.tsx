
'use client';

import React from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { ClientBottomNav } from './home/page';
import { usePathname } from 'next/navigation';

function NewUserLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showBottomNav = !pathname.includes('/packages');

  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
           <div className="max-w-[1440px] mx-auto p-4">
             <OrganizationHeader />
           </div>
        </header>
        <main className="w-full flex-1 overflow-y-auto bg-background">
            {children}
        </main>
        {showBottomNav && <ClientBottomNav />}
    </div>
  );
}

export default function NewUserLayout({ children }: { children: React.ReactNode }) {
  return (
      <NewUserLayoutContent>{children}</NewUserLayoutContent>
  )
}
