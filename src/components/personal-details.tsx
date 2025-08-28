

'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    const employee = employeeData;

    return (
        <AlertDialog>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-black">Personal Details</h2>
                    <Button asChild variant="outline" className="h-14 px-10 rounded-full bg-white text-black hover:bg-primary hover:text-white text-lg font-medium">
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
                                <Button className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-primary hover:text-white text-lg font-medium">Reset Password</Button>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="w-full h-14 px-10 rounded-full bg-background hover:bg-destructive/10 text-red-600 text-lg font-medium">Deactivate user</Button>
                                </AlertDialogTrigger>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <AlertDialogContent className="max-w-md rounded-[50px]">
                <AlertDialogHeader className="items-center text-center">
                     <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                      <div className="w-full h-full bg-red-600/5 rounded-full" />
                      <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                      <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                    </div>
                    <AlertDialogTitle className="text-2xl font-semibold">
                        Confirm Deactivation?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-grey-2">
                        Deactivating this employee will remove their access to AstraCore immediately.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                    <AlertDialogCancel className="w-40 h-14 px-10 py-3.5 bg-background rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary hover:text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="w-40 h-14 px-10 py-3.5 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Deactivate</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
