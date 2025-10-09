

'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from './ui/sheet';
import { Button } from './ui/button';
import { X, Upload, Palette, Save, Plus, Trash2, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

const ColorInput = ({ label, color, setColor, disabled }: { label: string, color: string, setColor: (color: string) => void, disabled: boolean }) => (
    <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-full border" style={{ backgroundColor: color }}>
             <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-full opacity-0 cursor-pointer absolute inset-0"
                disabled={disabled}
            />
        </div>
        <Input 
            type="text" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-32 h-10 rounded-full"
            placeholder="#0FB4C3"
            disabled={disabled}
        />
    </div>
);

const initialFaqs = [
    { question: 'Does habi charge an advance payment?', answer: 'Yes. habi collects a booking amount of about 1% of the total home construction cost.' },
    { question: 'What is the cost of building a house with habi?', answer: 'The cost depends on the package you choose. We have different packages to suit various budgets and requirements.' },
    { question: 'How long does it take to build a house?', answer: 'The construction timeline varies depending on the project\'s complexity and size. On average, it takes about 6-9 months.' }
];

const initialBulletPoints = [
    "Unique Design", "Efficient planning", "Disaster Resilient", "1 Year Warranty",
    "Project Tracking", "50 Year Guarantee", "Structure as per NBC", "Transparent Pricing"
];

export const BrandingSheet = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    
    const [logo, setLogo] = useState<string | null>('/logo-placeholder.svg');
    const [primaryColor, setPrimaryColor] = useState('#0FB4C3');
    const [faqs, setFaqs] = useState(initialFaqs);
    const [bulletPoints, setBulletPoints] = useState(initialBulletPoints);
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
    const [loginImages, setLoginImages] = useState<string[]>(['/images/logoimage.png']);

    const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };
    
    const addFaq = () => {
        if (faqs.length < 5) {
            setFaqs([...faqs, { question: '', answer: '' }]);
        }
    };

    const removeFaq = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const handleBulletPointChange = (index: number, value: string) => {
        const newBulletPoints = [...bulletPoints];
        newBulletPoints[index] = value;
        setBulletPoints(newBulletPoints);
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(URL.createObjectURL(event.target.files[0]));
        }
    };
    
    const handleLoginImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const newImageUrls = files.map(file => URL.createObjectURL(file));
            setLoginImages(prev => [...prev, ...newImageUrls]);
        }
    };

    const removeLoginImage = (index: number) => {
        setLoginImages(loginImages.filter((_, i) => i !== index));
    }

    const handleSave = () => {
        // Here you would typically save all the branding settings to your backend
        toast({
            title: "Branding Updated",
            description: "Your branding changes have been applied.",
        });
        onOpenChange(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent 
                side="bottom"
                className={cn(
                    "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-auto md:max-w-4xl md:mx-auto rounded-t-[50px] border-none md:max-h-[90vh]",
                    "bottom-0 top-auto translate-y-0" // Centering and bottom alignment
                )}
            >
                <SheetHeader className="p-6 border-b shrink-0">
                    <SheetTitle className="flex justify-between items-center">
                        <span className="text-2xl font-semibold">Branding & Workflow</span>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    <div className="p-6 space-y-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                             <div className="flex items-center gap-6">
                                <div className="relative w-16 h-16 rounded-full border border-border">
                                    <Image src={logo ?? ''} alt="Company Logo" layout="fill" className="rounded-full object-cover" />
                                </div>
                                <label htmlFor="logo-upload" className={'cursor-pointer'}>
                                    <div className="flex items-center gap-2 text-primary">
                                        <Upload className="h-5 w-5" />
                                        <span className="font-medium">Upload Logo</span>
                                    </div>
                                    <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                </label>
                            </div>
                            <div className="flex items-center gap-4">
                                <h4 className="text-lg font-medium text-muted-foreground">Theme Colors</h4>
                                <ColorInput label="Primary" color={primaryColor} setColor={setPrimaryColor} disabled={false}/>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-lg font-medium">Login Page Images</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {loginImages.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <Image src={img} alt={`Login Image ${index+1}`} width={150} height={150} className="rounded-lg object-cover w-full aspect-square" />
                                        <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => removeLoginImage(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <label htmlFor="login-image-upload" className="cursor-pointer aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-accent">
                                    <Upload className="h-8 w-8" />
                                    <span>Upload Image</span>
                                </label>
                                <input id="login-image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleLoginImageUpload}/>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-lg font-medium">Marketing Bullet Points (Max 8)</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {bulletPoints.map((point, index) => (
                                    <Input key={index} value={point} onChange={(e) => handleBulletPointChange(index, e.target.value)} className="h-12 rounded-full bg-background dark:bg-input" />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-medium">FAQs (Max 5)</Label>
                                <Button size="sm" onClick={addFaq} disabled={faqs.length >= 5} className="rounded-full">
                                    <Plus className="mr-2 h-4 w-4" /> Add FAQ
                                </Button>
                            </div>
                            {faqs.map((faq, index) => (
                                <div key={index} className="space-y-2 p-4 border rounded-2xl relative bg-background dark:bg-input">
                                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeFaq(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                    <Input placeholder="Question" value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} className="h-12 rounded-full font-semibold bg-background dark:bg-input"/>
                                    <Textarea placeholder="Answer" value={faq.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} className="min-h-[60px] rounded-xl bg-background dark:bg-input"/>
                                </div>
                            ))}
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="video-url" className="text-lg font-medium">Company Profile Video</Label>
                            <div className="relative">
                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="video-url" placeholder="Enter YouTube video URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="pl-12 h-14 rounded-full bg-background dark:bg-input"/>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <div className="px-6 py-4 mt-auto border-t">
                    <Button className="w-full h-14 rounded-full text-lg" onClick={handleSave}>
                        <Save className="mr-2 h-5 w-5"/>
                        Save Changes
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
