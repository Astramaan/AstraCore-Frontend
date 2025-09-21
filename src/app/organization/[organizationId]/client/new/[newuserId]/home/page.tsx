'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { GanttChartSquare, Award, Shield, DollarSign, Home, User, Laptop, MapPin } from 'lucide-react';
import React, { useState, useEffect } from "react";
import { InPersonConsultationDialog } from "@/components/in-person-consultation-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const FeatureCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex flex-col items-center gap-4 text-center z-10">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            {icon}
        </div>
        <p className="text-black text-sm font-normal leading-none max-w-24">{text}</p>
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
                <div className="relative w-full h-40 bg-zinc-100 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
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

export default function NewUserHomePage({ params }: { params: { organizationId: string, newuserId: string } }) {
    const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);
    const [consultationType, setConsultationType] = useState<'office' | 'home' | 'online' | 'in-person' | null>(null);
    const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
    const [isClient, setIsClient] = useState(false);

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
        <div className="bg-zinc-100 min-h-screen">
            <main>
                <div className="max-w-[1240px] mx-auto space-y-8 md:p-8">
                    <Card id="book-consultation-section" className="text-card-foreground w-full p-[40px] bg-white rounded-[50px] flex flex-col justify-start items-center">
                        
                         {appointment ? (
                            <AppointmentCard appointment={appointment} onReschedule={() => {
                                setAppointment(null);
                                openConsultationDialog(appointment.type === 'office' || appointment.type === 'home' ? 'in-person' : appointment.type);
                            }} />
                        ) : (
                            <>
                                <Card className="w-full max-w-3xl rounded-[50px] flex flex-col justify-center items-center p-0">
                                    <h2 className="text-center text-black text-lg font-medium leading-tight mb-4">How would you like to connect?</h2>
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

                     <Card className="text-card-foreground w-full p-10 bg-white rounded-[50px] flex flex-col justify-start items-center">
                        <CardContent className="p-0 w-full max-w-3xl flex flex-col items-center">
                            <h2 className="text-center text-black text-xl font-medium leading-tight">Submit Your Project Details</h2>
                            <p className="text-center text-stone-500 text-xs font-normal leading-none mt-2 mb-6">Provide us with some basic information about your project.</p>
                            <form onSubmit={handleSubmit} className="w-full space-y-4">
                                <div>
                                    <Label htmlFor="project-type">Project Type</Label>
                                    <Input id="project-type" placeholder="e.g., New Construction, Renovation" className="h-[54px] rounded-full" />
                                </div>
                                <div>
                                    <Label htmlFor="building-type">Building Type</Label>
                                    <Input id="building-type" placeholder="e.g., Residential, Commercial" className="h-[54px] rounded-full" />
                                </div>
                                <div>
                                    <Label htmlFor="floor-count">Number of Floors</Label>
                                    <Input id="floor-count" type="number" placeholder="e.g., G+2" className="h-[54px] rounded-full" />
                                </div>
                                <div>
                                    <Label htmlFor="site-address">Site Address</Label>
                                    <Textarea id="site-address" placeholder="Enter the full site address" className="min-h-[54px] rounded-3xl" />
                                </div>
                                <div className="flex justify-end pt-4">
                                  <Button type="submit" className="w-full md:w-auto md:px-16 h-[54px] rounded-full text-lg">
                                      Submit Details
                                  </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>


                    <Card className="text-card-foreground w-full p-10 bg-white rounded-[50px]">
                        <CardContent className="p-0">
                             <h2 className="text-center text-black text-lg font-normal leading-tight mb-8">Constructing Dreams with Precision and Care</h2>
                             <div className="relative">
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl h-px bg-gray-300 -z-0"></div>
                                <div className="grid grid-cols-4 gap-y-8 gap-x-4 justify-items-center">
                                    <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Unique Design"/>
                                    <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Efficient planning"/>
                                    <FeatureCard icon={<Shield className="text-white"/>} text="Disaster Resilient"/>
                                    <FeatureCard icon={<Award className="text-white"/>} text="1 Year Warranty"/>
                                </div>
                            </div>
                            <div className="relative mt-16">
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl h-px bg-gray-300 -z-0"></div>
                                <div className="grid grid-cols-4 gap-y-8 gap-x-4 justify-items-center">
                                    <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Project Tracking"/>
                                    <FeatureCard icon={<Award className="text-white"/>} text="50 Year Guarantee"/>
                                    <FeatureCard icon={<Home className="text-white"/>} text="Structure as per NBC"/>
                                    <FeatureCard icon={<DollarSign className="text-white"/>} text="Transparent Pricing"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card id="faq-section" className="text-card-foreground w-full p-10 bg-white rounded-[50px]">
                         <CardContent className="p-0">
                            <h2 className="text-center text-black text-lg font-medium mb-8">FAQ’s</h2>
                             <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
                                {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index + 1}`} className="bg-primary/10 rounded-[24px] border-none">
                                    <AccordionTrigger className="px-6 text-black hover:text-primary hover:no-underline text-left">
                                    <span>{`${index + 1}. ${faq.question}`}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pt-0 text-base text-muted-foreground">
                                    {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                                ))}
                            </Accordion>
                            <div className="text-center mt-6">
                                <a href="#book-consultation-section" className="text-black hover:text-primary text-sm font-normal underline leading-none">Still have a questions ?</a>
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
