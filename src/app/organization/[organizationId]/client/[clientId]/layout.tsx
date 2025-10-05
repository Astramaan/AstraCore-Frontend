
'use client';

import React, { useEffect, useState } from 'react';
import { ClientBottomNav } from '@/components/client-bottom-nav';
import { useUser } from '@/context/user-context';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ClientHeader } from '@/components/client-header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isNativeApp, setIsNativeApp] = useState(false);

    useEffect(() => {
      // @ts-ignore
      if (window.isNativeApp || searchParams.get('isNativeApp') === 'true') {
        setIsNativeApp(true);
      }
    }, [searchParams]);

    const isLivePage = pathname.includes('/live');
    
    return (
        <div className="min-h-screen bg-background relative">
            {!isNativeApp && (
              <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4">
                <ClientHeader />
              </header>
            )}
            <main className={cn(
                "w-full flex-1 bg-background",
                !isLivePage && "pb-32",
                isNativeApp ? "pt-4" : "", // Add padding top if header is hidden
                "px-0 sm:px-4 md:px-8"
            )}>
                {children}
            </main>
            { user && user.team !== 'New User' && <ClientBottomNav /> }
        </div>
    );
}
