
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";
import { ChevronRight, GanttChartSquare, Award, Shield, DollarSign, Tv, Home, User, Settings, LogOut, ChevronLeft, Upload, Youtube, Trash2, X } from 'lucide-react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";


const FeatureCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex flex-col items-center gap-4 text-center z-10">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            {icon}
        </div>
        <p className="text-black text-sm font-normal leading-none max-w-24">{text}</p>
    </div>
)

const ClientBottomNav = () => {
    const navItems = [
        { href: `#`, icon: Home, label: "Home" },
        { href: `#`, icon: Award, label: "Packages" },
        { href: `#`, icon: GanttChartSquare, label: "Portfolio" },
        { href: `#`, icon: User, label: "Profile" },
    ];

    // For this standalone page, we can assume 'Home' is always active.
    const pathname = ''; // Placeholder

    return (
        <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-10 px-4 flex justify-center">
             <div className="relative w-full md:w-auto bg-neutral-900/20 rounded-full border border-grey-1 backdrop-blur-[5px] p-2 md:p-4">
                <div className="flex items-center justify-around md:justify-center md:gap-4">
                    {navItems.map((item) => {
                        const isActive = item.label === 'Home'; // Simplified for this page
                        return (
                             <Link href={item.href} key={item.label} title={item.label} className="flex-shrink-0">
                                <div className={cn(
                                    "flex flex-col md:flex-row items-center justify-center text-center gap-0 md:gap-1.5 transition-colors duration-200",
                                    "lg:gap-2.5 md:py-3 rounded-full min-w-max",
                                    "h-16 w-16 md:h-12 md:w-auto px-1 md:px-4 lg:h-[54px]",
                                    isActive ? "bg-primary text-white" : "bg-white text-black hover:bg-white hover:text-primary"
                                )}>
                                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                                    <span className="text-xs font-medium lg:text-lg whitespace-nowrap">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};


export default function NewUserHomePage({ params }: { params: { organizationId: string, newuserId: string } }) {
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...filesArray]);
      }
    };
  
    const handleRemoveImage = (index: number) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting images:", images);
        // Here you would typically handle the file upload to a server
    };

    return (
        <div className="bg-zinc-100 min-h-screen">
            <main>
                <div className="max-w-[1240px] mx-auto space-y-8">
                    <Card className="rounded-[50px] text-card-foreground w-full p-10 bg-white flex flex-col justify-start items-center">
                        <h1 className="text-center text-neutral-900 text-2xl font-medium leading-none mb-6">Book Free Consultation</h1>
                        <Card className="w-full max-w-3xl rounded-[50px] border border-stone-300 p-6 flex flex-col justify-center items-center">
                            <h2 className="text-center text-black text-lg font-medium leading-tight mb-4">Connect with Us!</h2>
                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                <Button className="w-full md:w-64 h-[54px] rounded-full text-lg">Physically</Button>
                                <Button className="w-full md:w-64 h-[54px] rounded-full text-lg">Virtually</Button>
                            </div>
                        </Card>
                    </Card>

                    <Card className="text-card-foreground w-full p-10 bg-white rounded-[50px] flex flex-col justify-start items-center">
                        <CardContent className="p-0 w-full max-w-3xl flex flex-col items-center">
                            <h2 className="text-center text-black text-xl font-medium leading-tight">Upload Site Images</h2>
                            <p className="text-center text-stone-500 text-xs font-normal leading-none mt-2 mb-6">To provide a better design based on your needs.</p>
                            <form onSubmit={handleSubmit} className="w-full">
                                {images.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                                        {images.map((src, index) => (
                                            <div key={index} className="relative w-full aspect-square">
                                                <Image src={src} alt={`upload-preview-${index}`} layout="fill" className="rounded-lg object-cover" />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="destructive"
                                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div 
                                        className="w-full h-44 rounded-[10px] border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center">
                                            <Upload className="w-8 h-8 text-zinc-400" />
                                        </div>
                                        <p className="mt-2 text-stone-400 text-xs font-normal">Click to upload or drag and drop</p>
                                        <p className="text-stone-300 text-xs font-normal">JPG, PNG, PDF • Up to 10Mb</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*,application/pdf"
                                    multiple
                                    onChange={handleImageUpload}
                                />
                                <Button type="submit" className="w-full md:w-auto md:px-16 h-[54px] rounded-full text-lg mt-8" disabled={images.length === 0}>
                                    Submit
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="text-card-foreground w-full mt-8 p-10 bg-white rounded-[50px]">
                        <CardContent className="p-0">
                             <h2 className="text-center text-black text-lg font-normal leading-tight mb-8">Constructing Dreams with Precision and Care</h2>
                             <div className="relative mb-8">
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gray-300 -z-0 hidden md:block"></div>
                                <div className="grid grid-cols-4 gap-y-8 gap-x-4 justify-items-center">
                                    <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Unique Design"/>
                                    <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Efficient planning"/>
                                    <FeatureCard icon={<Shield className="text-white"/>} text="Disaster Resilient"/>
                                    <FeatureCard icon={<Award className="text-white"/>} text="1 Year Warranty"/>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gray-300 -z-0 hidden md:block"></div>
                                <div className="grid grid-cols-4 gap-y-8 gap-x-4 justify-items-center">
                                    <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Project Tracking"/>
                                    <FeatureCard icon={<Award className="text-white"/>} text="50 Year Guarantee"/>
                                    <FeatureCard icon={<Home className="text-white"/>} text="Structure as per NBC"/>
                                    <FeatureCard icon={<DollarSign className="text-white"/>} text="Transparent Pricing"/>
                                </div>
                            </div>

                            <div className="mt-16 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-full md:w-80 h-48 bg-black/25 rounded-[30px] border border-stone-300 flex items-center justify-center shrink-0">
                                    <Button variant="ghost" className="w-16 h-16 bg-red-600/50 rounded-full flex items-center justify-center hover:bg-red-600/70">
                                        <Youtube className="w-8 h-8 text-white"/>
                                    </Button>
                                </div>
                                <div>
                                    <h3 className="text-black text-lg font-normal leading-none mb-3">habi's Story - Redefines Home Building | habi</h3>
                                    <p className="text-stone-500 text-sm font-normal leading-normal">“Building Better Homes: Solving Construction Challenges with Tech” Discover how our startup tackles industry pain points head-on using cutting-edge technology. From streamlining processes to enhancing safety, we’re revolutionizing home building.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="text-card-foreground w-full mt-8 p-10 bg-white rounded-[50px]">
                         <CardContent className="p-0">
                            <h2 className="text-center text-black text-lg font-medium mb-8">FAQ’s</h2>
                            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-2">
                                <AccordionItem value="item-1" className="border-b-0">
                                    <AccordionTrigger className="bg-primary/10 rounded-full px-4 text-black hover:text-primary data-[state=open]:text-primary hover:no-underline">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0 rounded-b-[24px]">
                                        Yes. habi collects a booking amount of about 1% of the total home construction cost. Alongside this, we conduct digital surveys, perform soil tests, and create a floor plan.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border-b-0">
                                    <AccordionTrigger className="bg-primary/10 rounded-full px-4 text-black hover:text-primary data-[state=open]:text-primary hover:no-underline">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0 rounded-b-[24px]">
                                        Yes. habi collects a booking amount of about 1% of the total home construction cost.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-b-0">
                                    <AccordionTrigger className="bg-primary/10 rounded-full px-4 text-black hover:text-primary data-[state=open]:text-primary hover:no-underline">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0 rounded-b-[24px]">
                                       Yes. habi collects a booking amount of about 1% of the total home construction cost.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4" className="border-b-0">
                                    <AccordionTrigger className="bg-primary/10 rounded-full px-4 text-black hover:text-primary data-[state=open]:text-primary hover:no-underline">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0 rounded-b-[24px]">
                                        Yes. habi collects a booking amount of about 1% of the total home construction cost.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <div className="text-center mt-4">
                                <a href="#" className="text-cyan-500 text-sm font-normal underline leading-none">Still have a questions ?</a>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </main>
            <ClientBottomNav />
        </div>
    )
}
