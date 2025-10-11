"use client";

import React from "react";
import { UserProvider } from "@/context/user-context";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout now primarily serves to provide the UserContext to its children.
  // Route protection logic has been moved to the more specific layouts within this directory.
  return <UserProvider>{children}</UserProvider>;
}
