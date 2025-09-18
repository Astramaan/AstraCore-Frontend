
'use client';

import React, from 'react';
import { UserProvider } from '@/context/user-context';


function LeadLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="w-full flex-1 overflow-y-auto bg-background">
            {children}
        </main>
    </div>
  );
}

export default function LeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <LeadLayoutContent>{children}</LeadLayoutContent>
    </UserProvider>
  )
}
