
'use client';

import { Award, GanttChartSquare, Home, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export const ClientBottomNav = () => {
    const pathname = usePathname();
    const params = useParams();
    const organizationId = params.organizationId as string;
    const newuserId = params.newuserId as string;

    const navItems = [
        { href: `/organization/${organizationId}/client/${newuserId}/home`, icon: Home, label: "Home" },
        { href: `/organization/${organizationId}/client/${newuserId}/packages`, icon: Award, label: "Packages" },
        { href: `/organization/${organizationId}/client/${newuserId}/projects`, icon: GanttChartSquare, label: "Projects" },
        { href: `/organization/${organizationId}/client/${newuserId}/profile`, icon: User, label: "Profile" },
    ];

    return (
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-4 flex justify-center">
             <div className="relative w-full md:w-auto bg-neutral-900/20 rounded-full backdrop-blur-[5px] p-4">
                <div className="flex items-center justify-around md:justify-center md:gap-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                             <Link href={item.href} key={item.label} title={item.label} className="flex-shrink-0">
                                <div className={cn(
                                    "flex flex-col md:flex-row items-center justify-center text-center gap-0 md:gap-1.5 transition-colors duration-200",
                                    "lg:gap-2.5 md:py-3 rounded-full min-w-max",
                                    "h-16 w-16 md:h-12 md:w-auto px-1 md:px-4 lg:h-[54px]",
                                    isActive ? "bg-primary text-white" : "bg-white text-black hover:bg-white hover:text-primary"
                                )}>
                                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                                    <span className="text-xs font-medium lg:text-lg whitespace-nowrap">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
