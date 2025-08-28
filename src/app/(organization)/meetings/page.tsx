

'use client';

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";
import { Input } from "@/components/ui/input";
import { MoreVertical, Search } from "lucide-react";
import { CreateMeetingSheet } from '@/components/create-meeting-sheet';

const clientMeetings = [
    { name: "Charan Project", city: "Mysuru", id: "CHA2024", date: "1st Sept 2024", time: "11:00 am", link: "meet.google.com/abc-xyz", email: "admin@abc.com", phone: "+91 1234567890" },
    { name: "Delta Project", city: "Bengaluru", id: "DEL2024", date: "2nd Sept 2024", time: "10:00 am", link: "meet.google.com/def-uvw", email: "contact@delta.com", phone: "+91 9876543210" },
    { name: "Gamma Project", city: "Chennai", id: "GAM2024", date: "3rd Sept 2024", time: "02:00 pm", link: "meet.google.com/ghi-rst", email: "support@gamma.co", phone: "+91 8765432109" },
];

const leadMeetings = [
    { name: "Alpha Lead", city: "Hyderabad", id: "LEAD2024", date: "5th Sept 2024", time: "03:00 pm", link: "meet.google.com/jkl-mno", email: "sales@alpha.io", phone: "+91 7654321098" },
    { name: "Beta Lead", city: "Mumbai", id: "LEAD2024-2", date: "6th Sept 2024", time: "09:30 am", link: "meet.google.com/pqr-stu", email: "info@betaleads.com", phone: "+91 6543210987" },
];

const MeetingCard = ({ meeting, isLead = false }: { meeting: typeof clientMeetings[0], isLead?: boolean }) => (
    <div className="bg-white p-4 border-b border-stone-200 last:border-b-0">
        <div className="space-y-4 relative">
             <div className="flex items-start gap-4">
                <div>
                    <p className="font-semibold text-lg text-zinc-900">{meeting.name}</p>
                    <p className="text-base"><span className="text-grey-2">City: </span><span className="text-black">{meeting.city}</span></p>
                </div>
            </div>
            
            <div>
                <p className="text-base"><span className="text-grey-2">Contact: </span><span className="text-black">{meeting.email} | {meeting.phone}</span></p>
                <p className="text-base"><span className="text-grey-2">{isLead ? 'Lead ID:' : 'Client ID:'} </span><span className="text-zinc-900">{meeting.id}</span></p>
            </div>
            
            <div className="space-y-1">
                 <p className="text-base"><span className="text-grey-2">Date & Time : </span><span className="text-zinc-900">{meeting.date}, {meeting.time}</span></p>
                <div className="flex items-center gap-2 text-base">
                    <span className="text-grey-2">Link: </span> 
                    <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline">
                        <GoogleMeetIcon className="w-6 h-6" />
                        Google Meet
                    </a>
                </div>
            </div>

            <div className="absolute top-0 right-0">
                <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </div>
        </div>
    </div>
)

export default function MeetingsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filterMeetings = (meetings: typeof clientMeetings) => {
        if (!searchTerm) return meetings;
        return meetings.filter(meeting =>
            meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredClientMeetings = useMemo(() => filterMeetings(clientMeetings), [searchTerm]);
    const filteredLeadMeetings = useMemo(() => filterMeetings(leadMeetings), [searchTerm]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-medium text-zinc-900">Client Meetings</h2>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input 
                            placeholder="Search Meetings..." 
                            className="pl-9 rounded-full h-[54px] bg-white" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <CreateMeetingSheet />
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block space-y-8">
                <div>
                    <Card className="rounded-[50px] bg-white">
                        <CardContent className="p-4 md:p-6">
                            <div className="grid grid-cols-[1fr_auto_1.5fr_auto_1fr_auto] items-center">
                                {filteredClientMeetings.map((meeting, index) => (
                                    <React.Fragment key={meeting.id}>
                                        <div className="contents">
                                            <div className="flex items-center gap-4 p-4">
                                                <div>
                                                    <p className="font-semibold text-xl text-zinc-900 whitespace-nowrap">{meeting.name}</p>
                                                    <p className="text-lg"><span className="text-grey-2">City: </span><span className="text-black">{meeting.city}</span></p>
                                                </div>
                                            </div>
                                            <div className="h-full w-px bg-zinc-200 mx-4 justify-self-center" />
                                            <div className="flex flex-col p-4">
                                                <p className="text-lg whitespace-nowrap"><span className="text-grey-2">Contact: </span><span className="text-black">{meeting.email} | {meeting.phone}</span></p>
                                                <p className="text-lg"><span className="text-grey-2">Client ID: </span><span className="text-zinc-900">{meeting.id}</span></p>
                                            </div>
                                            <div className="h-full w-px bg-zinc-200 mx-4 justify-self-center" />
                                            <div className="flex flex-col items-start gap-2 p-4">
                                                <p className="text-lg whitespace-nowrap"><span className="text-grey-2">Date & Time : </span><span className="text-zinc-900">{meeting.date}, {meeting.time}</span></p>
                                                <div className="flex items-center gap-2 text-lg">
                                                    <span className="text-grey-2">Link: </span> 
                                                    <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline">
                                                        <GoogleMeetIcon className="w-6 h-6" />
                                                        Google Meet
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="h-full w-px bg-zinc-200 mx-4 justify-self-center" />
                                            <div className="justify-self-end p-4">
                                                <Button variant="ghost" size="icon" className="w-8 h-8">
                                                    <MoreVertical className="h-5 w-5 text-zinc-500" />
                                                </Button>
                                            </div>
                                        </div>
                                        {index < filteredClientMeetings.length - 1 && (
                                            <div className="col-span-7 h-px bg-zinc-200" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h2 className="text-2xl font-medium text-zinc-900 mb-4">Lead Meetings</h2>
                    <Card className="rounded-[50px] bg-white">
                        <CardContent className="p-4 md:p-6">
                            <div className="grid grid-cols-[1fr_auto_1.5fr_auto_1fr_auto] items-center">
                                {filteredLeadMeetings.map((meeting, index) => (
                                    <React.Fragment key={meeting.id}>
                                        <div className="contents">
                                            <div className="flex items-center gap-4 p-4">
                                                <div>
                                                    <p className="font-semibold text-xl text-zinc-900 whitespace-nowrap">{meeting.name}</p>
                                                    <p className="text-lg"><span className="text-grey-2">City: </span><span className="text-black">{meeting.city}</span></p>
                                                </div>
                                            </div>
                                            <div className="h-full w-px bg-zinc-200 mx-4 justify-self-center" />
                                            <div className="flex flex-col p-4">
                                                <p className="text-lg whitespace-nowrap"><span className="text-grey-2">Contact: </span><span className="text-black">{meeting.email} | {meeting.phone}</span></p>
                                                <p className="text-lg"><span className="text-grey-2">Lead ID: </span><span className="text-zinc-900">{meeting.id}</span></p>
                                            </div>
                                            <div className="h-full w-px bg-zinc-200 mx-4 justify-self-center" />
                                            <div className="flex flex-col items-start gap-2 p-4">
                                                <p className="text-lg whitespace-nowrap"><span className="text-grey-2">Date & Time : </span><span className="text-zinc-900">{meeting.date}, {meeting.time}</span></p>
                                                <div className="flex items-center gap-2 text-lg">
                                                    <span className="text-grey-2">Link: </span> 
                                                    <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline">
                                                        <GoogleMeetIcon className="w-6 h-6" />
                                                        Google Meet
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="h-full w-px bg-zinc-200 mx-4 justify-self-center" />
                                            <div className="justify-self-end p-4">
                                                <Button variant="ghost" size="icon" className="w-8 h-8">
                                                    <MoreVertical className="h-5 w-5 text-zinc-500" />
                                                </Button>
                                            </div>
                                        </div>
                                        {index < filteredLeadMeetings.length - 1 && (
                                            <div className="col-span-7 h-px bg-zinc-200" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
                <div>
                    <h2 className="text-xl font-medium mb-4">Client Meetings</h2>
                    <div className="bg-white rounded-[20px] overflow-hidden">
                        {filteredClientMeetings.map((meeting) => (
                            <MeetingCard key={`mobile-${meeting.id}`} meeting={meeting} />
                        ))}
                    </div>
                </div>
                <div>
                     <h2 className="text-xl font-medium mb-4">Lead Meetings</h2>
                    <div className="bg-white rounded-[20px] overflow-hidden">
                         {filteredLeadMeetings.map((meeting) => (
                            <MeetingCard key={`mobile-lead-${meeting.id}`} meeting={meeting} isLead />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
