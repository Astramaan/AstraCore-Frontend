
'use client';

import React, { useState, useActionState, useEffect } from 'react';
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
import { Plus, X, Upload, Trash2, Edit, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Textarea } from './ui/textarea';
import Image from 'next/image';
import { SuccessPopup } from './success-popup';
import { Separator } from './ui/separator';

const FloatingLabelInput = ({ id, label, value, type, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string, type?: string }) => (
    <div className="space-y-2">
        <Label htmlFor={id} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        <Input id={id} type={type} className="h-14 bg-background rounded-full px-5" value={value} {...props} />
    </div>
);

const FileUploadField = ({ label, id, onChange, fileName }: { label: string, id: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, fileName?: string }) => (
    <div className="flex items-center rounded-full border border-stone-300 h-[54px] bg-input">
        <Label htmlFor={id} className="px-4 text-lg text-zinc-900 whitespace-nowrap">{label}</Label>
        <div className="border-l border-stone-300 h-full mx-2"></div>
        <div className="flex-1 flex items-center justify-end px-3">
             {fileName && <span className="text-sm text-neutral-500 mr-2 truncate">{fileName}</span>}
            <label htmlFor={id} className="cursor-pointer text-sm text-neutral-500 flex items-center gap-1">
                <Upload className="w-4 h-4" />
                Upload
            </label>
            <Input id={id} type="file" className="hidden" onChange={onChange} />
        </div>
    </div>
)

const DayToggle = ({ day, selectedDays, onDayToggle }: { day: string, selectedDays: string[], onDayToggle: (day: string) => void }) => {
    const isActive = selectedDays.includes(day);
    return (
        <Button
            type="button"
            size="icon"
            variant="outline"
            className={cn(
                "w-9 h-9 rounded-full text-sm",
                isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-input text-black border-input"
            )}
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
            <Label className={cn("text-lg font-medium px-2", cities.length > 0 || inputValue ? 'text-grey-1' : 'text-zinc-900')}>Serviceable City</Label>
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

const AddVendorForm = ({ onNext }: { onNext: (vendorName: string) => void }) => {
    const [selectedDays, setSelectedDays] = useState(['M', 'T', 'W', 'Th', 'F']);

    const [logo, setLogo] = useState<File | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [cinCert, setCinCert] = useState<File | null>(null);
    const [gstCert, setGstCert] = useState<File | null>(null);
    const [gstNumber, setGstNumber] = useState('');
    const [brochure, setBrochure] = useState<File | null>(null);
    const [availableTimeFrom, setAvailableTimeFrom] = useState('');
    const [availableTimeTo, setAvailableTimeTo] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [upiId, setUpiId] = useState('');

    const handleTextOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value.replace(/[^a-zA-Z\s]/g, ''));
    };

    const handleNumberOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>, maxLength?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (maxLength) {
            setter(value.slice(0, maxLength));
        } else {
            setter(value);
        }
    };

    const handleAlphanumericChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value.replace(/[^a-zA-Z0-9]/g, ''));
    };

    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setter(e.target.files[0]);
        }
    };


    const handleDayToggle = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext(companyName || 'New Vendor');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                <div className="space-y-6">
                    <div className="flex gap-4 items-center">
                        <label htmlFor="logo-upload" className="w-24 h-24 bg-input rounded-2xl border border-stone-300 flex items-center justify-center cursor-pointer hover:bg-stone-200">
                            {logo ? <Image src={URL.createObjectURL(logo)} alt="logo" width={96} height={96} className="rounded-2xl object-cover"/> : <Upload className="w-8 h-8 text-zinc-400" />}
                            <Input id="logo-upload" type="file" className="hidden" onChange={handleFileChange(setLogo)} />
                        </label>
                        <div className="space-y-4 flex-1">
                            <FloatingLabelInput id="company-name" name="company-name" label="Company Name*" placeholder="Enter company name" value={companyName} onChange={handleTextOnlyChange(setCompanyName)} />
                        </div>
                    </div>
                     <FloatingLabelInput
                        id="phone"
                        name="phone"
                        label="Phone Number*"
                        type="tel"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={handleNumberOnlyChange(setPhoneNumber, 10)}
                        />
                     <FloatingLabelInput id="email" label="Email*" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                     <div className="space-y-2">
                        <Label htmlFor="address" className={cn("text-lg font-medium px-2", address ? 'text-grey-1' : 'text-zinc-900')}>Address*</Label>
                        <Textarea id="address" className="h-36 bg-background rounded-3xl p-4" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <FileUploadField id="cin-cert" label="CIN Certificate" onChange={handleFileChange(setCinCert)} fileName={cinCert?.name} />
                    <FileUploadField id="gst-cert" label="GST Certificate" onChange={handleFileChange(setGstCert)} fileName={gstCert?.name} />
                    <FloatingLabelInput id="gst-number" label="GST Number*" placeholder="Enter GST number" value={gstNumber} onChange={handleAlphanumericChange(setGstNumber)} />
                    <FileUploadField id="brochure" label="Product Brochure" onChange={handleFileChange(setBrochure)} fileName={brochure?.name}/>

                    <ServiceableCityInput />

                     <div className="space-y-2">
                        <Label className="text-zinc-900 text-lg font-medium px-2">Days</Label>
                        <div className="flex gap-2">
                            {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map(day => <DayToggle key={day} day={day} selectedDays={selectedDays} onDayToggle={handleDayToggle} />)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <FloatingLabelInput id="available-time-from" name="available-time-from" type="text" label="Available Time (From)" placeholder="e.g. 9:00 AM" value={availableTimeFrom} onChange={(e) => setAvailableTimeFrom(e.target.value)} />
                       <FloatingLabelInput id="available-time-to" name="available-time-to" type="text" label="Available Time (To)" placeholder="e.g. 5:00 PM" value={availableTimeTo} onChange={(e) => setAvailableTimeTo(e.target.value)} />
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-6">
                        <h3 className="text-lg font-medium">Account details</h3>
                        <FloatingLabelInput id="bank-name" label="Bank Name*" placeholder="Enter bank name" value={bankName} onChange={handleTextOnlyChange(setBankName)}/>
                        <FloatingLabelInput id="account-holder" label="Account Holder Name*" placeholder="Enter name" value={accountHolder} onChange={handleTextOnlyChange(setAccountHolder)} />
                        <FloatingLabelInput id="account-number" label="Account Number*" placeholder="Enter account number" value={accountNumber} onChange={handleNumberOnlyChange(setAccountNumber)} />
                        <FloatingLabelInput id="confirm-account-number" label="Confirm Account Number*" placeholder="Re-enter account number" value={confirmAccountNumber} onChange={handleNumberOnlyChange(setConfirmAccountNumber)} />
                        <FloatingLabelInput id="ifsc-code" label="IFSC Code*" placeholder="Enter IFSC code" value={ifscCode} onChange={handleAlphanumericChange(setIfscCode)}/>
                        <FloatingLabelInput id="upi-id" label="UPI ID" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                    </div>
                </div>

                <div className="flex justify-end pt-8">
                    <Button type="submit" className="w-auto h-[54px] px-10 py-3.5 bg-primary rounded-full text-lg">
                        Next
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                </div>
            </div>
        </form>
    );
};

const EditMaterialForm = ({ material, onSave, onCancel }: { material: any, onSave: (updatedMaterial: any) => void, onCancel: () => void }) => {
    const [productName, setProductName] = useState(material.name);
    const [price, setPrice] = useState(material.price.replace('₹', '').replace(',', ''));
    const [description, setDescription] = useState(material.description);

    const handleTextOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(e.target.value.replace(/[^a-zA-Z\s]/g, ''));
    };

    const handleNumberOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value.replace(/\D/g, ''));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...material,
            name: productName,
            price: `₹${Number(price).toLocaleString('en-IN')}`,
            description
        });
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h3 className="text-lg font-medium">Edit Material: <span className="font-semibold text-primary">{material.name}</span></h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="w-36 h-36 bg-input rounded-[10px] border border-stone-300 flex items-center justify-center">
                         <Image src={material.image} width={100} height={100} alt={material.name} className="rounded-[10px] border border-stone-300" data-ai-hint="product image" />
                    </div>
                </div>
                <div className="space-y-6">
                    <FloatingLabelInput id="product-name" label="Product Name*" placeholder="Enter product name" value={productName} onChange={handleTextOnlyChange(setProductName)} />
                    <FloatingLabelInput id="price" label="Price" placeholder="Enter price" value={price} onChange={handleNumberOnlyChange(setPrice)} />
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-900 text-lg font-medium px-2">Description*</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="h-36 bg-background rounded-3xl" placeholder="Enter description"/>
                    </div>
                     <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const AddMaterialForm = ({ vendorName, onBack, onVendorAdded }: { vendorName: string, onBack: () => void, onVendorAdded: () => void }) => {
    const [materials, setMaterials] = useState([
        {
            id: 1,
            name: "Tata Steel",
            price: "₹30,000",
            description: "Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa",
            image: "https://placehold.co/100x100.png",
        }
    ]);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [editingMaterial, setEditingMaterial] = useState<any | null>(null);
    const [productImage, setProductImage] = useState<File | null>(null);

    const handleTextOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(e.target.value.replace(/[^a-zA-Z\s]/g, ''));
    };

    const handleNumberOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value.replace(/\D/g, ''));
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!productName) return;
        const newMaterial = {
            id: Date.now(),
            name: productName,
            price: price ? `₹${Number(price).toLocaleString('en-IN')}` : 'N/A',
            description: description,
            image: productImage ? URL.createObjectURL(productImage) : "https://placehold.co/100x100.png"
        };
        setMaterials(prev => [...prev, newMaterial]);
        setProductName('');
        setPrice('');
        setDescription('');
        setProductImage(null);
    }

    const handleDelete = (id: number) => {
        setMaterials(prev => prev.filter(m => m.id !== id));
    }

    const handleSaveEdit = (updatedMaterial: any) => {
        setMaterials(prev => prev.map(m => m.id === updatedMaterial.id ? updatedMaterial : m));
        setEditingMaterial(null);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProductImage(e.target.files[0]);
        }
    };


    if (editingMaterial) {
        return <EditMaterialForm material={editingMaterial} onSave={handleSaveEdit} onCancel={() => setEditingMaterial(null)} />;
    }

    return (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <form onSubmit={handleAdd} className="space-y-6">
                <div className="lg:col-span-2">
                    <h3 className="text-lg font-medium">Adding Materials for <span className="font-semibold text-primary">{vendorName}</span></h3>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="product-image" className="text-zinc-900 text-lg font-medium px-2">Product image*</Label>
                        <label htmlFor="product-image-upload" className="w-36 h-36 bg-input rounded-[10px] border border-stone-300 flex items-center justify-center cursor-pointer hover:bg-stone-200">
                            {productImage ? <Image src={URL.createObjectURL(productImage)} alt="product" width={144} height={144} className="rounded-[10px] object-cover"/> : <Upload className="w-8 h-8 text-zinc-400" />}
                            <Input id="product-image-upload" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    <FloatingLabelInput id="product-name" label="Product Name*" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <FloatingLabelInput id="price" label="Price" placeholder="Enter price" value={price} onChange={handleNumberOnlyChange(setPrice)} />
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-900 text-lg font-medium px-2">Description*</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="h-36 bg-background rounded-3xl" placeholder="Enter description"/>
                    </div>
                    <Button type="submit" className="rounded-full">
                        <Plus className="mr-2" />
                        Add
                    </Button>
                </div>
            </form>
            <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">Materials</h3>
                <div className="space-y-4">
                     {materials.map(material => (
                         <div key={material.id} className="flex items-center gap-4 p-4 rounded-[10px] border border-stone-300">
                            <Image src={material.image} width={100} height={100} alt={material.name} className="rounded-[10px] border border-stone-300" data-ai-hint="product image" />
                            <div className="flex-1 space-y-1">
                                <p className="font-semibold">{material.name}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
                            </div>
                            <p className="font-medium">{material.price}</p>
                            <div className="flex gap-2">
                                <Button size="icon" variant="ghost" onClick={() => setEditingMaterial(material)}><Edit className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(material.id)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        </div>
                     ))}
                </div>
            </div>
             <div className="flex justify-between items-center pt-8">
                <Button type="button" variant="outline" className="px-10 h-14 text-lg rounded-full" onClick={onBack}>
                    Back
                </Button>
                <Button type="button" className="px-10 h-14 text-lg rounded-full" onClick={onVendorAdded}>
                    Add vendor & continue
                </Button>
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

    const handleNext = (name: string) => {
        setVendorName(name);
        setStep('addMaterials');
    };

    const handleBack = () => {
        setStep('addVendor');
    }

    const handleVendorAdded = () => {
        setIsOpen(false);
        setShowSuccess(true);
        setTimeout(() => {
            setStep('addVendor');
            setVendorName('');
        }, 500);
    }

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setStep('addVendor');
            setVendorName('');
        }, 300);
    }

    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? DialogClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={(open) => {
                if (!open) handleClose();
                else setIsOpen(true);
            }}>
                <DialogTrigger asChild>
                    <Button className="h-14 px-6 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 text-lg font-medium">
                        <Plus className="mr-2 h-5 w-5" />
                        Add Vendor
                    </Button>
                </DialogTrigger>
                <DialogOrSheetContent
                    className={cn(
                        "p-0 rounded-[20px] bg-white",
                        isMobile
                            ? "w-full rounded-t-3xl"
                            : "md:max-w-md"
                    )}
                    {...(isMobile && { side: "bottom" })}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <DialogOrSheetTitle className="text-2xl font-semibold">
                                {step === 'addVendor' ? 'Add New Vendor' : 'Add Materials'}
                            </DialogOrSheetTitle>
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogOrSheetClose>
                        </div>
                    </DialogOrSheetHeader>
                    {step === 'addVendor' ? (
                        <AddVendorForm onNext={handleNext} />
                    ) : (
                        <AddMaterialForm vendorName={vendorName} onBack={handleBack} onVendorAdded={handleVendorAdded} />
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
