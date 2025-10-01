

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { PlatformSidebar } from '@/components/platform-sidebar';
import NotificationBellIcon from '@/components/icons/notification-bell-icon';
import { Skeleton } from '@/components/ui/skeleton';


const PlatformHeader = () => {
    const pathname = usePathname();
    let pageTitle = 'Dashboard';

    if (pathname.startsWith('/platform/organizations')) {
        pageTitle = 'Organizations';
    } else if (pathname.startsWith('/platform/all-projects')) {
        pageTitle = 'All Projects';
    } else if (pathname.startsWith('/platform/settings')) {
        pageTitle = 'Settings';
    }

    return (
        <header className="bg-white sticky top-0 z-10 border-b-[0.50px] border-stone-300">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                             <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-64">
                                    <PlatformSidebar />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                         <div className="relative w-80 hidden lg:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                            <Input placeholder="Search Task, Meetings, Projects..." className="pl-11 rounded-[10px] border-stone-300"/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};


function PlatformLayoutContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex">
            <div className="hidden md:block w-64 border-r border-stone-300">
                <PlatformSidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-y-auto">
                {children}
                </main>
            </div>
        </div>
    );
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <PlatformLayoutContent>{children}</PlatformLayoutContent>
    )
}
