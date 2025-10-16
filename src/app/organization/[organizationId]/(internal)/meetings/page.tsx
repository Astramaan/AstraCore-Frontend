
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GoogleMeetIcon from "@/components/icons/google-meet-icon";
import { Input } from "@/components/ui/input";
import { MoreVertical, Search, ShieldAlert, PlusCircle } from "lucide-react";
import { CreateMeetingSheet } from "@/components/create-meeting-sheet";
import { EditMeetingSheet, Meeting } from "@/components/edit-meeting-sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MeetingDetailsSheet } from "@/components/meeting-details-sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user-context";

const MeetingListItem = ({
  meeting,
  onEdit,
  onDelete,
  onViewDetails,
  isFirst,
  isLast,
}: {
  meeting: Meeting;
  onEdit: (meeting: Meeting) => void;
  onDelete: (meeting: Meeting) => void;
  onViewDetails: (meeting: Meeting) => void;
  isFirst?: boolean;
  isLast?: boolean;
}) => (
  <div className="flex flex-col group">
    <div
      className="lg:hidden p-6 md:p-10 gap-4"
      onClick={() => onViewDetails(meeting)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-semibold text-foreground">
            {meeting.title || meeting.name}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem
              onSelect={(e) => {
                e.stopPropagation();
                onEdit(meeting);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(meeting);
              }}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-base">
        <div>
          <span className="text-muted-foreground">Contact: </span>
          <p className="text-foreground font-medium break-words">
            {meeting.email}
            <br />
            {meeting.phone}
          </p>
        </div>
        <div className="text-right">
          <span className="text-muted-foreground">
            {meeting.type === "lead" ? "Lead ID:" : "Client ID:"}{" "}
          </span>
          <p className="text-foreground font-medium">{meeting.id}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Date & Time : </span>
          <p className="text-foreground font-medium">
            {meeting.date}, {meeting.time}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span className="text-muted-foreground">Link: </span>
          <a
            href={`https://${meeting.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-foreground font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <GoogleMeetIcon className="w-6 h-6" />
            <span className="hidden sm:inline">Google Meet</span>
          </a>
        </div>
      </div>
    </div>
    <div
      className={cn(
        "hidden lg:block hover:bg-hover-bg dark:hover:bg-muted/50 py-6 px-10",
        isFirst && "hover:rounded-t-[30px]",
        isLast && "hover:rounded-b-[30px]",
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
          <p className="text-xl font-semibold text-foreground break-words">
            {meeting.title || meeting.name}
          </p>
          <p className="text-lg">
            <span className="text-foreground">
              {meeting.name} ({meeting.id})
            </span>
          </p>
        </div>

        {/* Separator - full height */}
        <Separator
          orientation="vertical"
          className="self-stretch hidden lg:block"
        />

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-2 lg:border-none border-t border-dashed pt-4 lg:pt-0">
          <p className="text-lg break-all">
            <span className="text-muted-foreground">Contact: </span>
            <span className="text-foreground">
              {meeting.email} | {meeting.phone}
            </span>
          </p>
        </div>

        {/* Separator */}
        <Separator
          orientation="vertical"
          className="self-stretch hidden lg:block"
        />

        {/* Date & Time + Link */}
        <div className="flex flex-col justify-center gap-2 md:border-t md:border-dashed lg:border-none pt-4 lg:pt-0">
          <p className="text-lg whitespace-nowrap">
            <span className="text-muted-foreground">Date & Time: </span>
            <span className="text-foreground">
              {meeting.date}, {meeting.time}
            </span>
          </p>
          <a
            href={`https://${meeting.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-foreground font-medium hover:underline text-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <GoogleMeetIcon className="w-6 h-6" />
            Google Meet
          </a>
        </div>

        {/* Actions Menu */}
        <div
          className="justify-self-end flex items-center md:static"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => onEdit(meeting)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => onDelete(meeting)}
                className="text-red-500"
              >
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
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [allMeetings, setAllMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [meetingToDelete, setMeetingToDelete] = useState<Meeting | null>(null);
  const [meetingToEdit, setMeetingToEdit] = useState<Meeting | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchMeetings = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/meetings", {
          headers: {
            "Content-Type": "application/json",
            "x-user": JSON.stringify(user),
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch meetings");
        }
        const result = await res.json();
        if (result.success) {
          const formattedMeetings = result.data.map((m: any) => {
            const type =
              m.targetType?.type || m.manualDetails?.type || "others";

            let name = m.title;
            let city = "N/A";
            let email = "N/A";
            let phone = "N/A";

            if (m.manualDetails) {
              name = m.manualDetails.name || m.title;
              city = m.manualDetails.location || "N/A";
              email = m.manualDetails.email || "N/A";
              phone = m.manualDetails.phoneNumber || "N/A";
            } else if (m.targetType) {
              // In a real app, you would fetch lead/client details based on targetType.id
              name = m.title;
            }

            let date = "N/A";
            if (m.date) {
              try {
                date = new Date(m.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
              } catch (e) {
                console.error("Invalid date format from backend:", m.date);
              }
            }

            let time = m.startTime || "N/A";
            if (m.startTime && m.startTime.includes("GMT")) {
              try {
                time = new Date(m.startTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
              } catch (e) {
                // Keep original if parsing fails
              }
            }

            return {
              id: m.meetingId || m._id || `gen_${Math.random()}`,
              projectId: m.projectId,
              type: type,
              title: m.title,
              name: name,
              city: city,
              date: date,
              time: time,
              link: m.meetingLink || "",
              email: email,
              phone: phone,
            };
          });
          setAllMeetings(formattedMeetings);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.message,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch meetings.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [toast, user]);

  const handleAddNewMeeting = (newMeeting: Omit<Meeting, "id">) => {
    const meetingWithId = { ...newMeeting, id: `NEW${Date.now()}` };
    setAllMeetings((prev) => [meetingWithId, ...prev]);
  };

  const handleUpdateMeeting = (updatedMeeting: Meeting) => {
    setAllMeetings((prev) =>
      prev.map((m) => (m.id === updatedMeeting.id ? updatedMeeting : m)),
    );
    setMeetingToEdit(null);
  };

  const handleDeleteClick = (meeting: Meeting) => {
    setMeetingToDelete(meeting);
  };

  const confirmDelete = async () => {
    if (meetingToDelete) {
      const { projectId, id: meetingId } = meetingToDelete;
      if (!projectId || !meetingId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Cannot delete meeting without Project and Meeting ID.",
        });
        setMeetingToDelete(null);
        return;
      }

      try {
        const res = await fetch(
          `/api/projects/${projectId}/meetings/${meetingId}`,
          {
            method: "DELETE",
            headers: { "x-user": JSON.stringify(user) },
          },
        );
        const result = await res.json();
        if (result.success || res.ok) {
          setAllMeetings((prev) =>
            prev.filter((m) => m.id !== meetingToDelete.id),
          );
          toast({
            title: "Success",
            description: result.message || "Meeting deleted.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.message,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete meeting",
        });
      }

      setMeetingToDelete(null);
    }
  };

  const filterMeetings = (meetings: Meeting[]) => {
    if (!searchTerm) return meetings;
    return meetings.filter(
      (meeting) =>
        (meeting.title &&
          meeting.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const clientMeetings = useMemo(
    () => filterMeetings(allMeetings.filter((m) => m.type === "client")),
    [searchTerm, allMeetings],
  );
  const leadMeetings = useMemo(
    () => filterMeetings(allMeetings.filter((m) => m.type === "lead")),
    [searchTerm, allMeetings],
  );
  const otherMeetings = useMemo(
    () => filterMeetings(allMeetings.filter((m) => m.type === "others")),
    [searchTerm, allMeetings],
  );

  const handleViewDetails = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };

  const renderMeetingList = (meetings: Meeting[], title: string) => (
    <div className="space-y-4">
      {title === "Client Meetings" ? (
        <div className="flex flex-col gap-4">
          <div className="flex md:hidden flex-col gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search Meetings..."
                  className="pl-12 h-14 rounded-full bg-card text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <CreateMeetingSheet onMeetingCreated={handleAddNewMeeting} />
            </div>
            <h2 className="text-xl text-foreground font-medium pt-4">
              {title}
            </h2>
          </div>
          <div className="hidden md:flex justify-between items-end">
            <h2 className="text-xl text-foreground font-medium">{title}</h2>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search Meetings..."
                  className="pl-12 h-14 rounded-full bg-card text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <CreateMeetingSheet onMeetingCreated={handleAddNewMeeting} />
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-xl text-foreground font-medium">{title}</h2>
      )}
      <div>
        <Card className="rounded-[50px] bg-card">
          <CardContent className="p-0 lg:p-6">
            {meetings.length > 0 ? (
              meetings.map((meeting, index) => (
                <MeetingListItem
                  key={`${meeting.id}-${index}`}
                  meeting={meeting}
                  onEdit={setMeetingToEdit}
                  onDelete={handleDeleteClick}
                  onViewDetails={handleViewDetails}
                  isFirst={index === 0}
                  isLast={index === meetings.length - 1}
                />
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No {title.toLowerCase()} scheduled yet.</p>
                {title === "Client Meetings" && (
                  <p>Click 'Create' to add a new meeting.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {isLoading ? (
        <Card className="rounded-[50px] bg-card">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ) : (
        <>
          {renderMeetingList(clientMeetings, "Client Meetings")}
          {renderMeetingList(leadMeetings, "Lead Meetings")}
          {renderMeetingList(otherMeetings, "Other Meetings")}
        </>
      )}

      <AlertDialog
        open={!!meetingToDelete}
        onOpenChange={(isOpen) => !isOpen && setMeetingToDelete(null)}
      >
        <AlertDialogContent className="max-w-md rounded-[50px]">
          <AlertDialogHeader className="items-center text-center">
            <div className="relative mb-6 flex items-center justify-center h-20 w-20">
              <div className="w-full h-full bg-destructive/10 rounded-full" />
              <div className="w-14 h-14 bg-destructive/20 rounded-full absolute" />
              <ShieldAlert className="w-8 h-8 text-destructive absolute" />
            </div>
            <AlertDialogTitle className="text-2xl font-semibold">
              Confirm Meeting Deletion?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-muted-foreground">
              Deleting this meeting will permanently remove it from your
              schedule. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
            <AlertDialogCancel className="w-40 h-14 px-10 py-3.5 bg-background rounded-[50px] text-lg font-medium text-foreground border-none hover:bg-muted hover:text-foreground">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="w-40 h-14 px-10 py-3.5 bg-destructive rounded-[50px] text-lg font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
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
