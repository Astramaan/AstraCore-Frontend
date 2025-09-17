
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import HomeIcon from './icons/home-icon';
import MeetingsIcon from './icons/meetings-icon';
import ProjectsIcon from './icons/projects-icon';
import VendorsIcon from './icons/vendors-icon';
import LeadsIcon from './icons/leads-icon';
import { useUser } from '@/context/user-context';


export const OrganizationBottomNav = () => {
    const { user } = useUser();
    const pathname = usePathname();

    const baseNavItems = [
        { href: "/organization/home", icon: HomeIcon, label: "Home" },
        { href: "/organization/meetings", icon: MeetingsIcon, label: "Meetings" },
        { href: "/organization/projects", icon: ProjectsIcon, label: "Projects" },
    ];
    
    let navItems = [...baseNavItems];

    if (user?.roleType === 'superAdmin') {
        navItems.push({ href: "/organization/leads", icon: LeadsIcon, label: "Leads" });
        navItems.push({ href: "/organization/vendors", icon: VendorsIcon, label: "Vendors" });
    } else if (user?.team === 'Project Manager') {
        navItems.push({ href: "/organization/vendors", icon: VendorsIcon, label: "Vendors" });
    } else {
        // Fallback for other roles, assuming they might need vendors
        navItems.push({ href: "/organization/vendors", icon: VendorsIcon, label: "Vendors" });
    }


    return (
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-4 flex justify-center">
             <div className="relative w-full md:w-auto bg-neutral-900/20 rounded-full border border-grey-1 backdrop-blur-[5px] p-2 md:p-4">
                <div className="flex items-center justify-around md:justify-center md:gap-4">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
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
