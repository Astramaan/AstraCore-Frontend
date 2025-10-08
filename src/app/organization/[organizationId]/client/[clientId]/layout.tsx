
'use client';

import React, { useEffect, useState } from 'react';
import { ClientBottomNav } from '@/components/client-bottom-nav';
import { useUser } from '@/context/user-context';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ClientHeader } from '@/components/client-header';
import Image from 'next/image';

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
    const isHomePage = pathname.endsWith('/home');
    
    return (
        <div className="relative min-h-screen w-full">
            {!isNativeApp && !isHomePage && (
                <header className="sticky top-2 z-20 px-2">
                    <div className="relative p-px rounded-full bg-gradient-to-b from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                      <div className="relative w-full bg-black/20 rounded-full backdrop-blur-[5px] px-4 py-2">
                        <div className="max-w-[1440px] 2xl:max-w-none mx-auto">
                          <ClientHeader />
                        </div>
                      </div>
                    </div>
                </header>
            )}
            <main className={cn(
                "w-full flex-1",
                !isLivePage && "pb-32",
                !isHomePage && (isNativeApp ? "pt-4" : "pt-8"),
                isHomePage ? 'p-0' : 'px-4'
            )}>
                {children}
            </main>
            { user && user.team !== 'New User' && <ClientBottomNav /> }
        </div>
    );
}
