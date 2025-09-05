

'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { PlatformSidebar } from '@/components/platform-sidebar';
import { usePathname } from 'next/navigation';


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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                        <h2 className="text-2xl font-medium text-zinc-900 hidden md:block">{pageTitle}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                         <div className="relative w-80 hidden lg:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                            <Input placeholder="Search Task, Meetings, Projects..." className="pl-11 rounded-[10px] border-stone-300"/>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary">
                                <Bell className="h-6 w-6" />
                                <div className="w-[10px] h-[10px] left-[15px] top-[5px] absolute bg-red-500 rounded-full border-2 border-white" />
                            </Button>
                            <div className="w-px h-10 bg-stone-300 hidden md:block" />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="https://placehold.co/40x40.png" alt="Anil Kumar" data-ai-hint="person portrait"/>
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
                                    <DropdownMenuItem><Link href="/organization/profile">Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/platform/settings">Settings</Link></DropdownMenuItem>
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


export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
        <div className="hidden md:block w-64 border-r border-stone-300">
            <PlatformSidebar />
        </div>
        <div className="flex-1 flex flex-col">
            <PlatformHeader />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
        </div>
    </div>
  );
}

    
