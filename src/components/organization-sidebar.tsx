
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, GanttChartSquare, Users, FileText, Bot, LogOut, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './logo';

const navItems = [
    { href: "/organization/home", icon: Home, label: "Home" },
    { href: "/organization/meetings", icon: Calendar, label: "Meetings" },
    { href: "/organization/projects", icon: GanttChartSquare, label: "Projects" },
    { href: "/organization/leads", icon: Users, label: "Leads" },
    { href: "/organization/vendors", icon: Briefcase, label: "Vendors" },
    { href: "/organization/blog", icon: FileText, label: "Blog" },
    { href: "/organization/snag-list", icon: Bot, label: "Snag List" },
];

const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <li className="relative">
            <Link href={item.href} className={cn(
                "flex items-center gap-3 text-lg p-3 rounded-r-none rounded-l-[10px]",
                isActive ? "text-primary bg-primary/10" : "text-zinc-900 hover:bg-primary/5"
            )}>
                <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
                <span>{item.label}</span>
            </Link>
            {isActive && <div className="absolute left-0 top-0 h-full w-[5px] bg-primary rounded-tr-[3px] rounded-br-[3px]" />}
        </li>
    );
};

export function OrganizationSidebar() {
    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-4 pt-8">
                 <Link href="/platform/dashboard" className="ml-4">
                    <Logo />
                </Link>
            </div>
            <nav className="flex-grow px-4 mt-8">
                <ul className="space-y-2">
                    {navItems.map(item => <NavItem key={item.label} item={item} />)}
                </ul>
            </nav>
            <div className="p-4 mt-auto">
                 <Link href="/" className="flex items-center gap-3 text-lg p-3 text-zinc-900">
                    <LogOut className="h-6 w-6" />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
}
