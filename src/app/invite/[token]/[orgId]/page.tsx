
'use client';

import { useEffect, useState } from 'react';
import { verifyInvite } from '@/app/actions';
import { AlertCircle } from 'lucide-react';

export default function VerifyInvitePage({ params }: { params: { token: string; orgId: string } }) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleVerification = async () => {
            const result = await verifyInvite(params.token, params.orgId);
            if (!result?.success) {
                setError(result.message);
            }
        };

        handleVerification();
    }, [params.token, params.orgId]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="text-center">
                {error ? (
                     <div className="flex flex-col items-center gap-4">
                        <AlertCircle className="w-16 h-16 text-destructive" />
                        <h1 className="text-2xl font-semibold">Verification Failed</h1>
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold">Verifying your invite...</h1>
                        <p className="text-muted-foreground mt-2">Please wait while we validate your invitation link.</p>
                        <div className="mt-6">
                             {/* You can add a spinner or loading animation here */}
                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
