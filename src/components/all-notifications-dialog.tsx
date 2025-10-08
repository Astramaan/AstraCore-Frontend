
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Users, FileText, X, Banknote, MessageSquare } from "lucide-react";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import NotificationBellIcon from "./icons/notification-bell-icon";

const orgNotifications = [
    {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "New team member added",
        time: "2 hours ago",
        bgColor: "bg-blue-100 dark:bg-blue-900/50",
    },
    {
        icon: <FileText className="w-6 h-6 text-green-500" />,
        title: "Project plan updated",
        time: "5 hours ago",
        bgColor: "bg-green-100 dark:bg-green-900/50",
    },
    {
        icon: <Users className="w-6 h-6 text-yellow-500" />,
        title: "Lead assigned to you",
        time: "Yesterday",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
    },
    {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "New team member added",
        time: "3 days ago",
        bgColor: "bg-blue-100 dark:bg-blue-900/50",
    },
    {
        icon: <FileText className="w-6 h-6 text-green-500" />,
        title: "Project milestone achieved",
        time: "4 days ago",
        bgColor: "bg-green-100 dark:bg-green-900/50",
    },
    {
        icon: <Users className="w-6 h-6 text-yellow-500" />,
        title: "New lead 'Innovate Inc.'",
        time: "5 days ago",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
    },
     {
        icon: <FileText className="w-6 h-6 text-red-500" />,
        title: "Task 'Create Mockups' overdue",
        time: "6 days ago",
        bgColor: "bg-red-100 dark:bg-red-900/50",
    },
     {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "Welcome to AstraCore!",
        time: "1 week ago",
        bgColor: "bg-blue-100 dark:bg-blue-900/50",
    },
];

const clientNotifications = [
     {
        icon: <FileText className="w-6 h-6 text-green-500" />,
        title: "Project stage 'Foundation' completed",
        time: "1 hour ago",
        bgColor: "bg-green-100 dark:bg-green-900/50",
    },
    {
        icon: <Banknote className="w-6 h-6 text-blue-500" />,
        title: "New payment due for 'Superstructure'",
        time: "4 hours ago",
        bgColor: "bg-blue-100 dark:bg-blue-900/50",
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-yellow-500" />,
        title: "New message from Project Manager",
        time: "Yesterday",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
    },
    {
        icon: <FileText className="w-6 h-6 text-green-500" />,
        title: "Drawings for 'Electrical' approved",
        time: "2 days ago",
        bgColor: "bg-green-100 dark:bg-green-900/50",
    },
    {
        icon: <Banknote className="w-6 h-6 text-blue-500" />,
        title: "Payment of ₹50,000 received",
        time: "3 days ago",
        bgColor: "bg-blue-100 dark:bg-blue-900/50",
    },
];


const NotificationItem = ({ notification }: { notification: typeof orgNotifications[0] }) => (
    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg cursor-pointer">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.bgColor}`}>
            {notification.icon}
        </div>
        <div>
            <p className="font-medium text-foreground">{notification.title}</p>
            <p className="text-sm text-muted-foreground">{notification.time}</p>
        </div>
    </div>
)

export function AllNotificationsDialog({ userType = 'organization' }: { userType?: 'client' | 'organization' }) {
    const notifications = userType === 'client' ? clientNotifications : orgNotifications;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="w-full text-primary">View all notifications</Button>
            </SheetTrigger>
            <SheetContent 
                side="bottom"
                className="p-0 m-0 flex flex-col bg-background transition-all h-full md:h-[90vh] md:max-w-md md:mx-auto rounded-t-[50px] border-none"
            >
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-2xl font-semibold">
                            <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center border border-border">
                                <NotificationBellIcon className="w-6 w-6"/>
                            </div>
                            Notifications
                        </div>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full w-[54px] h-[54px] bg-muted">
                                <X className="h-6 w-6" />
                            </Button>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    <div className="p-4">
                        {notifications.map((item, index) => (
                            <NotificationItem key={index} notification={item} />
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
