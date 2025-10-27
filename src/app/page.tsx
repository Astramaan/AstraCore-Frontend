
"use client";

import React from "react";
import AuthForm from "@/components/auth-form";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-0 md:p-4">
      <div className="flex flex-col md:flex-row overflow-hidden md:rounded-[50px] bg-card text-card-foreground w-full max-w-4xl md:w-auto h-screen md:h-auto items-stretch">
        {/* Image Section */}
        <div className="relative w-full h-[350px] shrink-0 md:w-[396px] md:h-auto">
          <div className="h-full relative md:pl-4">
            <Image
              src="https://images.unsplash.com/photo-1637525609391-ab1919948bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8Z3JlZW4lMjBncmFkaWVudHxlbnwwfHx8fDE3NTk3NTM3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Astramaan construction site"
              fill
              priority
              className="object-cover rounded-none md:rounded-l-[40px]"
              data-ai-hint="construction site company building"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-card dark:bg-card rounded-t-[50px] px-4 py-8 -mt-28 md:mt-0 relative flex flex-col md:py-6 md:pl-10 md:pr-6 md:w-[448px] w-full flex-1">
          <div className="mx-auto w-full max-w-md flex flex-col h-full">
            <HabiLogo />
            <div
              className={`mt-8 flex-grow flex flex-col`}
            >
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
