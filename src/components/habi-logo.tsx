
import { cn } from "@/lib/utils";
import React from "react";

export const HabiLogo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-3", className)}>
        <div>
            <h2 className="text-3xl font-bold tracking-tighter text-primary">habi</h2>
            <p className="text-[0.5rem] tracking-[0.16em] text-center text-black">THE WAY OF LIVING</p>
        </div>
    </div>
);
