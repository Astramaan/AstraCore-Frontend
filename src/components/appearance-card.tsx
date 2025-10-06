
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Monitor, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export const AppearanceCard = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Card className="rounded-[50px]">
            <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold">Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your interface.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="flex items-center justify-between p-2 bg-background rounded-full">
                    <Button variant="ghost" size="icon" onClick={() => setTheme('light')} className={cn("rounded-full flex-1 h-12 gap-2", theme === 'light' && 'bg-primary text-white hover:bg-primary hover:text-white')}>
                        <Sun className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setTheme('dark')} className={cn("rounded-full flex-1 h-12 gap-2", theme === 'dark' && 'bg-primary text-white hover:bg-primary hover:text-white')}>
                        <Moon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setTheme('system')} className={cn("rounded-full flex-1 h-12 gap-2", theme === 'system' && 'bg-primary text-white hover:bg-primary hover:text-white')}>
                        <Monitor className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
