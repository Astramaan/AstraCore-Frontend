
'use client';

import React from 'react';
import { ClientHeader } from '@/components/client-header';
import { ClientBottomNav } from '@/components/client-bottom-nav';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="min-h-screen bg-background">
        <main className="w-full flex-1 overflow-y-auto bg-background">
            {children}
        </main>
        <ClientBottomNav />
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
      <ClientLayoutContent>{children}</ClientLayoutContent>
  )
}
