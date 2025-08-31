

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';

const DetailField = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="space-y-2">
        <Label className="text-lg font-medium px-2 text-grey-1">{label}</Label>
        <div className="h-14 flex items-center px-5 rounded-full bg-background">
            <p className="text-black text-base leading-tight truncate">{value}</p>
        </div>
    </div>
);

export const VendorAccountDetailsCard = ({ details }: { details: any }) => {
    return (
        <Card className="rounded-[50px] p-10">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="text-lg">Account details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailField label="Bank Name*" value={details.bankName} />
                    <DetailField label="Account Holder Name*" value={details.accountHolder} />
                    <DetailField label="Account Number*" value={details.accountNumber} />
                    <DetailField label="IFSC Code*" value={details.ifscCode} />
                    <div className="md:col-span-2">
                        <DetailField label="UPI ID" value={details.upiId} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
