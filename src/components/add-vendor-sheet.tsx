
'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, X, Upload, Trash2, Edit } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Textarea } from './ui/textarea';
import Image from 'next/image';
import { SuccessPopup } from './success-popup';

const FormField = ({ id, label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div className="relative flex flex-col justify-start items-start gap-2">
        <Label htmlFor={id} className="text-zinc-900 text-lg font-medium px-2">{label}</Label>
        <Input id={id} className="w-full h-[54px] bg-input rounded-full px-6 text-lg" {...props} />
    </div>
);

const FileUploadField = ({ label, id }: { label: string, id: string }) => (
    <div className="flex items-center rounded-full border border-stone-300 h-[54px] bg-input">
        <Label htmlFor={id} className="px-4 text-lg text-zinc-900 whitespace-nowrap">{label}</Label>
        <div className="border-l border-stone-300 h-full mx-2"></div>
        <div className="flex-1 flex items-center justify-end px-3">
            <label htmlFor={id} className="cursor-pointer text-sm text-neutral-500 flex items-center gap-1">
                <Upload className="w-4 h-4" />
                Upload
            </label>
            <Input id={id} type="file" className="hidden" />
        </div>
    </div>
)

const DayToggle = ({ day, selectedDays, onDayToggle }: { day: string, selectedDays: string[], onDayToggle: (day: string) => void }) => {
    const isActive = selectedDays.includes(day);
    return (
        <Button 
            type="button"
            size="icon" 
            variant={isActive ? 'default' : 'outline'}
            className={cn("w-9 h-9 rounded-full text-sm", isActive ? "bg-primary text-white" : "bg-input text-black border-input")}
            onClick={() => onDayToggle(day)}
        >
            {day}
        </Button>
    )
};

const ServiceableCityInput = () => {
    const [cities, setCities] = useState<string[]>(['Bengaluru']);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!cities.includes(inputValue.trim())) {
                setCities([...cities, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeCity = (cityToRemove: string) => {
        setCities(cities.filter(city => city !== cityToRemove));
    };

    return (
        <div className="space-y-2">
            <Label className="text-zinc-900 text-lg font-medium px-2">Serviceable City</Label>
            <div className="bg-input rounded-full p-2 flex flex-wrap gap-2 min-h-[54px] items-center">
                {cities.map(city => (
                    <div key={city} className="flex items-center gap-1 bg-white rounded-full px-3 py-1 text-sm">
                        {city}
                        <button type="button" onClick={() => removeCity(city)}>
                            <X className="w-3 h-3 text-red-500" />
                        </button>
                    </div>
                ))}
                <Input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={cities.length === 0 ? "Add cities and press Enter..." : ""}
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm p-0 m-0"
                />
            </div>
        </div>
    );
};

const AddVendorForm = ({ onVendorAdded }: { onVendorAdded: (vendorName: string) => void }) => {
    const [selectedDays, setSelectedDays] = useState(['M', 'T', 'W', 'Th', 'F']);

    const handleDayToggle = (day: string) => {
        setSelectedDays(prev => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, d]
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const companyName = formData.get('company-name') as string;
        onVendorAdded(companyName || 'New Vendor');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="logo-upload" className="w-24 h-24 bg-input rounded-2xl border border-stone-300 flex items-center justify-center cursor-pointer hover:bg-stone-200">
                                <Upload className="w-8 h-8 text-zinc-400" />
                                <Input id="logo-upload" type="file" className="hidden" />
                            </label>
                            <div className="space-y-4 flex-1">
                                <FormField id="company-name" name="company-name" label="Company Name*" placeholder="Enter company name" />
                            </div>
                        </div>
                         <FormField id="phone" label="Phone Number*" type="tel" placeholder="Enter phone number" />
                         <FormField id="email" label="Email*" type="email" placeholder="Enter email" />
                         <div className="space-y-2">
                            <Label htmlFor="address" className="text-zinc-900 text-lg font-medium px-2">Address*</Label>
                            <Textarea id="address" className="h-36 bg-input rounded-3xl" placeholder="Enter address"/>
                        </div>
                        <FileUploadField id="cin-cert" label="CIN Certificate" />
                        <FileUploadField id="gst-cert" label="GST Certificate" />
                        <FormField id="gst-number" label="GST Number*" placeholder="Enter GST number" />
                        <FileUploadField id="brochure" label="Product Brochure" />

                        <ServiceableCityInput />

                         <div className="space-y-2">
                            <Label className="text-zinc-900 text-lg font-medium px-2">Days</Label>
                            <div className="flex gap-2 p-2 bg-input rounded-full">
                                {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map(day => <DayToggle key={day} day={day} selectedDays={selectedDays} onDayToggle={handleDayToggle} />)}
                            </div>
                        </div>
                        
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-stone-300 p-4 space-y-6">
                            <h3 className="text-lg font-medium">Account details</h3>
                            <FormField id="bank-name" label="Bank Name*" placeholder="Enter bank name"/>
                            <FormField id="account-holder" label="Account Holder Name*" placeholder="Enter name"/>
                            <FormField id="account-number" label="Account Number*" placeholder="Enter account number"/>
                            <FormField id="confirm-account-number" label="Confirm Account Number*" placeholder="Re-enter account number"/>
                            <FormField id="ifsc-code" label="IFSC Code*" placeholder="Enter IFSC code"/>
                            <FormField id="upi-id" label="UPI ID" placeholder="Enter UPI ID"/>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end pt-8">
                    <Button type="submit" className="w-auto h-[54px] px-10 py-3.5 bg-primary rounded-full text-lg">
                        Add vendor & continue
                    </Button>
                </div>
            </div>
        </form>
    );
};


const AddMaterialForm = ({ vendorName }: { vendorName: string }) => {
    return (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="lg:col-span-2">
                    <h3 className="text-lg font-medium">Adding Materials for <span className="font-semibold text-primary">{vendorName}</span></h3>
                 </div>
                <div className="space-y-6">
                    <div className="w-36 h-36 bg-zinc-100 rounded-[10px] border border-stone-300 flex items-center justify-center">
                         <Upload className="w-8 h-8 text-zinc-400" />
                    </div>
                </div>
                <div className="space-y-6">
                    <FormField id="product-name" label="Product Name*" placeholder="Enter product name" />
                    <FormField id="price" label="Price" placeholder="Enter price" />
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-900 text-lg font-medium px-2">Description*</Label>
                        <Textarea id="description" className="h-36 bg-input rounded-3xl" placeholder="Enter description"/>
                    </div>
                    <Button>
                        <Plus className="mr-2" />
                        Add
                    </Button>
                </div>
            </div>
            <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">Materials</h3>
                <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 rounded-[10px] border border-stone-300">
                        <Image src="https://placehold.co/100x100.png" width={100} height={100} alt="Tata Steel" className="rounded-[10px] border border-stone-300" data-ai-hint="product image" />
                        <div className="flex-1 space-y-1">
                            <p className="font-semibold">Tata Steel</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa</p>
                        </div>
                        <p className="font-medium">₹30,000</p>
                        <div className="flex gap-2">
                            <Button size="icon" variant="ghost"><Edit className="w-4 h-4" /></Button>
                            <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddVendorSheet() {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [step, setStep] = useState<'addVendor' | 'addMaterials'>('addVendor');
    const [vendorName, setVendorName] = useState('');

    const handleVendorAdded = (name: string) => {
        setVendorName(name);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setStep('addMaterials');
        }, 2000); // Show success for 2s then switch to next step
    };

    const handleClose = () => {
        setIsOpen(false);
        // Reset state after a delay to allow for closing animation
        setTimeout(() => {
            setStep('addVendor');
            setVendorName('');
        }, 300);
    }

    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={(open) => {
                if (!open) handleClose();
                else setIsOpen(true);
            }}>
                <DialogOrSheetTrigger asChild>
                    <Button variant="outline" className="flex-1 md:flex-none rounded-full h-[54px] bg-primary/10 text-primary hover:bg-primary/20 border border-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Vendor
                    </Button>
                </DialogOrSheetTrigger>
                <DialogOrSheetContent
                    className={cn(
                        "p-0 rounded-[20px] bg-white",
                        isMobile 
                            ? "w-full rounded-t-3xl" 
                            : "md:max-w-4xl lg:max-w-6xl"
                    )}
                    {...(isMobile && { side: "bottom" })}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                        <DialogOrSheetTitle className="flex items-center justify-between text-2xl font-semibold">
                            {step === 'addVendor' ? 'Add New Vendor' : 'Add Materials'}
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="p-3.5 bg-background rounded-full">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogOrSheetClose>
                        </DialogOrSheetTitle>
                    </DialogOrSheetHeader>
                    {step === 'addVendor' ? (
                        <AddVendorForm onVendorAdded={handleVendorAdded} />
                    ) : (
                        <AddMaterialForm vendorName={vendorName} />
                    )}
                </DialogOrSheetContent>
            </DialogOrSheet>
            <SuccessPopup 
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="New Vendor Added!"
                message="Vendor has been successfully added to your list."
            />
        </>
    );
}

    