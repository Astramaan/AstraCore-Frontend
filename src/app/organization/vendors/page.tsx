

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
import StarIcon from '@/components/icons/star-icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const vendorsData = [
    {
        id: "1",
        companyName: "Teju Pan Shop",
        phone: "1234567890",
        email: "Company@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        image: "https://placehold.co/100x100.png",
        location: "Bengaluru",
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
        materials: ["Gravel", "Paint"],
        isFavorite: false,
    },
];

type Vendor = typeof vendorsData[0];

const allLocations = [...new Set(vendorsData.map(v => v.location))];
const allMaterials = [...new Set(vendorsData.flatMap(v => v.materials))];

const VendorListItem = ({ vendor, onFavoriteToggle, isFirst, isLast }: { vendor: Vendor, onFavoriteToggle: (id: string) => void, isFirst?: boolean, isLast?: boolean }) => (
    <div className="group">
        <div className={cn("hidden lg:grid grid-cols-[1.5fr_auto_1.5fr_auto_1fr] items-center py-4 gap-6 hover:bg-hover-bg px-4",
            isFirst && "rounded-t-[20px]",
            isLast && "rounded-b-[20px]")}>
            <Link href={`/organization/vendors/${vendor.id}`} className="flex items-center gap-4">
                <Avatar className="w-14 h-14 rounded-[15px] shrink-0">
                    <AvatarImage src={vendor.image} alt={vendor.companyName} data-ai-hint="company logo"/>
                    <AvatarFallback>{vendor.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                    <p className="text-black text-base font-semibold">{vendor.companyName}</p>
                    <p className="text-muted-foreground text-sm">{vendor.location}</p>
                </div>
            </Link>
            
            <Separator orientation="vertical" className="h-14" />

            <div className="flex flex-col gap-1">
                <p className="text-sm text-grey-1">Contact</p>
                <p className="text-sm font-medium">{vendor.phone}</p>
                <p className="text-sm font-medium">{vendor.email}</p>
            </div>

            <Separator orientation="vertical" className="h-14" />

            <div className="flex items-center justify-end gap-2">
                 <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-yellow-400 hover:text-yellow-500 z-10"
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); onFavoriteToggle(vendor.id); }}
                >
                    <StarIcon isFilled={vendor.isFavorite} />
                </Button>
                <Button className="flex-1 md:flex-initial bg-primary/10 text-primary border border-primary hover:bg-primary/20 h-12 rounded-full px-6">Order</Button>
            </div>
        </div>

        <div className="lg:hidden p-4">
            <div className="flex flex-col gap-4 p-4 rounded-[20px] bg-card shadow-sm">
                <Link href={`/organization/vendors/${vendor.id}`} className="flex items-start justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-14 h-14 rounded-[15px] shrink-0">
                            <AvatarImage src={vendor.image} alt={vendor.companyName} data-ai-hint="company logo"/>
                            <AvatarFallback>{vendor.companyName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 flex-1">
                            <p className="text-black text-base font-semibold">{vendor.companyName}</p>
                            <p className="text-muted-foreground text-sm">{vendor.location}</p>
                        </div>
                    </div>
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-yellow-400 hover:text-yellow-500 z-10"
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); onFavoriteToggle(vendor.id); }}
                    >
                        <StarIcon isFilled={vendor.isFavorite} />
                    </Button>
                </Link>
                <div className="space-y-2">
                     <p className="text-sm text-grey-1">Contact</p>
                     <p className="text-sm font-medium">{vendor.phone}</p>
                     <p className="text-sm font-medium">{vendor.email}</p>
                </div>
                <Button className="w-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 h-12 rounded-full">Order</Button>
            </div>
        </div>
        {!isLast && <div className="lg:px-4"><Separator /></div>}
    </div>
);


export default function VendorsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [allVendors, setAllVendors] = useState(vendorsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showRecentlyOrdered, setShowRecentlyOrdered] = useState(false);

    const materialsWithVendors = useMemo(() => {
        const filteredVendors = allVendors.filter(vendor => {
            const matchesSearch = vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(vendor.location);
            const matchesFavorites = !showFavorites || vendor.isFavorite;
            const matchesRecentlyOrdered = !showRecentlyOrdered || ['1', '3', '5'].includes(vendor.id);
            return matchesSearch && matchesLocation && matchesFavorites && matchesRecentlyOrdered;
        });

        const grouped: Record<string, Vendor[]> = {};
        for (const vendor of filteredVendors) {
            for (const material of vendor.materials) {
                if (selectedMaterials.length > 0 && !selectedMaterials.includes(material)) {
                    continue;
                }
                if (!grouped[material]) {
                    grouped[material] = [];
                }
                grouped[material].push(vendor);
            }
        }
        return grouped;
    }, [searchTerm, selectedLocations, selectedMaterials, showFavorites, showRecentlyOrdered, allVendors]);

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
    
    const handleFavoriteToggle = (id: string) => {
        setAllVendors(prev => prev.map(v => v.id === id ? { ...v, isFavorite: !v.isFavorite } : v));
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
                    <Button
                        variant={showFavorites ? "default" : "outline"}
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={cn(
                            "w-full md:w-auto justify-center h-14 rounded-full text-lg",
                            showFavorites ? "bg-primary text-white" : "bg-white"
                        )}
                    >
                        <StarIcon isFilled={showFavorites} className={cn("mr-2 h-5 w-5", showFavorites ? "text-yellow-300" : "text-yellow-400")} />
                        Favorites
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto justify-center h-14 rounded-full bg-white text-lg">
                                <SlidersHorizontal className="mr-2 h-5 w-5" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                             <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                             <DropdownMenuCheckboxItem
                                checked={showFavorites}
                                onSelect={(e) => e.preventDefault()}
                                onClick={() => setShowFavorites(!showFavorites)}
                            >
                                Favorites
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showRecentlyOrdered}
                                onSelect={(e) => e.preventDefault()}
                                onClick={() => setShowRecentlyOrdered(!showRecentlyOrdered)}
                            >
                                Recently Ordered
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
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

            <Accordion type="multiple" className="space-y-6" defaultValue={Object.keys(materialsWithVendors)}>
                {Object.entries(materialsWithVendors).map(([material, vendorsList]) => (
                    <AccordionItem value={material} key={material} asChild>
                         <Card className="rounded-[50px] overflow-hidden bg-white">
                            <AccordionTrigger className="p-8 hover:no-underline text-xl font-semibold">
                                {material}
                            </AccordionTrigger>
                            <AccordionContent className="p-6 pt-0">
                                <div className="space-y-2">
                                    {vendorsList.map((vendor, index) => (
                                        <VendorListItem 
                                            key={vendor.id} 
                                            vendor={vendor} 
                                            onFavoriteToggle={handleFavoriteToggle} 
                                            isFirst={index === 0}
                                            isLast={index === vendorsList.length - 1}
                                        />
                                    ))}
                                </div>
                            </AccordionContent>
                        </Card>
                    </AccordionItem>
                ))}
             </Accordion>

        </div>
    );
}
