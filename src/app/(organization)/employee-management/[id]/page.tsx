
import { PersonalDetails } from '@/components/personal-details';
import React from 'react';

export default function EmployeeDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch employee data based on params.id
    // For now, we'll pass a mock ID to the component.
    return (
        <div>
            <PersonalDetails employeeId={params.id} />
        </div>
    );
}
