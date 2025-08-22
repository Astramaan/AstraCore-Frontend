'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Users, ChevronDown, LayoutGrid, BarChart2, Briefcase, Users2, Headset, Settings } from 'lucide-react';
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
                                        <AvatarImage src="https://placehold.co/55x55" alt="Balaji Naik" data-ai-hint="person portrait"/>
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

const navItems = [
    { href: "/dashboard", icon: <LayoutGrid />, label: "Dashboard" },
    { href: "/onboarding", icon: <Users2 />, label: "Onboarding Ma.." },
    { href: "/subscription", icon: <Briefcase />, label: "Subscription Ma.." },
    { href: "/organizations", icon: <Users />, label: "Organization Ma.." },
    { href: "/support", icon: <Headset />, label: "Support" },
    { href: "/analytics", icon: <BarChart2 />, label: "Product Analytics" }
];


const PlatformNav = () => {
    const [activeItem, setActiveItem] = React.useState('Dashboard');
    
    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-164px)] max-w-[1276px] z-20">
             <div className="bg-neutral-900/20 rounded-[50px] border border-gray-300 backdrop-blur-[5px] p-2 relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-[5px] bg-white rounded-full" />
                 <div className="flex items-center justify-around">
                    {navItems.map((item) => (
                        <Link href={item.href} key={item.label}>
                            <div
                                onClick={() => setActiveItem(item.label)}
                                className={`flex items-center gap-2.5 p-5 rounded-[50px] cursor-pointer transition-colors duration-300 ${activeItem === item.label ? 'bg-primary text-white' : 'bg-white text-black'}`}
                            >
                                {item.icon}
                                <span className="text-lg font-gilroy-medium whitespace-nowrap">{item.label}</span>
                            </div>
                        </Link>
                    ))}
                 </div>
             </div>
        </nav>
    )
}


export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-32">
        <PlatformHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <PlatformNav />
    </div>
  );
}
