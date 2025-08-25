
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";
import { Badge } from "@/components/ui/badge";

const clientMeetings = [
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
];

const leadMeetings = [
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
];

const MeetingRow = ({ meeting, isLead = false }: { meeting: typeof clientMeetings[0], isLead?: boolean }) => (
    <div className="grid grid-cols-6 items-center p-4 border-b border-stone-200 hover:bg-stone-50">
        <div className="col-span-1 font-medium">{meeting.name}</div>
        <div className="col-span-1"><Badge variant="secondary">{meeting.id}</Badge></div>
        <div className="col-span-1">{meeting.date}</div>
        <div className="col-span-1">{meeting.time}</div>
        <div className="col-span-1 flex items-center gap-2">
            <GoogleMeetIcon className="w-5 h-5" />
            <span>Meet</span>
        </div>
        <div className="col-span-1 flex justify-end">
            <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
            </Button>
        </div>
    </div>
);


export default function MeetingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-medium">Meetings</h1>
                <Button className="bg-primary/10 text-primary hover:bg-primary/20">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create
                </Button>
            </div>

            <div>
                <h2 className="text-lg font-normal text-muted-foreground mb-4">Client Meetings</h2>
                <div className="bg-card rounded-lg border">
                    <div className="grid grid-cols-6 items-center p-4 bg-yellow-500/10 rounded-t-lg border-b">
                        <div className="col-span-1 font-medium text-zinc-900">Name</div>
                        <div className="col-span-1 font-medium text-zinc-900">Client ID</div>
                        <div className="col-span-1 font-medium text-zinc-900">Date</div>
                        <div className="col-span-1 font-medium text-zinc-900">Time</div>
                        <div className="col-span-1 font-medium text-zinc-900">Link</div>
                        <div className="col-span-1"></div>
                    </div>
                    <div>
                        {clientMeetings.map((meeting, index) => (
                            <MeetingRow key={index} meeting={meeting} />
                        ))}
                    </div>
                </div>
            </div>

             <div>
                <h2 className="text-lg font-normal text-muted-foreground mb-4">Lead Meetings</h2>
                <div className="bg-card rounded-lg border">
                     <div className="grid grid-cols-6 items-center p-4 bg-yellow-500/10 rounded-t-lg border-b">
                        <div className="col-span-1 font-medium text-zinc-900">Name</div>
                        <div className="col-span-1 font-medium text-zinc-900">Lead ID</div>
                        <div className="col-span-1 font-medium text-zinc-900">Date</div>
                        <div className="col-span-1 font-medium text-zinc-900">Time</div>
                        <div className="col-span-1 font-medium text-zinc-900">Link</div>
                        <div className="col-span-1"></div>
                    </div>
                    <div>
                        {leadMeetings.map((meeting, index) => (
                            <MeetingRow key={index} meeting={meeting} isLead={true}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
