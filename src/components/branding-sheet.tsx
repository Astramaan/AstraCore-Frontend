

'use client';

import React, { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { X, Upload, Palette, Save, Plus, Trash2, Youtube, Edit, Sparkles, Award, GanttChartSquare, Shield, DollarSign, Home, User, Laptop, MapPin, Search, ChevronDown, Rocket, Zap, TrendingUp, Star, Heart, ThumbsUp, Clock, Calendar, Briefcase, Settings, Wrench, Package, Truck, Phone, Mail, Globe, Lightbulb, Users as UsersIcon, FileText, ClipboardCheck, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from './ui/popover';
import { getContentSuggestions, type ContentSuggestionOutput } from '@/ai/flows/content-suggestion-flow';
import { Separator } from './ui/separator';

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
    Rocket: <Rocket />,
    Zap: <Zap />,
    TrendingUp: <TrendingUp />,
    Star: <Star />,
    Heart: <Heart />,
    ThumbsUp: <ThumbsUp />,
    Clock: <Clock />,
    Calendar: <Calendar />,
    Briefcase: <Briefcase />,
    Settings: <Settings />,
    Wrench: <Wrench />,
    Package: <Package />,
    Truck: <Truck />,
    Phone: <Phone />,
    Mail: <Mail />,
    Globe: <Globe />,
    Lightbulb: <Lightbulb />,
    Users: <UsersIcon />,
    FileText: <FileText />,
    ClipboardCheck: <ClipboardCheck />,
    Twitter: <Twitter/>,
    Linkedin: <Linkedin/>,
    Facebook: <Facebook/>,
    Instagram: <Instagram/>,
};

const iconKeys = Object.keys(icons);

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

const initialFeatures: { text: string; icon: string }[] = [
    { text: "Project Tracking", icon: "GanttChartSquare" },
    { text: "50 Year Guarantee", icon: "Award" },
    { text: "Structure as per NBC", icon: "Home" },
    { text: "Transparent Pricing", icon: "DollarSign" },
];

const initialPackages = [
    {
        name: "Essential",
        price: "1,750",
        description: "The essentials for a solid foundation and structure.",
        features: [
            "Basic Structural Design",
            "Standard Quality Materials",
            "MEP Consultation",
            "Project Tracking",
        ],
        isPopular: false,
    },
    {
        name: "Premium",
        price: "2,050",
        description: "A balanced package with premium finishes and features.",
        features: [
            "Custom Architectural Design",
            "Premium Quality Materials",
            "Smart Home Features",
            "3D Visualizations",
            "Dedicated Project Manager",
        ],
        isPopular: true,
    },
    {
        name: "Luxury",
        price: "2,450",
        description: "The ultimate package for a bespoke, high-end home.",
        features: [
            "Advanced Interior Design",
            "Luxury Brand Materials",
            "Home Automation",
            "Landscaping Services",
            "Post-handover support",
        ],
        isPopular: false,
    },
];

const initialSocialMediaLinks = {
    twitter: '',
    linkedin: '',
    facebook: '',
    instagram: '',
};


export const BrandingSheet = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    
    const [logo, setLogo] = useState<string | null>('/logo-placeholder.svg');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [primaryColor, setPrimaryColor] = useState('#0FB4C3');
    
    const [companyDescription, setCompanyDescription] = useState('');
    const [faqs, setFaqs] = useState(initialFaqs);
    const [bulletPoints, setBulletPoints] = useState(initialBulletPoints);
    const [featureHighlights, setFeatureHighlights] = useState(initialFeatures);
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
    const [loginImages, setLoginImages] = useState<string[]>(['/images/logoimage.png']);
    const [packages, setPackages] = useState(initialPackages);
    const [socialMediaLinks, setSocialMediaLinks] = useState(initialSocialMediaLinks);
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

    const handlePointChange = (setter: React.Dispatch<React.SetStateAction<{ text: string; icon: string }[]>>, index: number, value: string) => {
        setter(prev => {
            const newPoints = [...prev];
            newPoints[index].text = value;
            return newPoints;
        });
    };

    const handleIconChange = (setter: React.Dispatch<React.SetStateAction<{ text: string; icon: string }[]>>, index: number, icon: string) => {
        setter(prev => {
            const newPoints = [...prev];
            newPoints[index].icon = icon;
            return newPoints;
        });
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
            setFeatureHighlights(result.featureHighlights);
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
    
    const handlePackageChange = (index: number, field: string, value: string) => {
        const newPackages = [...packages];
        (newPackages[index] as any)[field] = value;
        setPackages(newPackages);
    };

    const handlePackageFeatureChange = (pkgIndex: number, featIndex: number, value: string) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features[featIndex] = value;
        setPackages(newPackages);
    };

    const addPackageFeature = (pkgIndex: number) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features.push('');
        setPackages(newPackages);
    };

    const removePackageFeature = (pkgIndex: number, featIndex: number) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features.splice(featIndex, 1);
        setPackages(newPackages);
    };

    const addPackage = () => {
        setPackages(prev => [...prev, {
            name: `New Package ${prev.length + 1}`,
            price: '',
            description: '',
            features: [],
            isPopular: false,
        }]);
    };
    
    const removePackage = (index: number) => {
        setPackages(prev => prev.filter((_, i) => i !== index));
    };


    const setPopularPackage = (index: number) => {
        const newPackages = packages.map((pkg, i) => ({
            ...pkg,
            isPopular: i === index,
        }));
        setPackages(newPackages);
    };
    
    const handleSocialMediaChange = (platform: keyof typeof socialMediaLinks, value: string) => {
        setSocialMediaLinks(prev => ({
            ...prev,
            [platform]: value
        }));
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
                                     <div className="flex items-center gap-4">
                                        <div className="relative w-8 h-8 rounded-full border" style={{ backgroundColor: primaryColor }}>
                                             <input
                                                type="color"
                                                value={primaryColor}
                                                onChange={(e) => setPrimaryColor(e.target.value)}
                                                className="w-full h-full opacity-0 cursor-pointer absolute inset-0"
                                            />
                                        </div>
                                        <Input 
                                            type="text" 
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="w-32 h-10 rounded-full"
                                            placeholder="#0FB4C3"
                                        />
                                    </div>
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
                                                    <Button variant="outline" className="w-14 h-14 rounded-full p-0 flex-shrink-0" type="button">
                                                        {React.cloneElement(icons[point.icon] || <GanttChartSquare />, { className: "text-foreground" })}
                                                    </Button>
                                                </PopoverTrigger>
                                                 <PopoverContent className="w-64 p-0">
                                                    <ScrollArea className="h-48">
                                                        <div className="grid grid-cols-4 gap-1 p-2">
                                                            {iconKeys.map(iconKey => (
                                                                <PopoverClose key={iconKey} asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="w-12 h-12"
                                                                        onClick={() => handleIconChange(setBulletPoints, index, iconKey)}
                                                                    >
                                                                        {React.cloneElement(icons[iconKey] as React.ReactElement, { className: "text-foreground" })}
                                                                    </Button>
                                                                </PopoverClose>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                                value={point.text}
                                                onChange={(e) => handlePointChange(setBulletPoints, index, e.target.value)}
                                                className="h-12 rounded-full bg-background"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                             <div className="space-y-4">
                                <Label className="text-lg font-medium">Feature Highlights (Max 4)</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     {featureHighlights.map((point, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-14 h-14 rounded-full p-0 flex-shrink-0" type="button">
                                                         {React.cloneElement(icons[point.icon] || <GanttChartSquare />, { className: "text-foreground" })}
                                                    </Button>
                                                </PopoverTrigger>
                                                 <PopoverContent className="w-64 p-0">
                                                    <ScrollArea className="h-48">
                                                        <div className="grid grid-cols-4 gap-1 p-2">
                                                            {iconKeys.map(iconKey => (
                                                                <PopoverClose key={iconKey} asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="w-12 h-12"
                                                                        onClick={() => handleIconChange(setFeatureHighlights, index, iconKey)}
                                                                    >
                                                                        {React.cloneElement(icons[iconKey] as React.ReactElement, { className: "text-foreground" })}
                                                                    </Button>
                                                                </PopoverClose>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                                value={point.text}
                                                onChange={(e) => handlePointChange(setFeatureHighlights, index, e.target.value)}
                                                className="h-12 rounded-full bg-background"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Packages</Label>
                                    <Button type="button" size="sm" onClick={addPackage} className="rounded-full">
                                        <Plus className="mr-2 h-4 w-4" /> Add Package
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {packages.map((pkg, pkgIndex) => (
                                        <div key={pkgIndex} className="p-4 border rounded-2xl space-y-4 bg-background dark:bg-input">
                                             <div className="flex items-center justify-between">
                                                <Button size="sm" variant={pkg.isPopular ? "secondary" : "outline"} onClick={() => setPopularPackage(pkgIndex)} className="rounded-full text-xs">
                                                    {pkg.isPopular ? "Popular" : "Set Popular"}
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removePackage(pkgIndex)}>
                                                    <Trash2 className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                            <Input value={pkg.name} onChange={(e) => handlePackageChange(pkgIndex, 'name', e.target.value)} className="text-xl font-bold bg-transparent border-0 p-0" />
                                             <Input value={pkg.price} onChange={(e) => handlePackageChange(pkgIndex, 'price', e.target.value)} className="bg-card" placeholder="Price" />
                                             <Textarea value={pkg.description} onChange={(e) => handlePackageChange(pkgIndex, 'description', e.target.value)} className="bg-card" placeholder="Description" />
                                            <div>
                                                <Label className="text-sm">Features</Label>
                                                <div className="space-y-2 mt-1">
                                                    {pkg.features.map((feature, featIndex) => (
                                                        <div key={featIndex} className="flex items-center gap-2">
                                                            <Input value={feature} onChange={(e) => handlePackageFeatureChange(pkgIndex, featIndex, e.target.value)} className="bg-card h-10 rounded-full"/>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removePackageFeature(pkgIndex, featIndex)}><Trash2 className="w-4 h-4"/></Button>
                                                        </div>
                                                    ))}
                                                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => addPackageFeature(pkgIndex)}><Plus className="w-4 h-4 mr-1"/> Add Feature</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <Separator />


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
                                            className="h-12 rounded-full font-semibold bg-card"
                                        />
                                        <Textarea
                                            placeholder="Answer"
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                                            className="min-h-[60px] rounded-xl bg-card"
                                        />
                                    </div>
                                ))}
                            </div>

                            <Separator />
                            
                             <div className="space-y-4">
                                <Label className="text-lg font-medium">Social Media Links</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Twitter URL" value={socialMediaLinks.twitter} onChange={e => handleSocialMediaChange('twitter', e.target.value)} className="pl-12 h-14 rounded-full bg-background" />
                                    </div>
                                    <div className="relative">
                                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="LinkedIn URL" value={socialMediaLinks.linkedin} onChange={e => handleSocialMediaChange('linkedin', e.target.value)} className="pl-12 h-14 rounded-full bg-background" />
                                    </div>
                                    <div className="relative">
                                        <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Facebook URL" value={socialMediaLinks.facebook} onChange={e => handleSocialMediaChange('facebook', e.target.value)} className="pl-12 h-14 rounded-full bg-background" />
                                    </div>
                                    <div className="relative">
                                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Instagram URL" value={socialMediaLinks.instagram} onChange={e => handleSocialMediaChange('instagram', e.target.value)} className="pl-12 h-14 rounded-full bg-background" />
                                    </div>
                                </div>
                            </div>
                            <Separator />

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
