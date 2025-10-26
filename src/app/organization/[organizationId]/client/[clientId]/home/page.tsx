
"use client";

import React, { Suspense } from "react";
import { useUser } from "@/context/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import ExistingClientHomePage from "./existing-client-home";
import NewUserHomePage from "@/app/organization/[organizationId]/client/lead/[leadId]/home/new-user-home";

function ClientHomePageContent() {
  const { user, loading } = useUser();

  if (loading) {
    return <HomePageSkeleton />;
  }

  if (!user) {
    return null; // Or some other fallback/error state
  }

  if (user.team === "New User") {
    return (
      <NewUserHomePage />
    );
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

export default function ClientHomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <ClientHomePageContent />
    </Suspense>
  );
}
