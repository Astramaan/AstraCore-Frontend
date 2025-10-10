
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

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
    <Card className={cn(
        "rounded-[50px] p-8 flex flex-col relative",
        pkg.isPopular ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
    )}>
        {pkg.isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
            </div>
        )}
        <CardHeader className="p-0 items-center">
            <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
            <p className={cn("text-sm", pkg.isPopular ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {pkg.description}
            </p>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col mt-4">
            <div className="my-8 text-center">
                <span className="text-5xl font-bold">₹{pkg.price}</span>
                <span className={cn(pkg.isPopular ? "text-primary-foreground/80" : "text-muted-foreground")}>/sq.ft</span>
            </div>
            <ul className="space-y-4 flex-1">
                {pkg.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", pkg.isPopular ? "bg-white/20 text-white" : "bg-primary/10 text-primary")}>
                           <Check className="w-4 h-4" />
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

export default function PackagesPage() {
    const params = useParams();
    const organizationId = params.organizationId as string;
    const leadId = params.leadId as string;

    return (
        <div className="bg-background min-h-screen">
            <main className="max-w-[1240px] mx-auto p-4 md:p-8 space-y-8 pb-32">
                <div className="text-center pt-4 md:pt-0">
                    <p className="text-muted-foreground">Find the perfect plan for your dream home.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg => (
                        <PackageCard key={pkg.name} pkg={pkg} />
                    ))}
                </div>

                <div className="fixed bottom-28 left-0 right-0 py-4 bg-transparent z-10 text-center md:static md:p-0 md:pt-8">
                    <Button asChild className="rounded-full h-[54px] px-8 text-lg w-full max-w-xs md:w-auto drop-shadow-2xl">
                        <Link href={`/organization/${organizationId}/client/lead/${leadId}/home#book-consultation-section`}>
                            Contact Team
                        </Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}
