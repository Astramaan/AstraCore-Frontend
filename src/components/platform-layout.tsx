"use client";

import React from "react";
import { UserProvider } from "@/context/user-context";
import { PlatformBottomNav } from "@/components/platform-bottom-nav";

function PlatformLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <PlatformBottomNav />
    </div>
  );
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <PlatformLayoutContent>{children}</PlatformLayoutContent>
    </UserProvider>
  );
}
