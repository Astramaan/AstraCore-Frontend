
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, Menu, Search, Home, Calendar, GanttChartSquare, Users, FileText, Bot, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { OrganizationSidebar } from '@/components/organization-sidebar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const OrganizationHeader = () => {
    const pathname = usePathname();
    const getTitle = () => {
        if (pathname.includes('/organization/home')) return 'Home';
        if (pathname.includes('/organization/meetings')) return 'Meetings';
        if (pathname.includes('/organization/projects')) return 'Projects';
        if (pathname.includes('/organization/leads')) return 'Leads';
        if (pathname.includes('/organization/vendors')) return 'Vendors';
        if (pathname.includes('/organization/blog')) return 'Blog';
        if (pathname.includes('/organization/snag-list')) return 'Snag List';
        return 'Home';
    }

    return (
        <header className="bg-white sticky top-0 z-10 border-b-[0.50px] border-stone-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                           <Logo />
                        </div>
                         <div className="hidden md:block">
                            <Logo />
                        </div>
                        <h1 className="text-2xl font-medium text-zinc-900 hidden md:block">{getTitle()}</h1>
                    </div>
                    
                    <div className="flex items-center gap-6">
                         <div className="relative w-80 hidden lg:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                            <Input placeholder="Search Task, Meetings, Projects..." className="pl-11 rounded-[10px] border-stone-300"/>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="relative rounded-full">
                                <Bell className="h-6 w-6" />
                                <div className="w-[10px] h-[10px] left-[15px] top-[5px] absolute bg-red-500 rounded-full border-2 border-white" />
                            </Button>
                            <div className="w-px h-10 bg-stone-300 hidden md:block" />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="https://placehold.co/40x40" alt="Anil Kumar" data-ai-hint="person portrait"/>
                                            <AvatarFallback>AK</AvatarFallback>
                                        </Avatar>
                                        <div className="hidden md:block">
                                            <p className="font-medium text-lg">Anil Kumar</p>
                                            <p className="text-stone-500 text-sm -mt-1">Senior Architect</p>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Link href="/settings">Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const navItems = [
    { href: "/organization/home", icon: Home, label: "Home" },
    { href: "/organization/meetings", icon: Calendar, label: "Meetings" },
    { href: "/organization/projects", icon: GanttChartSquare, label: "Projects" },
    { href: "/organization/leads", icon: Users, label: "Leads" },
    { href: "/organization/vendors", icon: Briefcase, label: "Vendors" },
];

const OrganizationBottomNav = () => {
    const pathname = usePathname();
    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-transparent z-20">
            <div className="relative h-full flex items-end justify-center pb-2">
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[600px] h-20 bg-white rounded-t-3xl shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.1)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-white rounded-b-xl flex items-center justify-center">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
               
                <nav className="relative w-full md:w-[600px] px-2">
                    <ul className="flex justify-around items-center">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.label} className="flex-1">
                                    <Link href={item.href}>
                                        <div className={cn(
                                            "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200",
                                            isActive ? "text-primary" : "text-muted-foreground"
                                        )}>
                                            <div className={cn(
                                                "p-3 rounded-full transition-colors duration-200",
                                                isActive && "bg-primary text-white"
                                            )}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-medium truncate">{item.label}</span>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}


export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex flex-col">
            <OrganizationHeader />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background pb-28">
              {children}
            </main>
            <OrganizationBottomNav />
        </div>
    </div>
  );
}
