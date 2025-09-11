
'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Users, FileText } from "lucide-react";
import { AllNotificationsDialog } from "./all-notifications-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import React from "react";
import NotificationBellIcon from "./icons/notification-bell-icon";

const notifications = [
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
];

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


const NotificationItem = ({ notification, isMobile }: { notification: typeof notifications[0], isMobile?: boolean }) => (
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

export function NotificationPopover() {
    const isMobile = useIsMobile();

    if(isMobile) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-white rounded-full h-12 w-12 md:h-14 md:w-14 hover:bg-primary/10 hover:text-primary relative">
                        <NotificationBellIcon className="h-6 w-6" />
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full h-full max-w-full sm:max-w-full p-0 m-0 rounded-none border-none bg-white">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-2xl font-semibold">
                                <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center bg-gray-100 border border-stone-200">
                                <NotificationBellIcon className="w-6 w-6"/>
                                </div>
                                Notifications
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full w-[54px] h-[54px] bg-background">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogClose>
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-1">
                        <div className="p-2">
                            {allNotifications.map((item, index) => (
                                <NotificationItem key={index} notification={item} isMobile={isMobile} />
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-white rounded-full h-12 w-12 md:h-14 md:w-14 hover:bg-primary/10 hover:text-primary relative">
                    <NotificationBellIcon className="h-6 w-6" />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-96 p-2 rounded-[50px] bg-white border-0" align="end">
                <div className="p-4 flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 border border-stone-200">
                        <NotificationBellIcon className="w-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-semibold">Notifications</h3>
                </div>
                <div className="flex flex-col">
                    {notifications.map((item, index) => (
                        <NotificationItem key={index} notification={item} />
                    ))}
                </div>
                <div className="p-2 border-t mt-2">
                    <AllNotificationsDialog />
                </div>
            </PopoverContent>
        </Popover>
    );
}
