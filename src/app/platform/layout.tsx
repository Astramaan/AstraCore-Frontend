
'use client';

import React, { useEffect } from 'react';
import { PlatformSidebar } from '@/components/platform-sidebar';
import { UserProvider } from '@/context/user-context';


function PlatformLayoutContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex">
            <div className="hidden md:block w-64 border-r border-stone-300">
                <PlatformSidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-y-auto">
                {children}
                </main>
            </div>
        </div>
    );
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
      <UserProvider>
        <PlatformLayoutContent>{children}</PlatformLayoutContent>
      </UserProvider>
    )
}
