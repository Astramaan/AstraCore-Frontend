
'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { Edit, Save } from 'lucide-react';
import { DetailField } from './detail-field'; // Assuming DetailField is in its own file now
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

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

const EditProfileForm = ({ employee, onSave, onCancel }: { employee: typeof initialEmployeeData, onSave: (data: typeof initialEmployeeData) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(employee);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }
    
    const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
        <div className="space-y-2">
            <Label htmlFor={id} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
            <Input id={id} className="h-14 bg-background rounded-full px-5" value={value} {...props} />
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6 border-b">
                <DialogTitle className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">Edit Profile</span>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-250px)]">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-6">
                        <FloatingLabelInput id="name" name="name" label="Full Name" value={formData.name} onChange={handleInputChange} />
                        <FloatingLabelInput id="email" name="email" label="Email Id" value={formData.email} onChange={handleInputChange} type="email" />
                        <FloatingLabelInput id="dob" name="dob" label="Date of Birth" value={formData.dob} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-6">
                        <FloatingLabelInput id="phone" name="phone" label="Phone Number" value={formData.phone} onChange={handleInputChange} />
                        <div className="space-y-2">
                             <Label className={cn("text-lg font-medium px-2 text-grey-1")}>Role</Label>
                             <div className="h-14 flex items-center px-5 rounded-full bg-background">
                                <p className="text-black text-lg leading-tight truncate">{formData.role}</p>
                            </div>
                        </div>
                        <FloatingLabelInput id="address" name="address" label="Address" value={formData.address} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onCancel} className="h-14 px-10 rounded-full text-lg">Cancel</Button>
                <Button type="submit" className="h-14 px-10 rounded-full text-lg"><Save className="mr-2 h-4 w-4" /> Save</Button>
            </div>
        </form>
    );
};


export function PersonalDetails({ employeeId }: PersonalDetailsProps) {
    const [employee, setEmployee] = useState(initialEmployeeData);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (updatedEmployee: typeof initialEmployeeData) => {
        setEmployee(updatedEmployee);
        setIsEditing(false);
        // Maybe show a toast notification for success
    };

    return (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <div className="space-y-6">
                <Card className="rounded-[50px] p-4 md:p-8">
                    <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="shrink-0 flex flex-col items-center md:flex-row md:items-start lg:flex-col lg:items-center gap-4">
                                <Image src={employee.avatar} alt={employee.name} width={156} height={156} className="rounded-full" data-ai-hint="person portrait"/>
                                <div className="space-y-4 md:hidden lg:flex lg:flex-col">
                                    <DialogTrigger asChild>
                                        <Button className="w-full h-14 px-10 rounded-full text-white text-lg font-medium">
                                            <Edit className="mr-2 h-5 w-5" />
                                            Edit Profile
                                        </Button>
                                    </DialogTrigger>
                                    <Button variant="outline" className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">Change Password</Button>
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-6">
                                    <DetailField label="Full Name" name="name" value={employee.name} isEditing={false} />
                                    <DetailField label="Email Id" name="email" value={employee.email} isEditing={false} />
                                    <DetailField label="Last Login" name="lastLogin" value={employee.lastLogin} isEditing={false} />
                                    <DetailField label="Date of Birth" name="dob" value={employee.dob} isEditing={false} />
                                </div>
                                <div className="space-y-6">
                                    <DetailField label="Phone Number" name="phone" value={employee.phone} isEditing={false} />
                                    <DetailField label="Role" name="role" value={employee.role} isEditing={false} />
                                    <DetailField label="Date Joined" name="dateJoined" value={employee.dateJoined} isEditing={false} />
                                    <DetailField label="Address" name="address" value={employee.address} isEditing={false} />
                                </div>
                            </div>
                             <div className="space-y-4 hidden md:flex lg:hidden xl:flex flex-col">
                                <DialogTrigger asChild>
                                    <Button className="w-full h-14 px-10 rounded-full text-white text-lg font-medium">
                                        <Edit className="mr-2 h-5 w-5" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                <Button variant="outline" className="w-full h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium">Change Password</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <DialogContent className="max-w-3xl p-0 rounded-[50px] bg-white">
                <EditProfileForm 
                    employee={employee}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
