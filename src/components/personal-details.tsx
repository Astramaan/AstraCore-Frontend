
'use client';

import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const employeeData = {
    id: "1",
    name: "Balaji Naik",
    phone: "+91 9380032186",
    email: "balaji@habi.one",
    dob: "09 Sept 2002",
    address: "#3, Ganigarapalya, Thalaghattpura post, Bengaluru - 560109",
    role: "Super Admin",
    lastLogin: "6 hrs ago",
    dateJoined: "22nd June 2025",
    avatar: "https://placehold.co/156x156"
};

interface PersonalDetailsProps {
    employeeId: string;
}

export function PersonalDetails({ employeeId }: PersonalDetailsProps) {
    // In a real app, you would use employeeId to fetch data.
    // We'll use the mock data for now.
    const employee = employeeData;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-black">Personal Details</h2>
                <Button asChild variant="outline" className="h-14 px-10 rounded-full bg-white text-black hover:bg-primary/10 hover:text-primary text-lg font-medium">
                    <Link href="/organization/employee-management">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                    </Link>
                </Button>
            </div>
            <Card className="rounded-[50px] p-8">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="shrink-0">
                            <Image src={employee.avatar} alt={employee.name} width={156} height={156} className="rounded-full" data-ai-hint="person portrait"/>
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Full Name</p>
                                    <p className="text-lg text-black font-medium">{employee.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Email Id</p>
                                    <p className="text-lg text-black font-medium">{employee.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Date of Birth</p>
                                    <p className="text-lg text-black font-medium">{employee.dob}</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Phone Number</p>
                                    <p className="text-lg text-black font-medium">{employee.phone}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Role</p>
                                    <p className="text-lg text-primary font-medium">{employee.role}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Address</p>
                                    <p className="text-lg text-black font-medium leading-tight">{employee.address}</p>
                                </div>
                            </div>
                             <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Last Login</p>
                                    <p className="text-lg text-black font-medium">{employee.lastLogin}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-base text-grey-1">Date Joined</p>
                                    <p className="text-lg text-black font-medium">{employee.dateJoined}</p>
                                </div>
                            </div>
                        </div>
                         <div className="space-y-4">
                            <Button className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-primary/10 hover:text-primary text-lg font-medium">Edit Profile</Button>
                            <Button className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-destructive/10 hover:text-destructive text-lg font-medium">Deactivate</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
