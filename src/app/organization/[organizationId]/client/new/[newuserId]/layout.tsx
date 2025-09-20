
'use client';

import React from 'react';
import { NewUserHeader } from '@/components/new-user-header';
import { NewUserBottomNav } from '@/components/new-user-bottom-nav';

function NewUserLayoutContent({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
           <div className="max-w-[1440px] mx-auto p-4">
             <NewUserHeader />
           </div>
        </header>
        <main className="w-full flex-1 overflow-y-auto bg-background">
            {children}
        </main>
        <NewUserBottomNav />
    </div>
  );
}

export default function NewUserLayout({ children }: { children: React.ReactNode }) {
  return (
      <NewUserLayoutContent>{children}</NewUserLayoutContent>
  )
}
