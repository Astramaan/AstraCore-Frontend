
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, Users, FileText, X } from "lucide-react";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";

const allNotifications = [
    {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "New team member added",
        time: "2 hours ago",
        bgColor: "bg-blue-100",
    },
    {
        icon: <FileText className="w-6 h-6 text-green-500" />,
        title: "Project plan updated",
        time: "5 hours ago",
        bgColor: "bg-green-100",
    },
    {
        icon: <Users className="w-6 h-6 text-yellow-500" />,
        title: "Lead assigned to you",
        time: "Yesterday",
        bgColor: "bg-yellow-100",
    },
    {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "New team member added",
        time: "3 days ago",
        bgColor: "bg-blue-100",
    },
    {
        icon: <FileText className="w-6 h-6 text-green-500" />,
        title: "Project milestone achieved",
        time: "4 days ago",
        bgColor: "bg-green-100",
    },
    {
        icon: <Users className="w-6 h-6 text-yellow-500" />,
        title: "New lead 'Innovate Inc.'",
        time: "5 days ago",
        bgColor: "bg-yellow-100",
    },
     {
        icon: <FileText className="w-6 h-6 text-red-500" />,
        title: "Task 'Create Mockups' overdue",
        time: "6 days ago",
        bgColor: "bg-red-100",
    },
     {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "Welcome to AstraCore!",
        time: "1 week ago",
        bgColor: "bg-blue-100",
    },
];

const NotificationItem = ({ notification }: { notification: typeof allNotifications[0] }) => (
    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg cursor-pointer">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.bgColor}`}>
            {notification.icon}
        </div>
        <div>
            <p className="font-medium text-zinc-900">{notification.title}</p>
            <p className="text-sm text-grey-1">{notification.time}</p>
        </div>
    </div>
)

export function AllNotificationsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="w-full text-primary">View all notifications</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 rounded-2xl">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                           <Bell className="w-5 h-5"/>
                        </div>
                        Notifications
                    </DialogTitle>
                     <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-full w-[54px] h-[54px] bg-background">
                            <X className="h-6 w-6" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <ScrollArea className="h-[400px]">
                    <div className="p-2">
                        {allNotifications.map((item, index) => (
                            <NotificationItem key={index} notification={item} />
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
