"use client";

import React from "react";
import { HabiLogo } from "@/components/habi-logo";

export const NewUserHeader = () => {
  const pageTitle = "Book your free consultation";

  return (
    <header className="flex flex-row justify-between items-center w-full gap-4">
      <div className="flex items-center gap-4">
        <HabiLogo />
        <div className="w-px h-8 bg-stone-300 hidden md:block" />
        <h2 className="text-xl md:text-2xl lg:text-[32px] lg:leading-[40px] font-semibold text-zinc-900">
          {pageTitle}
        </h2>
      </div>
      <div className="md:hidden flex items-center gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 md:hidden">
          {pageTitle}
        </h2>
      </div>
    </header>
  );
};
