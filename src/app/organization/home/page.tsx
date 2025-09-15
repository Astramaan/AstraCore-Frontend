

'use client';

import React, { Suspense } from 'react';
import { useUser } from '@/context/user-context';
import DefaultHomePage from './default-home';
import ProjectManagerHome from './project-manager-home';

function OrganizationHomePageContent() {
    const { user } = useUser();

    if (!user) {
        // You can return a loading spinner or a default view
        return <div>Loading user data...</div>;
    }

    // Use the user's team to determine which component to render
    if (user.team === 'Project Manager') {
        return <ProjectManagerHome />;
    }

    return <DefaultHomePage />;
}

export default function OrganizationHomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrganizationHomePageContent />
        </Suspense>
    );
}
