
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { Input } from './ui/input';

const DetailField = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="space-y-2">
        <Label className="text-lg font-medium px-2 text-grey-1">{label}</Label>
        <div className="h-14 flex items-center px-5 rounded-full bg-background">
            <p className="text-black text-base leading-tight truncate">{value}</p>
        </div>
    </div>
);

const FileField = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="space-y-2">
        <Label className="text-lg font-medium px-2 text-grey-1">{label}</Label>
        <div className="h-14 flex items-center px-5 rounded-full bg-background">
             <div className="p-2.5 bg-zinc-100 rounded-[10px] flex-1">
                <span className="text-black text-sm font-normal truncate">{value}</span>
            </div>
        </div>
    </div>
);

const DayToggle = ({ day, selectedDays }: { day: string, selectedDays: string[] }) => {
    const isActive = selectedDays.includes(day);
    return (
        <div
            className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0",
                isActive
                    ? "bg-primary text-white"
                    : "bg-zinc-100 text-black"
            )}
        >
            {day}
        </div>
    )
};


export const VendorDetailsCard = ({ vendor }: { vendor: any }) => {
    return (
        <Card className="rounded-[50px] p-10">
            <CardContent className="p-0">
                <div className="flex items-start gap-6 mb-6">
                    <Image src={vendor.logo} width={150} height={150} alt={vendor.companyName} className="rounded-[10px] border border-stone-300" data-ai-hint="company logo"/>
                    <div className="space-y-6 flex-1">
                        <DetailField label="Company Name*" value={vendor.companyName} />
                        <DetailField label="Phone Number*" value={vendor.phone} />
                    </div>
                </div>

                <div className="space-y-6">
                    <DetailField label="Email*" value={vendor.email} />
                    <div className="space-y-2">
                        <Label className="text-lg font-medium px-2 text-grey-1">Address*</Label>
                        <div className="rounded-[20px] bg-background p-4 min-h-[96px]">
                             <p>{vendor.address}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <FileField label="CIN Certificate" value={vendor.cinCertificate} />
                        <FileField label="GST Certificate" value={vendor.gstCertificate} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <DetailField label="GST Number*" value={vendor.gstNumber} />
                        <FileField label="Product Brochure" value={vendor.brochure} />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-lg font-medium px-2 text-grey-1">Serviceable City</Label>
                        <div className="bg-background p-4 min-h-[56px] rounded-[20px]">
                            <div className="flex flex-wrap gap-2">
                                {vendor.serviceableCities.map((city: string) => (
                                    <div key={city} className="px-2.5 py-[5px] bg-white rounded-full">
                                        <span className="text-black text-sm font-normal">{city}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <Label className="text-lg font-medium px-2 text-grey-1">Days</Label>
                             <div className="flex gap-2 items-center h-14">
                                {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map(day => <DayToggle key={day} day={day} selectedDays={vendor.availability.days} />)}
                            </div>
                        </div>
                        <DetailField label="Time" value={vendor.availability.time} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
