
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Users, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { HabiLogo } from '@/components/habi-logo';
import { NotificationPopover } from '@/components/notification-popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import TeamIcon from './icons/team-icon';
import { useUser } from '@/context/user-context';

export const OrganizationHeader = () => {
    const pathname = usePathname();
    const params = useParams();
    const organizationId = params.organizationId as string;
    const { user } = useUser();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    
    const userName = user?.name || 'User';
    const userTeam = user?.team || 'Team';
    const userRole = user?.role ? ` - ${user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}` : '';

    let pageTitle = '';

    if (pathname.includes('/home')) {
        pageTitle = 'Home';
    } else if (pathname.includes('/tasks')) {
        pageTitle = 'Tasks';
    } else if (pathname.includes('/meetings')) {
        pageTitle = 'Meetings';
    } else if (pathname.includes('/projects')) {
        pageTitle = 'Projects';
    } else if (pathname.includes('/leads')) {
        pageTitle = 'Leads';
    } else if (pathname.includes('/vendors')) {
        pageTitle = 'Vendors';
    } else if (pathname.includes('/teams')) {
        pageTitle = 'Teams Management';
    } else if (pathname.includes('/subscription-management')) {
        pageTitle = 'Subscription management'
    } else if (pathname.includes('/profile')) {
        pageTitle = 'My Profile'
    } else if (user?.role === 'CLIENT') {
        if (pathname.includes('/packages')) {
            pageTitle = 'Packages';
        }
    }
    
    const isTeamsActive = pathname.includes('/teams');
    const teamsButtonText = 'Teams Management';
    
    const userInitials = userName.split(' ').map(n => n[0]).join('');

    return (
    <header className="flex flex-row justify-between items-center w-full gap-4">
        <div className="flex items-center gap-4">
            <HabiLogo />
             {pageTitle && (
                <>
                    <div className="w-px h-8 bg-stone-300" />
                    <h2 className="text-xl md:text-2xl lg:text-[40px] lg:leading-[48px] font-semibold text-zinc-900">
                        {pageTitle}
                    </h2>
                </>
             )}
        </div>
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <NotificationPopover />
            {user?.role !== 'CLIENT' && (
                <>
                    <Link href={`/organization/${organizationId}/teams`}>
                        <Button className={cn(
                            "rounded-full h-[54px] px-4 lg:px-10 text-base lg:text-lg font-medium flex items-center",
                            isTeamsActive ? "bg-primary text-white" : "bg-white text-black hover:bg-primary/10 hover:text-primary"
                        )}>
                            <TeamIcon className="mr-2 h-6 w-6"/>
                            <span>{teamsButtonText}</span>
                        </Button>
                    </Link>
                    <Link href={`/organization/${organizationId}/profile`} className="flex items-center gap-2">
                        <Avatar className="h-[54px] w-[54px]">
                            <AvatarImage src="https://placehold.co/55x55.png" data-ai-hint="person portrait" />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block">
                            <p className="text-base lg:text-lg font-medium">{userName}</p>
                            <p className="text-sm lg:text-base text-grey-2">{userTeam}{userRole}</p>
                        </div>
                    </Link>
                </>
            )}
        </div>
         <div className="md:hidden flex items-center gap-2">
            <NotificationPopover />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-white rounded-full h-12 w-12 hover:bg-primary/10 hover:text-primary">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-white">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 pt-8">
                        {user?.role !== 'CLIENT' && (
                            <>
                                <Link href={`/organization/${organizationId}/profile`} className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                                    <Avatar className="h-[54px] w-[54px]">
                                        <AvatarImage src="https://placehold.co/55x55.png" data-ai-hint="person portrait" />
                                        <AvatarFallback>{userInitials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-base font-medium">{userName}</p>
                                        <p className="text-sm text-grey-2">{userTeam}{userRole}</p>
                                    </div>
                                </Link>
                                <Separator />
                                <Link href={`/organization/${organizationId}/teams`} onClick={() => setIsSheetOpen(false)}>
                                <Button className={cn(
                                    "rounded-full h-12 w-full justify-start px-4 text-base font-medium flex items-center",
                                    isTeamsActive ? "bg-primary text-white" : "bg-white text-black hover:bg-primary/10 hover:text-primary"
                                )}>
                                    <TeamIcon className="mr-2 h-6 w-6"/>
                                    <span>{teamsButtonText}</span>
                                </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </header>
    );
};
