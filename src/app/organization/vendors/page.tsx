

'use client';

import React, { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Plus, SlidersHorizontal, Search } from 'lucide-react';
import { AddVendorSheet } from '@/components/add-vendor-sheet';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const vendors = [
    {
        id: "1",
        companyName: "Teju Pan Shop",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        materials: ["Steel", "Cement"]
    },
    {
        id: "2",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Mysuru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Mysuru",
        materials: ["Bricks", "Sand"]
    },
    {
        id: "3",
        companyName: "BuildItQuick",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        materials: ["Steel", "Gravel"]
    },
    {
        id: "4",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Chennai, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Chennai",
        materials: ["Paint"]
    },
    {
        id: "5",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        materials: ["Cement"]
    },
    {
        id: "6",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        materials: ["Steel"]
    },
    {
        id: "7",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        materials: ["Sand"]
    },
    {
        id: "8",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        materials: ["Bricks"]
    },
    {
        id: "9",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        materials: ["Gravel", "Paint"]
    },
];

const allLocations = [...new Set(vendors.map(v => v.location))];
const allMaterials = [...new Set(vendors.flatMap(v => v.materials))];

const VendorCard = ({ vendor }: { vendor: typeof vendors[0] }) => (
    <Link href={`/organization/vendors/${vendor.id}`}>
        <Card className="rounded-[30px] p-4 bg-card shadow-sm h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0 space-y-4">
                <div className="flex items-start gap-4">
                    <Avatar className="w-24 h-24 rounded-[20px]">
                        <AvatarImage src={vendor.image} alt={vendor.companyName} data-ai-hint="company logo"/>
                        <AvatarFallback>{vendor.companyName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                        <p className="text-black text-lg font-semibold">{vendor.companyName}</p>
                        <p className="text-muted-foreground text-base">{vendor.phone}</p>
                        <p className="text-muted-foreground text-base">{vendor.email}</p>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm">{vendor.address}</p>
            </CardContent>
        </Card>
    </Link>
);

export default function VendorsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    const filteredVendors = useMemo(() => {
        return vendors.filter(vendor => {
            const matchesSearch = vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(vendor.location);
            const matchesMaterial = selectedMaterials.length === 0 || vendor.materials.some(m => selectedMaterials.includes(m));
            return matchesSearch && matchesLocation && matchesMaterial;
        });
    }, [searchTerm, selectedLocations, selectedMaterials]);

    const handleLocationToggle = (location: string) => {
        setSelectedLocations(prev => 
            prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
        );
    }
    
    const handleMaterialToggle = (material: string) => {
        setSelectedMaterials(prev => 
            prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-end items-center gap-4">
                 <div className="relative w-full md:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                        placeholder="Search Vendors..." 
                        className="pl-12 h-14 rounded-full bg-white text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto justify-center h-14 rounded-full bg-white text-lg">
                                <SlidersHorizontal className="mr-2 h-5 w-5" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                             <DropdownMenuLabel>Location</DropdownMenuLabel>
                            {allLocations.map(location => (
                                <DropdownMenuCheckboxItem
                                    key={location}
                                    checked={selectedLocations.includes(location)}
                                    onSelect={(e) => e.preventDefault()}
                                    onClick={() => handleLocationToggle(location)}
                                >
                                    {location}
                                </DropdownMenuCheckboxItem>
                            ))}
                            <DropdownMenuSeparator />
                             <DropdownMenuLabel>Materials</DropdownMenuLabel>
                             {allMaterials.map(material => (
                                <DropdownMenuCheckboxItem
                                    key={material}
                                    checked={selectedMaterials.includes(material)}
                                    onSelect={(e) => e.preventDefault()}
                                    onClick={() => handleMaterialToggle(material)}
                                >
                                    {material}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AddVendorSheet />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                ))}
            </div>
        </div>
    );
}

