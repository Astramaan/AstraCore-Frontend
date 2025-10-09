
'use client';

import React from 'react';
import { NewUserBottomNav } from '@/components/new-user-bottom-nav';
import { ClientHeader } from '@/components/client-header';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function LeadLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname.endsWith('/home');

  return (
    <div className="min-h-screen bg-background">
        {!isHomePage && (
            <header className="sticky top-2 z-20 px-2">
            <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                <div className="relative w-full bg-black/20 rounded-full backdrop-blur-[5px] px-4 py-2">
                <div className="max-w-[1440px] 2xl:max-w-none mx-auto">
                    <ClientHeader />
                </div>
                </div>
            </div>
            </header>
        )}
        <main className={cn("w-full flex-1 overflow-y-auto bg-background pb-32", isHomePage && "p-0")}>
            {children}
        </main>
        <NewUserBottomNav />
    </div>
  );
}

    