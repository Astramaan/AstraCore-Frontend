
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const DetailField = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="relative rounded-[10px] border border-stone-300 h-14 px-4 flex items-center">
        <label className="absolute -top-2.5 left-2 px-1 bg-white text-stone-400 text-sm">{label}</label>
        <span>{value}</span>
    </div>
);

export const VendorAccountDetailsCard = ({ details }: { details: any }) => {
    return (
        <Card className="rounded-[20px] p-6">
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
