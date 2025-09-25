
'use client';

import React, { useEffect } from 'react';
import { OrganizationHeader } from '@/components/organization-header';
import { OrganizationBottomNav } from '@/components/organization-bottom-nav';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';
import { Skeleton } from '@/components/ui/skeleton';


function OrganizationInternalLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isSuperAdmin } = useUser();
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/');
      } else if (user.roleType === 'client' || user.team === 'New User') {
        // Redirect non-internal users away from this layout
        const targetPath = user.team === 'New User' 
          ? `/organization/${user.organizationId}/client/new/${user.userId}/home`
          : `/organization/${user.organizationId}/client/${user.userId}/home`;
        router.replace(targetPath);
      }
    }
  }, [user, loading, router]);
  
  if (loading || !user || user.roleType === 'client' || user.team === 'New User') {
     // This can be a loading spinner or null while redirecting
    return (
       <div className="min-h-screen bg-background p-4 md:p-8">
            <header className="max-w-[1440px] mx-auto mb-6">
                <Skeleton className="h-20 w-full" />
            </header>
            <main className="max-w-[1440px] mx-auto">
                <Skeleton className="h-96 w-full" />
            </main>
        </div>
    );
  }
  
  const noNavPaths = [
      `/organization/${user.organizationId}/projects/`, 
      `/organization/${user.organizationId}/teams/`, 
      `/organization/${user.organizationId}/profile`
  ];

  const shouldShowNav = isSuperAdmin || !noNavPaths.some(path => pathname.includes(path.replace(user.organizationId, '[organizationId]')));

  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
           <div className="max-w-[1440px] mx-auto p-4">
             <OrganizationHeader />
           </div>
        </header>
        <main className="max-w-[1440px] mx-auto w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 py-4 px-4 md:px-8 space-y-6">
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
