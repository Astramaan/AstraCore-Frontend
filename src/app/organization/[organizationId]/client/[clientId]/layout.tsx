
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
    
    return (
        <div className="relative min-h-screen w-full">
            <Image
                src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3w3NDE5ODJ8MHwxfGFsbHx8fHx8fHx8fDE3NTk2OTg5MDl8"
                alt="background"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                className="-z-10"
                data-ai-hint="background image"
            />

            <div className="min-h-screen relative">
                {!isNativeApp && (
                  <header className="sticky top-2 z-20 px-2">
                    <div className="relative p-px rounded-full bg-gradient-to-b from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                      <div className="relative w-full bg-black/20 rounded-full backdrop-blur-[5px] p-4">
                        <div className="max-w-[1440px] 2xl:max-w-none mx-auto px-4 2xl:px-10">
                          <ClientHeader />
                        </div>
                      </div>
                    </div>
                  </header>
                )}
                <main className={cn(
                    "w-full flex-1",
                    !isLivePage && "pb-32",
                    isNativeApp ? "pt-4" : "pt-8", 
                    "px-4 sm:px-4 md:px-8 2xl:px-10"
                )}>
                    {children}
                </main>
                { user && user.team !== 'New User' && <ClientBottomNav /> }
            </div>
        </div>
    );
}
