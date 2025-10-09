
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { GanttChartSquare, Award, Shield, DollarSign, Home, User, Laptop, MapPin, Upload } from 'lucide-react';
import React, { useState, useEffect, useRef } from "react";
import { InPersonConsultationDialog } from "@/components/in-person-consultation-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ClientHeader } from "@/components/client-header";


const FeatureCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex flex-col items-center gap-4 text-center z-10">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            {icon}
        </div>
        <p className="text-foreground text-sm font-normal leading-none max-w-24">{text}</p>
    </div>
)

interface AppointmentDetails {
    type: 'office' | 'home' | 'online';
    date: Date;
    time: string;
    address?: string;
}

const AppointmentCard = ({ appointment, onReschedule }: { appointment: AppointmentDetails, onReschedule: () => void }) => {
    const formattedDate = appointment.date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
    });

    if (appointment.type === 'home') {
        return (
             <Card className="w-full max-w-sm rounded-[50px] p-6 text-center">
                <CardContent className="p-0">
                    <h2 className="text-2xl font-semibold mb-2">We're coming to meet you.</h2>
                    <p className="text-lg text-muted-foreground mb-6">{formattedDate} - {appointment.time}</p>
                     <div className="space-y-4">
                        <Button className="w-full h-14 rounded-full text-lg bg-zinc-200 hover:bg-zinc-200/90 text-black" disabled>
                            We're coming
                        </Button>
                        <Button variant="outline" className="w-full h-14 rounded-full text-primary border-primary bg-primary/10 hover:bg-primary/20" onClick={onReschedule}>
                            Reschedule
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    if (appointment.type === 'online') {
        return (
             <Card className="w-full max-w-sm rounded-[50px] p-6 text-center">
                <CardContent className="p-0">
                    <h2 className="text-2xl font-semibold mb-2">Online Consultation Scheduled</h2>
                    <p className="text-lg text-muted-foreground mb-6">{formattedDate} - {appointment.time}</p>
                     <div className="space-y-4">
                        <Button className="w-full h-14 rounded-full text-lg">
                            Join the meeting
                        </Button>
                        <Button variant="outline" className="w-full h-14 rounded-full text-primary border-primary bg-primary/10 hover:bg-primary/20" onClick={onReschedule}>
                            Reschedule
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-sm rounded-[50px] p-6 text-center">
            <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-2">We're waiting for you!</h2>
                <p className="text-lg text-muted-foreground mb-6">{formattedDate} - {appointment.time}</p>
                <div className="relative w-full h-40 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.026949377452!2d77.6433543147193!3d12.97017999085695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae171a5c68f233%3A0x4642b5853a8767e4!2sHabi.one!5e0!3m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-downgrade"
                      className="rounded-3xl"
                    ></iframe>
                    <div className="absolute inset-0 bg-black/10 rounded-3xl pointer-events-none"></div>
                    <div className="absolute flex flex-col items-center text-white pointer-events-none">
                        <MapPin className="w-8 h-8" />
                        <span className="font-semibold mt-1">Office's Location</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full h-14 rounded-full text-primary border-primary bg-primary/10 hover:bg-primary/20" onClick={onReschedule}>
                    Reschedule
                </Button>
            </CardContent>
        </Card>
    );
}

export default function NewUserHomePage({ params }: { params: { organizationId: string; userId: string } }) {
    const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);
    const [consultationType, setConsultationType] = useState<'office' | 'home' | 'online' | 'in-person' | null>(null);
    const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [siteImage, setSiteImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showProjectDetailsForm, setShowProjectDetailsForm] = useState(true);

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
        setAppointment(details);
    }

    const handleSiteImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSiteImage(e.target.files[0]);
        }
    };

    const faqs = [
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
    ];

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
            <main className="relative z-10">
                <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8 2xl:px-10 pb-32 mt-56">
                    <Card id="book-consultation-section" className="text-card-foreground w-full p-6 md:p-10 bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-[50px] flex flex-col justify-start items-center">
                        
                         {appointment ? (
                            <AppointmentCard appointment={appointment} onReschedule={() => {
                                setAppointment(null);
                                openConsultationDialog(appointment.type === 'office' || appointment.type === 'home' ? 'in-person' : appointment.type);
                            }} />
                        ) : (
                            <>
                                <Card className="w-full max-w-3xl rounded-[50px] flex flex-col justify-center items-center p-0 bg-transparent border-none shadow-none">
                                    <h2 className="text-center text-foreground text-lg font-medium leading-tight mb-4">How would you like to connect?</h2>
                                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                        <Button className="w-full md:w-64 h-[54px] rounded-full text-lg" onClick={() => openConsultationDialog('in-person')}>
                                            <User className="mr-2 h-5 w-5" />
                                            In Person
                                        </Button>
                                        <Button className="w-full md:w-64 h-[54px] rounded-full text-lg" onClick={() => openConsultationDialog('online')}>
                                            <Laptop className="mr-2 h-5 w-5" />
                                            Online
                                        </Button>
                                    </div>
                                </Card>
                            </>
                        )}
                    </Card>

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
                                                <input id="dropzone-file" type="file" className="hidden" onChange={handleSiteImageChange} />
                                            </label>
                                        </div>
                                        {siteImage && <p className="text-sm text-muted-foreground px-4">File: {siteImage.name}</p>}
                                    </div>
                                    <Button type="submit" className="w-full h-14 rounded-full text-lg">Submit Details</Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}


                    <Card id="faq-section" className="text-card-foreground w-full p-6 md:p-10 bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-[50px]">
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
            </main>
            {isClient && <InPersonConsultationDialog 
                isOpen={isConsultationDialogOpen} 
                onOpenChange={setIsConsultationDialogOpen}
                initialView={consultationType}
                onBookingSuccess={handleBookingSuccess}
             />}
        </div>
    );
}
