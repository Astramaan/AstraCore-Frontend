
'use client';

import React from 'react';
import { usePathname, useParams } from 'next/navigation';
import { HabiLogo } from '@/components/habi-logo';
import { useUser } from '@/context/user-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Button } from './ui/button';

export const ClientHeader = () => {
    const pathname = usePathname();
    const { user } = useUser();
    
    const userName = user?.name || 'User';
    const userInitials = userName.split(' ').map(n => n[0]).join('');

    let pageTitle = '';
    let showBookingButton = false;

    if (pathname.includes('/home')) {
        pageTitle = 'Book your free consultation';
        showBookingButton = true;
    } else if (pathname.includes('/packages')) {
        pageTitle = 'Packages';
    } else if (pathname.includes('/projects')) {
        pageTitle = 'Projects';
    } else if (pathname.includes('/profile')) {
        pageTitle = 'Profile';
    }

    return (
        <header className="flex flex-row justify-between items-center w-full gap-4">
            <div className="flex items-center gap-4">
                <HabiLogo />
                {pageTitle && (
                    <>
                        <div className="w-px h-8 bg-stone-300 hidden md:block" />
                        <h2 className="hidden md:block text-2xl font-semibold text-zinc-900">
                           {pageTitle}
                        </h2>
                    </>
                )}
            </div>

            

             <div className="md:hidden">
                <Link href={`/organization/${user?.organizationId}/client/${user?.userId}/profile`}>
                    <Avatar className="h-[54px] w-[54px]">
                        <AvatarImage src="https://placehold.co/55x55.png" data-ai-hint="person portrait" />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    );
};
