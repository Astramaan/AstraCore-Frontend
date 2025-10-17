import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import EmployeeManagementContent from "./employee-management-content";

export default function EmployeeManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-8 p-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-40" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-64 rounded-full" />
              <Skeleton className="h-14 w-40 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-96 w-full rounded-[50px]" />
        </div>
      }
    >
      <EmployeeManagementContent />
    </Suspense>
  );
}
