
'use client';

import React from 'react';
import { NewUserBottomNav } from '@/components/new-user-bottom-nav';
import { ClientHeader } from '@/components/client-header';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function LeadLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname.endsWith('/home');

  return (
    <div className="relative min-h-screen bg-background">
        {isHomePage && (
            <>
                <header className="sticky top-2 z-20 px-2">
                    <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                        <div className="relative w-full bg-black/20 rounded-full backdrop-blur-[5px] px-4 py-2">
                            <div className="max-w-[1440px] 2xl:max-w-none mx-auto">
                                <ClientHeader />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="absolute top-0 left-0 w-full h-[50vh] -z-10">
                    <Image
                        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBob3VzZXxlbnwwfHx8fDE3NTk4NDU5ODR8MA"
                        alt="Modern house background"
                        layout="fill"
                        objectFit="cover"
                        className="object-top"
                        data-ai-hint="modern house"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>
            </>
        )}
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
        <main className={cn(
                "w-full flex-1 overflow-y-auto bg-transparent pb-32",
                isHomePage ? "relative z-10" : "bg-background"
            )}>
            {children}
        </main>
        <NewUserBottomNav />
    </div>
  );
}
