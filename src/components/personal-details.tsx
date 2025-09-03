
'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { Edit, Save } from 'lucide-react';
import { DetailField } from './detail-field'; // Assuming DetailField is in its own file now
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

const initialEmployeeData = {
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
    const [employee, setEmployee] = useState(initialEmployeeData);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // In a real app, you would save the data to a server here.
        setIsEditing(false);
        // Maybe show a toast notification for success
    };
    
    const handleCancel = () => {
        setEmployee(initialEmployeeData);
        setIsEditing(false);
    }

    return (
        <AlertDialog>
            <div className="space-y-6">
                <Card className="rounded-[50px] p-4 md:p-8">
                    <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="shrink-0 flex flex-col items-center md:flex-row md:items-start lg:flex-col lg:items-center gap-4">
                                <Image src={employee.avatar} alt={employee.name} width={156} height={156} className="rounded-full" data-ai-hint="person portrait"/>
                                <div className="space-y-4 md:hidden lg:flex lg:flex-col">
                                     {isEditing ? (
                                        <>
                                            <Button onClick={handleSave} className="w-full h-14 px-10 rounded-full text-white text-lg font-medium"><Save className="mr-2 h-5 w-5"/>Save</Button>
                                            <Button variant="outline" onClick={handleCancel} className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">Cancel</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => setIsEditing(true)} className="w-full h-14 px-10 rounded-full text-white text-lg font-medium">
                                                <Edit className="mr-2 h-5 w-5" />
                                                Edit Profile
                                            </Button>
                                            <Button variant="outline" className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">Change Password</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-6">
                                    <DetailField label="Full Name" name="name" value={employee.name} isEditing={isEditing} onChange={handleInputChange} />
                                    <DetailField label="Email Id" name="email" value={employee.email} isEditing={isEditing} onChange={handleInputChange} type="email" />
                                    <DetailField label="Last Login" name="lastLogin" value={employee.lastLogin} isEditing={false} />
                                    <DetailField label="Date of Birth" name="dob" value={employee.dob} isEditing={isEditing} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-6">
                                    <DetailField label="Phone Number" name="phone" value={employee.phone} isEditing={isEditing} onChange={handleInputChange} />
                                    <DetailField label="Role" name="role" value={employee.role} isEditing={false} />
                                    <DetailField label="Date Joined" name="dateJoined" value={employee.dateJoined} isEditing={false} />
                                    <DetailField label="Address" name="address" value={employee.address} isEditing={isEditing} onChange={handleInputChange} />
                                </div>
                            </div>
                             <div className="space-y-4 hidden md:flex lg:hidden xl:flex flex-col">
                                {isEditing ? (
                                    <>
                                        <Button onClick={handleSave} className="w-full h-14 px-10 rounded-full text-white text-lg font-medium"><Save className="mr-2 h-5 w-5"/>Save</Button>
                                        <Button variant="outline" onClick={handleCancel} className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">Cancel</Button>
                                    </>
                                ) : (
                                     <>
                                        <Button onClick={() => setIsEditing(true)} className="w-full h-14 px-10 rounded-full text-white text-lg font-medium">
                                            <Edit className="mr-2 h-5 w-5" />
                                            Edit Profile
                                        </Button>
                                        <Button variant="outline" className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">Change Password</Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AlertDialog>
    );
}
