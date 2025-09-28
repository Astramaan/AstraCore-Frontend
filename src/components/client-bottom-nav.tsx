
'use client';

import { Home, GanttChartSquare, Video, User, Layers } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/user-context';

export const ClientBottomNav = () => {
    const pathname = usePathname();
    const params = useParams();
    const { user } = useUser();
    const organizationId = params.organizationId as string;
    const clientId = params.clientId as string;

    const navItems = [
        { href: `/organization/${organizationId}/client/${clientId}/home`, icon: Home, label: "Home" },
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
             <div className="relative md:w-auto bg-black/10 rounded-full backdrop-blur-[5px] p-4">
                <div className="flex items-center justify-center gap-4">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                             <Link href={item.href} key={item.label} title={item.label} className="flex-shrink-0">
                                <div className={cn(
                                    "flex flex-col md:flex-row items-center justify-center text-center gap-0 md:gap-1.5 transition-colors duration-200",
                                    "lg:gap-2.5 md:py-3 rounded-full min-w-max",
                                    "h-16 w-16 md:h-12 md:w-auto px-1 md:px-4 lg:h-[54px]",
                                    isActive ? "bg-primary text-white" : "bg-white text-black hover:bg-white hover:text-primary"
                                )}>
                                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                                    <span className="text-xs font-medium lg:text-lg whitespace-nowrap">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
