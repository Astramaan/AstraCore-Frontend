import React from "react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 p-4">
          <Skeleton className="h-20 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
