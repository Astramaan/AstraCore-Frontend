'use client';

import React from 'react';
import { ClientBottomNav } from '@/components/client-bottom-nav';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative">
        <main className="w-full flex-1 bg-background">
            {children}
        </main>
        <ClientBottomNav />
    </div>
  );
}
