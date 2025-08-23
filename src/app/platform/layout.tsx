
'use client';

import React from 'react';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
    </div>
  );
}
