
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Users, Menu, LogOut } from 'lucide-react';
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
    const { user, logout } = useUser();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    
    const userName = user?.name || 'User';
    const userTeam = user?.team || 'Team';

    let pageTitle = '';

    if (pathname.includes('/home')) {
        pageTitle = 'Home';
    } else if (pathname.includes('/tasks')) {
        pageTitle = 'Tasks';
    } else if (pathname.includes('/meetings')) {
        pageTitle = 'Meet';
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
                    <div className="w-px h-8 bg-stone-300 hidden md:block" />
                    <h2 className="hidden md:block text-xl md:text-2xl lg:text-[32px] lg:leading-[40px] font-semibold text-black dark:text-white">
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
                        <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                             <Button className={cn(
                                "rounded-full h-[54px] px-4 lg:px-10 text-base lg:text-lg font-medium flex items-center bg-black/20 dark:bg-black/30 backdrop-blur-sm hover:bg-primary/10",
                                isTeamsActive ? "bg-primary text-white dark:text-primary-foreground" : "text-black dark:text-white"
                            )}>
                                <TeamIcon className={cn(
                                    "mr-2 h-6 w-6",
                                    isTeamsActive ? "text-white dark:text-black" : "text-white dark:text-white"
                                )}/>
                                <span className={cn(
                                    isTeamsActive ? "text-white dark:text-black" : "text-white dark:text-white"
                                )}>{teamsButtonText}</span>
                            </Button>
                        </div>
                    </Link>
                    <Link href={`/organization/${organizationId}/profile`} className="flex items-center gap-2">
                        <Avatar className="h-[54px] w-[54px]">
                            <AvatarImage src="https://images.unsplash.com/photo-1615109398623-88346a601842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxNYW58ZW58MHx8fHwxNzU5NzQ3MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080" data-ai-hint="person portrait" />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block">
                            <p className="text-base lg:text-lg font-medium text-black dark:text-white">{userName}</p>
                            <p className="text-sm lg:text-base text-black/80 dark:text-white/80">{userTeam}</p>
                        </div>
                    </Link>
                </>
            )}
        </div>
         <div className="md:hidden flex items-center gap-2">
            <NotificationPopover />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-white dark:bg-card rounded-full h-12 w-12 hover:bg-primary/10 hover:text-primary">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-card">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-4 pt-8">
                            {user?.role !== 'CLIENT' && (
                                <>
                                    <Link href={`/organization/${organizationId}/profile`} className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                                        <Avatar className="h-[54px] w-[54px]">
                                            <AvatarImage src="https://images.unsplash.com/photo-1615109398623-88346a601842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxNYW58ZW58MHx8fHwxNzU5NzQ3MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080" data-ai-hint="person portrait" />
                                            <AvatarFallback>{userInitials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-base font-medium">{userName}</p>
                                            <p className="text-sm text-grey-2">{userTeam}</p>
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
                        <div className="mt-auto">
                            <Button variant="outline" onClick={logout} className="w-full justify-center rounded-full h-12 text-base text-destructive hover:bg-destructive/10 hover:text-destructive">
                                <LogOut className="mr-2 h-5 w-5" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </header>
    );
};
