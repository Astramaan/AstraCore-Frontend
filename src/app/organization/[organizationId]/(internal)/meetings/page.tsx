
'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
import { MeetingDetailsSheet } from '@/components/meeting-details-sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const MeetingListItem = ({ meeting, onEdit, onDelete, onViewDetails, isFirst, isLast }: { meeting: Meeting, onEdit: (meeting: Meeting) => void, onDelete: (meeting: Meeting) => void, onViewDetails: (meeting: Meeting) => void, isFirst?: boolean, isLast?: boolean }) => (
     <div className="flex flex-col group">
        <div className="lg:hidden p-6 md:p-10 gap-4" onClick={() => onViewDetails(meeting)}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xl font-semibold text-black">{meeting.title || meeting.name}</p>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem onSelect={(e) => { e.stopPropagation(); onEdit(meeting); }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(meeting); }} className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-base">
                <div>
                    <span className="text-grey-2">Contact: </span> 
                    <p className="text-black font-medium break-words">{meeting.email}<br />{meeting.phone}</p>
                </div>
                <div className="text-right">
                    <span className="text-grey-2">{meeting.type === 'lead' ? 'Lead ID:' : 'Client ID:'} </span>
                    <p className="text-zinc-900 font-medium">{meeting.id}</p>
                </div>
                <div>
                    <span className="text-grey-2">Date & Time : </span> 
                    <p className="text-zinc-900 font-medium">{meeting.date}, {meeting.time}</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <span className="text-grey-2">Link: </span> 
                    <a href={`https://${meeting.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-900 font-medium hover:underline" onClick={(e) => e.stopPropagation()}>
                        <GoogleMeetIcon className="w-6 h-6" />
                        <span className="hidden sm:inline">Google Meet</span>
                    </a>
                </div>
            </div>
        </div>
        <div
            className={cn(
                "hidden lg:block hover:bg-hover-bg py-6 px-10",
                isFirst && "hover:rounded-t-[30px]",
                isLast && "hover:rounded-b-[30px]"
            )}
             onClick={() => onViewDetails(meeting)}
        >
          <div
              className={cn(
                  "grid lg:grid-cols-[1fr_auto_1.5fr_auto_1.5fr_auto] items-stretch gap-x-6 gap-y-4 cursor-pointer",
              )}
              >
              {/* Company Name & City */}
              <div className="flex flex-col justify-center">
                  <p className="text-xl font-semibold text-black break-words">{meeting.title || meeting.name}</p>
                  <p className="text-lg">
                    <span className="text-black">{meeting.name} ({meeting.id})</span>
                  </p>
              </div>

              {/* Separator - full height */}
              <Separator orientation="vertical" className="self-stretch hidden lg:block" />

              {/* Contact Info */}
              <div className="flex flex-col justify-center gap-2 lg:border-none border-t border-dashed pt-4 lg:pt-0">
                  <p className="text-lg break-all">
                  <span className="text-grey-2">Contact: </span> 
                  <span className="text-black">{meeting.email} | {meeting.phone}</span>
                  </p>
              </div>

              {/* Separator */}
              <Separator orientation="vertical" className="self-stretch hidden lg:block" />

              {/* Date & Time + Link */}
              <div className="flex flex-col justify-center gap-2 md:border-t md:border-dashed lg:border-none pt-4 lg:pt-0">
                  <p className="text-lg whitespace-nowrap">
                  <span className="text-grey-2">Date & Time: </span> 
                  <span className="text-zinc-900">{meeting.date}, {meeting.time}</span>
                  </p>
                  <a
                  href={`https://${meeting.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-zinc-900 font-medium hover:underline text-lg"
                  onClick={(e) => e.stopPropagation()}
                  >
                  <GoogleMeetIcon className="w-6 h-6" />
                  Google Meet
                  </a>
              </div>

              {/* Actions Menu */}
              <div className="justify-self-end flex items-center md:static" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                      <MoreVertical className="w-6 h-6" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => onEdit(meeting)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onDelete(meeting)} className="text-red-500">
                      Delete
                      </DropdownMenuItem>
                  </DropdownMenuContent>
                  </DropdownMenu>
              </div>
          </div>
        </div>
        {!isLast && <Separator />}
    </div>
);


export default function MeetingsPage() {
    const params = useParams();
    const organizationId = params.organizationId as string;
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [allMeetings, setAllMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [meetingToDelete, setMeetingToDelete] = useState<Meeting | null>(null);
    const [meetingToEdit, setMeetingToEdit] = useState<Meeting | null>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

    useEffect(() => {
        const fetchMeetings = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/meetings');
                if (!res.ok) {
                    throw new Error('Failed to fetch meetings');
                }
                const result = await res.json();
                if (result.success) {
                    const formattedMeetings = result.data.map((m: any) => ({
                        id: m.targetType.id || m.projectId,
                        type: m.targetType.type,
                        title: m.title,
                        name: m.manualDetails.name,
                        city: m.manualDetails.location,
                        date: new Date(m.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                        time: m.startTime,
                        link: m.meetingLink,
                        email: m.manualDetails.email,
                        phone: m.manualDetails.phoneNumber,
                    }));
                    setAllMeetings(formattedMeetings);
                } else {
                    toast({ variant: 'destructive', title: 'Error', description: result.message });
                }
            } catch (error) {
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch meetings.' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchMeetings();
    }, [toast]);

    const handleAddNewMeeting = (newMeeting: Omit<Meeting, 'id'>) => {
        const meetingWithId = { ...newMeeting, id: `NEW${Date.now()}`};
        setAllMeetings(prev => [meetingWithId, ...prev]);
    };
    
    const handleUpdateMeeting = (updatedMeeting: Meeting) => {
        setAllMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
        setMeetingToEdit(null);
    }

    const handleDeleteClick = (meeting: Meeting) => {
        setMeetingToDelete(meeting);
    };

    const confirmDelete = () => {
        if (meetingToDelete) {
            setAllMeetings(prev => prev.filter(m => m.id !== meetingToDelete.id));
            setMeetingToDelete(null);
             toast({ title: "Success", description: "Meeting deleted successfully." });
        }
    };

    const filterMeetings = (meetings: Meeting[]) => {
        if (!searchTerm) return meetings;
        return meetings.filter(meeting =>
            (meeting.title && meeting.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const clientMeetings = useMemo(() => filterMeetings(allMeetings.filter(m => m.type === 'client')), [searchTerm, allMeetings]);
    const leadMeetings = useMemo(() => filterMeetings(allMeetings.filter(m => m.type === 'lead')), [searchTerm, allMeetings]);
    const otherMeetings = useMemo(() => filterMeetings(allMeetings.filter(m => m.type === 'others')), [searchTerm, allMeetings]);

    const handleViewDetails = (meeting: Meeting) => {
        setSelectedMeeting(meeting);
    }
    
    const renderMeetingList = (meetings: Meeting[], title: string) => (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-medium">{title}</h2>
            </div>
            <div>
                <Card className="rounded-[50px] bg-white">
                    <CardContent className="p-0 lg:p-6">
                       {meetings.length > 0 ? meetings.map((meeting, index) => (
                            <MeetingListItem 
                                key={`${meeting.id}-${index}`}
                                meeting={meeting} 
                                onEdit={setMeetingToEdit}
                                onDelete={handleDeleteClick}
                                onViewDetails={handleViewDetails}
                                isFirst={index === 0}
                                isLast={index === meetings.length - 1}
                            />
                        )) : <p className="text-center text-muted-foreground p-10">No {title.toLowerCase()} found.</p>}
                    </CardContent>
                </Card>
            </div>
        </>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <h2 className="text-xl text-black font-medium self-start md:self-end">Client Meetings</h2>
                 <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
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

            {isLoading ? (
                 <Card className="rounded-[50px]"><CardContent className="p-6 space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /></CardContent></Card>
            ) : (
                <>
                    {renderMeetingList(clientMeetings, "Client Meetings")}
                    {renderMeetingList(leadMeetings, "Lead Meetings")}
                    {renderMeetingList(otherMeetings, "Other Meetings")}
                </>
            )}

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
             {selectedMeeting && (
                <MeetingDetailsSheet
                    isOpen={!!selectedMeeting}
                    onClose={() => setSelectedMeeting(null)}
                    meeting={selectedMeeting}
                />
            )}
        </div>
    );
}
