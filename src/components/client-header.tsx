
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { HabiLogo } from '@/components/habi-logo';
import { useUser } from '@/context/user-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Button } from './ui/button';

export const ClientHeader = () => {
    const pathname = usePathname();
    const { user } = useUser();
    const [pageTitle, setPageTitle] = useState('');
    
    const userName = user?.name || 'User';
    const userInitials = userName.split(' ').map(n => n[0]).join('');

    useEffect(() => {
        if (user) {
            const isNewUser = user.team === 'New User';
            
            if (pathname.includes('/home')) {
                setPageTitle(isNewUser ? 'Book your free consultation' : 'Home');
            } else if (pathname.includes('/packages')) {
                setPageTitle('Packages');
            } else if (pathname.includes('/project')) {
                setPageTitle('My Project');
            } else if (pathname.includes('/profile')) {
                setPageTitle('Profile');
            }
        }
    }, [user, pathname]);


    return (
        <header className="flex flex-row justify-between items-center w-full gap-4">
            <div className="flex items-center gap-4">
                <HabiLogo />
                {pageTitle && (
                    <>
                        <div className="w-px h-8 bg-stone-300" />
                        <h2 className="text-xl md:text-2xl lg:text-[32px] lg:leading-[40px] font-semibold text-zinc-900">
                           {pageTitle}
                        </h2>
                    </>
                )}
            </div>

            <div className="hidden md:flex items-center gap-2 ml-auto">
                 <Link href={`/organization/${user?.organizationId}/client/${user?.userId}/profile`}>
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="https://placehold.co/55x55.png" data-ai-hint="person portrait" />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="text-left">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
            </div>

             <div className="md:hidden flex items-center gap-4 ml-auto">
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
