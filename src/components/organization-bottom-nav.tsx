
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import HomeIcon from './icons/home-icon';
import MeetingsIcon from './icons/meetings-icon';
import ProjectsIcon from './icons/projects-icon';
import VendorsIcon from './icons/vendors-icon';
import LeadsIcon from './icons/leads-icon';
import { useUser } from '@/context/user-context';
import { GanttChartSquare } from 'lucide-react';

const navItems = [
    { href: `/home`, icon: HomeIcon, label: "Home" },
    { href: `/tasks`, icon: GanttChartSquare, label: "Tasks" },
    { href: `/meetings`, icon: MeetingsIcon, label: "Meet" },
    { href: `/projects`, icon: ProjectsIcon, label: "Projects" },
    { href: `/leads`, icon: LeadsIcon, label: "Leads" },
    { href: `/vendors`, icon: VendorsIcon, label: "Vendors" },
];

export const OrganizationBottomNav = () => {
    const { user, loading } = useUser();
    const pathname = usePathname();
    const params = useParams();
    const organizationId = params.organizationId as string;
    
    if (loading || !user) {
        return null;
    }
    
    const canViewTasks = user.team === 'Project Manager' || user.team === 'Architect' || user.team === 'Site Supervisor' || user.roleType === 'superAdmin';

    const visibleNavItems = navItems.filter(item => {
        if (item.href === '/tasks') {
            return canViewTasks;
        }
        return true;
    })


    return (
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-4 flex justify-center">
             <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0 w-full md:w-auto max-w-lg">
                <div className="relative w-full bg-black/10 dark:bg-black/20 rounded-full backdrop-blur-[5px] p-2 md:p-4">
                    <div className="flex items-center justify-around md:justify-center md:gap-4">
                        {visibleNavItems.map((item) => {
                            const baseHref = `/organization/${organizationId}${item.href}`;
                            const isActive = pathname.startsWith(baseHref);
                            return (
                                <Link href={baseHref} key={item.label} title={item.label} className="flex-shrink-0">
                                    <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                                        <div className={cn(
                                            "flex flex-row items-center justify-center gap-1.5 transition-all duration-300 ease-in-out",
                                            "rounded-full h-[54px] md:h-14",
                                            isActive ? "bg-primary text-white px-4" : "bg-black/20 dark:bg-black/30 text-white w-[54px] md:w-14 hover:bg-primary/10 hover:text-primary"
                                        )}>
                                            <item.icon className="w-6 h-6 shrink-0" />
                                            <span className={cn(
                                                "text-xs md:text-base font-medium whitespace-nowrap transition-all duration-300 ease-in-out",
                                                isActive ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
                                            )}>{item.label}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
