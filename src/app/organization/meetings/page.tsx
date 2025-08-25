
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, MoreHorizontal, Search } from "lucide-react";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";

const clientMeetings = [
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am", link: "meet.google.com/abc-xyz" },
    { name: "Delta Project", id: "DEL2024", date: "2 Sept 2024", time: "10:00 am", link: "meet.google.com/def-uvw" },
    { name: "Gamma Project", id: "GAM2024", date: "3 Sept 2024", time: "02:00 pm", link: "meet.google.com/ghi-rst" },
];

const leadMeetings = [
    { name: "Alpha Lead", id: "LEAD2024", date: "5 Sept 2024", time: "03:00 pm", link: "meet.google.com/jkl-mno" },
    { name: "Beta Lead", id: "LEAD2024-2", date: "6 Sept 2024", time: "09:30 am", link: "meet.google.com/pqr-stu" },
];

const MeetingListItem = ({ meeting }: { meeting: typeof clientMeetings[0] }) => (
    <div className="bg-white rounded-lg p-4 border border-zinc-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
            <p className="text-sm text-zinc-500">Name</p>
            <p className="font-medium text-zinc-900">{meeting.name}</p>
        </div>
        <div className="md:col-span-3">
            <p className="text-sm text-zinc-500">ID</p>
            <p className="font-medium text-zinc-900">{meeting.id}</p>
        </div>
        <div className="md:col-span-2">
            <p className="text-sm text-zinc-500">Date</p>
            <p className="font-medium text-zinc-900">{meeting.date}</p>
        </div>
        <div className="md:col-span-2">
            <p className="text-sm text-zinc-500">Time</p>
            <p className="font-medium text-zinc-900">{meeting.time}</p>
        </div>
        <div className="md:col-span-2 flex items-center justify-between">
            <div>
                 <p className="text-sm text-zinc-500">Link</p>
                 <div className="flex items-center gap-2">
                    <GoogleMeetIcon className="w-5 h-5" />
                    <span className="font-medium text-zinc-900">Meet</span>
                </div>
            </div>
            <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5 text-zinc-500" />
            </Button>
        </div>
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

            <div>
                <h2 className="text-xl font-medium text-zinc-800 mb-4">Client Meetings</h2>
                <div className="space-y-4">
                    {clientMeetings.map((meeting) => (
                        <MeetingListItem key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            </div>

             <div>
                <h2 className="text-xl font-medium text-zinc-800 mb-4">Lead Meetings</h2>
                <div className="space-y-4">
                    {leadMeetings.map((meeting) => (
                        <MeetingListItem key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            </div>
        </div>
    );
}
