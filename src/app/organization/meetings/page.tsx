

'use client';

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";
import { Input } from "@/components/ui/input";
import { MoreVertical, Search, ShieldAlert, PlusCircle } from "lucide-react";
import { CreateMeetingSheet } from '@/components/create-meeting-sheet';
import { EditMeetingSheet, Meeting } from '@/components/edit-meeting-sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const initialClientMeetings: Meeting[] = [
    { type: 'client', name: "Charan Project", city: "Mysuru", id: "CHA2024", date: "1st Sept 2024", time: "11:00 am", link: "meet.google.com/abc-xyz", email: "admin@abc.com", phone: "+91 1234567890" },
    { type: 'client', name: "Delta Project", city: "Bengaluru", id: "DEL2024", date: "2nd Sept 2024", time: "10:00 am", link: "meet.google.com/def-uvw", email: "contact@delta.com", phone: "+91 9876543210" },
    { type: 'client', name: "Gamma Project", city: "Chennai", id: "GAM2024", date: "3rd Sept 2024", time: "02:00 pm", link: "meet.google.com/ghi-rst", email: "support@gamma.co", phone: "+91 8765432109" },
];

const initialLeadMeetings: Meeting[] = [
    { type: 'lead', name: "Alpha Lead", city: "Hyderabad", id: "LEAD2024", date: "5th Sept 2024", time: "03:00 pm", link: "meet.google.com/jkl-mno", email: "sales@alpha.io", phone: "+91 7654321098" },
    { type: 'lead', name: "Beta Lead", city: "Mumbai", id: "LEAD2024-2", date: "6th Sept 2024", time: "09:30 am", link: "meet.google.com/pqr-stu", email: "info@betaleads.com", phone: "+91 6543210987" },
];

const MeetingCard = ({ meeting, onEdit, onDelete }: { meeting: Meeting, onEdit: (meeting: Meeting) => void, onDelete: (meeting: Meeting) => void }) => (
    <div className="bg-white p-4 border-b border-stone-200 last:border-b-0 hover:bg-muted/50 cursor-pointer">
        <div className="space-y-4">
             <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <p className="text-base"><span className="text-grey-2">Name: </span><span className="text-zinc-900 font-semibold">{meeting.name}</span></p>
                    <p className="text-base"><span className="text-grey-2">City: </span><span className="text-black">{meeting.city}</span></p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => onEdit(meeting)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onDelete(meeting); }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <div>
                <p className="text-base"><span className="text-grey-2">Contact: </span><span className="text-black">{meeting.email} | {meeting.phone}</span></p>
                <p className="text-base"><span className="text-grey-2">{meeting.type === 'lead' ? 'Lead ID:' : 'Client ID:'} </span><span className="text-zinc-900">{meeting.id}</span></p>
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
        </div>
    </div>
)

const MeetingListItem = ({ meeting, onEdit, onDelete, isLast = false }: { meeting: Meeting, onEdit: (meeting: Meeting) => void, onDelete: (meeting: Meeting) => void, isLast?: boolean }) => (
     <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4 group cursor-pointer hover:bg-muted/50 rounded-lg px-2 -mx-2">
            <div className="flex items-center gap-4 flex-1">
                 <div className="flex flex-col gap-2">
                    <p className="text-lg"><span className="text-grey-1">Name: </span><span className="text-black font-medium">{meeting.name}</span></p>
                    <p className="text-lg"><span className="text-grey-1">City: </span><span className="text-black font-medium">{meeting.city}</span></p>
                </div>
            </div>
            <div className="w-px h-14 bg-stone-300/0 md:bg-stone-300" />
            <div className="flex flex-col gap-2 flex-1 pl-16 md:pl-0">
                <p className="text-lg whitespace-nowrap"><span className="text-grey-2">Contact: </span><span className="text-black">{meeting.email} | {meeting.phone}</span></p>
                <p className="text-lg"><span className="text-grey-2">{meeting.type === 'lead' ? 'Lead ID' : 'Client ID'}: </span><span className="text-zinc-900">{meeting.id}</span></p>
            </div>
            <div className="w-px h-14 bg-stone-300/0 md:bg-stone-300" />
            <div className="h-auto flex-col justify-between items-start inline-flex flex-1 pl-16 md:pl-0">
                <p className="text-lg whitespace-nowrap"><span className="text-grey-2">Date & Time : </span><span className="text-zinc-900">{meeting.date}, {meeting.time}</span></p>
                <div className="flex items-center gap-2 text-lg">
                    <span className="text-grey-2">Link: </span> 
                    <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline">
                        <GoogleMeetIcon className="w-6 h-6" />
                        Google Meet
                    </a>
                </div>
            </div>
            <div className="ml-auto self-center">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onEdit(meeting)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onDelete(meeting)} className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        {!isLast && <div className="h-px bg-stone-300" />}
    </div>
);


export default function MeetingsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [clientMeetings, setClientMeetings] = useState(initialClientMeetings);
    const [leadMeetings, setLeadMeetings] = useState(initialLeadMeetings);
    const [meetingToDelete, setMeetingToDelete] = useState<Meeting | null>(null);
    const [meetingToEdit, setMeetingToEdit] = useState<Meeting | null>(null);

    const handleAddNewMeeting = (newMeeting: Omit<Meeting, 'id'>) => {
        const meetingWithId = { ...newMeeting, id: `NEW${Date.now()}`};
        if (meetingWithId.type === 'client') {
            setClientMeetings(prev => [meetingWithId, ...prev]);
        } else {
            setLeadMeetings(prev => [meetingWithId, ...prev]);
        }
    };
    
    const handleUpdateMeeting = (updatedMeeting: Meeting) => {
        if(updatedMeeting.type === 'client') {
            setClientMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
        } else {
            setLeadMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
        }
        setMeetingToEdit(null);
    }

    const handleDeleteClick = (meeting: Meeting) => {
        setMeetingToDelete(meeting);
    };

    const confirmDelete = () => {
        if (meetingToDelete) {
            if (meetingToDelete.type === 'client') {
                setClientMeetings(prev => prev.filter(m => m.id !== meetingToDelete.id));
            } else {
                setLeadMeetings(prev => prev.filter(m => m.id !== meetingToDelete.id));
            }
            setMeetingToDelete(null);
        }
    };

    const filterMeetings = (meetings: Meeting[]) => {
        if (!searchTerm) return meetings;
        return meetings.filter(meeting =>
            meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredClientMeetings = useMemo(() => filterMeetings(clientMeetings), [searchTerm, clientMeetings]);
    const filteredLeadMeetings = useMemo(() => filterMeetings(leadMeetings), [searchTerm, leadMeetings]);

    return (
        <div className="space-y-8">
            {/* Desktop View */}
            <div className="hidden md:block space-y-8">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-medium text-zinc-900">Client Meetings</h2>
                     <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-2" />
                            <Input 
                                placeholder="Search Meetings..." 
                                className="pl-12 h-14 rounded-full bg-white text-lg" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <CreateMeetingSheet onMeetingCreated={handleAddNewMeeting}/>
                    </div>
                </div>
                <div>
                    <Card className="rounded-[50px] bg-white">
                        <CardContent className="p-4 md:p-6">
                           {filteredClientMeetings.map((meeting, index) => (
                                <MeetingListItem 
                                    key={meeting.id} 
                                    meeting={meeting} 
                                    onEdit={setMeetingToEdit}
                                    onDelete={handleDeleteClick}
                                    isLast={index === filteredClientMeetings.length - 1}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </div>

                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-medium text-zinc-900">Lead Meetings</h2>
                </div>
                <div>
                    <Card className="rounded-[50px] bg-white">
                        <CardContent className="p-4 md:p-6">
                             {filteredLeadMeetings.map((meeting, index) => (
                                <MeetingListItem 
                                    key={meeting.id} 
                                    meeting={meeting}
                                    onEdit={setMeetingToEdit}
                                    onDelete={handleDeleteClick}
                                    isLast={index === filteredLeadMeetings.length - 1}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-medium self-start">Client Meetings</h2>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-2" />
                            <Input 
                                placeholder="Search Meetings..." 
                                className="pl-12 h-14 rounded-full bg-white text-lg" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <CreateMeetingSheet onMeetingCreated={handleAddNewMeeting}/>
                    </div>
                </div>
                <div>
                    <div className="bg-white rounded-[20px] overflow-hidden">
                        {filteredClientMeetings.map((meeting) => (
                            <MeetingCard key={`mobile-${meeting.id}`} meeting={meeting} onEdit={setMeetingToEdit} onDelete={handleDeleteClick} />
                        ))}
                    </div>
                </div>
                <div>
                     <h2 className="text-xl font-medium mb-4">Lead Meetings</h2>
                    <div className="bg-white rounded-[20px] overflow-hidden">
                         {filteredLeadMeetings.map((meeting) => (
                            <MeetingCard key={`mobile-lead-${meeting.id}`} meeting={meeting} onEdit={setMeetingToEdit} onDelete={handleDeleteClick} />
                        ))}
                    </div>
                </div>
            </div>
            <AlertDialog open={!!meetingToDelete} onOpenChange={(isOpen) => !isOpen && setMeetingToDelete(null)}>
                <AlertDialogContent className="max-w-md rounded-[50px]">
                    <AlertDialogHeader className="items-center text-center">
                         <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                          <div className="w-full h-full bg-red-600/5 rounded-full" />
                          <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                          <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-semibold">Confirm Meeting Deletion?</AlertDialogTitle>
                        <AlertDialogDescription className="text-lg text-grey-2">
                            Deleting this meeting will permanently remove it from your schedule. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel className="w-40 h-14 px-10 py-3.5 bg-background rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="w-40 h-14 px-10 py-3.5 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {meetingToEdit && (
                 <EditMeetingSheet 
                    isOpen={!!meetingToEdit}
                    onClose={() => setMeetingToEdit(null)}
                    meeting={meetingToEdit}
                    onMeetingUpdated={handleUpdateMeeting}
                 />
            )}
        </div>
    );
}

    
