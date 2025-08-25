
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, MoreVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export interface Lead {
    organization: string;
    leadId: string;
    fullName: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    tokenAmount: string;
    level: string;
    profileImage: string;
    coverImage: string;
    siteImages: string[];
}

interface LeadDetailsSheetProps {
    isOpen: boolean;
    onClose: () => void;
    lead: Lead | null;
}

const DetailField = ({ label, value }: { label: string, value: string }) => (
    <div className="relative rounded-[10px] border border-stone-300 h-12 flex items-center px-4">
        <div className="absolute -top-2.5 left-2 px-1 bg-white">
            <p className="text-stone-400 text-sm leading-none">{label}</p>
        </div>
        <p className="text-black text-base leading-tight">{value}</p>
    </div>
)

const LeadDetailsContent = ({ lead }: { lead: Lead }) => {
    return (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="relative h-36 rounded-[10px] overflow-hidden">
                <Image src={lead.coverImage} layout="fill" objectFit="cover" alt="Cover Image" data-ai-hint="abstract background"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="relative -mt-16 ml-4">
                <Image src={lead.profileImage} width={94} height={94} alt={lead.fullName} className="rounded-full border-[3px] border-white" data-ai-hint="person portrait"/>
            </div>
            
            <div className="flex justify-between items-start">
                <div>
                     <h3 className="text-2xl font-semibold">{lead.fullName}</h3>
                     <p className="text-muted-foreground">{lead.leadId}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            

            <div className="space-y-6">
                <h4 className="text-lg font-medium">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailField label="Name" value={lead.fullName} />
                    <DetailField label="Lead ID" value={lead.leadId} />
                    <DetailField label="Phone Number" value={lead.phone} />
                    <DetailField label="Email" value={lead.email} />
                    <div className="md:col-span-2">
                        <DetailField label="Current address" value={lead.address} />
                    </div>
                     <DetailField label="Site location Pin code" value={lead.pincode} />
                     <DetailField label="1% Token Amount" value={`₹ ${lead.tokenAmount}`} />
                     <div className="md:col-span-2">
                        <Button className="w-full h-12 bg-primary/10 text-primary border border-primary hover:bg-primary/20">Request 1% Token</Button>
                     </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-lg font-medium">Site Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {lead.siteImages.map((img, index) => (
                        <Image key={index} src={img} width={150} height={150} alt={`Site image ${index+1}`} className="rounded-[10px] aspect-square object-cover" data-ai-hint="construction site photo" />
                    ))}
                </div>
            </div>
        </div>
    );
};


export function LeadDetailsSheet({ isOpen, onClose, lead }: LeadDetailsSheetProps) {
  const isMobile = useIsMobile();

  if (!lead) return null;

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
  const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
  const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
  const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
          className={cn(
            "p-0 rounded-[20px] border border-stone-300",
            isMobile 
              ? "w-full rounded-t-3xl"
              : "md:max-w-xl lg:max-w-2xl"
          )}
          {...(isMobile ? { side: "bottom" } : { side: "right" })}
      >
          <DialogOrSheetHeader className="p-4 border-b">
              <DialogOrSheetTitle className="flex items-center font-medium">
                  Lead Details
                  <DialogOrSheetClose asChild>
                    <Button variant="ghost" size="icon" className="ml-auto rounded-full">
                        <X className="h-5 w-5" />
                    </Button>
                  </DialogOrSheetClose>
              </DialogOrSheetTitle>
          </DialogOrSheetHeader>
          <LeadDetailsContent lead={lead} />
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}

