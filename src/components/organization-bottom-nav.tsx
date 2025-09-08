
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, GanttChartSquare, Users, Briefcase, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';


export const OrganizationBottomNav = () => {
    const navItems = [
        { href: "/organization/home", icon: Home, label: "Home" },
        { href: "/organization/meetings", icon: Calendar, label: "Meetings" },
        { href: "/organization/projects", icon: GanttChartSquare, label: "Projects" },
        { href: "/organization/leads", icon: Users, label: "Leads" },
        { href: "/organization/vendors", icon: Briefcase, label: "Vendors" },
        { href: "/organization/snag-list", icon: Bot, label: "Snag List" },
    ];

    const pathname = usePathname();

    return (
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-2 md:px-4 w-full">
             <div className="relative mx-auto h-auto bg-neutral-900/20 rounded-[50px] border border-grey-1 backdrop-blur-[5px] py-4 px-4 max-w-screen-xl">
                <div className="flex items-center justify-around gap-4">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                             <Link href={item.href} key={item.label} className="flex-1 md:flex-none">
                                <div className={cn(
                                    "flex flex-col md:flex-row items-center justify-center text-center gap-1 transition-colors duration-200 h-full w-full",
                                    "md:gap-2.5 md:py-3 md:px-5 md:rounded-[50px] min-w-max",
                                    "h-[54px] w-[54px] rounded-full",
                                    isActive ? "bg-primary text-white" : "bg-white text-black hover:bg-white hover:text-primary"
                                )}>
                                    <item.icon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                    <span className="text-xs font-medium md:text-lg whitespace-nowrap hidden md:inline">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
