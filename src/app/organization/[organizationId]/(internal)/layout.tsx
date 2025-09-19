
'use client';

import React from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/user-context';


function OrganizationInternalLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  
  if (!user || user.roleType === 'client' || user.team === 'New User') {
     // This can be a loading spinner or null while redirecting
    return null;
  }
  
  const noNavPaths = ['/profile'];
  const shouldShowNav = !noNavPaths.some(path => pathname.includes(path));

  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
           <div className="max-w-[1440px] mx-auto p-4">
             <OrganizationHeader />
           </div>
        </header>
        <main className="max-w-[1440px] mx-auto w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 py-4 space-y-6">
            {children}
        </main>
        {shouldShowNav && <OrganizationBottomNav />}
    </div>
  );
}

export default function OrganizationInternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <OrganizationInternalLayoutContent>{children}</OrganizationInternalLayoutContent>
  )
}
