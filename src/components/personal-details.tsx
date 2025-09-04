
'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Edit, Save, ShieldAlert, ChevronLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { ChangePasswordDialog } from './change-password-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Link from 'next/link';

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
    const [isRoleChangeConfirmOpen, setIsRoleChangeConfirmOpen] = useState(false);
    const [pendingRole, setPendingRole] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value: string) => {
        if (value !== formData.role) {
            setPendingRole(value);
            setIsRoleChangeConfirmOpen(true);
        }
    }

    const confirmRoleChange = () => {
        if(pendingRole) {
            setFormData(prev => ({ ...prev, role: pendingRole }));
        }
        setPendingRole(null);
        setIsRoleChangeConfirmOpen(false);
    }
    
    const cancelRoleChange = () => {
        setPendingRole(null);
        setIsRoleChangeConfirmOpen(false);
    }

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
            <DialogHeader className="p-6 border-b bg-white rounded-t-[50px]">
                <DialogTitle className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">Edit Profile</span>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full" onClick={onCancel}>
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] bg-white">
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
                              {employee.role === 'Super Admin' ? (
                                <Select value={formData.role} onValueChange={handleRoleChange}>
                                    <SelectTrigger className="h-14 bg-background rounded-full px-5">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Employee">Employee</SelectItem>
                                    </SelectContent>
                                </Select>
                             ) : (
                                <div className="h-14 flex items-center px-5 rounded-full bg-background">
                                    <p className="text-black text-lg leading-tight truncate">{formData.role}</p>
                                </div>
                             )}
                        </div>
                        <FloatingLabelInput id="address" name="address" label="Address" value={formData.address} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2 bg-white rounded-b-[50px]">
                <Button type="button" variant="ghost" onClick={onCancel} className="h-14 px-10 rounded-full text-lg bg-background border-transparent hover:bg-muted">Cancel</Button>
                <Button type="submit" className="h-14 px-10 rounded-full text-lg"><Save className="mr-2 h-4 w-4" /> Save</Button>
            </div>
             <AlertDialog open={isRoleChangeConfirmOpen} onOpenChange={setIsRoleChangeConfirmOpen}>
                <AlertDialogContent className="max-w-md rounded-[50px]">
                    <AlertDialogHeader className="items-center text-center">
                        <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                            <div className="w-full h-full bg-yellow-600/5 rounded-full" />
                            <div className="w-14 h-14 bg-yellow-600/20 rounded-full absolute" />
                            <ShieldAlert className="w-8 h-8 text-yellow-600 absolute" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-semibold">Confirm Role Change</AlertDialogTitle>
                        <AlertDialogDescription className="text-lg text-grey-2">
                            Changing the role of a Super Admin can have significant security implications. Are you sure you want to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel onClick={cancelRoleChange} className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmRoleChange} className="w-40 h-14 px-10 bg-primary rounded-[50px] text-lg font-medium text-white hover:bg-primary/90">Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Personal Details</h2>
                    <Button variant="ghost" asChild>
                        <Link href="/organization/home">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
                <Card className="rounded-[50px] p-4 md:p-8">
                    <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="shrink-0 flex items-center gap-4">
                                <Image src={employee.avatar} alt={employee.name} width={156} height={156} className="rounded-full" data-ai-hint="person portrait"/>
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                                <div className="space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Full Name</Label>
                                    <p className="text-black text-lg leading-tight truncate">{employee.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Phone Number</Label>
                                    <p className="text-black text-lg leading-tight truncate">{employee.phone}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Last Login</Label>
                                    <p className="text-black text-lg leading-tight truncate">{employee.lastLogin}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Email Id</Label>
                                    <p className="text-black text-lg leading-tight truncate">{employee.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Role</Label>
                                    <p className="text-primary text-lg leading-tight truncate">{employee.role}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Date Joined</Label>
                                    <p className="text-black text-lg leading-tight truncate">{employee.dateJoined}</p>
                                </div>
                                 <div className="space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Date of Birth</Label>
                                    <p className="text-black text-lg leading-tight truncate">{employee.dob}</p>
                                </div>
                                <div className="lg:col-span-2 space-y-1">
                                    <Label className="text-base font-medium px-2 text-grey-1">Address</Label>
                                    <p className="text-black text-lg leading-tight">{employee.address}</p>
                                </div>
                            </div>
                             <div className="space-y-4 lg:pl-8">
                                <DialogTrigger asChild>
                                    <Button className="w-full md:w-56 h-14 px-10 rounded-full text-white text-lg font-medium bg-primary hover:bg-primary/90">
                                        <Edit className="mr-2 h-5 w-5" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                <ChangePasswordDialog email={employee.email} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
                <EditProfileForm 
                    employee={employee}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
