
'use client';

import { Laptop, Smartphone, Tablet, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const sessions = [
    { device: 'Windows', icon: <Laptop className="w-6 h-6 text-grey-1" />, browser: 'Chrome', lastActive: '6 hrs ago' },
    { device: 'Android', icon: <Smartphone className="w-6 h-6 text-grey-1" />, browser: 'Opera', lastActive: 'Yesterday' },
    { device: 'iPhone', icon: <Tablet className="w-6 h-6 text-grey-1" />, browser: 'Safari', lastActive: '03/05/2025' },
]

export const ActiveSessionsCard = () => {
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
            <CardContent className="space-y-4 px-6 pb-6">
                {sessions.map(session => (
                    <div key={session.device} className="flex justify-between items-center pb-4 border-b">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border">
                                {session.icon}
                            </div>
                            <div>
                                <p className="text-lg font-medium">{session.device}</p>
                                <p className="text-base text-grey-2">{session.browser} • {session.lastActive}</p>
                            </div>
                        </div>
                        <Button variant="destructive" className="h-14 px-10 rounded-full bg-background text-red-600 hover:bg-destructive/10 text-lg font-medium hidden md:flex">Remove</Button>
                         <Button size="icon" variant="ghost" className="md:hidden p-3.5 rounded-full bg-background text-destructive hover:bg-destructive/10">
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
