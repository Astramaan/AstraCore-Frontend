

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, MoreVertical, Save, Edit, Trash2, UploadCloud } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

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
    onDelete: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    startInEditMode?: boolean;
}

const DetailField = ({ label, value, isEditing, onChange, name, placeholder, type = 'text' }: { label: string, value: string, isEditing: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, name?: string, placeholder?: string, type?: string }) => (
    <div className="space-y-2">
        <Label htmlFor={name} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        {isEditing ? (
            <Input id={name} name={name} value={value} onChange={onChange} className="h-14 bg-background rounded-full px-5" placeholder={placeholder || label} type={type}/>
        ) : (
             <div className="h-14 flex items-center px-5 border border-transparent rounded-full bg-background">
                <p className="text-black text-base leading-tight">{value}</p>
            </div>
        )}
    </div>
);

const LeadDetailsContent = ({ lead: initialLead, onClose, onDelete, startInEditMode }: { lead: Lead, onClose: () => void, onDelete: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void, startInEditMode?: boolean }) => {
    const [isEditing, setIsEditing] = useState(startInEditMode || false);
    const [lead, setLead] = useState(initialLead);
    const siteImageUploadRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLead(initialLead);
        if (startInEditMode) {
            setIsEditing(true);
        }
    }, [initialLead, startInEditMode]);
    
    useEffect(() => {
        setIsEditing(startInEditMode || false);
    }, [startInEditMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLead(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setLead(prev => ({ ...prev, level: value }));
    };

    const handleRemoveSiteImage = (index: number) => {
        const newImages = [...lead.siteImages];
        newImages.splice(index, 1);
        setLead(prev => ({ ...prev, siteImages: newImages }));
    };
    
    const handleSave = () => {
        // Here you would typically call an action to save the data
        console.log("Saving lead:", lead);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setLead(initialLead);
        setIsEditing(false);
    }
    
    const handleSiteImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImageUrls = files.map(file => URL.createObjectURL(file));
            setLead(prev => {
                const updatedImages = [...prev.siteImages, ...newImageUrls].slice(0, 4);
                return { ...prev, siteImages: updatedImages };
            });
        }
    };

    return (
        <>
            <DialogHeader className="p-4 border-b">
                <DialogTitle className="flex items-center font-medium">
                    {isEditing ? 'Edit Lead Details' : 'Lead Details'}
                    {isEditing ? (
                        <div className="ml-auto flex items-center gap-2">
                             <Button variant="ghost" onClick={handleCancel} className="rounded-full">Cancel</Button>
                             <Button onClick={handleSave} className="rounded-full"><Save className="mr-2 h-4 w-4" /> Save</Button>
                        </div>
                    ) : (
                        <div className="ml-auto flex items-center gap-2">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onSelect={(e) => { e.preventDefault(); onDelete(e as any); }}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <X className="h-5 w-5" />
                                </Button>
                            </DialogClose>
                        </div>
                    )}
                </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                <div className="relative">
                    <Image src={lead.profileImage} width={94} height={94} alt={lead.fullName} className="rounded-full border-[3px] border-white" data-ai-hint="person portrait"/>
                </div>
                
                <div className="flex justify-between items-start -mt-4">
                    <div>
                         <h3 className="text-2xl font-semibold">{lead.fullName}</h3>
                         <p className="text-muted-foreground">{lead.leadId}</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <h4 className="text-lg font-medium">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DetailField label="Name" name="fullName" value={lead.fullName} isEditing={isEditing} onChange={handleInputChange} />

                        <div className="space-y-2">
                             <Label className="text-lg font-medium px-2 text-grey-1">Lead ID</Label>
                             <div className="h-14 flex items-center px-5 border border-transparent rounded-full bg-background">
                                <p className="text-black text-base leading-tight">{lead.leadId}</p>
                             </div>
                        </div>

                        <DetailField label="Phone Number" name="phone" value={lead.phone} isEditing={isEditing} onChange={handleInputChange} />
                        <DetailField label="Email" name="email" value={lead.email} isEditing={isEditing} onChange={handleInputChange} />
                        <div className="md:col-span-2">
                             <DetailField label="Current address" name="address" value={lead.address} isEditing={isEditing} onChange={handleInputChange} />
                        </div>
                         <DetailField label="Site location Pin code" name="pincode" value={lead.pincode} isEditing={isEditing} onChange={handleInputChange} />
                         
                        <div className="space-y-2">
                            <Label htmlFor="level" className={cn("text-lg font-medium px-2", lead.level ? 'text-grey-1' : 'text-zinc-900')}>Lead Level</Label>
                            {isEditing ? (
                                <Select name="level" value={lead.level} onValueChange={handleSelectChange}>
                                    <SelectTrigger id="level" className="h-14 bg-background rounded-full px-5">
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Level 1">Level 1</SelectItem>
                                        <SelectItem value="Level 2">Level 2</SelectItem>
                                        <SelectItem value="Level 3">Level 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className="h-14 flex items-center px-5 border border-transparent rounded-full bg-background">
                                    <p className="text-black text-base leading-tight">{lead.level}</p>
                                </div>
                            )}
                        </div>

                         <DetailField label="Tentative Total amount" name="tokenAmount" value={lead.tokenAmount} isEditing={isEditing} onChange={handleInputChange} />
                         <div className="md:col-span-2">
                            <Button className="w-full h-12 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20">Request 1% Token</Button>
                         </div>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <h4 className="text-lg font-medium">Site Images</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {lead.siteImages.map((img, index) => (
                            <div key={index} className="relative group">
                                <Image src={img} width={150} height={150} alt={`Site image ${index + 1}`} className="rounded-[10px] aspect-square object-cover" data-ai-hint="construction site photo" />
                                {isEditing && (
                                     <button 
                                        onClick={() => handleRemoveSiteImage(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Remove image"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                         {isEditing && lead.siteImages.length < 4 && (
                            <div 
                                className="w-full aspect-square rounded-[10px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer"
                                onClick={() => siteImageUploadRef.current?.click()}
                            >
                                <UploadCloud className="h-8 w-8" />
                                <span className="text-sm mt-2">Upload</span>
                                <input
                                    ref={siteImageUploadRef}
                                    id="site-image-upload"
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={handleSiteImageUpload}
                                    disabled={lead.siteImages.length >= 4}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};


export function LeadDetailsSheet({ isOpen, onClose, lead, onDelete, startInEditMode = false }: LeadDetailsSheetProps) {
  const isMobile = useIsMobile();

  if (!lead) return null;

  const DialogOrSheet = isMobile ? Sheet : Dialog;
  const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;

  return (
    <DialogOrSheet open={isOpen} onOpenChange={onClose}>
      <DialogOrSheetContent 
          className={cn(
            "p-0 bg-white border-stone-300",
            isMobile 
              ? "w-full rounded-t-3xl"
              : "md:max-w-xl lg:max-w-2xl rounded-[20px]"
          )}
          {...(isMobile ? { side: "bottom" } : { side: "right" })}
          onInteractOutside={(e) => {
              // Prevent closing when clicking on dropdown menus inside
              if ((e.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
                  e.preventDefault();
              }
          }}
      >
          <LeadDetailsContent lead={lead} onClose={onClose} onDelete={onDelete} startInEditMode={startInEditMode}/>
      </DialogOrSheetContent>
    </DialogOrSheet>
  );
}





