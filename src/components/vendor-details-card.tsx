
import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const DetailField = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="relative rounded-[10px] border border-stone-300 h-14 px-4 flex items-center">
        <label className="absolute -top-2.5 left-2 px-1 bg-white text-stone-400 text-sm">{label}</label>
        <span>{value}</span>
    </div>
);

const FileField = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="relative rounded-[10px] border border-stone-300 h-14 px-4 flex items-center">
        <label className="absolute -top-2.5 left-2 px-1 bg-white text-stone-400 text-sm">{label}</label>
        <div className="p-2.5 bg-zinc-100 rounded-[10px] flex-1">
            <span className="text-black text-sm font-normal">{value}</span>
        </div>
    </div>
);

const DayToggle = ({ day, selectedDays }: { day: string, selectedDays: string[] }) => {
    const isActive = selectedDays.includes(day);
    return (
        <div
            className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-sm",
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
        <Card className="rounded-[20px] p-6">
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
                    <div className="relative rounded-[10px] border border-stone-300 p-4 min-h-[96px]">
                        <label className="absolute -top-2.5 left-2 px-1 bg-white text-stone-400 text-sm">Address*</label>
                        <p>{vendor.address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <FileField label="CIN Certificate" value={vendor.cinCertificate} />
                        <FileField label="GST Certificate" value={vendor.gstCertificate} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <DetailField label="GST Number*" value={vendor.gstNumber} />
                        <FileField label="Product Brochure" value={vendor.brochure} />
                    </div>

                    <div className="relative rounded-[10px] border border-stone-300 p-4">
                        <label className="absolute -top-2.5 left-2 px-1 bg-white text-stone-400 text-sm">Serviceable City</label>
                        <div className="flex flex-wrap gap-2">
                             {vendor.serviceableCities.map((city: string) => (
                                <div key={city} className="px-2.5 py-[5px] bg-zinc-100 rounded-[10px]">
                                    <span className="text-black text-sm font-normal">{city}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                             <label className="text-sm text-stone-400 mb-2 block">Days</label>
                             <div className="flex gap-2">
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
