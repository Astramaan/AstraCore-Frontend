'use client';

import React from 'react';
import { PersonalDetails } from '@/components/personal-details';
import { RoleAccessCard } from '@/components/role-access-card';
import { ActiveSessionsCard } from '@/components/active-sessions-card';

export default function ProfilePage() {
    // In a real app, you would fetch the logged-in user's data.
    // For now, we'll use a mock ID.
    return (
        <div className="space-y-6">
            <PersonalDetails employeeId="1" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RoleAccessCard />
                </div>
                <div>
                    <ActiveSessionsCard />
                </div>
            </div>
        </div>
    );
}
