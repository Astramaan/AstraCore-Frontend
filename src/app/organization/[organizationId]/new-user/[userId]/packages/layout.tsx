
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PackagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense fallback={
            <div className="space-y-6 p-4">
                <Skeleton className="h-12 w-1/2 mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        }>
            {children}
        </Suspense>
    )
}
