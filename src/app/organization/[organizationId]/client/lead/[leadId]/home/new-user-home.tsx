
'use client';

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { GanttChartSquare, Award, Shield, DollarSign, Home, User, Laptop, MapPin, Upload, Sparkles } from 'lucide-react';
import { InPersonConsultationDialog } from "@/components/in-person-consultation-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ClientHeader } from "@/components/client-header";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { getContentSuggestions, type ContentSuggestionOutput } from '@/ai/flows/content-suggestion-flow';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface AppointmentDetails {
    type: 'office' | 'home' | 'online';
    date: Date;
    time: string;
    address?: string;
}

export default function NewUserHomePage({ params }: { params: { organizationId: string; userId: string } }) {
    const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);
    const [consultationType, setConsultationType] = useState<'office' | 'home' | 'online' | 'in-person' | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [siteImage, setSiteImage] = useState<File | null>(null);
    const [showProjectDetailsForm, setShowProjectDetailsForm] = useState(true);
    const { toast } = useToast();

    const [companyDescription, setCompanyDescription] = useState('');
    const [isAiContentLoading, setIsLoading] = useState(false);
    const [faqs, setFaqs] = useState([
        {
            question: "Does habi charge an advance payment?",
            answer: "Yes. habi collects a booking amount of about 1% of the total home construction cost. Alongside this, we conduct digital surveys, perform soil tests, and create a floor plan."
        },
        {
            question: "What is the cost of building a house with habi?",
            answer: "The cost depends on the package you choose. We have different packages to suit various budgets and requirements."
        },
        {
            question: "How long does it take to build a house?",
            answer: "The construction timeline varies depending on the project's complexity and size. On average, it takes about 6-9 months."
        },
        {
            question: "Do you provide architectural and structural designs?",
            answer: "Yes, we provide comprehensive design services, including architectural and structural plans, as part of our packages."
        }
    ]);


    useEffect(() => {
        setIsClient(true);
    }, []);

    const openConsultationDialog = (type: 'office' | 'home' | 'online' | 'in-person') => {
        setConsultationType(type);
        setIsConsultationDialogOpen(true);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting homeowner form");
        // Here you would typically handle the form submission
    };
    
    const handleBookingSuccess = (details: AppointmentDetails) => {
        // This function would handle what happens after a booking is successful.
        // for now, we'll just log it.
        console.log('Booking successful:', details);
    }

    const handleSiteImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSiteImage(e.target.files[0]);
        }
    };

    return (
        <div className="relative">
            <header className="sticky top-2 z-20 px-2">
                <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                    <div className="relative w-full bg-black/20 rounded-full backdrop-blur-[5px] px-4 py-2">
                        <div className="max-w-[1440px] 2xl:max-w-none mx-auto">
                            <ClientHeader />
                        </div>
                    </div>
                </div>
            </header>
            <div className="absolute top-0 left-0 w-full h-[50vh] -z-10">
                <Image
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBob3VzZXxlbnwwfHx8fDE3NTk4NDU5ODR8MA"
                    alt="Modern house background"
                    layout="fill"
                    objectFit="cover"
                    className="object-top"
                    data-ai-hint="modern house"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>
             <main className="relative z-10 mt-[30vh] md:mt-[40vh]">
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-4 md:px-8 2xl:px-10 pb-32">
                    
                    {/* Left Column container */}
                    <div className="md:col-span-1 lg:col-span-1 space-y-8 flex flex-col order-1">
                        {/* CTA */}
                        <Card id="book-consultation-section" className="order-1 text-card-foreground w-full p-0 bg-transparent border-none shadow-none flex flex-col justify-start items-center">
                            <div className="text-center">
                                <h2 className="text-center text-white text-2xl font-semibold leading-tight mb-2">
                                    Book your free consultation.
                                </h2>
                                <p className="text-white/80 font-medium text-sm">
                                    How would you like to connect?
                                </p>
                            </div>
                            <div className="flex flex-row gap-4 w-full justify-center mt-4">
                                <Button className="w-full sm:w-auto flex-1 sm:flex-initial sm:w-44 h-[54px] rounded-full text-lg" onClick={() => openConsultationDialog('in-person')}>
                                    <User className="mr-2 h-5 w-5" />
                                    In Person
                                </Button>
                                <Button className="w-full sm:w-auto flex-1 sm:flex-initial sm:w-44 h-[54px] rounded-full text-lg" onClick={() => openConsultationDialog('online')}>
                                    <Laptop className="mr-2 h-5 w-5" />
                                    Online
                                </Button>
                            </div>
                        </Card>

                        {/* FAQs */}
                        <Card id="faq-section" className="order-3 md:order-2 text-card-foreground w-full p-6 md:p-10 bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-[50px]">
                            <CardContent className="p-0">
                                <h2 className="text-center text-foreground text-lg font-medium mb-8">FAQ’s</h2>
                                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
                                    {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index + 1}`} className="bg-primary/10 rounded-[24px] border-none">
                                        <AccordionTrigger className="px-6 text-foreground hover:text-primary hover:no-underline text-left">
                                        <span>{`${index + 1}. ${faq.question}`}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pt-0 text-base text-muted-foreground">
                                        {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                    ))}
                                </Accordion>
                                <div className="text-center mt-6">
                                    <a href="#book-consultation-section" className="text-foreground hover:text-primary text-sm font-normal underline leading-none">Still have a questions ?</a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Form */}
                    <div className="order-2 md:col-span-1 lg:col-span-2">
                         {showProjectDetailsForm && (
                            <Card className="text-card-foreground w-full p-6 md:p-10 bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-[50px] flex flex-col justify-start items-center">
                                <CardContent className="p-0 max-w-xl w-full">
                                    <h2 className="text-center text-foreground text-lg font-medium leading-tight mb-4">Submit Your Project Details</h2>
                                    <p className="text-center text-muted-foreground text-sm mb-8">Provide us with some basic information about your project.</p>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="project-type" className="px-4">Project Type</Label>
                                                <Input id="project-type" placeholder="e.g. Residential, Commercial" className="h-14 rounded-full bg-background dark:bg-input" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="floor-count" className="px-4">Number of Floors</Label>
                                                <Input id="floor-count" placeholder="e.g. G+2" className="h-14 rounded-full bg-background dark:bg-input" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="site-address" className="px-4">Site Address</Label>
                                            <Textarea id="site-address" placeholder="Enter the full site address" className="rounded-3xl bg-background dark:bg-input min-h-[100px]" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="px-4">Site Image</Label>
                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer bg-background hover:bg-muted">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Upload a file</span> or drag and drop</p>
                                                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleSiteImageUpload} />
                                                </label>
                                            </div>
                                            {siteImage && <p className="text-sm text-muted-foreground px-4">File: {siteImage.name}</p>}
                                        </div>
                                        <Button type="submit" className="w-full h-14 rounded-full text-lg">Submit Details</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                </div>
                 {isClient && <InPersonConsultationDialog 
                    isOpen={isConsultationDialogOpen} 
                    onOpenChange={setIsConsultationDialogOpen}
                    initialView={consultationType}
                    onBookingSuccess={handleBookingSuccess}
                 />}
            </main>
        </div>
    );
}
