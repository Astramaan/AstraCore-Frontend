
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, MoreHorizontal, Search } from "lucide-react";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";
import { Card, CardContent } from "@/components/ui/card";

const clientMeetings = [
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am", link: "meet.google.com/abc-xyz" },
    { name: "Delta Project", id: "DEL2024", date: "2 Sept 2024", time: "10:00 am", link: "meet.google.com/def-uvw" },
    { name: "Gamma Project", id: "GAM2024", date: "3 Sept 2024", time: "02:00 pm", link: "meet.google.com/ghi-rst" },
];

const leadMeetings = [
    { name: "Alpha Lead", id: "LEAD2024", date: "5 Sept 2024", time: "03:00 pm", link: "meet.google.com/jkl-mno" },
    { name: "Beta Lead", id: "LEAD2024-2", date: "6 Sept 2024", time: "09:30 am", link: "meet.google.com/pqr-stu" },
];

const MeetingListItem = ({ meeting, isLast }: { meeting: typeof clientMeetings[0], isLast?: boolean }) => (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 ${!isLast ? 'border-b border-zinc-200' : ''}`}>
        <div className="md:col-span-3">
            <p className="text-sm text-zinc-500 md:hidden">Name</p>
            <p className="font-medium text-zinc-900">{meeting.name}</p>
        </div>
        <div className="md:col-span-2">
            <p className="text-sm text-zinc-500 md:hidden">ID</p>
            <p className="font-medium text-zinc-900">{meeting.id}</p>
        </div>
        <div className="md:col-span-2">
            <p className="text-sm text-zinc-500 md:hidden">Date</p>
            <p className="font-medium text-zinc-900">{meeting.date}</p>
        </div>
        <div className="md:col-span-2">
            <p className="text-sm text-zinc-500 md:hidden">Time</p>
            <p className="font-medium text-zinc-900">{meeting.time}</p>
        </div>
        <div className="md:col-span-3 flex items-center justify-between">
            <div>
                 <p className="text-sm text-zinc-500 md:hidden">Link</p>
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

            <Card className="rounded-lg">
                <CardContent className="p-0">
                    <div className="p-4">
                        <h2 className="text-xl font-medium text-zinc-800">Client Meetings</h2>
                    </div>
                     <div className="hidden md:grid grid-cols-12 gap-4 items-center p-4 border-b border-t bg-zinc-50">
                        <div className="col-span-3 font-medium text-zinc-500 text-sm">Name</div>
                        <div className="col-span-2 font-medium text-zinc-500 text-sm">ID</div>
                        <div className="col-span-2 font-medium text-zinc-500 text-sm">Date</div>
                        <div className="col-span-2 font-medium text-zinc-500 text-sm">Time</div>
                        <div className="col-span-3 font-medium text-zinc-500 text-sm">Link</div>
                    </div>
                    <div className="divide-y divide-zinc-200 md:divide-y-0">
                        {clientMeetings.map((meeting, index) => (
                            <MeetingListItem key={meeting.id} meeting={meeting} isLast={index === clientMeetings.length - 1}/>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-lg">
                 <CardContent className="p-0">
                    <div className="p-4">
                        <h2 className="text-xl font-medium text-zinc-800">Lead Meetings</h2>
                    </div>
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center p-4 border-b border-t bg-zinc-50">
                        <div className="col-span-3 font-medium text-zinc-500 text-sm">Name</div>
                        <div className="col-span-2 font-medium text-zinc-500 text-sm">ID</div>
                        <div className="col-span-2 font-medium text-zinc-500 text-sm">Date</div>
                        <div className="col-span-2 font-medium text-zinc-500 text-sm">Time</div>
                        <div className="col-span-3 font-medium text-zinc-500 text-sm">Link</div>
                    </div>
                     <div className="divide-y divide-zinc-200 md:divide-y-0">
                        {leadMeetings.map((meeting, index) => (
                            <MeetingListItem key={meeting.id} meeting={meeting} isLast={index === leadMeetings.length - 1} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
