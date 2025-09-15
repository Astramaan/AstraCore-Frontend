
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Users, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { HabiLogo } from '@/components/habi-logo';
import { NotificationPopover } from '@/components/notification-popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import TeamIcon from './icons/team-icon';

export const OrganizationHeader = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');

    let pageTitle = '';

    if (pathname.startsWith('/organization/home')) {
        pageTitle = 'Home';
    } else if (pathname.startsWith('/organization/meetings')) {
        pageTitle = 'Meetings';
    } else if (pathname.startsWith('/organization/projects')) {
        pageTitle = 'Projects';
    } else if (pathname.startsWith('/organization/leads')) {
        pageTitle = 'Leads';
    } else if (pathname.startsWith('/organization/vendors')) {
        pageTitle = 'Vendors';
    } else if (pathname.startsWith('/organization/teams')) {
        pageTitle = 'Teams Management';
    } else if (pathname.startsWith('/organization/subscription-management')) {
        pageTitle = 'Subscription management'
    } else if (pathname.startsWith('/organization/profile')) {
        pageTitle = 'My Profile'
    }
    
    const isTeamsActive = pathname.startsWith('/organization/teams');
    const teamsButtonText = userRole === 'Super Admin' ? 'Teams Management' : 'Teams';

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
            <Link href="/organization/teams">
              <Button className={cn(
                  "rounded-full h-[54px] px-4 lg:px-10 text-base lg:text-lg font-medium flex items-center",
                  isTeamsActive ? "bg-primary text-white" : "bg-white text-black hover:bg-primary/10 hover:text-primary"
              )}>
                  <TeamIcon className="mr-2 h-6 w-6"/>
                  <span>{teamsButtonText}</span>
              </Button>
            </Link>
            <Link href="/organization/profile" className="flex items-center gap-2">
                <Avatar className="h-[54px] w-[54px]">
                    <AvatarImage src="https://placehold.co/55x55.png" data-ai-hint="person portrait" />
                    <AvatarFallback>BN</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                    <p className="text-base lg:text-lg font-medium">Balaji Naik</p>
                    <p className="text-sm lg:text-base text-grey-2">Super Admin</p>
                </div>
            </Link>
        </div>
         <div className="md:hidden flex items-center gap-2">
            <NotificationPopover />
            <Sheet>
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
                        <Link href="/organization/profile" className="flex items-center gap-2">
                            <Avatar className="h-[54px] w-[54px]">
                                <AvatarImage src="https://placehold.co/55x55.png" data-ai-hint="person portrait" />
                                <AvatarFallback>BN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-base font-medium">Balaji Naik</p>
                                <p className="text-sm text-grey-2">Super Admin</p>
                            </div>
                        </Link>
                        <Separator />
                        <Link href="/organization/teams">
                          <Button className={cn(
                              "rounded-full h-12 w-full justify-start px-4 text-base font-medium flex items-center",
                              isTeamsActive ? "bg-primary text-white" : "bg-white text-black hover:bg-primary/10 hover:text-primary"
                          )}>
                              <TeamIcon className="mr-2 h-6 w-6"/>
                              <span>{teamsButtonText}</span>
                          </Button>
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </header>
    );
};
