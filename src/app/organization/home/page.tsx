
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';

export default function HomeRedirect() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user?.organizationId) {
                router.replace(`/organization/${user.organizationId}/home`);
            } else if (user) {
                // Handle case where user is logged in but has no org id
                // Maybe redirect to a "select organization" page or show an error
                console.error("User is logged in but has no organizationId.");
                router.replace('/'); // Or a dedicated error page
            } else {
                router.replace('/');
            }
        }
    }, [user, loading, router]);

    return <div>Loading...</div>;
}
