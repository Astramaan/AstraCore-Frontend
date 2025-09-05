

import { PersonalDetails } from '@/components/personal-details';
import React from 'react';

export default function MemberDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch member data based on params.id
    // For now, we'll pass a mock ID to the component.
    return (
        <div>
            <PersonalDetails memberId={params.id} />
        </div>
    );
}
