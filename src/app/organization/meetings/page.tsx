
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

const MeetingListItem = ({ meeting, isLead = false }: { meeting: typeof clientMeetings[0], isLead?: boolean }) => (
    <div className="flex flex-col md:flex-row items-start md:items-center p-4 gap-4 w-full">
        <div className="flex items-center gap-4 flex-1">
            <Avatar className="w-14 h-14 hidden md:flex">
                <AvatarImage src="https://placehold.co/56x56" data-ai-hint="abstract building" />
                <AvatarFallback>{meeting.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-44">
                <p className="font-semibold text-xl text-zinc-900">{meeting.name}</p>
                <p className="text-lg"><span className="text-grey-2">City: </span><span className="text-black">{meeting.city}</span></p>
            </div>
        </div>

        <div className="hidden md:block h-14 w-px bg-stone-300/0" />
        
        <div className="flex flex-col gap-2 flex-1 md:w-96">
            <p className="text-lg"><span className="text-grey-2">Contact: </span><span className="text-black">{meeting.email} | {meeting.phone}</span></p>
            <p className="text-lg"><span className="text-grey-2">{isLead ? 'Lead ID:' : 'Client ID:'} </span><span className="text-zinc-900">{meeting.id}</span></p>
        </div>
            
        <div className="hidden md:block h-14 w-px bg-stone-300/0" />

        <div className="flex flex-col justify-between items-start md:items-end gap-2 h-full flex-1">
            <p className="text-lg"><span className="text-grey-2">Date & Time : </span><span className="text-zinc-900">{meeting.date}, {meeting.time}</span></p>
            <div className="flex items-center gap-2 text-lg">
                <span className="text-grey-2">Link: </span>
                <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline">
                    <GoogleMeetIcon className="w-6 h-6" />
                    Google Meet
                </a>
            </div>
        </div>

        <Button variant="ghost" size="icon" className="w-8 h-8 md:ml-4">
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

            <Card className="rounded-[20px] bg-white">
                <CardContent className="p-4">
                    <h2 className="text-xl font-medium text-zinc-800 mb-4 px-4">Client Meetings</h2>
                    <div className="divide-y divide-zinc-200">
                        {clientMeetings.map((meeting) => (
                            <MeetingListItem key={meeting.id} meeting={meeting} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[20px] bg-white">
                 <CardContent className="p-4">
                    <h2 className="text-xl font-medium text-zinc-800 mb-4 px-4">Lead Meetings</h2>
                    <div className="divide-y divide-zinc-200">
                        {leadMeetings.map((meeting) => (
                            <MeetingListItem key={meeting.id} meeting={meeting} isLead />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
