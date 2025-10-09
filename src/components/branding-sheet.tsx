
'use client';

import React, { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { X, Upload, Palette, Save, Plus, Trash2, Youtube, Edit, Sparkles, Award, GanttChartSquare, Shield, DollarSign, Home, User, Laptop, MapPin, Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { getContentSuggestions, type ContentSuggestionOutput } from '@/ai/flows/content-suggestion-flow';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const ColorInput = ({ label, color, setColor }: { label:string, color: string, setColor: (color: string) => void }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-4">
             <div className="relative w-8 h-8 rounded-full border" style={{ backgroundColor: color }}>
                 <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-full opacity-0 cursor-pointer absolute inset-0"
                />
            </div>
            <Input 
                type="text" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-32 h-10 rounded-full"
                placeholder="#0FB4C3"
            />
        </div>
    </div>
);

const initialFaqs = [
    { question: 'Does habi charge an advance payment?', answer: 'Yes. habi collects a booking amount of about 1% of the total home construction cost.' },
    { question: 'What is the cost of building a house with habi?', answer: 'The cost depends on the package you choose. We have different packages to suit various budgets and requirements.' },
    { question: 'How long does it take to build a house?', answer: 'The construction timeline varies depending on the project\'s complexity and size. On average, it takes about 6-9 months.' }
];

const icons: { [key: string]: React.ReactNode } = {
    GanttChartSquare: <GanttChartSquare />,
    Award: <Award />,
    Shield: <Shield />,
    DollarSign: <DollarSign />,
    Home: <Home />,
    User: <User />,
    Laptop: <Laptop />,
    MapPin: <MapPin />,
};

const initialBulletPoints: { text: string; icon: string }[] = [
    { text: "Unique Design", icon: "GanttChartSquare" },
    { text: "Efficient planning", icon: "GanttChartSquare" },
    { text: "Disaster Resilient", icon: "Shield" },
    { text: "1 Year Warranty", icon: "Award" },
    { text: "Project Tracking", icon: "GanttChartSquare" },
    { text: "50 Year Guarantee", icon: "Award" },
    { text: "Structure as per NBC", icon: "Home" },
    { text: "Transparent Pricing", icon: "DollarSign" },
];

export const BrandingSheet = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    
    const [logo, setLogo] = useState<string | null>('/logo-placeholder.svg');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [primaryColor, setPrimaryColor] = useState('#3391FF');
    
    const [companyDescription, setCompanyDescription] = useState('');
    const [faqs, setFaqs] = useState(initialFaqs);
    const [bulletPoints, setBulletPoints] = useState(initialBulletPoints);
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
    const [loginImages, setLoginImages] = useState<string[]>(['/images/logoimage.png']);
    const [isAiContentLoading, setIsAiContentLoading] = useState(false);

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
        newBulletPoints[index].text = value;
        setBulletPoints(newBulletPoints);
    };

    const handleIconChange = (index: number, icon: string) => {
        const newBulletPoints = [...bulletPoints];
        newBulletPoints[index].icon = icon;
        setBulletPoints(newBulletPoints);
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setLogoFile(file);
            setLogo(URL.createObjectURL(file));
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

    const handleGenerateAiContent = async () => {
        if (!companyDescription.trim()) {
            toast({
                variant: 'destructive',
                title: 'Company Description Required',
                description: 'Please provide a brief description of your company to generate content.',
            });
            return;
        }
        setIsAiContentLoading(true);
        try {
            const result: ContentSuggestionOutput = await getContentSuggestions({ companyDescription });
            setBulletPoints(result.bulletPoints.map(bp => ({ text: bp, icon: 'GanttChartSquare' })));
            setFaqs(result.faqs);
            toast({
                title: 'Content Generated!',
                description: 'Marketing content has been generated by AI.',
            });

        } catch (error) {
             console.error('Error getting AI content suggestions:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate AI content. Please try again.',
            });
        } finally {
            setIsAiContentLoading(false);
        }
    };


    const handleSave = () => {
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
                    "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-4xl md:mx-auto rounded-t-[50px] border-none",
                )}
            >
                <SheetHeader className="p-6 border-b shrink-0">
                    <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <SheetTitle className="text-2xl font-semibold">Branding & Workflow</SheetTitle>
                            <SheetDescription className="text-muted-foreground">
                                These customizations will reflect on the client version of your organization.
                            </SheetDescription>
                        </div>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full shrink-0">
                                <X className="h-5 w-5" />
                            </Button>
                        </SheetClose>
                    </div>
                </SheetHeader>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1">
                        <div className="p-6 space-y-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-16 h-16 rounded-full border border-border">
                                        {logo && <Image src={logo} alt="Company Logo" layout="fill" className="rounded-full object-cover" />}
                                    </div>
                                    <label htmlFor="logo-upload" className={'cursor-pointer'}>
                                        <div className="flex items-center gap-2 text-primary">
                                            <Upload className="h-5 w-5" />
                                            <span className="font-medium">Upload Logo</span>
                                        </div>
                                        <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                    </label>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <h4 className="text-lg font-medium text-muted-foreground">Theme Colors</h4>
                                    <ColorInput 
                                        label="Primary" 
                                        color={primaryColor} 
                                        setColor={setPrimaryColor} 
                                    />
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
                                <Label htmlFor="company-description" className="text-lg font-medium">Company Description</Label>
                                <Textarea 
                                    id="company-description"
                                    placeholder="Briefly describe your company and what it does..."
                                    value={companyDescription}
                                    onChange={(e) => setCompanyDescription(e.target.value)}
                                    className="min-h-[100px] rounded-2xl bg-background"
                                />
                                <Button type="button" onClick={handleGenerateAiContent} disabled={isAiContentLoading} className="rounded-full">
                                    <Sparkles className={cn("w-4 h-4 mr-2", isAiContentLoading && "animate-spin")} />
                                    {isAiContentLoading ? 'Generating...' : 'Generate AI Content'}
                                </Button>
                            </div>


                            <div className="space-y-4">
                                <Label className="text-lg font-medium">Marketing Bullet Points (Max 8)</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     {bulletPoints.map((point, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-14 h-14 rounded-full p-0 flex-shrink-0">
                                                        {React.cloneElement(icons[point.icon] as React.ReactElement, { className: "text-foreground" })}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-64 p-2">
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {Object.keys(icons).map(iconKey => (
                                                            <Button
                                                                key={iconKey}
                                                                variant="ghost"
                                                                size="icon"
                                                                className="w-12 h-12"
                                                                onClick={() => handleIconChange(index, iconKey)}
                                                            >
                                                                 {React.cloneElement(icons[iconKey] as React.ReactElement, { className: "text-foreground" })}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                                value={point.text}
                                                onChange={(e) => handleBulletPointChange(index, e.target.value)}
                                                className="h-12 rounded-full bg-background"
                                            />
                                        </div>
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
                                        <Input
                                            placeholder="Question"
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                                            className="h-12 rounded-full font-semibold bg-card dark:bg-background"
                                        />
                                        <Textarea
                                            placeholder="Answer"
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                                            className="min-h-[60px] rounded-xl bg-card dark:bg-background"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video-url" className="text-lg font-medium">Company Profile Video</Label>
                                <div className="relative">
                                    <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="video-url" placeholder="Enter YouTube video URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="pl-12 h-14 rounded-full bg-background"/>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="px-6 py-4 border-t flex justify-end shrink-0">
                         <Button className="h-14 rounded-full text-lg px-10" onClick={handleSave}>
                            <Save className="mr-2 h-5 w-5"/>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
