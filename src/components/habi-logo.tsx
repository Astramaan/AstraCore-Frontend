
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const HabiLogo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center", className)}>
        <Image src="/Astramaan_Logo.png" alt="Astramaan Logo" width={120} height={40} />
    </div>
);
