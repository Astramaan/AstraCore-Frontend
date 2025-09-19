
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HabiLogo } from '@/components/habi-logo';
import Image from 'next/image';
import { Award, ChevronRight, Edit, GanttChartSquare, Home, LogOut, User } from 'lucide-react';
import { ClientBottomNav } from '../home/page';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const DetailField = ({ label, value }: { label: string, value: string }) => (
    <div className="w-full">
        <div className="w-full rounded-[10px] border border-stone-300 relative h-16">
            <div className="absolute -top-2 left-2 bg-slate-50 px-1">
                <label className="text-stone-300 text-base font-normal leading-none">{label}</label>
            </div>
            <div className="p-4 mt-1">
                <p className="text-neutral-900 text-lg font-normal leading-snug">{value}</p>
            </div>
        </div>
    </div>
);

const ProfileLink = ({ label }: { label: string }) => (
    <div className="flex justify-between items-center w-full py-4 border-b border-stone-200">
        <span className="text-black text-lg font-normal">{label}</span>
        <ChevronRight className="h-5 w-5 text-neutral-900" />
    </div>
);

export default function ClientProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Yash',
        phone: '+91 9380000839',
        email: 'yash007@gmail.com',
        pincode: '560109',
        address: '43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008',
    });

    return (
        <div className="bg-zinc-100 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
                <div className="bg-slate-50 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)] p-6 rounded-3xl">
                     <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <Image src="https://placehold.co/94x94" alt="Yash" width={56} height={56} className="rounded-full border-2 border-white" data-ai-hint="person portrait"/>
                            <h1 className="text-2xl font-semibold">Profile</h1>
                        </div>
                        <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                            <Edit className="h-5 w-5" />
                        </Button>
                    </div>
                    <Separator className="mb-6"/>
                    <div className="space-y-6">
                        <DetailField label="Name" value={profile.name} />
                        <DetailField label="Phone Number" value={profile.phone} />
                        <DetailField label="Email ID" value={profile.email} />
                        <DetailField label="Site location Pin code" value={profile.pincode} />
                        <div className="w-full rounded-[10px] border border-stone-300 relative min-h-16">
                            <div className="absolute -top-2 left-2 bg-slate-50 px-1">
                                <label className="text-stone-300 text-base font-normal leading-none">Current Address</label>
                            </div>
                            <div className="p-4 mt-1">
                                <p className="text-neutral-900 text-lg font-normal leading-snug">{profile.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)] p-6 rounded-3xl">
                    <ProfileLink label="FAQ’s" />
                    <ProfileLink label="Privacy Policies" />
                    <ProfileLink label="Term & condition" />
                    <ProfileLink label="habi’s story" />
                </div>
                
                <Button variant="outline" className="w-full h-11 bg-slate-50 rounded-lg border border-stone-300 flex items-center justify-center text-stone-300">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </Button>
            </div>
             <ClientBottomNav />
        </div>
    );
}
