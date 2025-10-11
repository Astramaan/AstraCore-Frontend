"use client";

import React, { Suspense, useEffect } from "react";
import { useUser } from "@/context/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import ExistingClientHomePage from "./existing-client-home";
import { useRouter } from "next/navigation";
import NewUserHomePage from "@/app/organization/[organizationId]/client/lead/[leadId]/home/new-user-home";

function ClientHomePageContent({
  params,
}: {
  params: { organizationId: string; clientId: string };
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.team === "New User") {
      // This user is a lead, redirect to the lead homepage
      router.replace(
        `/organization/${user.organizationId}/client/lead/${user.userId}/home`,
      );
    }
  }, [user, loading, router]);

  if (loading) {
    return <HomePageSkeleton />;
  }

  if (!user) {
    return null; // Or some other fallback/error state
  }

  // For existing clients
  return <ExistingClientHomePage />;
}

const HomePageSkeleton = () => (
  <div className="p-4 md:p-8">
    <Skeleton className="h-48 w-full rounded-[50px]" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <Skeleton className="h-64 w-full rounded-[50px]" />
      <Skeleton className="h-64 w-full rounded-[50px]" />
      <Skeleton className="h-64 w-full rounded-[50px] lg:col-span-1 md:col-span-2" />
    </div>
  </div>
);

export default function ClientHomePage({
  params,
}: {
  params: { organizationId: string; clientId: string };
}) {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <ClientHomePageContent params={params} />
    </Suspense>
  );
}
