
'use client';

import React, { useEffect } from 'react';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/navigation';

function OrganizationLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  /*
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);
  */


  if (loading) {
    return <div>Loading...</div>;
  }
  
  /*
  if (!user) {
    return null;
  }
  */

  return (
    <div className="min-h-screen bg-background">
        <main className="max-w-[1440px] 2xl:max-w-none mx-auto w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 p-4 2xl:px-10 space-y-6">
            {children}
        </main>
    </div>
  );
}

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
      <OrganizationLayoutContent>{children}</OrganizationLayoutContent>
  )
}
