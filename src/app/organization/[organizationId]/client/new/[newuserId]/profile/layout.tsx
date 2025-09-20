

'use client';

import React from 'react';

function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="w-full flex-1 overflow-y-auto bg-background">
            {children}
        </main>
    </div>
  );
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
      <ProfileLayoutContent>{children}</ProfileLayoutContent>
  )
}
