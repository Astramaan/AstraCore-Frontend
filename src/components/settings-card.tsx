
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Monitor, Sun, Moon, GanttChartSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export const SettingsCard = () => {
    const { theme, setTheme } = useTheme();
    const [isProjectStageEnabled, setIsProjectStageEnabled] = useState(false);

    return (
        <Card className="rounded-[50px]">
            <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold">Settings</CardTitle>
                <CardDescription>Customize your experience.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex justify-between items-center">
                    <Label className="text-lg font-medium text-foreground/80">Appearance</Label>
                     <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-[180px] h-14 rounded-full bg-background dark:bg-card">
                            <div className="flex items-center gap-2">
                                {theme === 'light' && <Sun className="h-5 w-5 text-muted-foreground"/>}
                                {theme === 'dark' && <Moon className="h-5 w-5 text-muted-foreground"/>}
                                {theme === 'system' && <Monitor className="h-5 w-5 text-muted-foreground"/>}
                                <SelectValue placeholder="Select theme" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Separator/>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <GanttChartSquare className="h-6 w-6 text-muted-foreground"/>
                        <Label htmlFor="project-stage-toggle" className="text-lg text-foreground font-medium">
                            Project Stage
                        </Label>
                    </div>
                    <Switch
                        id="project-stage-toggle"
                        checked={isProjectStageEnabled}
                        onCheckedChange={setIsProjectStageEnabled}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
