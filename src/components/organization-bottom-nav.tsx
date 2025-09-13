
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import HomeIcon from './icons/home-icon';
import MeetingsIcon from './icons/meetings-icon';
import ProjectsIcon from './icons/projects-icon';
import LeadsIcon from './icons/leads-icon';
import VendorsIcon from './icons/vendors-icon';
import SnagListIcon from './icons/snag-list-icon';


export const OrganizationBottomNav = () => {
    const navItems = [
        { href: "/organization/home", icon: HomeIcon, label: "Home" },
        { href: "/organization/meetings", icon: MeetingsIcon, label: "Meetings" },
        { href: "/organization/projects", icon: ProjectsIcon, label: "Projects" },
        { href: "/organization/leads", icon: LeadsIcon, label: "Leads" },
        { href: "/organization/vendors", icon: VendorsIcon, label: "Vendors" },
        { href: "/organization/snag-list", icon: SnagListIcon, label: "Snag List" },
    ];

    const pathname = usePathname();

    return (
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-2 flex justify-center">
             <div className="relative mx-auto h-auto bg-neutral-900/20 rounded-[50px] border border-grey-1 backdrop-blur-[5px] py-2 px-2 max-w-fit">
                <div className="flex items-center justify-center gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                             <Link href={item.href} key={item.label} className="flex-1 lg:flex-none">
                                <div className={cn(
                                    "flex flex-col lg:flex-row items-center justify-center text-center gap-1 transition-colors duration-200",
                                    "lg:gap-2.5 lg:py-3 lg:px-5 lg:rounded-full min-w-max",
                                    "h-12 w-12 lg:h-[54px] p-2 rounded-full",
                                    isActive ? "bg-primary text-white" : "bg-white text-black hover:bg-white hover:text-primary"
                                )}>
                                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                                    <span className="text-xs font-medium lg:text-lg whitespace-nowrap hidden lg:inline">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
