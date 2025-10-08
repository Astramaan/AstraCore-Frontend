
'use client';

import { GanttChartSquare, Video, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/user-context';
import HomeIcon from './icons/home-icon';

export const ClientBottomNav = () => {
    const pathname = usePathname();
    const params = useParams();
    const { user } = useUser();
    const organizationId = params.organizationId as string;
    const clientId = params.clientId as string;

    const navItems = [
        { href: `/organization/${organizationId}/client/${clientId}/home`, icon: HomeIcon, label: "Home" },
        { href: `/organization/${organizationId}/client/${clientId}/project`, icon: GanttChartSquare, label: "My Project" },
        { href: `/organization/${organizationId}/client/${clientId}/live`, icon: Video, label: "Live" },
        { href: `/organization/${organizationId}/client/${clientId}/profile`, icon: User, label: "Profile" },
    ];
    
    // Hide nav for new users who only see a simplified home page
    if (user?.team === 'New User') {
        return null;
    }


    return (
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-4 flex justify-center">
             <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0 w-full md:w-auto max-w-lg">
                <div className="relative w-full bg-black/20 dark:bg-black/30 rounded-full backdrop-blur-[5px] p-4">
                    <div className="flex items-center justify-around md:justify-center md:gap-4">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link href={item.href} key={item.label} title={item.label} className="flex-shrink-0 group">
                                    <div className="relative">
                                        <div className={cn(
                                            "flex flex-row items-center justify-center gap-1.5 transition-all duration-300 ease-in-out",
                                            "rounded-full h-[54px] md:h-14",
                                            isActive ? "bg-primary text-white dark:bg-primary dark:text-primary-foreground px-4" : "bg-black/20 dark:bg-black/30 text-white w-[54px] md:w-14 hover:bg-primary/10"
                                        )}>
                                            <item.icon className={cn("w-6 h-6 shrink-0", !isActive && "group-hover:text-primary")} />
                                            {isActive && (
                                                <span className={cn(
                                                    "text-xs md:text-base font-medium whitespace-nowrap"
                                                )}>{item.label}</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
