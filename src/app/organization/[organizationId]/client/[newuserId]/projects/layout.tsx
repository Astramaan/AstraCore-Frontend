
'use client';

import React, from 'react';

function ProjectsLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="w-full flex-1 overflow-y-auto bg-background">
            {children}
        </main>
    </div>
  );
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
      <ProjectsLayoutContent>{children}</ProjectsLayoutContent>
  )
}
