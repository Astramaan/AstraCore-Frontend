
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, Calendar, TrendingUp } from 'lucide-react';
import { MeetingDetailsSheet, type Meeting } from '@/components/meeting-details-sheet';
import { LeadDetailsSheet, type Lead } from '@/components/lead-details-sheet';
import { HomeAside } from '@/components/home-aside';
import { AssignTaskSheet } from '@/components/assign-task-sheet';
import { Task } from '@/components/task-details-sheet';
import RedirectionArrowIcon from '@/components/icons/redirection-arrow-icon';
import GoogleMeetIcon from '@/components/icons/google-meet-icon';

const meetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "BAL2025", time: "4:00 PM", date: "10 August 2024", link: "https://meet.google.com/abc-xyz", email: 'admin@abc.com', phone: '1234567890' },
    { type: 'lead', name: "Lead Discussion", city: "Bengaluru", id: "LEAD2025", time: "5:00 PM", date: "10 August 2024", link: "https://meet.google.com/def-uvw", email: 'lead@example.com', phone: '0987654321' },
    { type: 'client', name: "Internal Sync", city: "Remote", id: "INT2025", time: "6:00 PM", date: "10 August 2024", link: "https://meet.google.com/ghi-rst", email: 'internal@sync.com', phone: '1122334455' },
];

const leadsData: Lead[] = [
    {
        organization: "Platinum Partners",
        leadId: "PLATINUMHYD789",
        fullName: "Rajesh Singh",
        contact: "raj.singh@platinum.co | +91 7654321098",
        phone: "7654321098",
        email: "raj.singh@platinum.co",
        address: "Door 789, Platinum Heights, Jubilee Hills, Hyderabad, Telangana 500033",
        pincode: "500033",
        tokenAmount: "5,00,000",
        level: "Level 3",
        profileImage: "https://placehold.co/94x94.png",
        coverImage: "https://placehold.co/712x144.png",
        siteImages: []
    },
    {
        organization: "Golden Ventures",
        leadId: "GOLDMYS7890",
        fullName: "Balaji Naik",
        contact: "Employee@abc.com | +91 1234567890",
        phone: "9380032186",
        email: "balaji.naik@goldenventures.com",
        address: "43, Second Floor, Leela Palace Rd, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        pincode: "560008",
        tokenAmount: "1,00,000",
        level: "Level 1",
        profileImage: "https://placehold.co/94x94.png",
        coverImage: "https://placehold.co/712x144.png",
        siteImages: []
    },
];

const MeetingCard = ({ meeting, onClick }: { meeting: Meeting, onClick: (meeting: Meeting) => void }) => (
    <Card className="w-full h-20 rounded-[50px] py-4 px-6 md:px-10 flex items-center justify-between cursor-pointer hover:bg-muted/50" onClick={() => onClick(meeting)}>
        <div className="flex-1">
            <p className="text-base font-medium">{meeting.name}</p>
            <p className="text-xs text-muted-foreground">{meeting.type === 'lead' ? 'LEAD' : 'CLIENT'} ID: {meeting.id}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium">{meeting.time}</p>
            <p className="text-sm text-muted-foreground">{meeting.date}</p>
        </div>
        <div className="flex flex-col items-center gap-1 pl-4">
            <RedirectionArrowIcon className="w-5 h-5 text-muted-foreground" />
            <GoogleMeetIcon className="w-5 h-5" />
        </div>
    </Card>
);

const LeadCard = ({ lead, onViewDetails }: { lead: Lead, onViewDetails: (lead: Lead) => void }) => (
    <div className="p-4 border rounded-[40px] flex items-center gap-4 cursor-pointer hover:bg-muted/10" onClick={() => onViewDetails(lead)}>
        <div className="w-20 h-20 bg-muted rounded-3xl" />
        <div className="flex-1">
            <p className="font-semibold">{lead.fullName}</p>
            <p className="text-sm text-muted-foreground">{lead.address.split(',').slice(-2).join(', ')}</p>
            <p className="text-sm text-primary font-semibold">{lead.level}</p>
        </div>
        <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5"/>
        </Button>
    </div>
);

const SalesStatCard = ({ title, value, icon, change }: { title: string, value: string, icon: React.ReactNode, change: string }) => (
    <Card className="rounded-[40px]">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-4xl font-bold">{value}</p>
            <p className="text-sm text-green-500">{change}</p>
        </CardContent>
    </Card>
);

export default function SalesHome() {
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    
    const handleMeetingClick = (meeting: Meeting) => setSelectedMeeting(meeting);
    const handleLeadClick = (lead: Lead) => setSelectedLead(lead);

    const handleAddTask = (newTask: Omit<Task, 'id' | 'attachments'>) => {
        // Handle adding a new task, maybe to a sales-specific task list
        console.log("New sales task assigned:", newTask);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SalesStatCard title="New Leads" value="32" icon={<Users className="w-5 h-5"/>} change="+5 this week" />
                    <SalesStatCard title="Meetings Scheduled" value="12" icon={<Calendar className="w-5 h-5"/>} change="+2 this week" />
                    <SalesStatCard title="Conversion Rate" value="25%" icon={<TrendingUp className="w-5 h-5"/>} change="+1.5% this month" />
                </div>

                <div>
                    <h2 className="text-xl font-medium mb-4">Today's Meetings</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {meetings.slice(0, 3).map(meeting => (
                            <MeetingCard key={meeting.id} meeting={meeting} onClick={handleMeetingClick} />
                        ))}
                    </div>
                </div>

                 <div>
                    <h2 className="text-xl font-medium mb-4">New Leads</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {leadsData.map(lead => (
                            <LeadCard key={lead.leadId} lead={lead} onViewDetails={handleLeadClick} />
                        ))}
                    </div>
                </div>
            </main>

            <HomeAside
                meetings={meetings}
                myTasksChartData={[]}
                assignedTasksChartData={[]}
                onMeetingClick={handleMeetingClick}
                onAddTask={handleAddTask}
            />

            {selectedMeeting && (
                <MeetingDetailsSheet
                    isOpen={!!selectedMeeting}
                    onClose={() => setSelectedMeeting(null)}
                    meeting={selectedMeeting}
                />
            )}

            {selectedLead && (
                 <LeadDetailsSheet
                    isOpen={!!selectedLead}
                    onClose={() => setSelectedLead(null)}
                    lead={selectedLead}
                    onDelete={() => {}}
                />
            )}
        </div>
    )
}
