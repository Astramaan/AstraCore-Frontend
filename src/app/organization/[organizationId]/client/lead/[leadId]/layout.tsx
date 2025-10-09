
'use client';

import React from 'react';
import { NewUserBottomNav } from '@/components/new-user-bottom-nav';
import { ClientHeader } from '@/components/client-header';

export default function LeadLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4 2xl:px-10">
            <ClientHeader />
        </header>
        <main className="w-full flex-1 overflow-y-auto bg-background pb-32">
            {children}
        </main>
        <NewUserBottomNav />
    </div>
  );
}
