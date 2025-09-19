
'use client';

import { HabiLogo } from "@/components/habi-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { ClientBottomNav } from "@/app/organization/[organizationId]/client/[newuserId]/home/page";
import { cn } from "@/lib/utils";

const packages = [
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

const PackageCard = ({ pkg }: { pkg: typeof packages[0] }) => (
    <Card className="rounded-[50px] p-8 flex flex-col bg-white">
        <CardHeader className="p-0 items-center">
            <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{pkg.description}</p>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col">
            <div className="my-8 text-center">
                <span className="text-5xl font-bold">₹{pkg.price}</span>
                <span className="text-muted-foreground">/sq.ft</span>
            </div>
            <ul className="space-y-4 flex-1">
                {pkg.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/10">
                           <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

export default function PackagesPage() {
    return (
        <div className="bg-background min-h-screen">
            <main className="max-w-[1240px] mx-auto p-4 md:p-8 space-y-8">
                <div className="text-center">
                     <HabiLogo className="mb-6 justify-center" />
                    <h1 className="text-3xl md:text-4xl font-bold">Our Packages</h1>
                    <p className="text-muted-foreground mt-2">Choose the perfect plan for your dream home.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg => (
                        <PackageCard key={pkg.name} pkg={pkg} />
                    ))}
                </div>
            </main>
            <ClientBottomNav />
        </div>
    )
}
