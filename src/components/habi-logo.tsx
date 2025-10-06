import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const HabiLogo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center", className)}>
        <Image
            src="/images/Astramaan_Logo.png"
            alt="Astramaan Logo"
            width={72}
            height={24}
        />
    </div>
);
