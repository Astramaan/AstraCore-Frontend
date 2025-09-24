
'use client';

import { Laptop, Smartphone, Tablet, X, ShieldAlert } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';

const initialSessions = [
    { device: 'Windows', icon: <Laptop className="w-6 h-6 text-grey-1" />, browser: 'Chrome', lastActive: '6 hrs ago' },
    { device: 'Android', icon: <Smartphone className="w-6 h-6 text-grey-1" />, browser: 'Opera', lastActive: 'Yesterday' },
    { device: 'iPhone', icon: <Tablet className="w-6 h-6 text-grey-1" />, browser: 'Safari', lastActive: '03/05/2025' },
]

export const ActiveSessionsCard = () => {
    const [sessions, setSessions] = useState(initialSessions);

    const handleRemove = (device: string) => {
        setSessions(prev => prev.filter(session => session.device !== device));
    }

    return (
        <Card className="rounded-[50px] h-full">
            <CardHeader className="p-6">
                 <div className="flex items-center gap-2">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                        <Laptop className="h-6 w-6"/>
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-semibold">Active Sessions</CardTitle>
                        <CardDescription>Logged-in devices</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                {sessions.map(session => (
                    <div key={session.device} className="flex justify-between items-center py-4 border-b last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-4">
                            <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center border">
                                {session.icon}
                            </div>
                            <div>
                                <p className="text-lg font-medium">{session.device}</p>
                                <p className="text-base text-grey-2">{session.browser} • {session.lastActive}</p>
                            </div>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="h-14 px-10 rounded-full bg-background hover:bg-destructive/10 text-red-600 text-lg font-medium hidden md:flex">Remove</Button>
                            </AlertDialogTrigger>
                             <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="md:hidden p-3.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20">
                                    <X className="h-6 w-6" />
                                </Button>
                             </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-md rounded-[50px]">
                                <AlertDialogHeader className="items-center text-center">
                                    <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                                        <div className="w-full h-full bg-red-600/5 rounded-full" />
                                        <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                                        <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                                    </div>
                                    <AlertDialogTitle className="text-2xl font-semibold">Remove this device?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-lg text-grey-2">
                                        You will be logged out from this device and will need to sign in again.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row justify-center gap-4 pt-4">
                                    <AlertDialogCancel className="w-full md:w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRemove(session.device)} className="w-full md:w-40 h-14 px-10 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Remove</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
