
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";

const clientMeetings = [
    { name: "Charan Project", city: "Mysuru", id: "CHA2024", date: "1st Sept 2024", time: "11:00 am", link: "meet.google.com/abc-xyz", email: "admin@abc.com", phone: "+91 1234567890" },
    { name: "Delta Project", city: "Bengaluru", id: "DEL2024", date: "2nd Sept 2024", time: "10:00 am", link: "meet.google.com/def-uvw", email: "contact@delta.com", phone: "+91 9876543210" },
    { name: "Gamma Project", city: "Chennai", id: "GAM2024", date: "3rd Sept 2024", time: "02:00 pm", link: "meet.google.com/ghi-rst", email: "support@gamma.co", phone: "+91 8765432109" },
];

const leadMeetings = [
    { name: "Alpha Lead", city: "Hyderabad", id: "LEAD2024", date: "5th Sept 2024", time: "03:00 pm", link: "meet.google.com/jkl-mno", email: "sales@alpha.io", phone: "+91 7654321098" },
    { name: "Beta Lead", city: "Mumbai", id: "LEAD2024-2", date: "6th Sept 2024", time: "09:30 am", link: "meet.google.com/pqr-stu", email: "info@betaleads.com", phone: "+91 6543210987" },
];

const MeetingListItem = ({ meeting, isLast }: { meeting: typeof clientMeetings[0], isLast?: boolean }) => (
    <div className={`flex flex-col md:flex-row items-start md:items-center p-4 gap-4 ${!isLast ? 'border-b border-zinc-200' : ''}`}>
        <div className="flex items-center gap-4 w-full md:w-1/4">
            <Avatar className="w-12 h-12">
                <AvatarImage src="https://placehold.co/48x48" data-ai-hint="abstract building" />
                <AvatarFallback>{meeting.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-base text-zinc-900">{meeting.name}</p>
                <p className="text-sm text-zinc-500">City: {meeting.city}</p>
            </div>
        </div>

        <div className="hidden md:block h-12 w-px bg-zinc-200" />
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <p className="text-sm text-zinc-500">Contact: <span className="text-zinc-900 font-medium">{meeting.email} | {meeting.phone}</span></p>
                <p className="text-sm text-zinc-500">Client ID: <span className="text-zinc-900 font-medium">{meeting.id}</span></p>
            </div>

            <div className="hidden md:block h-12 w-px bg-zinc-200" />
            
            <div className="space-y-1">
                <p className="text-sm text-zinc-500">Date & Time : <span className="text-zinc-900 font-medium">{meeting.date}, {meeting.time}</span></p>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                    Link: 
                    <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline">
                        <GoogleMeetIcon className="w-4 h-4" />
                        Google Meet
                    </a>
                </div>
            </div>
        </div>

        <Button variant="ghost" size="icon" className="w-8 h-8 ml-auto">
            <MoreHorizontal className="h-5 w-5 text-zinc-500" />
        </Button>
    </div>
);


export default function MeetingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-semibold text-zinc-900">Meetings</h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input placeholder="Search Meetings..." className="pl-9 rounded-full h-11" />
                    </div>
                    <Button className="rounded-full h-11 px-6 bg-primary/10 text-primary hover:bg-primary/20">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Create
                    </Button>
                </div>
            </div>

            <Card className="rounded-[20px]">
                <CardContent className="p-4">
                    <h2 className="text-xl font-medium text-zinc-800 mb-4 px-4">Client Meetings</h2>
                    <div className="divide-y divide-zinc-200">
                        {clientMeetings.map((meeting, index) => (
                            <MeetingListItem key={meeting.id} meeting={meeting} isLast={index === clientMeetings.length - 1}/>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[20px]">
                 <CardContent className="p-4">
                    <h2 className="text-xl font-medium text-zinc-800 mb-4 px-4">Lead Meetings</h2>
                    <div className="divide-y divide-zinc-200">
                        {leadMeetings.map((meeting, index) => (
                            <MeetingListItem key={meeting.id} meeting={meeting} isLast={index === leadMeetings.length - 1} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

