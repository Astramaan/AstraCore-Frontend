
'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const clientMeetings = [
    { name: "Charan Project", id: "CHA2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024-2", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024-3", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "CHA2024-4", date: "1 Sept 2024", time: "11:00 am" },
];

const leadMeetings = [
    { name: "Charan Project", id: "LEAD2024", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "LEAD2024-2", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "LEAD2024-3", date: "1 Sept 2024", time: "11:00 am" },
    { name: "Charan Project", id: "LEAD2024-4", date: "1 Sept 2024", time: "11:00 am" },
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
                <MoreHorizontal className="w-5 h-5 text-stone-300" />
            </Button>
        </div>
    </div>
);

const MeetingCard = ({ meeting, isLead = false }: { meeting: typeof clientMeetings[0], isLead?: boolean }) => (
    <Card className="rounded-[20px] border border-stone-300">
        <CardContent className="p-6 space-y-3 relative">
            <div className="flex justify-between">
                <div className="text-zinc-900 text-lg font-normal">Name</div>
                <div className="text-stone-300 text-lg font-normal">:</div>
                <div className="text-black text-base font-normal flex-1 text-right">{meeting.name}</div>
            </div>
             <div className="flex justify-between items-center">
                <div className="text-zinc-900 text-lg font-normal">{isLead ? 'Lead ID' : 'Client ID'}</div>
                <div className="text-stone-300 text-lg font-normal">:</div>
                <div className="flex-1 text-right">
                    <Badge variant="secondary" className="bg-zinc-100 text-black">{meeting.id}</Badge>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="text-zinc-900 text-lg font-normal">Date</div>
                <div className="text-stone-300 text-lg font-normal">:</div>
                <div className="text-black text-base font-normal flex-1 text-right">{meeting.date}</div>
            </div>
            <div className="flex justify-between">
                <div className="text-zinc-900 text-lg font-normal">Time</div>
                <div className="text-stone-300 text-lg font-normal">:</div>
                <div className="text-black text-base font-normal flex-1 text-right">{meeting.time}</div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-zinc-900 text-lg font-normal">Link</div>
                <div className="text-stone-300 text-lg font-normal">:</div>
                <div className="flex items-center gap-2 flex-1 justify-end">
                    <GoogleMeetIcon className="w-6 h-6" />
                    <span className="text-black text-base font-normal">Meet</span>
                </div>
            </div>
             <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </div>
        </CardContent>
    </Card>
)


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
                {/* Desktop View */}
                <div className="hidden md:block bg-card rounded-lg border">
                    <div className="grid grid-cols-6 items-center p-4 bg-yellow-500/10 rounded-t-lg border-b">
                        <div className="col-span-1 font-medium text-zinc-900">Name</div>
                        <div className="col-span-1 font-medium text-zinc-900">Client ID</div>
                        <div className="col-span-1 font-medium text-zinc-900">Date</div>
                        <div className="col-span-1 font-medium text-zinc-900">Time</div>
                        <div className="col-span-1 font-medium text-zinc-900">Link</div>
                        <div className="col-span-1"></div>
                    </div>
                    <div>
                        {clientMeetings.map((meeting) => (
                            <MeetingRow key={`desktop-${meeting.id}`} meeting={meeting} />
                        ))}
                    </div>
                </div>
                 {/* Mobile View */}
                <div className="md:hidden space-y-4">
                    {clientMeetings.map((meeting) => (
                        <MeetingCard key={`mobile-${meeting.id}`} meeting={meeting} />
                    ))}
                </div>
            </div>

             <div>
                <h2 className="text-lg font-normal text-muted-foreground mb-4">Lead Meetings</h2>
                 {/* Desktop View */}
                <div className="hidden md:block bg-card rounded-lg border">
                     <div className="grid grid-cols-6 items-center p-4 bg-yellow-500/10 rounded-t-lg border-b">
                        <div className="col-span-1 font-medium text-zinc-900">Name</div>
                        <div className="col-span-1 font-medium text-zinc-900">Lead ID</div>
                        <div className="col-span-1 font-medium text-zinc-900">Date</div>
                        <div className="col-span-1 font-medium text-zinc-900">Time</div>
                        <div className="col-span-1 font-medium text-zinc-900">Link</div>
                        <div className="col-span-1"></div>
                    </div>
                    <div>
                        {leadMeetings.map((meeting) => (
                            <MeetingRow key={`desktop-lead-${meeting.id}`} meeting={meeting} isLead={true}/>
                        ))}
                    </div>
                </div>
                 {/* Mobile View */}
                <div className="md:hidden space-y-4">
                    {leadMeetings.map((meeting) => (
                        <MeetingCard key={`mobile-lead-${meeting.id}`} meeting={meeting} isLead={true}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
