
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const plans = [
    { name: "Basic Plan", price: "4,999", users: 50, features: ["50 Users", "Basic Analytics", "Email Support"] },
    { name: "Business Plan", price: "9,999", users: 150, features: ["150 Users", "Advanced Analytics", "Priority Support"] },
    { name: "Enterprise Plan", price: "19,999", users: 500, features: ["500 Users", "Full Analytics Suite", "Dedicated Support"] },
]

export default function SubscriptionManagementPage({ params: { organizationId } }: { params: { organizationId: string } }) {
    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.name} className="rounded-3xl flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>{plan.name}</CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardDescription>
                                <span className="text-3xl font-bold text-foreground">₹{plan.price}</span> / month
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-2 text-muted-foreground">
                                {plan.features.map(feature => <li key={feature}>✓ {feature}</li>)}
                            </ul>
                        </CardContent>
                        <div className="p-6">
                            <Button className="w-full">Choose Plan</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
