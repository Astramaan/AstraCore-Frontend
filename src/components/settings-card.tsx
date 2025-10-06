
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Monitor, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

export const SettingsCard = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Card className="rounded-[50px]">
            <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold">Settings</CardTitle>
                <CardDescription>Customize your experience.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
                <div>
                    <Label className="text-lg font-medium text-foreground/80 mb-2 block">Appearance</Label>
                    <div className="flex items-center justify-between p-2 bg-background dark:bg-card rounded-full">
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
                </div>
                 <div>
                    <Label className="text-lg font-medium text-foreground/80 mb-2 block">Language</Label>
                     <Select defaultValue="en">
                        <SelectTrigger className="w-full h-14 rounded-full bg-background dark:bg-card">
                            <div className="flex items-center gap-2">
                                <Languages className="h-5 w-5 text-muted-foreground"/>
                                <SelectValue placeholder="Select language" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
