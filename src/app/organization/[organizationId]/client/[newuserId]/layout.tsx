
'use client';

import React, from 'react';
import { UserProvider } from '@/context/user-context';


function NewUserLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="w-full flex-1 overflow-y-auto bg-background">
            {children}
        </main>
    </div>
  );
}

export default function NewUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <NewUserLayoutContent>{children}</NewUserLayoutContent>
    </UserProvider>
  )
}

    