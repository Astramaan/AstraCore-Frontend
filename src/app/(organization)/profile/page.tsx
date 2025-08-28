
import { PersonalDetails } from '@/components/personal-details';
import React from 'react';

export default function ProfilePage() {
    // In a real app, you would fetch the logged-in user's data.
    // For now, we'll use a mock ID.
    return (
        <div>
            <PersonalDetails employeeId="1" />
        </div>
    );
}
