'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronRight, Edit, LogOut, Save, X } from 'lucide-react';
import { ClientBottomNav } from '../home/page';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const DetailField = ({ label, value }: { label: string, value: string }) => (
    <div className="space-y-1">
        <label className="text-sm text-muted-foreground">{label}</label>
        <p className="text-lg">{value}</p>
    </div>
);

const ProfileLink = ({ label }: { label: string }) => (
    <div className="flex justify-between items-center w-full py-4 border-b border-stone-200 last:border-b-0">
        <span className="text-lg">{label}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
);

const EditProfileForm = ({ profile: initialProfile, onSave, onClose }: { profile: any, onSave: (data: any) => void, onClose: () => void }) => {
    const [profile, setProfile] = useState(initialProfile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(profile);
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex justify-between items-center text-2xl font-semibold">
                    Edit Profile
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </SheetClose>
                </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1">
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={profile.name} onChange={handleChange} className="h-[54px] rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} className="h-[54px] rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email ID</Label>
                        <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} className="h-[54px] rounded-full" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="pincode">Site location Pin code</Label>
                        <Input id="pincode" name="pincode" value={profile.pincode} onChange={handleChange} className="h-[54px] rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Current Address</Label>
                        <Textarea id="address" name="address" value={profile.address} onChange={handleChange} className="rounded-3xl" />
                    </div>
                </div>
            </ScrollArea>
            <div className="p-6 mt-auto border-t">
                <Button type="submit" className="w-full h-14 rounded-full text-lg"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </div>
        </form>
    );
};


export default function ClientProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Yash',
        phone: '+91 9380000839',
        email: 'yash007@gmail.com',
        pincode: '560109',
        address: '43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008',
    });
    
    const handleSave = (updatedProfile: any) => {
        setProfile(updatedProfile);
        setIsEditing(false);
    }

    return (
        <div className="bg-zinc-100 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8 pb-32">
                 <Card className="rounded-[50px] p-6 md:p-10">
                    <CardContent className="p-0">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <Image src="https://placehold.co/94x94" alt="Yash" width={72} height={72} className="rounded-full border-2 border-white" data-ai-hint="person portrait"/>
                                <div>
                                    <h1 className="text-2xl font-semibold">Profile</h1>
                                </div>
                            </div>
                            <Sheet open={isEditing} onOpenChange={setIsEditing}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="rounded-full h-[54px] px-6">
                                        <Edit className="h-5 w-5 mr-2" />
                                        Edit
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-auto md:max-w-md md:mx-auto rounded-t-[50px] border-none">
                                     <EditProfileForm profile={profile} onSave={handleSave} onClose={() => setIsEditing(false)} />
                                </SheetContent>
                            </Sheet>
                        </div>
                        <Separator className="mb-6"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <DetailField label="Name" value={profile.name} />
                            <DetailField label="Phone Number" value={profile.phone} />
                            <DetailField label="Email ID" value={profile.email} />
                            <DetailField label="Site location Pin code" value={profile.pincode} />
                            <div className="col-span-1 md:col-span-2 space-y-1">
                                <label className="text-sm text-muted-foreground">Current Address</label>
                                <p className="text-lg">{profile.address}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[50px] p-6 md:p-10">
                    <CardContent className="p-0">
                        <ProfileLink label="FAQ’s" />
                        <ProfileLink label="Privacy Policies" />
                        <ProfileLink label="Term & condition" />
                        <ProfileLink label="habi’s story" />
                    </CardContent>
                </Card>
                
                <Button variant="outline" className="w-full h-14 bg-card rounded-full flex items-center justify-center text-destructive border-destructive/50 hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </Button>
            </div>
             <ClientBottomNav />
        </div>
    );
}
