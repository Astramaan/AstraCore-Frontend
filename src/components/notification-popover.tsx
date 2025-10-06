
'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Users, FileText } from "lucide-react";
import { AllNotificationsDialog } from "./all-notifications-dialog";
import NotificationBellIcon from "./icons/notification-bell-icon";

const notifications = [
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
];

const NotificationItem = ({ notification }: { notification: typeof notifications[0] }) => (
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

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0">
                    <Button variant="ghost" size="icon" className="bg-black/5 backdrop-blur-sm rounded-full h-12 w-12 md:h-14 md:w-14 hover:bg-primary/10 hover:text-primary relative text-white">
                        <NotificationBellIcon className="h-6 w-6" />
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-96 p-2 rounded-[50px] bg-popover text-popover-foreground border-0" align="center">
                <div className="p-4 flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border border-border">
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
