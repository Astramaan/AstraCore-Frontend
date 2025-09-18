
'use client';

import React, { useState, useMemo, use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, SlidersHorizontal, Search } from 'lucide-react';
import { AddVendorSheet } from '@/components/add-vendor-sheet';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ViewVendorsSheet, type Material } from '@/components/view-vendors-sheet';
import StarIcon from '@/components/icons/star-icon';
import { cn } from '@/lib/utils';

const vendorsData = [
    {
        id: "1",
        companyName: "Teju Pan Shop",
        phone: "9380032186",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        area: "Kodihalli",
        pincode: "560008",
        materials: ["Steel", "Cement"],
        isFavorite: true,
    },
    {
        id: "2",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Mysuru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Mysuru",
        area: "Hebbal",
        pincode: "570016",
        materials: ["Bricks", "Sand"],
        isFavorite: false,
    },
    {
        id: "3",
        companyName: "BuildItQuick",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        area: "Koramangala",
        pincode: "560034",
        materials: ["Steel", "Gravel"],
        isFavorite: false,
    },
    {
        id: "4",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Chennai, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Chennai",
        area: "T. Nagar",
        pincode: "600017",
        materials: ["Paint"],
        isFavorite: true,
    },
    {
        id: "5",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        area: "Indiranagar",
        pincode: "560038",
        materials: ["Cement"],
        isFavorite: false,
    },
    {
        id: "6",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        area: "Jayanagar",
        pincode: "560041",
        materials: ["Steel"],
        isFavorite: false,
    },
    {
        id: "7",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        area: "HSR Layout",
        pincode: "560102",
        materials: ["Sand"],
        isFavorite: false,
    },
    {
        id: "8",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        area: "Whitefield",
        pincode: "560066",
        materials: ["Bricks"],
        isFavorite: true,
    },
    {
        id: "9",
        companyName: "Company Name",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
        area: "Marathahalli",
        pincode: "560037",
        materials: ["Gravel", "Paint"],
        isFavorite: false,
    },
];

export type Vendor = typeof vendorsData[0];

const allLocations = [...new Set(vendorsData.map(v => v.location))];

const MaterialCard = ({ material, onViewVendors }: { material: Material; onViewVendors: (material: Material) => void; }) => (
    <>
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_auto_1fr_auto_1fr] items-stretch py-4 gap-4">
            <div className="flex items-center gap-4">
                <div className={'w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-200/30'}>
                    {/* Placeholder for material icon */}
                </div>
                <p className="text-xl font-semibold">{material.name}</p>
            </div>
            
            <Separator orientation="vertical" className="self-stretch" />

            <div className="flex flex-col justify-center gap-2">
                <p className="text-lg"><span className="text-grey-1">Top Supplier: </span><span className="text-black font-medium">{material.vendors[0]?.companyName || 'N/A'}</span></p>
            </div>
            
            <Separator orientation="vertical" className="self-stretch" />

            <div className="flex items-center justify-between gap-4">
                 <p className="text-lg"><span className="text-grey-1">Total Vendors: </span><span className="text-black font-medium">{String(material.vendors.length).padStart(2, '0')}</span></p>
                <Button className="h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium" onClick={() => onViewVendors(material)}>View Vendors</Button>
            </div>
        </div>

        <div className="lg:hidden flex flex-col p-10 gap-4">
             <div className={'w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-200/30'}>
                {/* Placeholder for material icon */}
            </div>
            <p className="text-2xl font-semibold">{material.name}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <p className="text-base text-grey-1">Top Supplier: <span className="text-black font-medium block">{material.vendors[0]?.companyName || 'N/A'}</span></p>
                </div>
                 <div>
                    <p className="text-base text-grey-1">Total Vendors: <span className="text-black font-medium block">{String(material.vendors.length).padStart(2, '0')}</span></p>
                </div>
                <Button className="h-12 px-6 col-span-2 rounded-full bg-background text-black hover:bg-muted text-base font-medium self-end" onClick={() => onViewVendors(material)}>View Vendors</Button>
            </div>
        </div>
        <Separator className="last:hidden"/>
    </>
);


export default function VendorsPage({ params }: { params: { organizationId: string } }) {
    const { organizationId } = use(params);
    const [allVendors, setAllVendors] = useState(vendorsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [showFavorites, setShowFavorites] = useState(false);

    const materialsWithVendors = useMemo(() => {
        const filteredVendors = allVendors.filter(vendor => {
            const matchesSearch = vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(vendor.location);
            const matchesFavorite = !showFavorites || vendor.isFavorite;
            return matchesSearch && matchesLocation && matchesFavorite;
        });

        const materialMap: Record<string, Vendor[]> = {};
        for (const vendor of filteredVendors) {
            for (const material of vendor.materials) {
                if (!materialMap[material]) {
                    materialMap[material] = [];
                }
                materialMap[material].push(vendor);
            }
        }

        return Object.keys(materialMap).map(materialName => ({
            name: materialName,
            vendors: materialMap[materialName]
        }));
    }, [searchTerm, selectedLocations, allVendors, showFavorites]);

    const handleLocationToggle = (location: string) => {
        setSelectedLocations(prev => 
            prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
        );
    }

    const handleViewVendors = (material: Material) => {
        setSelectedMaterial(material);
    };

    const handleCloseSheet = () => {
        setSelectedMaterial(null);
    };

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
                    <Button 
                        variant="outline" 
                        className={cn("h-[54px] md:h-14 justify-center rounded-full text-lg flex-1 md:flex-initial md:w-auto md:px-4", showFavorites ? "bg-primary text-white" : "bg-white")}
                        onClick={() => setShowFavorites(prev => !prev)}
                    >
                        <StarIcon className="md:mr-2 h-5 w-5" isFilled={showFavorites} />
                        <span className="inline">Favorites</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-[54px] md:h-14 justify-center rounded-full bg-white text-lg flex-1 md:flex-initial md:w-auto md:px-4">
                                <SlidersHorizontal className="mr-2 h-5 w-5" />
                                <span className="inline">Filter</span>
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AddVendorSheet />
                </div>
            </div>
            
             <Card className="rounded-[50px] overflow-hidden">
                <CardContent className="py-6 px-0 md:px-6">
                    <div className="flex flex-col">
                        {materialsWithVendors.map((material) => (
                           <MaterialCard key={material.name} material={material} onViewVendors={handleViewVendors}/>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ViewVendorsSheet 
                isOpen={!!selectedMaterial}
                onClose={handleCloseSheet}
                material={selectedMaterial}
            />
        </div>
    );
}

    






