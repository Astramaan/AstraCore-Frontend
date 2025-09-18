
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";
import { ChevronRight, GanttChartSquare, Award, Shield, DollarSign, Tv, Home, User, Settings, LogOut, ChevronLeft, Upload, Youtube } from 'lucide-react';

const FeatureCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            {icon}
        </div>
        <p className="text-black text-sm font-normal leading-none max-w-24">{text}</p>
    </div>
)

export default function LeadHomePage({ params }: { params: { organizationId: string, leadId: string } }) {
    return (
        <div className="bg-zinc-100 min-h-screen -m-4">
            <aside className="w-48 fixed top-0 left-0 h-full bg-slate-50 border-r border-stone-300 flex-col hidden md:flex">
                <div className="p-4 pt-8 flex justify-center">
                    <HabiLogo />
                </div>
                <nav className="flex-grow px-4 mt-8">
                    <ul className="space-y-2">
                        <li className="relative">
                            <a href="#" className="flex items-center gap-3 text-lg p-3 rounded-l-[10px] text-primary bg-primary/10">
                                <Home className="h-6 w-6 text-primary" />
                                <span>Home</span>
                            </a>
                            <div className="absolute left-0 top-0 h-full w-[5px] bg-primary rounded-tr-[3px] rounded-br-[3px]" />
                        </li>
                        <li><a href="#" className="flex items-center gap-3 text-lg p-3 text-neutral-900"><Award className="h-6 w-6"/><span>Packages</span></a></li>
                        <li><a href="#" className="flex items-center gap-3 text-lg p-3 text-neutral-900"><GanttChartSquare className="h-6 w-6"/><span>Portfolio</span></a></li>
                        <li><a href="#" className="flex items-center gap-3 text-lg p-3 text-neutral-900"><User className="h-6 w-6"/><span>Profile</span></a></li>
                    </ul>
                </nav>
            </aside>

            <main className="md:ml-48">
                <div className="max-w-[1240px] mx-auto py-8 px-4">
                    <Card className="w-full p-4 md:p-8 bg-slate-50 shadow-lg rounded-2xl flex flex-col justify-center items-center">
                        <h1 className="text-center text-neutral-900 text-2xl font-medium leading-none mb-6">Book Free Consultation</h1>
                        <Card className="w-full max-w-3xl rounded-[20px] border border-stone-300 p-6 flex flex-col justify-center items-center">
                            <h2 className="text-center text-black text-lg font-medium leading-tight mb-4">Connect with Us!</h2>
                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                <Button className="w-full md:w-64 h-16 rounded-[10px] text-lg">Physically</Button>
                                <Button className="w-full md:w-64 h-16 rounded-[10px] text-lg">Virtually</Button>
                            </div>
                        </Card>
                    </Card>

                    <Card className="w-full mt-8 p-4 md:p-8 bg-slate-50 shadow-lg rounded-2xl">
                        <CardContent className="p-0">
                             <h2 className="text-center text-black text-lg font-normal leading-tight mb-8">Constructing Dreams with Precision and Care</h2>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 mb-8 justify-items-center">
                                <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Unique Design"/>
                                <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Efficient planning"/>
                                <FeatureCard icon={<Shield className="text-white"/>} text="Disaster Resilient"/>
                                <FeatureCard icon={<Award className="text-white"/>} text="1 Year Warranty"/>
                            </div>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 justify-items-center">
                                <FeatureCard icon={<GanttChartSquare className="text-white"/>} text="Project Tracking"/>
                                <FeatureCard icon={<Award className="text-white"/>} text="50 Year Guarantee"/>
                                <FeatureCard icon={<Home className="text-white"/>} text="Structure as per NBC"/>
                                <FeatureCard icon={<DollarSign className="text-white"/>} text="Transparent Pricing"/>
                            </div>

                            <div className="mt-16 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-full md:w-80 h-48 bg-black/25 rounded-[10px] border border-stone-300 flex items-center justify-center shrink-0">
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

                    <Card className="w-full mt-8 p-4 md:p-8 bg-slate-50 shadow-lg rounded-2xl">
                         <CardContent className="p-0">
                            <h2 className="text-center text-black text-lg font-medium mb-8">FAQ’s</h2>
                            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="bg-primary/10 rounded-t-md px-4 text-primary">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0 rounded-b-md">
                                        Yes. habi collects a booking amount of about 1% of the total home construction cost. Alongside this, we conduct digital surveys, perform soil tests, and create a floor plan.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="bg-primary/10 px-4 mt-2">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0">
                                        Yes. habi collects a booking amount of about 1% of the total home construction cost.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="bg-primary/10 px-4 mt-2">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0">
                                       Yes. habi collects a booking amount of about 1% of the total home construction cost.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="bg-primary/10 px-4 mt-2">Does habi charge an advance payment?</AccordionTrigger>
                                    <AccordionContent className="p-4 border border-t-0">
                                        Yes. habi collects a booking amount of about 1% of the total home construction cost.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <div className="text-center mt-4">
                                <a href="#" className="text-cyan-500 text-sm font-normal underline leading-none">Still have a questions ?</a>
                            </div>
                        </CardContent>
                    </Card>

                    <footer className="mt-16 text-center">
                        <div className="flex flex-wrap justify-center items-center gap-4 mb-2">
                            <a href="#" className="text-zinc-500 text-sm">Instagram</a>
                            <a href="#" className="text-zinc-500 text-sm">Facebook</a>
                            <a href="#" className="text-zinc-500 text-sm">LinkedIn</a>
                            <a href="#" className="text-zinc-500 text-sm">YouTube</a>
                            <a href="#" className="text-zinc-500 text-sm">Pinterest</a>
                            <a href="#" className="text-zinc-500 text-sm">Blog</a>
                            <a href="#" className="text-zinc-500 text-sm">Location</a>
                        </div>
                        <p className="text-zinc-500 text-sm">© 2024 habi from Desigasm Technologies Pvt.Ltd</p>
                    </footer>
                </div>
            </main>
        </div>
    )
}

    