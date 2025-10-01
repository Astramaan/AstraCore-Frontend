

'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { PlatformBottomNav } from '@/components/platform-bottom-nav';


function PlatformLayoutContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-y-auto pb-32">
                {children}
                </main>
                <PlatformBottomNav />
            </div>
        </div>
    );
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <PlatformLayoutContent>{children}</PlatformLayoutContent>
    )
}
