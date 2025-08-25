
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { AddVendorSheet } from '@/components/add-vendor-sheet';

const vendors = [
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
    {
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png"
    },
];

const VendorCard = ({ vendor }: { vendor: typeof vendors[0] }) => (
    <Card className="rounded-[20px] border border-stone-300 p-4">
        <CardContent className="p-0 space-y-4">
            <div className="flex items-start gap-4">
                <Avatar className="w-24 h-24 rounded-[10px] border border-stone-300">
                    <AvatarImage src={vendor.image} alt={vendor.companyName} data-ai-hint="company logo"/>
                    <AvatarFallback>{vendor.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p className="text-black text-lg font-medium">{vendor.companyName}</p>
                    <p className="text-black text-base">{vendor.phone}</p>
                    <p className="text-black text-base">{vendor.email}</p>
                </div>
            </div>
            <p className="text-neutral-500 text-sm">{vendor.address}</p>
        </CardContent>
    </Card>
);

export default function VendorsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-semibold">Vendors</h1>
                <div className="flex items-center gap-4">
                    <AddVendorSheet />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor, index) => (
                    <VendorCard key={index} vendor={vendor} />
                ))}
            </div>
        </div>
    );
}
