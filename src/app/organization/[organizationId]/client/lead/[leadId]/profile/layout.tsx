import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 p-4">
          <Skeleton className="h-48 w-full rounded-[50px]" />
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
