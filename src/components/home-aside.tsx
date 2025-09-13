

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AssignTaskSheet } from "@/components/assign-task-sheet";
import { AddMemberSheet } from "@/components/add-member-sheet";
import RedirectionArrowIcon from '@/components/icons/redirection-arrow-icon';
import { TaskOverviewChart } from '@/components/charts/task-overview-chart';
import type { Meeting } from '@/components/meeting-details-sheet';
import type { Task } from '@/components/task-details-sheet';
import { useIsMobile } from '@/hooks/use-mobile';


const MeetingCard = ({ meeting, onClick }: { meeting: Meeting, onClick: (meeting: Meeting) => void }) => (
    <Card className="w-full h-20 rounded-[50px] py-4 px-6 md:px-10 flex items-center justify-between cursor-pointer hover:bg-muted/50" onClick={() => onClick(meeting)}>
        <div className="flex-1">
            <p className="text-base font-medium">{meeting.name}</p>
            <p className="text-xs text-muted-foreground">{meeting.type === 'lead' ? 'LEAD' : 'CLIENT'} ID: {meeting.id}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium">{meeting.time}</p>
            <p className="text-sm text-muted-foreground">{meeting.date}</p>
        </div>
        <div className="flex items-center gap-2 pl-4">
            <RedirectionArrowIcon className="w-5 h-5 text-muted-foreground" />
        </div>
    </Card>
)

interface HomeAsideProps {
    meetings: Meeting[];
    myTasksChartData: { name: string; value: number }[];
    assignedTasksChartData: { name: string; value: number }[];
    onMeetingClick: (meeting: Meeting) => void;
    onAddTask: (task: Omit<Task, 'id' | 'attachments'>) => void;
}

export function HomeAside({ meetings, myTasksChartData, assignedTasksChartData, onMeetingClick, onAddTask }: HomeAsideProps) {
    const isMobile = useIsMobile();
    const isTablet = useIsMobile(); // We can refine this hook later if needed

    if (isMobile) {
        return null;
    }

    return (
        <aside className="w-full lg:w-[420px] space-y-6 flex-shrink-0">
            <div className="hidden lg:flex flex-wrap lg:flex-nowrap justify-end items-center gap-4">
                 <AssignTaskSheet onTaskAssigned={onAddTask} />
                <AddMemberSheet />
            </div>

            <div>
                <div className="flex justify-between items-center mb-3 mt-8">
                    <h2 className="text-xl font-medium">Meetings</h2>
                    <Link href="/organization/meetings" className="text-sm text-primary">
                        see all meetings
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                    {meetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} onClick={onMeetingClick} />)}
                </div>
            </div>
            
             <div>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-medium">Overview</h2>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                <Card className="rounded-[50px] relative">
                    <CardContent className="pt-10">
                        <div className="relative">
                            <TaskOverviewChart data={myTasksChartData} />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-base font-medium text-center">My Tasks</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[50px] relative">
                    <CardContent className="pt-10">
                        <div className="relative">
                            <TaskOverviewChart data={assignedTasksChartData} />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-base font-medium text-center -translate-y-2">Assigned<br />Tasks</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </aside>
    );
}

