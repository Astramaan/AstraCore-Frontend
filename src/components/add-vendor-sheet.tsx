
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
import { Plus, X, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Textarea } from './ui/textarea';
import Image from 'next/image';

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
            <div className="bg-input rounded-[27px] p-2 flex flex-wrap gap-2 min-h-[54px]">
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
                    placeholder={cities.length === 0 ? "Add cities..." : ""}
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm"
                />
            </div>
        </div>
    );
};


const AddVendorForm = () => {
    const [selectedDays, setSelectedDays] = useState(['M', 'T', 'W', 'Th', 'F']);

    const handleDayToggle = (day: string) => {
        setSelectedDays(prev => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, d]
        );
    }

    return (
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
                            <FormField id="company-name" label="Company Name*" placeholder="Enter company name" />
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
    );
};

export function AddVendorSheet() {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? SheetTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? SheetTrigger : DialogTrigger;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={setIsOpen}>
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
                            Add New Vendor
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="p-3.5 bg-background rounded-full">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogOrSheetClose>
                        </DialogOrSheetTitle>
                    </DialogOrSheetHeader>
                    <AddVendorForm />
                </DialogOrSheetContent>
            </DialogOrSheet>
        </>
    );
}
