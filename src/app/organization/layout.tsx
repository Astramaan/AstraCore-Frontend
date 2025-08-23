
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Home, Calendar, GanttChartSquare, Users, Briefcase, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const OrganizationHeader = () => (
    <header className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
            <Logo />
        </div>
        <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="bg-white rounded-full h-14 w-14">
                <Bell className="h-6 w-6" />
            </Button>
            <Button className="bg-white text-black rounded-full h-14 px-10 text-lg font-medium hover:bg-gray-100 hidden md:flex">
                <Users className="mr-2 h-6 w-6"/>
                Employee Management
            </Button>
            <div className="flex items-center gap-2">
                <Avatar className="h-14 w-14">
                    <AvatarImage src="https://placehold.co/55x55" data-ai-hint="person portrait" />
                    <AvatarFallback>BN</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-lg font-medium">Balaji Naik</p>
                    <p className="text-base text-grey-2">Super Admin</p>
                </div>
            </div>
        </div>
    </header>
);

const OrganizationBottomNav = () => {
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
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-20 px-4">
             <div className="relative mx-auto h-auto bg-neutral-900/20 rounded-[50px] border border-grey-1 backdrop-blur-[5px] py-4 px-6 max-w-screen-lg">
                <div className="flex items-center justify-around gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                             <Link href={item.href} key={item.label} className="flex-1 md:flex-none">
                                <div className={cn(
                                    "flex items-center justify-center text-center gap-1.5 p-2 rounded-[40px] transition-colors duration-200 h-full md:gap-2.5 md:p-5 md:rounded-[50px] min-w-max",
                                    isActive ? "bg-primary text-white" : "bg-white text-black"
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


export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <main className="max-w-[1440px] mx-auto w-full flex-1 overflow-y-auto bg-background pb-32 md:pb-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 space-y-6">
            <OrganizationHeader />
            {children}
        </main>
        <OrganizationBottomNav />
    </div>
  );
}
