
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
        pageTitle = 'Home';
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
                        <h2 className="hidden md:block text-xl md:text-2xl lg:text-[40px] lg:leading-[48px] font-semibold text-zinc-900">
                           {pageTitle === 'Home' ? "Book your free consultation" : pageTitle}
                        </h2>
                    </>
                )}
            </div>

            {showBookingButton && (
                 <div className="hidden md:flex items-center gap-4">
                    <Button asChild className="rounded-full h-[54px] px-8 text-lg">
                        <Link href="#book-consultation-section">Book Your Free Consultation</Link>
                    </Button>
                </div>
            )}

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
