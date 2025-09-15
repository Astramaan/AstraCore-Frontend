

'use client';

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, ShieldAlert, X, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { useToast } from './ui/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { OrderFormDialog } from './order-form-dialog';
import StarIcon from './icons/star-icon';
import { Vendor } from '@/app/organization/vendors/page';

export interface Material {
    name: string;
    vendors: Vendor[];
}

const VendorCard = ({ vendor, materialName }: { vendor: Vendor; materialName: string; }) => {
    const { toast } = useToast();
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
    
    return (
        <>
            <div className="flex flex-col">
                {/* Mobile View */}
                <div className="md:hidden flex justify-between items-start p-10 gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Link href={`/organization/vendors/${vendor.id}`} className="flex items-center gap-4 cursor-pointer">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={vendor.image} data-ai-hint="company logo" />
                                <AvatarFallback>{vendor.companyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex-1">
                            <Link href={`/organization/vendors/${vendor.id}`} className="cursor-pointer">
                            <p className="text-lg font-medium">{vendor.companyName}</p>
                            </Link>
                            <div className="mt-2 space-y-1 text-sm">
                                <p className="whitespace-nowrap"><span className="text-grey-1">Contact: </span><span className="text-black font-medium">{vendor.phone} | {vendor.email}</span></p>
                                <p><span className="text-grey-1">Location: </span><span className="text-black font-medium">{vendor.location}</span></p>
                                <Button onClick={() => setIsOrderFormOpen(true)} className="flex-1 md:flex-initial h-10 rounded-full px-4 mt-2">Order</Button>
                            </div>
                        </div>
                    </div>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-6 h-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild><Link href={`/organization/vendors/${vendor.id}`}>View Details</Link></DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsOrderFormOpen(true)}>Order</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-[1.5fr_auto_1.5fr_auto_1fr] items-stretch py-4">
                    <div className="flex items-center gap-4 pr-4">
                        <Link href={`/organization/vendors/${vendor.id}`} className="cursor-pointer">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={vendor.image} data-ai-hint="company logo" />
                                <AvatarFallback>{vendor.companyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <Link href={`/organization/vendors/${vendor.id}`} className="cursor-pointer flex-1">
                            <p className="text-lg font-medium truncate">{vendor.companyName}</p>
                        </Link>
                    </div>

                    <Separator orientation="vertical" />
                    
                    <div className="flex flex-col justify-center gap-2 px-4">
                        <p className="text-lg whitespace-nowrap"><span className="text-grey-1">Contact: </span><span className="text-black font-medium">{vendor.phone} | {vendor.email}</span></p>
                        <p className="text-lg"><span className="text-grey-1">Location: </span><span className="text-black font-medium">{vendor.location}</span></p>
                    </div>

                    <Separator orientation="vertical" />

                    <div className="flex items-center justify-end gap-4 pl-4">
                        <Button onClick={() => setIsOrderFormOpen(true)} className="h-12 rounded-full px-6 bg-primary text-white">Order</Button>
                        <StarIcon isFilled={vendor.isFavorite} className="text-yellow-400" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-6 h-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild><Link href={`/organization/vendors/${vendor.id}`}>View Details</Link></DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsOrderFormOpen(true)}>Order</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

            </div>
            <Separator className="last:hidden"/>
            <OrderFormDialog
                isOpen={isOrderFormOpen}
                onClose={() => setIsOrderFormOpen(false)}
                vendor={vendor}
                materialName={materialName}
            />
        </>
    );
};

const ViewVendorsContent = ({ material, onClose }: { material: Material; onClose: () => void }) => {
    return (
        <AlertDialog>
            <div className="bg-white h-full flex flex-col rounded-t-[50px] overflow-hidden">
                <SheetHeader className="p-6 border-b shrink-0">
                    <SheetTitle className="flex items-center text-xl font-medium">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-200/30">
                                {/* Material Icon */}
                            </div>
                            <h2 className="text-2xl font-semibold">{material.name}</h2>
                        </div>
                        <div className="ml-auto">
                            <SheetClose asChild>
                                <Button variant="ghost" onClick={onClose} className="rounded-full h-14 w-14 p-0 text-black bg-background hover:bg-muted">
                                    <X className="h-6 w-6" />
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    <div className="p-6">
                        {material.vendors.length > 0 ? (
                            material.vendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} materialName={material.name}/>)
                        ) : (
                            <div className="text-center text-muted-foreground py-10">
                                No vendors for this material yet.
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </AlertDialog>
    );
};

interface ViewVendorsSheetProps {
    isOpen: boolean;
    onClose: () => void;
    material: Material | null;
}

export function ViewVendorsSheet({ isOpen, onClose, material }: ViewVendorsSheetProps) {
    const isMobile = useIsMobile();

    if (!material) return null;

    return (
         <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent 
                side={"bottom"}
                className="p-0 bg-transparent border-none shadow-none w-full h-[90vh] bottom-0 rounded-t-[50px]"
                overlayClassName="bg-neutral-900/10 backdrop-blur-sm"
            >
                <ViewVendorsContent material={material} onClose={onClose} />
            </SheetContent>
        </Sheet>
    )
}
