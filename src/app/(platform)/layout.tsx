'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Users,ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const PlatformHeader = () => {
    return (
        <header className="bg-background sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="AstraCore Logo" width={132} height={49} />
                        <div className="w-px h-12 bg-gray-300" />
                        <h1 className="text-4xl font-gilroy-bold text-black">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="bg-white rounded-full">
                            <Bell className="h-6 w-6" />
                        </Button>
                        <Button className="bg-white text-black rounded-full h-14 px-10 text-lg font-gilroy-medium hover:bg-gray-100">
                            <Users className="mr-2 h-6 w-6"/>
                            Employee Management
                        </Button>
                        <div className="w-px h-12 bg-gray-300" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Avatar className="h-14 w-14">
                                        <AvatarImage src="https://placehold.co/55x55" alt="Balaji Naik" />
                                        <AvatarFallback>BN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-gilroy-medium text-lg">Balaji Naik</p>
                                        <p className="text-gray-500 text-base">Super Admin</p>
                                    </div>
                                    <ChevronDown />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href="/settings">Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href="/">Log out</Link></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};


const PlatformBottomNav = () => {
    // A placeholder for the bottom navigation from the design
    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-164px)] max-w-[1276px] z-20">
             <div className="bg-neutral-900/20 rounded-[50px] border border-gray-300 backdrop-blur-[5px] p-2">
                 <div className="flex items-center justify-between">
                     {/* Placeholder for nav items */}
                     <p className="text-white text-center w-full py-6">Bottom Navigation Placeholder</p>
                 </div>
             </div>
        </nav>
    )
}


export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
        <PlatformHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        {/* The bottom nav from the design is complex and seems to be for a different view.
            I'm leaving it out for now to focus on the main dashboard content.
            We can add it back later if needed.
        <PlatformBottomNav />
        */}
    </div>
  );
}
