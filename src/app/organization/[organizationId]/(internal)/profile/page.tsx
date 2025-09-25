
'use client';

import React from 'react';
import { useUser } from '@/context/user-context';
import { Skeleton } from '@/components/ui/skeleton';
import SuperAdminProfile from './super-admin-profile';
import UserProfile from './user-profile';

export default function ProfilePage() {
    const { user, loading } = useUser();
    
    if (loading || !user) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-14 w-32 rounded-full" />
                </div>
                <Skeleton className="h-64 w-full rounded-[50px]" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Skeleton className="h-64 w-full rounded-[50px]" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-[50px]" />
                </div>
            </div>
        );
    }
    
    if (user.roleType === 'superAdmin') {
        return <SuperAdminProfile />;
    }
    
    return <UserProfile />;
}
