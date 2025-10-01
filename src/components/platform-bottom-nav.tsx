
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, GanttChartSquare, Settings } from 'lucide-react';
import OrganizationIcon from './icons/organization-icon';

const navItems = [
    { href: "/platform/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/platform/organizations", icon: OrganizationIcon, label: "Organizations" },
    { href: "/platform/all-projects", icon: GanttChartSquare, label: "All Projects" },
    { href: "/platform/settings", icon: Settings, label: "Settings" },
];

const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(item.href);

    return (
        <li>
            <Link href={item.href} className={cn(
                "flex flex-col items-center justify-center text-center gap-1 p-2 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}>
                <item.icon className="h-6 w-6" />
                <span className="text-xs">{item.label}</span>
            </Link>
        </li>
    );
};

export function PlatformBottomNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <nav>
                <ul className="flex justify-around items-center h-16">
                    {navItems.map(item => <NavItem key={item.label} item={item} />)}
                </ul>
            </nav>
        </div>
    );
}
